"use server"
import { ProductFormValues } from "@/app/(routes)/products/[productId]/components/ProductAddForm";
import prismadb from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";
import { z } from "zod"



export async function createProduct(data:ProductFormValues) {
    try {    
       let lastCard  = await prismadb.product.findFirst({
      orderBy:{order:"desc"},
      select:{order:true}
    })
    const newOrder = lastCard ? lastCard.order + 1 :1

          await prismadb.product.create({
            data:{
              name:data.name,
              categoryId:data.categoryId,
              isFeatured:data.isFeatured,
              isArchived:data.isArchived,
              anasayfa:data.anaVitrin,
              order:newOrder,
              price:data.price,
              ek:data.ek,
              iadeSarti:data.iadeSarti,
              stok:data.stok,
              images:{
                createMany:{
                  data:[
                    ...data.images.map((image:{url:string}) => image)
                  ]
                }
              },
           
            }   
            ,
            include:{
              images:true
            }
        })
      
    } catch (error : string | any ) {
        return { message: error.message };
    }
finally{
  
  revalidatePath('/products');
  redirect('/products');
}
    

}
