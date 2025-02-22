import prismadb from "@/lib/db"
import { NextApiResponse } from "next"
import { NextResponse } from "next/server"

export  async function GET(req:Request,res: NextApiResponse){

    try {

        const result = await prismadb.product.findMany({
            select:{
                id:true,
                category:true,
                categoryId:true,
                name:true
            }
         }) 
     
        return NextResponse.json(result,{status:200})

    } catch (error) {
     return NextResponse.json(error,{status:405})
        
    }
}

