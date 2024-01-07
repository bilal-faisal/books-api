import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";


export async function GET(request: NextRequest) {
  // Authorization already verified by middleware but we still need the token to get data
  let bearerToken = (request.headers.get('authorization'))
  const token = bearerToken?.split(' ')[1];

  const conn = postgres({
    ssl: require,
  });

  const result = await conn.unsafe(`SELECT clientId FROM clients where token = '${token}'`);
  let clientId = +result[0]["clientid"];

  const orders = await conn.unsafe(`SELECT * FROM orders where clientid = ${clientId}`);

  return NextResponse.json({ "orders": orders, "count": orders.length });
}

export async function POST(request: NextRequest) {
  let req: any = {}
  try {
    req = await request.json();
  } catch (e) {
    return NextResponse.json({ "error": "No body found with request" });
  }
  
  if (req.bookId && req.customerName) {

    // Authorization already verified by middleware but we still need the token to get data
    let bearerToken = (request.headers.get('authorization'))
    const token = bearerToken?.split(' ')[1];

    const conn = postgres({
      ssl: require,
    });
    const bookAvailable = await conn.unsafe(`SELECT * FROM books where id = '${req.bookId}'`);

    if (bookAvailable.length == 0) {
      return NextResponse.json({
        error: `No book with id ${req.bookId}`
      });
    }

    const result = await conn.unsafe(`SELECT clientId FROM clients where token = '${token}'`);

    let clientId = +result[0]["clientid"];

    // generate new orderID, check, save it, and then send response
    let orderID = Math.floor(Math.random() * 9000000) + 1000000;
    let exists = await conn.unsafe(`SELECT * FROM orders where orderId = ${orderID}`);
    while (exists.length !== 0) {
      orderID = Math.floor(Math.random() * 9000000) + 1000000;
      exists = await conn.unsafe(`SELECT * FROM orders where orderId = ${orderID}`);
    }

    const entry = await conn.unsafe(`INSERT INTO orders (clientId, bookId, customerName, orderId) VALUES (${clientId}, ${req.bookId}, '${req.customerName}', ${orderID});`);

    return NextResponse.json({
      orderID
    });
  }
  else {
    return NextResponse.json({ "error": "bookId or customerName not found. Please include bookId & customerName in your request" });
  }
}