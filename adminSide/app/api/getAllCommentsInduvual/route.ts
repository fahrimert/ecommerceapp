import prismadb from "@/lib/db"
import { NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

export  async function GET(req:NextRequest,res: NextApiResponse){

    try {
      const searchParams =  req.nextUrl.searchParams
      const ıds = searchParams.get("name")
      const comment = await prismadb.comments.findMany({
        where: {
          product:{
            id:ıds!
          }
          
        },
        include:{
          whomadeit:true
        }
      })
      
        

          return NextResponse.json(comment,{status:200})

    } catch (error) {
     return NextResponse.json(error,{status:405})
        
    }
}


