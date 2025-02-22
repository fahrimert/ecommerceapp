"use server"
import { CategoryName } from "@prisma/client";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export default async function updateUser(sessionId:any,values:any){
 
   try {
    axios.post("http://localhost:3000/api/createUserDetailForSpesificUser",{session:sessionId,data:values})
    revalidatePath('/AccountSettings')
    redirect('/AccountSettings')
   } catch (error) {
    console.log(error);
   }
}