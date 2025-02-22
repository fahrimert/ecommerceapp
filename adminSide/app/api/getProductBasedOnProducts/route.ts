import prismadb from "@/lib/db"
import { NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

export  async function GET(req:NextRequest,res: NextApiResponse){

    try {
        const searchParams =  req.nextUrl.searchParams
        const categoryNamee = searchParams.get("name")
        const products = await prismadb.categories.findUnique({
            where: {
              id: categoryNamee!,
            },
            include: {
              products: {
                include: {
                  images: true,
                },
              },
            },
          });
          console.log(products);
        return NextResponse.json(products,{status:200})

    } catch (error) {
     return NextResponse.json(error,{status:405})
        
    }
}

// app/api/example/route.ts
