"use server"
import { ProductFormValues } from "@/app/(routes)/products/[productId]/components/ProductAddForm";
import prismadb from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";
import { z } from "zod"



export async function deletecolor(colorId:any) {
    try {
          await prismadb.colors.delete({
            where:{
                id:colorId
            },
            include:{
                products:true
                }
          
        })
    } catch (error : string | any ) {
        return { message: error.message };
    }
    redirect(`/colors`);

}
