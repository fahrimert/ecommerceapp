"use server"
import { ProductFormValues } from "@/app/(routes)/products/[productId]/components/ProductAddForm";
import prismadb from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";
import { z } from "zod"



export async function deleteCategory(categoryId:any) {
    try {
          await prismadb.categories.delete({
            where:{
                id:categoryId
            },
            include:{
              products:true,
              imageOfCategory:true
            }
        })
    } catch (error : string | any ) {
        return { message: error.message };
    }
    revalidatePath('/categories')
    redirect(`/categories`);

}
