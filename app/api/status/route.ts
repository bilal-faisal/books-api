import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function GET(request: NextRequest) {
  const conn = postgres({
    ssl: require,
  });
  const result = await conn.unsafe("SELECT * FROM books");
  if (result.length >= 0) {
    return new NextResponse(JSON.stringify({
      status: "OK"
    }));
  } else {
    return new NextResponse(JSON.stringify({
      status: "NOT OK"
    }));
  }
}