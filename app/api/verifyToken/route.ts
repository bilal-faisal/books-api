import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function POST(request: NextRequest) {
  const req = await request.json();

  if (req.token) {
    const conn = postgres({
      ssl: require,
    });

    const result = await conn.unsafe(`SELECT * FROM clients where token = '${req.token}'`);
    if (result.length != 0) {
      // let id = result[0]["clientid"];
      return new NextResponse(JSON.stringify({
        status: "valid",
        // clientId: id
      }));
    } else {
      return new NextResponse(JSON.stringify({
        status: "invalid"
      }));
    }

  } else {
    return new NextResponse(JSON.stringify({
      status: "Token not given"
    }));
  }
}