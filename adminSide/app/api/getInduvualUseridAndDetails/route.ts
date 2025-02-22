import prismadb from "@/lib/db"
import { NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

export  async function GET(req:NextRequest,res: NextApiResponse){

    try {
      const searchParams =  req.nextUrl.searchParams
      const ıds = searchParams.get("name")
      const user = await prismadb.clientUsers.findFirst({
        where: {
          id: ıds!,
        },
        include:{
          detailOfUser:true
        }
      })
      
      const userAddress = await prismadb.clientUsers.findFirst({
        where: {
          id: ıds!,
        },
        include:{
          address:true
        }
      })
        

          return NextResponse.json({detail:user,addres:userAddress},{status:200})

    } catch (error) {
     return NextResponse.json(error,{status:405})
        
    }
}

// app/api/example/route.ts
