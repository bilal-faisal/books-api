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
            return NextResponse.json(result);
        } else {
            return NextResponse.json({
                error: `No book exists with id ${id}`
            });
        }
    } else {
        return NextResponse.json({
            error: "Book id can only be an integer"
        });
    }
}