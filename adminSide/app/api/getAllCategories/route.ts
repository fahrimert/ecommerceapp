import prismadb from "@/lib/db"
import { NextApiResponse } from "next"
import { NextResponse } from "next/server"

export  async function GET(req:Request,res: NextApiResponse){

    try {
        const categories = await prismadb.categories.findMany({
            select:{
                id:true,
                name:true,
                imageOfCategory:true
              }
          });
        return NextResponse.json(categories,{status:200})

    } catch (error) {
     return NextResponse.json(error,{status:405})
        
    }
}

// app/api/example/route.ts
