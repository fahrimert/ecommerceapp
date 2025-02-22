"use server"

import bcrypt from "bcrypt"
import {RegisterFormState, RegisterSchema } from "@/schema"
import axios from "axios"


export const  register = async(stateRegister:RegisterFormState,
  formData: FormData

) => {
    
  const validatedFields = RegisterSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  try {
    
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

      const {email,password} = validatedFields.data
      const hashedPassword =await bcrypt.hash(password,10)

      const user = await axios.post("http://localhost:3000/api/createUsersForClient",{email:email,password:hashedPassword})
      
      if (user.status == 200) {
        
        if (validatedFields.success) {
          return {
            serverSuccessw: "Kullanıcı Başarıyla kayıt edildi",
          };
        }
      }
      if (user.status == 401) {
        return {
          serverErrorForRegister:"Aynı email ile bir başka kullanıcı daha bulunmaktadır.",
        };
      }
        
  } catch (error) {
        return { 
          serverErrorForRegister:"Server İle Alakalı Error Var kullanıcı kayıt edilemedi bir daha deneyiniz ",
        };
      }
}