"use server"
import { LoginFormState, LoginSchema } from "@/schema"
import bcrypt from "bcrypt";
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { encrypt } from "@/lib/lib"
import { cookies } from "next/headers"

export const  login = async(state: LoginFormState, formData: FormData) => {
    const validatedFields = LoginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
      });
      if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        };
      }
   
            const {email,password} = validatedFields.data
             const basedUserDB = await fetch(`http://localhost:3000/api/getInduvualUserByEmail?name=${validatedFields.data.email}`)
             const basedUser =  await basedUserDB.json() as 
             {
              id: string;
              name: string | null;
              email: string;
              emailVerified: Date | null;
              image: string | null;
              password: string | null;
              createdAt: Date;
              updatedAt: Date;
          } | null
             const pswdvalid = await bcrypt.compare(
              validatedFields.data?.password,
              basedUser!.password!
            );
            if (pswdvalid == false) {
              return {
                serverError: "Şifreniz Veya Emailiniz Eksik Gİrilmiştir",
              };
            }

            try {
              if (pswdvalid) {
                const expires = new Date(Date.now() + 500 * 1000);
                const session = await encrypt({ basedUser});
                cookies().set("session", session, { expires, httpOnly: true });
              }
          
              
               
            }
            catch (error) {
                console.log(error);
                return {
                    serverError: "Bir Sorun Oluştu   ",
                  };
            }
            finally{
              revalidatePath('/')
              redirect('/')
            }
}