import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const conn = postgres({
        ssl: require,
    });
    let id = parseInt(params.id);

    if (!isNaN(id)) {
        let bearerToken = (request.headers.get('authorization'))
        const token = bearerToken?.split(' ')[1];
        const tokenResult = await conn.unsafe(`SELECT clientId FROM clients where token = '${token}'`);
        let clientId = +tokenResult[0]["clientid"];

        const result = await conn.unsafe(`SELECT * FROM orders WHERE orderid = ${id} AND clientId = ${clientId}`);
        if (result.length > 0) {
            return new NextResponse(JSON.stringify(result));
        } else {
            return new NextResponse(JSON.stringify({
                error: `No order with id ${id}`
            }));
        }
    } else {
        return new NextResponse(JSON.stringify({
            error: "No book with id NaN"
        }));
    }
}