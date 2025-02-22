"use server"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { AddressFormValues } from "../(routes)/AccountSettings/components/AddressSettings"
import { redirect } from "next/navigation"
import { getJustSession } from "@/helpers/get-user-session"
import axios from "axios"



export async function createComment(id:string,comment:string,ids:string) {

    try {    
        await axios.post('http://localhost:3000/api/createComment',{userId:id,productId:ids,comment:comment})

      
    } catch (error : string | any ) {
        return { message: error.message };
    }
  
    

}
