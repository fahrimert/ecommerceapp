
'use client'
import React from 'react'
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from "zod"
import validator from "validator";
import { zodResolver } from "@hookform/resolvers/zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useForm } from "react-hook-form"
import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image";
import { X } from "lucide-react";
import {  delItem } from "@/app/actions/add-to-card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Select } from "@/components/ui/select";
import { notFound, usePathname, useRouter} from 'next/navigation';
import { countyandcities } from '@/app/(routes)/AccountSettings/components/cityandcounties';
import toast from 'react-hot-toast';
import { Separator } from '@/components/ui/separator';
import { Cart } from '@/app/actions/add-to-card';
import Link from 'next/link';
import { getJustAddresss } from '@/helpers/get-user-session';
import { Decimal } from '@prisma/client/runtime/library';


  const countries = [
    
  {value: 'Turkey', label: 'TR'}, 

  ]
  
  
  const firstFormSchema = z.object({
   
    addressId:z.string().min(1,{
        message:"En Az Bir Adres Seçilmeli"
    }),
  
})    

  const secondFormSchema = z.object({
   
    addressTitle:z.string().min(1,{
        message:"Adress Name must be at least 1 character"
    }),
    BuyerName:z.string().min(1,{
        message:"orderingPersonname must be at least 1 character"
    }),
    BuyerNumber:  z.string().refine(validator.isMobilePhone),
    AddressDescription: z.string().min(10),
    country: z.string().min(2),
    county : z.string().min(2),
   zipcode : z.string().min(2),
})    

interface BagProps{
  cart :Cart | null
  addressesdb: {
    id: string;
    addressTitle: string;
    BuyerName: string;
    BuyerNumber: number;
    AddressDescription: string;
    country: string;
    county: string;
    zipcode: number;
    addressId: string;
    createdAt: Date;
    updatedAt: Date;
}[]
  session: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
} | null
  }


const Adresses :React.FC<BagProps> = ({cart,session,addressesdb}) => {

  const Firstform = useForm<z.infer<typeof firstFormSchema>>({
    resolver:zodResolver(firstFormSchema),
    defaultValues: {
        addressId : "",
    }
  });

    const secondForm = useForm<z.infer<typeof secondFormSchema>>({
        resolver: zodResolver(secondFormSchema),
        defaultValues: {
            addressTitle: "Ev",
            BuyerName:"Mert",
            BuyerNumber:"05531889998",
            AddressDescription:"adqwdwqdwqqdwdwqdw",
            country: "Turkey",
            county:"Adana",
           zipcode:"213213",
        }
      })
    

    const pathname = usePathname()
    const router = useRouter()
    const items = cart?.items

    const totalPrice = cart?.items.reduce((total,item) => {
        return total + (Number(item.price.replace(/[^0-9.-]+/g, ""))*item.quantity)
      },0)
    
    if (cart?.items.length == 0) {

        throw notFound()
    } 
    else{
      
    }   
    const  firstOnSubmit  = async (values: z.infer<typeof firstFormSchema>) => {
      const address =  await getJustAddresss(values.addressId)

      const  productIds = items?.map((item) => item.id)
        
            const buyer = {
                id: 'BY789',
                name: address?.BuyerName,
                surname: address?.BuyerName,
                gsmNumber: address?.BuyerNumber,
                email: 'john.doe@example.com',
                identityNumber: '74300864791',
                lastLoginDate: '2015-10-05 12:43:35',
                registrationDate: '2013-04-21 15:12:09',
                registrationAddress: address?.addressTitle,
                ip: '85.34.78.112',
                city: address?.county,
                country: address?.country,
                 zipCode: address?.zipcode
             };
        
            const shippingAddress = {
                contactName: address?.BuyerNumber,
                city:  address?.county,
                country: address?.country,
                address: address?.addressTitle,
               zipCode: address?.zipcode
            };
        
            const billingAddress = {
                contactName: address?.BuyerNumber,
                city:  address?.county,
                country: address?.country,
                address: address?.addressTitle,
               zipCode: address?.zipcode
           };
    
           const basketItems = cart!.items.map(item=>({
            id: item.id,
            name: item.name,
            category1: item.categoryId,
            category2:item.categoryId,
            itemType: 'PHYSICAL',
            price: (Number(item.price.replace(/[^0-9.-]+/g, "")) *item.quantity)
    
          }));
           /* basketItemsin Değişmesi gerek bu arada typedan dolayı hata veriyormuş  */
     
        
            const paymentData = {
                price: totalPrice!.toString(),
                 paidPrice: totalPrice!.toString(),
                currency: 'TRY',
                basketId: 'B67832',
              buyer: buyer,
                shippingAddress: shippingAddress,
                billingAddress: billingAddress,
                basketItems: basketItems,
                productIds:productIds,
                madePersonsId:session?.id
            };
              const response  =  await axios.post('http://localhost:3002/api/payment', paymentData, {
                headers: {
                        'Content-Type': 'application/json'
                    }
                });
       
            if (response.data.status =="success") {
                    toast.success('Ödeme Sayfasına Yönlendiriliyorsunuz')
                    router.push(`https://sandbox-cpp.iyzipay.com?token=${response.data.token}&lang=tr&iframe=true`) 
                    
                }
               
               
               else{
                    toast.error(response.data.errorMessage)
                } 
          
    
              
            }
            
    
    const  secondonSubmit  = async (values: z.infer<typeof secondFormSchema>) => {
  const  productIds = items?.map((item) => item.id)
    
        const buyer = {
            id: 'BY789',
            name: values.BuyerName,
            surname: values.BuyerName,
            gsmNumber: values.BuyerNumber,
            email: 'john.doe@example.com',
            identityNumber: '74300864791',
            lastLoginDate: '2015-10-05 12:43:35',
            registrationDate: '2013-04-21 15:12:09',
            registrationAddress: values.addressTitle,
            ip: '85.34.78.112',
            city: values.county,
            country: values.country,
             zipCode: values.zipcode
         };
    
        const shippingAddress = {
            contactName: values.BuyerNumber,
            city:  values.county,
            country: values.country,
            address: values.addressTitle,
           zipCode: values.zipcode
        };
    
        const billingAddress = {
            contactName: values.BuyerNumber,
            city:  values.county,
            country: values.country,
            address: values.addressTitle,
           zipCode: values.zipcode
       };

       const basketItems = cart!.items.map(item=>({
        id: item.id,
        name: item.name,
        category1: item.categoryId,
        category2:item.categoryId,
        itemType: 'PHYSICAL',
        price: (Number(item.price.replace(/[^0-9.-]+/g, "")) *item.quantity)

      }));
       /* basketItemsin Değişmesi gerek bu arada typedan dolayı hata veriyormuş  */
 
    
        const paymentData = {
            price: totalPrice!.toString(),
             paidPrice: totalPrice!.toString(),
            currency: 'TRY',
            basketId: 'B67832',
          buyer: buyer,
            shippingAddress: shippingAddress,
            billingAddress: billingAddress,
            basketItems: basketItems,
            productIds:productIds,
            madePersonsId:session?.id
        };
          const response  =  await axios.post('http://localhost:3002/api/payment', paymentData, {
            headers: {
                    'Content-Type': 'application/json'
                }
            });
   
        if (response.data.status =="success") {
                toast.success('Ödeme Sayfasına Yönlendiriliyorsunuz')
                router.push(`https://sandbox-cpp.iyzipay.com?token=${response.data.token}&lang=tr&iframe=true`) 
                
            }
           
           
           else{
                toast.error(response.data.errorMessage)
            } 
      

          
        }
        

  return (
    <div className=' w-full  h-fit  flex flex-row items-center justify-center  '>

 
             <div className='w-[70%] h-fit flex flex-row items-start justify-center gap-[20px]'>
             <Tabs
              className="relative w-[70%] h-fit flex flex-col justify-center items-center  pt-[10px] bg-white"
              defaultValue="account"
            >
              <TabsList className="relative w-full h-fit flex flex-row justify-center items-center  pt-[10px] bg-white">
                <TabsTrigger value="adresses">Adresler</TabsTrigger>
                <TabsTrigger value="addAddress">Adres Ekle</TabsTrigger>
                
              </TabsList>

              <TabsContent
                value="adresses"
                className=" relative w-full h-fit flex flex-col items-start justify-center gap-[10px] bg-white"
              >
                     <Form {...Firstform}>
               <form onSubmit={Firstform.handleSubmit(firstOnSubmit)} className=" relative w-full h-fit flex flex-col gap-[20px]" >
                 <div className='  relative w-full h-fit flex flex-row gap-[20px] p-[10px]'>
         
            <div className=" relative w-full h-fit flex flex-row gap-[10px] items-center justify-center" >
         
         
              <div className=' w-full flex flex-col gap-[10px]'>
         <h2>Adres Bilgileri</h2>
         <Separator/>
         
             
               
                 <FormField
                   control={Firstform.control}
                   name="addressId"
                   render={({ field }) => (
                     <FormItem className=" w-fit h-full flex flex-col items-center gap-[10px]">
                       <div className='flex flex-col gap-[10px]'>

                       <FormLabel>Şehir</FormLabel>
                       <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value} >
      <SelectTrigger className="w-[180px]">
         <SelectValue  defaultValue={field.value} placeholder="Adres Seçin" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Adresler</SelectLabel>
           {addressesdb.map((c) => 
          <SelectItem key={c.id} value={c.id}>{c.addressTitle}</SelectItem>
        )}
    
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>

               
                   
                       <FormMessage />
                     </FormItem>
                   )}
                 /> 
                   <Button className=' w-fit h-fit flex items-end' type="submit">Ödeme Sayfasına Gidin</Button>  
          
              </div>
         
    
         
         
                 
                     </div>
         

         
         
         
            </div>
         
         
                 
               </form>
             </Form>
            
    {/* bu kısımda kaldım  */}
            <div className='w-full h-fit grid grid-cols-2'>
{addressesdb.map((g,z) => (
  <>
    <div className='w-full h-fit flex flex-col p-[10px] gap-[5px] shadow-lg'>
  <div className='flex flex-row items items-center gap-[5px]'>
    <h2 className='text-[18px]'>Adres Etiketi :</h2>
    <h2 className='text-[18px]'>{g.addressTitle}</h2>

  </div>
    <Separator/>

    <h2 className='text-[16px] text-black'>Adres Tanımı </h2>
    <h2 className='text-[14px]'>{g.AddressDescription}</h2>
    <Separator/>

    <h2 className='text-[16px] text-black'>Alan Kişi </h2>

    <h2 className='text-[14px]'>{g.BuyerName}</h2>
    <Separator/>

    <h2 className='text-[16px] text-black'>Ülke:</h2>

    <h2 className='text-[14px]'>{g.country}</h2>
    <Separator/>
    <h2 className='text-[16px] text-black'>İlçesi:</h2>

    <h2 className='text-[14px]'>{g.county}</h2>
    <Separator/>

    <h2 className='text-[16px] text-black'>Alan Kişinin Numara:</h2>

    <h2 className='text-[14px]'>{g.BuyerNumber}</h2>
    <Separator/>
    </div>
  </>

)


)}
       
            </div>
              </TabsContent>
              <TabsContent
                value="addAddress"
                className=" relative w-full h-fit flex flex-col items-start justify-center gap-[10px] bg-white"
              >
                 <Form {...secondForm}>
               <form onSubmit={secondForm.handleSubmit(secondonSubmit)} className=" relative w-full h-fit flex flex-col gap-[20px]" >
                 <div className='  relative w-full h-fit flex flex-row gap-[20px] p-[10px]'>
         
            <div className=" relative w-full h-fit flex flex-row gap-[10px] items-center justify-center" >
         
         
              <div className=' w-full flex flex-col gap-[10px]'>
         <h2>Adres Bilgileri</h2>
         <Separator/>
         
                <FormField
                   control={secondForm.control}
                   name="addressTitle"
                   render={({ field }) => (
                     <FormItem className=" w-full h-full">
                       <FormLabel>Adres Başlığı</FormLabel>
                       <FormControl>
                         <Input placeholder="Adres Başlığı" {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                 <FormField
                   control={secondForm.control}
                   name="BuyerName"
                   render={({ field }) => (
                     <FormItem className=" w-full h-full">
                       <FormLabel>Sipariş Veren Kişinin İsmi</FormLabel>
                       <FormControl>
                         <Input placeholder="Sipariş Veren Kişinin İsmi" {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                  <FormField
                   control={secondForm.control}
                   name="BuyerNumber"
                   render={({ field }) => (
                     <FormItem className=" w-full h-full">
                       <FormLabel>Sipariş Veren Kişinin Numarası</FormLabel>
                       <FormControl>
                         <Input placeholder="Sipariş Veren Kişinin Numarası" {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                  <FormField
                   control={secondForm.control}
                   name="AddressDescription"
                   render={({ field }) => (
                     <FormItem className=" w-full h-full">
                       <FormLabel>Adres Tanımlaması</FormLabel>
                       <FormControl>
                         <Input placeholder="İlçe , Mahalle, sokak, cadde ve diğer bilgilerinizi giriniz" {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                
                 <FormField
                   control={secondForm.control}
                   name="country"
                   render={({ field }) => (
                     <FormItem className=" w-full h-full">
                       <FormLabel>Ülkeniz</FormLabel>
                       <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                             <FormControl>
                                 <SelectTrigger >
                                 <SelectValue defaultValue={field.value} placeholder = "Ülke Seçiniz">
         
                                 </SelectValue>
                                 </SelectTrigger>
                             </FormControl>
                             <SelectContent>
                                  {countries.map((country) => (
                                     <SelectItem
                                     key={country.label}
                                     value={country.value}>
                                         {country.value}
                                     </SelectItem>
                                  ))}
                             </SelectContent>
                                </Select>
                   
                       <FormMessage />
                     </FormItem>
                   )}
                 />
               
                 <FormField
                   control={secondForm.control}
                   name="county"
                   render={({ field }) => (
                     <FormItem className=" w-full h-full">
                       <FormLabel>Şehir</FormLabel>
                       <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                             <FormControl>
                                 <SelectTrigger >
                                 <SelectValue defaultValue={field.value} placeholder = "Şehir Seçiniz">
         
                                 </SelectValue>
                                 </SelectTrigger>
                             </FormControl>
                             <SelectContent>
                                  {countyandcities.map((cities) => (
                                     <SelectItem
                                     key={cities.text}
                                     value={cities.text}>
                                         {cities.text}
                                     </SelectItem>
                                  ))}
                             </SelectContent>
                                </Select>
                   
                       <FormMessage />
                     </FormItem>
                   )}
                 /> 
                   <FormField
                   control={secondForm.control}
                   name="zipcode"
                   render={({ field }) => (
                     <FormItem className=" w-full h-full">
                       <FormLabel>Zıp Code</FormLabel>
                       <FormControl>
                         <Input placeholder="shadcn" {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
              </div>
         
    
         
         
                 
                     </div>
         

         
         
         
            </div>
         
         
                 
                 <Button className=' w-fit' type="submit">Ödeme Sayfasına Gidin</Button>
               </form>
             </Form>
             
              </TabsContent>

       
            </Tabs>
            <div className='w-full h-full border shadow-lg'>
           <div className="w-full h-fit flex flex-col p-[20px]">
              <h2 className="text-[24px] ">
              Kart:  {cart?.items.length} item
              </h2>
              <Separator/>
              </div>
                     <ScrollArea className="h-[400px] w-full rounded-md  p-4">
          <div className="flex flex-col w-full h-full gap-[20px]">
            {cart?.items.map((d) => (

            <div key={d.id} className=" flex flex-row w-full h-fit gap-[20px]">
              <Image width={200} height={200} className="w-[200px] h-[200px]" src={d.images[0].url} alt={d.id}/>
              <div className=" flex flex-col w-full h-[200px] justify-between p-[10px]">
                <div className="w-full h-full flex flex-col justify-start items-start">
                  <h2 className="text-black text-[18px]">{d.name}</h2>
                  <h2 className="text-black text-[18px]">Sepetteki Sayısı:{d.quantity}</h2>
                </div>
                <div className="w-full h-full justify-between items-end flex ">
                  <h2 className="text-black text-[18px]" >Fiyatı:      {Number(d.price ) * d.quantity}  </h2>
                  <Button  onClick={() => {
          delItem(d.id!,d.id,pathname)

                  }} className="relative w-fit h-fit text-[16px] flex items-center justify-center " variant={null} >
 
 <h2 className="relative w-fit h-fit text-[16px] flex items-center justify-center">
 <X/>
 </h2>
 </Button>
                </div>
              </div>
              
            </div>
            ))}

          </div>
</ScrollArea>
<div className='w-full h-fit flex justify-end items-end p-[20px] rounded-[15px]'>

          <Link href={'/shopping-bag'} className="relative w-fit h-[50px] bg-[#0c0c0c] text-white text-[16px] flex items-center justify-center  p-[20px] rounded-[15px] "  >
 
 <h2 className="relative w-full h-full text-[16px] flex items-center justify-center">
 Sepete Geri Dön
 </h2>
 </Link>
 </div>
         
</div>  
         
         
                 
              
         
         
         
             </div>
             
               
    
     


    
    </div>
  )
}

export default Adresses