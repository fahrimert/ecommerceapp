"use server"
import { ProductFormValues } from "@/app/(routes)/products/[productId]/components/ProductAddForm";
import prismadb from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

type items  = {
        
   reOrderedCards: Array<
   {
    id: string;
    categoryId: string;
    order: number;
    name: string;
    price: Decimal;
    isFeatured: boolean;
    isArchived: boolean;
    colorId: string;
    createdAt: Date;
    updatedAt: Date;
}>

}

export async function updateCardOrder(items:items
 
) {
    try {
          const transaction = items.reOrderedCards.map((product) => 
        
            prismadb.product.update({
                where:{
                    id:product.id

                },
                data:{
                    order:product.order,
                    categoryId:product.categoryId                }
            })
        )
        const updatedCards = await prismadb.$transaction(transaction)

        return  {updatedCards}
    } catch (error : string | any ) {
        return "Failed To Reorder";
    }
}
