import prismadb from "@/lib/db"
import { Prisma } from "@prisma/client";
import { NextApiResponse } from "next"
import { NextResponse } from "next/server"

export  async function POST(req:Request,res: NextApiResponse){

    try {
        const body = await req.json();
        try {

            // 🟢 Sipariş oluştur
                console.log(body);
                const order = await prismadb.order.create({
                    data: {
                        isPaid: false,
                        madePersonsId:body.madePersonsId,
                        orderItems: {
                            create: body.productIds.map((item) => ({
                                product: {
                                    connect: {
                                        id: item,
                                    },
                                },
                            }))
                        }
                    }
                });

       
       
    return NextResponse.json({order},{status:200});
       
       
            } catch (error) {
            console.log(error);
        }

    } catch (error) {
     return NextResponse.json(error,{status:405})
    }
}

// app/api/example/route.ts
