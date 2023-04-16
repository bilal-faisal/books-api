import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const conn = postgres({
        ssl: require,
    });
    let id = parseInt(params.id);

    if (!isNaN(id)) {
        const result = await conn.unsafe(`SELECT * FROM books WHERE id = ${id}`);
        if (result.length > 0) {
            return new NextResponse(JSON.stringify(result));
        } else {
            return new NextResponse(JSON.stringify({
                error: `No book with id ${id}`
            }));
        }
    } else {
        return new NextResponse(JSON.stringify({
            error: "No book with id NaN"
        }));
    }
}