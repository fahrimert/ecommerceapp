import prismadb from "@/lib/db"
import { Prisma } from "@prisma/client";
import { NextApiResponse } from "next"
import { NextResponse } from "next/server"

export  async function POST(req:Request,res: NextApiResponse){

    try {
        const body = await req.json();
        const session = body.session as {
            id: string;
            name: string | null;
            email: string;
            emailVerified: Date | null;
            image: string | null;
            password: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null
        const data = body.data as  {
            name: string;
            email: string;
            educationsituation: string;
            surname: string;
            phone: string;
            occupation: string;
        }
        /* burda kaldık */
        const user = await prismadb.clientUsers.update({
            where:{
              id: session?.id
            },
            data:{
              email:data.email,
              name:data.name,
              detailOfUser:{
                create:{
                  educationsituation:data.educationsituation,
                  surname:data.surname,
                  phone:data.phone,
                  occupation:data.occupation,
                }
              }
              
    
              
            }
          },
    
        )
    return new Response("OK",{status:200});
       
       
    } catch (error) {
     return NextResponse.json(error,{status:405})
    }
}

// app/api/example/route.ts
