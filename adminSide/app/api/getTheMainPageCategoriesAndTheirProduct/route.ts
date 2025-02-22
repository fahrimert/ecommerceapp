import prismadb from "@/lib/db"
import { NextApiResponse } from "next"
import { NextResponse } from "next/server"

export  async function GET(req:Request,res: NextApiResponse){

    try {
        const anaSayfaCategories = await prismadb.categories.findMany({
            where:{
                anasayfa:true,
              },
              include:{
                products:{
                    where:{
                        anasayfa:true
                    },
                    include:{
                        images:true
                    }
                 
                 
                }
              }
          });
        
        

          return NextResponse.json(anaSayfaCategories,{status:200})

    } catch (error) {
     return NextResponse.json(error,{status:405})
        
    }
}

// app/api/example/route.ts
