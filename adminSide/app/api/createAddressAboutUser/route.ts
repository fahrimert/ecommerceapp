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
            addressTitle: string;
            BuyerName: string;
            BuyerNumber: string;
            AddressDescription: string;
            country: string;
            county: string;
            zipcode: string;
        }
        /* burda kaldık */
            const existingUser = await prismadb.clientUsers.update({
                where:{
                    id:session?.id
                },
                include:{
                    address:true
                },
                data:{
                    address:{
                     create:{
                        addressTitle:data.addressTitle,
                        BuyerName:data.BuyerName,
                        BuyerNumber:data.BuyerNumber,
                        AddressDescription:data.AddressDescription,
                        country:data.country,
                        county:data.county,
                        zipcode:data.zipcode,
                     }
                    }
                }
            }) 
    return new Response("OK",{status:200});
       
       
    } catch (error) {
     return NextResponse.json(error,{status:405})
    }
}

// app/api/example/route.ts
