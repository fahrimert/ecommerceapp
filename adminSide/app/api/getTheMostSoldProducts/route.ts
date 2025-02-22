import prismadb from "@/lib/db"
import { NextApiResponse } from "next"
import { NextResponse } from "next/server"

export  async function GET(req:Request,res: NextApiResponse){

    try {
      
  const orderItemMostPayed = await prismadb.orderItem.findMany({
    where: {
      order: {
        isPaid: true,
      },
    },
    include: {
      product: {
        include: {
          images: true,
        },
      },  
    },
  });

  let resultsc = {} as {
    [key: string]: number | undefined
  }
  
  

  const obj = [];

  for (let index = 0; index < orderItemMostPayed.length; index++) {
    const element = orderItemMostPayed[index];
    const result = element.product;

    obj.push({
      product: result,
      howManyTimes: (resultsc[element.productId ] =
        (resultsc[element.productId] || 0) + 1),
    });
  }
  console.log(obj);

        return NextResponse.json(obj,{status:200})

    } catch (error) {
     return NextResponse.json(error,{status:405})
        
    }
}

// app/api/example/route.ts
