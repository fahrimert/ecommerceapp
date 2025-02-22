"use client"
import { z } from "zod"
import validator from "validator";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select";
import { countyandcities } from "./cityandcounties";
import { createAddress } from "@/app/actions/create-address";
import toast from "react-hot-toast";
interface AddressSettings {
  formattedAddress: {
    id: string | undefined;
    name: string | null | undefined;
    email: string | undefined;
    emailVerified: Date | null | undefined;
    image: string | null | undefined;
    password: string | null | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    addres: {
      id: string;
      addressTitle: string;
      BuyerName: string;
      BuyerNumber: string;
      AddressDescription: string;
      country: string;
      county: string;
      zipcode: string;
      addressId: string;
      createdAt: Date;
      updatedAt: Date;
  }[] | undefined
}
}
  const educationSıtuatıons = [
    {value:"İlkÖğretim",label:"İlkÖğretim"},
    {value:"Lise",label:"Lise"},
    {value:"ÖnLisans",label:"ÖnLisans"},
    {value:"Lisans",label:"Lisans"},
    {value:"Yüksek Lisans",label:"Yüksek Lisans"},
    {value:"Doktora",label:"Doktora"},
  ]
  const countries = [
  
  {value: 'Turkey', label: 'TR'}, 
  
  ]  

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

export type AddressFormValues = z.infer<typeof secondFormSchema>

const AddressSettings:React.FC<AddressSettings> = ({formattedAddress}) => {
    const secondForm = useForm<z.infer<typeof secondFormSchema>>({
        resolver: zodResolver(secondFormSchema),
        defaultValues: {
          addressTitle: "",
          BuyerName:"",
          BuyerNumber:"",
          AddressDescription:"",
          country: "",
        county:"",
         zipcode:"",
        },
      })
      function secondonSubmit(values:  z.infer<typeof secondFormSchema>) {
      try {
        createAddress(values)      
        toast('Adres Başarıyla Kuruldu')
        
      } catch (error) {
        toast.error("Error")
      }
}
  return (
  <>
  <h2 className="relative w-fit h-fit text-[28px] leading-[36px]">
    Adres Ayarları
</h2>

<Form {...secondForm}>
      <form onSubmit={secondForm.handleSubmit(secondonSubmit)} className=" relative w-full h-fit grid grid-cols-2 grid-rows-4 gap-[10px]" >
   
        <FormField
          control={secondForm.control}
          name="addressTitle"
          render={({ field }) => (
            <FormItem className=" w-full h-full">
              <FormLabel>Adres Başlığı</FormLabel>
              <FormControl>
                <Input placeholder={formattedAddress?.addres?.map((item) =>item.addressTitle).slice(-1)[0]} {...field} />
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
                <Input placeholder={formattedAddress?.addres?.map((item) =>item.BuyerName).slice(-1)[0]} {...field} />
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
                <Input  placeholder={formattedAddress?.addres?.map((item) =>item.BuyerNumber).slice(-1)[0]}  {...field} />
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
                <Input placeholder={formattedAddress?.addres?.map((item) =>item.AddressDescription).slice(-1)[0]}   {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Ekle</Button>
      </form>
    </Form>
  </>
  )
}

export default AddressSettings