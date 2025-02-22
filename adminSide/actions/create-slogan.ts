"use server"
import prismadb from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"


const sloganSchema= z.object({
  sloganName: z.string({
    required_error : 'Slogan İs Required'
  }).min(3,{message:'Minimum 3 Letters'}),
})


export async function createslogan(prevState: any,formData:FormData) {
  const validatedFields = sloganSchema.safeParse({
    sloganName: formData.get('sloganName'),
  })
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields.",
    }}
    try {
          await prismadb.slogan.create({
            data: validatedFields.data as { sloganName: string }
        });
    } catch (error : string | any ) {
        return { message: error.message };
    }
    revalidatePath('settings/new')
}
