"use server"
import { CategoryFormValues } from "@/app/(routes)/categories/[categoryId]/components/CategoryForm";
import { ProductFormValues } from "@/app/(routes)/products/[productId]/components/ProductAddForm";
import prismadb from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"
const colorSchema= z.object({
    colorName: z.string({
       required_error : 'Color İs Required'
     }).min(3,{message:'Minimum 3 Letters To Update'}),
     value:z.string().min(4).regex(/^#/,{
       message:'String must be a valid hex code '
   })
   })
   


export async function updateSingleColor(prevState: any,formData:FormData) {
    const validatedFields = colorSchema.safeParse({
        colorName: formData.get('colorName'),
        value: formData.get('value'),
        
       })
       const rawFormData = Object.fromEntries(formData.entries());
       const colorId = rawFormData.colorId as string
       if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: "Missing fields."
        }}

        try {
            if (validatedFields.success) {
                
            }
         if (validatedFields.success) {
                await prismadb.colors.update({
                    where:{
                        id:colorId
                    },
                  data: validatedFields.data as {colorName: string,value:string ,colorValue:string}
              })
            } 
            ;        
    } catch (error : string | any ) {
        return { message: error.message };
    }
}
