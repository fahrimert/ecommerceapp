import prismadb from "@/lib/db"
import { NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

export  async function GET(req:NextRequest,res: NextApiResponse){

    try {
      const searchParams =  req.nextUrl.searchParams
      const categoryNamee = searchParams.get("name")
        console.log(categoryNamee);
        const basedcategory = await prismadb.categories.findUnique({
            where: {
              id: categoryNamee!
            },
            select:{
              name:true
            }
          })
        
        

          return NextResponse.json(basedcategory,{status:200})

    } catch (error) {
     return NextResponse.json(error,{status:405})
        
    }
}

// app/api/example/route.ts
