"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { z } from "zod"
import validator from "validator";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { usePathname } from "next/navigation";

import toast from "react-hot-toast";
import updateUser from "@/app/actions/updateUserİnfos";
import { getJustSession } from "@/helpers/get-user-session";

  
  const educationSıtuatıons = [
    {value:"İlkÖğretim",label:"İlkÖğretim"},
    {value:"Lise",label:"Lise"},
    {value:"ÖnLisans",label:"ÖnLisans"},
    {value:"Lisans",label:"Lisans"},
    {value:"Yüksek Lisans",label:"Yüksek Lisans"},
    {value:"Doktora",label:"Doktora"},
  ]


  const FirstFormSchema = z.object({
    name:z.string().min(1,{
        message:"Name must be at least 1 character"
    }),
    email:z.string().min(1,{
        message:"email must be at least 1 character"
    }),
    educationsituation: z.string().min(2),
  surname:z.string().min(1,{
    message:"Surname must be at least 1 character"
}),
  phone: z.string().refine(validator.isMobilePhone),
  occupation: z.string().min(2)

})

interface AccountSettings {
  formattedDetail: {
    id: string | undefined;
    name: string | null | undefined;
    email: string | undefined;
    emailVerified: Date | null | undefined;
    image: string | null | undefined;
    password: string | null | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    detailOfUser: {
      id: string;
      educationsituation: string;
      surname: string;
      detailId: string;
      phone: string;
      occupation: string;
      createdAt: Date;
      updatedAt: Date;
  }[] | undefined
}
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
const AccountSettings:React.FC<AccountSettings>= ({formattedDetail,session}) => {
    const Firstform = useForm<z.infer<typeof FirstFormSchema>>({
        resolver: zodResolver(FirstFormSchema),
        defaultValues: {
            name: "",
            email: "",
            surname:"",
            phone:"",
            occupation:"",
            educationsituation:""
        },
      })
      /* burda kaldık  */
      const  onSubmit  = async (values: z.infer<typeof FirstFormSchema>)  => {
        updateUser(session,values)
      toast.success('User Bilgileriniz Güncellendi')
    
    }
    return (
        <>
<h2 className="relative w-fit h-fit text-[28px] leading-[36px]">
    Hesap Ayarları
</h2>

<Form {...Firstform}>
      <form onSubmit={Firstform.handleSubmit(onSubmit)}  className=" relative w-full h-fit gap-[10px]">
        <div  className=" relative w-full h-fit grid grid-cols-2 grid-rows-4 gap-[10px]" >
   
        <FormField
          control={Firstform.control}
          name="name"
          render={({ field }) => (
            <FormItem className=" w-full h-full">
              <FormLabel>İsminiz</FormLabel>
              <FormControl>
                <Input placeholder={formattedDetail?.name!} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={Firstform.control}
          name="email"
          render={({ field }) => (
            <FormItem className=" w-full h-full">
              <FormLabel>Emailiniz</FormLabel>
              <FormControl>
                <Input placeholder={formattedDetail?.email} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
   
        <FormField
          control={Firstform.control}
          name="surname"
          render={({ field }) => (
            <FormItem className=" w-full h-full">
              <FormLabel>Soyadınız</FormLabel>
              <FormControl>
                <Input placeholder={formattedDetail?.detailOfUser?.map((item) =>item.surname).slice(-1)[0]} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
     
        <FormField
          control={Firstform.control}
          name="occupation"
          render={({ field }) => (
            <FormItem className=" w-full h-full">
              <FormLabel>Meslek Durumunuz</FormLabel>
              <FormControl>
                <Input placeholder={formattedDetail?.detailOfUser?.map((item) =>item.occupation).slice(-1)[0]} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={Firstform.control}
          name="phone"
          render={({ field }) => (
            <FormItem className=" w-full h-full">
              <FormLabel>Numaranız</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={Firstform.control}
          name="educationsituation"
          render={({ field }) => (
            <FormItem className=" w-full h-full">
              <FormLabel>Eğitimin Durumunuz</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger >
                        <SelectValue defaultValue={field.value} placeholder = "Öğrenim Durumu Seçiniz">

                        </SelectValue>
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                         {educationSıtuatıons.map((educationSıtuatıon) => (
                            <SelectItem
                            key={educationSıtuatıon.label}
                            value={educationSıtuatıon.value}>
                                {educationSıtuatıon.value}
                            </SelectItem>
                         ))}
                    </SelectContent>
                       </Select>
          
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <Button type="submit">Ekle</Button>
      </form>
    </Form>
    </>
  )
}

export default AccountSettings