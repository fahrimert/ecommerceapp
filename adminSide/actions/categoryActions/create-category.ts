"use server"
import { CategoryFormValues } from "@/app/(routes)/categories/[categoryId]/components/CategoryForm";
import { ProductFormValues } from "@/app/(routes)/products/[productId]/components/ProductAddForm";
import prismadb from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { z } from "zod"

import { Toaster } from 'react-hot-toast';


export async function createCategory(data:CategoryFormValues) {
    try {    

      const lastList = await prismadb.categories.findFirst({
        orderBy:{order:"desc"},
        select:{order:true}
      })
      const newOrder = lastList ? lastList.order + 1 : 1
          await prismadb.categories.create({
            data:{
              name:data.name,
              anasayfa:data.anasayfa,
              order: newOrder,
              imageOfCategory:{
                createMany:{
                  data:[
                    ...data.imageOfCategory.map((image:{url:string}) => image)
                  ]
                }
              },
            
            } 
          
        })
        revalidatePath('/categories');
        redirect('categories')

    } catch (error : string | any ) {
        return { message: error.message };
    }
    

}
