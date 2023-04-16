import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function GET(request: NextRequest) {
  const conn = postgres({
    ssl: require,
  });
  let bearerToken = (request.headers.get('authorization'))
  const token = bearerToken?.split(' ')[1];
  const result = await conn.unsafe(`SELECT clientId FROM clients where token = '${token}'`);
  let clientId = +result[0]["clientid"];
  // console.log("//////////////")

  const orders = await conn.unsafe(`SELECT * FROM orders where clientid = ${clientId}`);
  return new NextResponse(JSON.stringify(orders));
}