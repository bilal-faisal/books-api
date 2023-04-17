import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

// async function verifyTokenCall(token: string) {
//   const response = await fetch(
//     `http://localhost:3000/api/verifyToken`,
//     {
//       body: JSON.stringify({ "token": token }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       method: 'POST'
//     }
//   );
//   return response.json();
// }

export async function GET(request: NextRequest) {
  let bearerToken = (request.headers.get('authorization'))
  // if (!bearerToken) {
  //   return new NextResponse('This endpoint requires bearer token');
  // } else {
  const token = bearerToken?.split(' ')[1];
  // let data = await verifyTokenCall(token);

  // if (data.status == 'invalid') {
  //   return new NextResponse("Invalid Token");
  // } else {
  const conn = postgres({
    ssl: require,
  });
  const result = await conn.unsafe(`SELECT clientId FROM clients where token = '${token}'`);
  let clientId = +result[0]["clientid"];

  const orders = await conn.unsafe(`SELECT * FROM orders where clientid = ${clientId}`);
  return new NextResponse(JSON.stringify(orders));
  // }
  // }
}

export async function POST(request: NextRequest) {
  const req = await request.json();

  let bearerToken = (request.headers.get('authorization'))
  // if (!bearerToken) {
  //   return new NextResponse('This endpoint requires bearer token');
  // } else 
  if (req.bookId && req.customerName) {

    // verify token
    const token = bearerToken?.split(' ')[1];
    // let data = await verifyTokenCall(token);

    // if (data.status == 'invalid') {
    //   return new NextResponse("Invalid Token");
    // } else {
    const conn = postgres({
      ssl: require,
    });
    const bookAvailable = await conn.unsafe(`SELECT * FROM books where id = '${req.bookId}'`);
    if (bookAvailable.length == 0) {
      return new NextResponse(JSON.stringify({
        error: `No book with id ${req.bookId}`
      }));
    }

    const result = await conn.unsafe(`SELECT clientId FROM clients where token = '${token}'`);

    let clientId = +result[0]["clientid"];

    // orderid
    const totalCounts = await conn.unsafe(`SELECT Count(*) FROM orders where clientId = '${clientId}'`);
    let count = (+totalCounts[0]["count"]);
    const entry = await conn.unsafe(`INSERT INTO orders (clientId, bookId, customerName, orderId) VALUES (${clientId}, ${req.bookId}, '${req.customerName}', ${++count});`);

    return new NextResponse(JSON.stringify({
      orderId: count
    }));
    // }
  }
  else {
    return new NextResponse('Please include bookId & customerName in the POST request');
  }
}