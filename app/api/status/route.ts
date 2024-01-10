import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function GET(request: NextRequest) {
  const conn = postgres({
    ssl: require,
  });

  const result = await conn.unsafe("SELECT * FROM books");

  if (result.length >= 0) {
    return NextResponse.json({
      status: "OK"
    });
  } else {
    return NextResponse.json({
      status: "Not OK"
    });
  }
}