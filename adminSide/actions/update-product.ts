"use server"
import { ProductFormValues } from "@/app/(routes)/products/[productId]/components/ProductAddForm";
import prismadb from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";
import { z } from "zod"



export async function updateSingleProduct(data: ProductFormValues, productId: any) {

    
    try {


        await prismadb.product.update({
            where: {
                id: productId
            },
            data: {
                name: data.name,
                categoryId: data.categoryId,
                isFeatured: data.isFeatured,
                isArchived: data.isArchived,
                anasayfa:data.anaVitrin,
                images:{
                  deleteMany:{}
                },
                price: data.price,
                ek:data.ek,
                iadeSarti:data.iadeSarti,
                stok:data.stok
              }
        });
        await prismadb.product.update({
            where: {
                id: productId
            },
            data: {
               
              images:{
                createMany:{
                  data:[
                    ...data.images.map((image:{url:string}) => image)
                  ]
                }
              },
                  
            },
            include: {
                images: true
            }
        });
     
    } catch (error: string | any) {
        return { message: error.message };
    }
    finally{
  
      revalidatePath('/products');
      redirect('/products');
    }
      
  }
