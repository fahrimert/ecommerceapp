"use server"
import prismadb from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
  cloud_name: "dwc8t3zdl", 
  api_key: '613169413286462', 
  api_secret: '8n34s1_Ng6iVrkanVfGUAnoUTdk'
});

export async function getResources() {

    const {resources : files} = await cloudinary.api.resources_by_tag('BirinciInceleyınArray')
        try  {
return files.slice(0,3).map(({secure_url}) => secure_url)
        } catch (error : string | any ) {
          return error.message ;
        }
   }        