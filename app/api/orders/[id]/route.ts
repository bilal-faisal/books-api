import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

    let id = parseInt(params.id);

    if (!isNaN(id)) {
        // Authorization already verified by middleware but we still need the token to get data
        const bearerToken = (request.headers.get('authorization'))
        const token = bearerToken?.split(' ')[1];

        const conn = postgres({
            ssl: require,
        });
        const tokenResult = await conn.unsafe(`SELECT clientId FROM clients where token = '${token}'`);
        let clientId = +tokenResult[0]["clientid"];

        const result = await conn.unsafe(`SELECT * FROM orders WHERE orderid = ${id} AND clientId = ${clientId}`);
        if (result.length > 0) {
            return NextResponse.json(result[0]);
        } else {
            return NextResponse.json({
                error: `No order exists with id no. ${id}`
            });
        }
    } else {
        return NextResponse.json({
            error: `Invalid order id: ${id}`
        });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {

    let id = parseInt(params.id);

    if (!isNaN(id)) {
        // Authorization already verified by middleware but we still need the token to get data
        const bearerToken = (request.headers.get('authorization'))
        const token = bearerToken?.split(' ')[1];

        const conn = postgres({
            ssl: require,
        });
        const tokenResult = await conn.unsafe(`SELECT clientId FROM clients where token = '${token}'`);
        let clientId = +tokenResult[0]["clientid"];

        const result = await conn.unsafe(`SELECT * FROM orders WHERE orderid = ${id} AND clientId = ${clientId}`);
        if (result.length > 0) {
            const result = await conn.unsafe(`DELETE FROM orders WHERE orderid = ${id} AND clientId = ${clientId}`);

            return NextResponse.json({
                message: `Order with id no ${id} deleted successfully`
            });
        } else {
            return NextResponse.json({
                error: `No order exists with id no. ${id}`
            });
        }
    } else {
        return NextResponse.json({
            error: `Invalid order id: ${id}`
        });
    }
}


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {

    let id = parseInt(params.id);

    if (!isNaN(id)) {
        let req: any = {}
        try {
            req = await request.json();
        } catch (e) {
            return NextResponse.json({ "error": "No body found with request" });
        }

        if (req.customerName) {
            // Authorization already verified by middleware but we still need the token to get data
            const bearerToken = (request.headers.get('authorization'))
            const token = bearerToken?.split(' ')[1];

            const conn = postgres({
                ssl: require,
            });
            const tokenResult = await conn.unsafe(`SELECT clientId FROM clients where token = '${token}'`);
            let clientId = +tokenResult[0]["clientid"];

            const result = await conn.unsafe(`SELECT * FROM orders WHERE orderid = ${id} AND clientId = ${clientId}`);

            if (result.length > 0) {
                const result = await conn.unsafe(`UPDATE orders SET customerName = '${req.customerName}' WHERE orderid = ${id} AND clientId = ${clientId}`);

                return NextResponse.json({
                    message: `Order with id no ${id} updated successfully`
                });
            } else {
                return NextResponse.json({
                    error: `No order exists with id no. ${id}`
                });
            }

        } else {
            return NextResponse.json({
                error: 'Missing body parameter customerName'
            });
        }

    } else {
        return NextResponse.json({
            error: `Invalid order id: ${id}`
        });
    }
}