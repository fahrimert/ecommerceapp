"use server"
import prismadb from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"


type ColorsTypes  = {
    colorName:string,
    value:string
}

const colorSchema= z.object({
 colorName: z.string({
    required_error : 'Color İs Required'
  }).min(3,{message:'Minimum 3 Letters'}),
  value:z.string().min(4).regex(/^#/,{
    message:'String must be a valid hex code '
})
})


export async function createColor(prevState: any,formData:FormData) {
  const validatedFields = colorSchema.safeParse({
   colorName: formData.get('colorName'),
   value: formData.get('value'),
  })
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields."
    }}
    try {
          await prismadb.colors.create({
            data: validatedFields.data as {colorName: string,value:string ,colorValue:string}
        })
        revalidatePath('/colors');
        redirect('colors')
    } catch (error : string | any ) {
        return { message: error.message };
    }
revalidatePath('/colors')
}
