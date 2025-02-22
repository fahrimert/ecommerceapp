"use server"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { AddressFormValues } from "../(routes)/AccountSettings/components/AddressSettings"
import { redirect } from "next/navigation"
import { getJustSession } from "@/helpers/get-user-session"
import axios from "axios"



export async function createAddress(order:any) {

    try {    
        await axios.post('http://localhost:3000/api/isPaidTrueOrder',order)

      
    } catch (error : string | any ) {
        return { message: error.message };
    }
    finally{
    revalidatePath('/AccountSettings/prders')
        redirect('/AccountSettings/orders')
    }

    

}
