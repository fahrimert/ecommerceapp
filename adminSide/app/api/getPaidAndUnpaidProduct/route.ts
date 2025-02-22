import prismadb from "@/lib/db"
import { NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

export  async function GET(req:NextRequest,res: NextApiResponse){

    try {
      const searchParams =  req.nextUrl.searchParams
      const ıds = searchParams.get("name")
  const ppaidProducts = await prismadb.order.findMany({
    where: {
      isPaid:true,
      madePersonsId:ıds!
    },
    include:{
      orderItems:{
        include:{
          product:{
            include:{
              images:true,
            }
          }
        }
      } 
    }
  })


  const unPaidProducts = await prismadb.order.findMany({
    where: {
      isPaid:false,
      madePersonsId:ıds!

    },
    include:{
      orderItems:{
        include:{
          product:{
            include:{
              images:true,
            }
          }
        }
      } 
    }
  })
        return NextResponse.json({paidProducts:ppaidProducts,unPaidProducts:unPaidProducts},{status:200})

    } catch (error) {
     return NextResponse.json(error,{status:405})
        
    }
}

// app/api/example/route.ts
