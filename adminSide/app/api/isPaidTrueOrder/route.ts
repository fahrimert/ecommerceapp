import prismadb from "@/lib/db"
import { Prisma } from "@prisma/client";
import { NextApiResponse } from "next"
import { NextResponse } from "next/server"

export  async function POST(req:Request,res: NextApiResponse){

    try {
        const body = await req.json();
        try {

            const a = await prismadb.order.update({
                where:{id:body.orderId } ,
                data:{
                    isPaid:true   }
                ,
                include:{
                 orderItems:true
                }
          })
       
          return new Response("OK",{status:200});

       
       
            } catch (error) {
            console.log(error);
        }

    } catch (error) {
     return NextResponse.json(error,{status:405})
    }
}

// app/api/example/route.ts
