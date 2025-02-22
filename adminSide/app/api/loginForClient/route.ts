import prismadb from "@/lib/db"
import { Prisma } from "@prisma/client";
import { NextApiResponse } from "next"
import { NextResponse } from "next/server"

export  async function POST(req:Request,res: NextApiResponse){

    try {
        const body = await req.json();
        try {
            const user = await prismadb.clientUsers.create({
                data:{
                  email:body.email,
                  password:body.password,
                }
              })
       
    return new Response("OK",{status:200});
       
       
            } catch (error) {
            console.log(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
      return new Response("Aynı email ile bir başka kullanıcı daha bulunmaktadır.", { status: 401 });
                
                }}
        }

    } catch (error) {
     return NextResponse.json(error,{status:405})
    }
}

// app/api/example/route.ts
