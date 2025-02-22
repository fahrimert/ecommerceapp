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

const FirstİnceleyinSchema= z.object({
  sloganNameOfinceleyin: z.string({
    required_error : 'Slogan İs Required'
  }).min(3,{message:'Minimum 3 Letters Required For Name Part'}),
  detailofthispart: z.string({
    required_error : 'Detail İs Required'
  }).min(3,{message:'Minimum 3 Letters Required For Detail Part'}),
})


export async function createSecondİnceleyin(prevState: any,formData:FormData) {
  const validatedFields = FirstİnceleyinSchema.safeParse({
    sloganNameOfinceleyin: formData.get('sloganNameOfinceleyin'),
    detailofthispart: formData.get('detailofthispart'), 
  })
  const {resources : files} = await cloudinary.api.resources_by_tag('İkinciInceleyınArray')
  const file = formData.get('image') as File
  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,  
      message: "Missing fields.",
    }}
    if (validatedFields.success) {
      const file = formData.get('image') as File
      const arrayBuffer = await file.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)
      try  {

        await prismadb.secondInceleyinkismi.create({
            data:validatedFields.data

            
        })
          
          await new Promise((resolve,reject) => {
          cloudinary.uploader.upload_stream({
            tags:['İkinciInceleyınArray']
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
        data : files.slice(0,3).map(({secure_url}) => secure_url)
      }} 
  
  revalidatePath('settings/new')}        