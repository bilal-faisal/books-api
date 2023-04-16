import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";


async function verifyTokenCall(token: string) {
    const response = await fetch(
        `http://localhost:3000/api/verifyToken`,
        {
            body: JSON.stringify({ "token": token }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST'
        }
    );
    return response.json();
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    let bearerToken = (request.headers.get('authorization'))
    if (!bearerToken) {
        return new NextResponse('This endpoint requires bearer token');
    } else {
        const token = bearerToken?.split(' ')[1];
        let data = await verifyTokenCall(token);
        if (data.status == 'invalid') {
            return new NextResponse("Invalid Token");
        } else {
            // token is verified
            let id = parseInt(params.id);
            if (!isNaN(id)) {
                const conn = postgres({
                    ssl: require,
                });
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
                    error: `No book with id ${id}`
                }));
            }
        }
    }
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    let bearerToken = (request.headers.get('authorization'))
    if (!bearerToken) {
        return new NextResponse('This endpoint requires bearer token');
    } else {
        const token = bearerToken?.split(' ')[1];
        let data = await verifyTokenCall(token);
        if (data.status == 'invalid') {
            return new NextResponse("Invalid Token");
        } else {
            // token is verified
            let id = parseInt(params.id);

            if (!isNaN(id)) {
                const conn = postgres({
                    ssl: require,
                });
                const tokenResult = await conn.unsafe(`SELECT clientId FROM clients where token = '${token}'`);
                let clientId = +tokenResult[0]["clientid"];


                const result = await conn.unsafe(`SELECT * FROM orders WHERE orderid = ${id} AND clientId = ${clientId}`);
                if (result.length > 0) {
                    const result = await conn.unsafe(`DELETE FROM orders WHERE orderid = ${id} AND clientId = ${clientId}`);
                    return new NextResponse("Deleted");
                } else {
                    return new NextResponse(JSON.stringify({
                        error: `No order with id ${id}`
                    }));
                }
            } else {
                return new NextResponse(JSON.stringify({
                    error: `Invalid id ${id}`
                }));
            }
        }
    }

}


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    let bearerToken = (request.headers.get('authorization'))
    if (!bearerToken) {
        return new NextResponse('This endpoint requires bearer token');
    } else {
        const token = bearerToken?.split(' ')[1];
        let data = await verifyTokenCall(token);
        if (data.status == 'invalid') {
            return new NextResponse("Invalid Token");
        } else {
            // token is verified
            let id = parseInt(params.id);

            if (!isNaN(id)) {
                const req = await request.json();

                if (req.customerName) {
                    const conn = postgres({
                        ssl: require,
                    });
                    const tokenResult = await conn.unsafe(`SELECT clientId FROM clients where token = '${token}'`);
                    let clientId = +tokenResult[0]["clientid"];

                    const result = await conn.unsafe(`SELECT * FROM orders WHERE orderid = ${id} AND clientId = ${clientId}`);

                    if (result.length > 0) {
                        const result = await conn.unsafe(`UPDATE orders SET customerName = '${req.customerName}' WHERE orderid = ${id} AND clientId = ${clientId}`);
                        return new NextResponse("Updated");
                    } else {
                        return new NextResponse(JSON.stringify({
                            error: `No order with id ${id}`
                        }));
                    }

                } else {
                    return new NextResponse('Please include customerName in the POST request');
                }

            } else {
                return new NextResponse(JSON.stringify({
                    error: `Invalid id ${id}`
                }));
            }
        }
    }
}