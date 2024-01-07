import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function POST(request: NextRequest) {
  let req: any = {}
  try {
    req = await request.json();
  } catch (e) {
    return NextResponse.json({ "error": "No body found with request" });
  }

  if (req.token) {
    const conn = postgres({
      ssl: require,
    });

    const result = await conn.unsafe(`SELECT * FROM clients where token = '${req.token}'`);
    if (result.length != 0) {
      // let id = result[0]["clientid"];
      return NextResponse.json({
        status: "valid",
        // clientId: id
      });
    } else {
      return NextResponse.json({
        status: "invalid"
      });
    }

  } else {
    return NextResponse.json({
      status: "Token not provided"
    });
  }
}