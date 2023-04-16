import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function POST(request: NextRequest) {
  const req = await request.json();
  if (req.clientName && req.clientEmail) {
    const conn = postgres({
      ssl: require,
    });
    const result = await conn.unsafe(`SELECT * FROM clients where clientname = '${req.clientName}' and clientemail = '${req.clientEmail}'`);
    if (result.length === 0) {
      // generate new token, check, save it, and then send response
      let token = Math.floor(Math.random() * 9000000000) + 1000000000;
      let exists = await conn.unsafe(`SELECT * FROM clients where token = ${token}`);
      while (exists.length !== 0) {
        token = Math.floor(Math.random() * 9000000000) + 1000000000;
        exists = await conn.unsafe(`SELECT * FROM clients where token = ${token}`);
      }

      // also add client id
      // select all distinct bearer tokens
      let countResult = await conn.unsafe(`SELECT COUNT(DISTINCT token) FROM clients;`);
      let count = +countResult[0]["count"];

      const entry = await conn.unsafe(`INSERT INTO clients (token, clientName, clientEmail, clientId) VALUES (${token}, '${req.clientName}', '${req.clientEmail}', '${++count}');`);
      // console.log(entry)
      return new NextResponse(JSON.stringify({ token: token }));

    } else {
      return new NextResponse(JSON.stringify({ token: result[0]['token'] }));
    }
  }
  else {
    return new NextResponse('Please include clientName & clientEmail in the POST request');
  }
}