"use server"
import { ProductFormValues } from "@/app/(routes)/products/[productId]/components/ProductAddForm";
import prismadb from "@/lib/db"
import { CategoryName, Image, Product } from "@prisma/client";
import { revalidatePath } from "next/cache"
import { z } from "zod"

type items  = {
        
     items:  Array<{
        order: number,
        images: Image[],
        id: string,
        categoryName: string,
        createdAt: Date;
        updatedAt: Date;
        products: Product[]} >

}

export async function updateSCategoryOrder(items:items
 
) {
    try {
          const transaction = items.items.map((category) => 
        
            prismadb.categoryName.update({
                where:{
                    id:category.id,

                },
                data:{
                    order:category.order
                }
            })
        )
        const categories = await prismadb.$transaction(transaction)

        return  {categories}
    } catch (error : string | any ) {
        return "Failed To Reorder";
    }
}
