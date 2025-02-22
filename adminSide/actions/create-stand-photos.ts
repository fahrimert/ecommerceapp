
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

export async function createStandPhotos(prevState: any,formData:FormData) {
  const {resources : files} = await cloudinary.api.resources_by_tag('StantPhotos')
  const file = formData.get('image') as File
  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)
  
      try  {
          await new Promise((resolve,reject) => {
          cloudinary.uploader.upload_stream({
            tags:['StantPhotos']
          },function(error,result){
            if ( error ) {
              reject(error);
              return;
            }
            console.log(result)
            resolve(result);
          }).end(buffer)
        }) 
      } catch (error : string | any ) {
        return { message: error.message };
      }
      return {
        data : 
       { 
           files : files.slice(0,3).map(({secure_url}) => secure_url)
        }
      }
    }