"use server"
import { ProductFormValues } from "@/app/(routes)/products/[productId]/components/ProductAddForm";
import prismadb from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";
import { z } from "zod"



export async function deleteProduct(productId:any) {
    try {
          await prismadb.product.delete({
            where:{
                id:productId
            },
            include:{
              images:true
            }
        })
    } catch (error : string | any ) {
        return { message: error.message };
    }
    finally{

        revalidatePath(`/products`);
    }

}
