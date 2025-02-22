"use server"
import { CategoryFormValues } from "@/app/(routes)/categories/[categoryId]/components/CategoryForm";
import { ProductFormValues } from "@/app/(routes)/products/[productId]/components/ProductAddForm";
import prismadb from "@/lib/db"
import { ImageOfCategoryMainPage } from "@prisma/client";
import { revalidatePath } from "next/cache"
import { z } from "zod"

export type CategoryFormValuesS = {
  categoryName: string;
  imageOfMainPage: ImageOfCategoryMainPage[];
}

export async function updateSingleCategory(data:CategoryFormValues ,categoryId:any
) {
    try {
      
      await prismadb.categories.update({
        where: {
            id: categoryId
        },
        data: {
          name: data.name,
          anasayfa:data.anasayfa,
          imageOfCategory:{
            deleteMany:{}
          },
           
        }
    });
    await prismadb.categories.update({
      where: {
          id: categoryId
      },
      data: {
         
        imageOfCategory:{
          createMany:{
            data:[
              ...data.imageOfCategory.map((image:{url:string}) => image)
            ]
          }
        },
            
      },
      include: {
          imageOfCategory: true
      }
  });


        revalidatePath(`/categories/${categoryId}`);
    } catch (error : string | any ) {
        return { message: error.message };
    }
}
