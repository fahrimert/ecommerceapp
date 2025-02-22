import prismadb from "@/lib/db"
import { NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

export  async function GET(req:NextRequest,res: NextApiResponse){

    try {
      const searchParams =  req.nextUrl.searchParams
      const ıds = searchParams.get("name")
      const address = await prismadb.address.findUnique({
        where: {
          id: ıds!,
        },
      })
      console.log(address);
        

          return NextResponse.json(address,{status:200})

    } catch (error) {
     return NextResponse.json(error,{status:405})
        
    }
}

// app/api/example/route.ts
