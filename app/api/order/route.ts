import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function POST(request: NextRequest) {
  const req = await request.json();
  if (req.bookId && req.customerName) {
    const conn = postgres({
      ssl: require,
    });

    let bearerToken = (request.headers.get('authorization'))
    const token = bearerToken?.split(' ')[1];
    const result = await conn.unsafe(`SELECT clientId FROM clients where token = '${token}'`);

    let clientId = +result[0]["clientid"];
    console.log(` ${typeof clientId}, ${typeof req.bookId}, '${typeof req.customerName}'`)

    // orderid
    const totalCounts = await conn.unsafe(`SELECT Count(*) FROM orders where clientId = '${clientId}'`);
    let count = (+totalCounts[0]["count"]);
    console.log("/////")
    console.log(count)
    const entry = await conn.unsafe(`INSERT INTO orders (clientId, bookId, customerName, orderId) VALUES (${clientId}, ${req.bookId}, '${req.customerName}', ${++count});`);

    return new NextResponse(JSON.stringify({
      orderId: count
    }));
  }
  else {
    return new NextResponse('Please include bookId & customerName in the POST request');
  }
}