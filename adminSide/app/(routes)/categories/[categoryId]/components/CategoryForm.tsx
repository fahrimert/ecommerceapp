"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Categories, } from "@prisma/client";
import { redirect, useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { CategoryFormValuesS, updateSingleCategory } from "@/actions/categoryActions/update-category";
import { createCategory } from "@/actions/categoryActions/create-category";
import { Toaster } from 'react-hot-toast';
import Heading from "@/components/heading";
import ImageUpload from "@/components/ui/ImageUpload"
import Image from "next/image";
import ImageUploadCategory from './ImageUploadCategory'
import { Checkbox } from "@/components/ui/checkbox";
interface CategoryFormProps {
  initialData:  (
    {
      imageOfCategory: {
          id: string;
          categoryId: string;
          url: string;
          createdAt: Date;
          updatedAt: Date;
      }[];
  } & {
      id: string;
      name: string;
      order: number;
      anasayfa: boolean;
      createdAt: Date;
      updatedAt: Date;
  }| null
 )
 
 categories: ({
  imageOfCategory: {
      id: string;
      categoryId: string;
      url: string;
      createdAt: Date;
      updatedAt: Date;
  }[];
} & {
  id: string;
  name: string;
  order: number;
  anasayfa: boolean;
  createdAt: Date;
  updatedAt: Date;
})[]
}
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Kategori ismi en az 3 karakter olmalıdır.",
      }),
  anasayfa: z.boolean().default(false).optional(),
  imageOfCategory : z.object({url:z.string()}).array() ,


});

export type CategoryFormValues = z.infer<typeof formSchema>;

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData,categories }) => {


  const params = useParams();
  const router = useRouter();
  const action = initialData ? "Kaydet" : "Yarat ";
  const [loading, setLoading] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        anasayfa: initialData.anasayfa
         ,
          
        }
      : {
        name: "",
        imageOfCategory : [],


        },
  });
   const onSubmit = async (data: CategoryFormValues) => {
    try {
        addComment(data, params.categoryId);
      router.push("/categories");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full  h-fit p-[15px] rounded-[10px]  shadow-lg border-[1px] "
        >
          <div className="w-fit h-fit flex flex-col  gap-[20px]  p-[10px] ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Kategori İsmi</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      className="shadow-lg border-b-[1px] border-r-0 border-t-0 border-l-0 "
                      placeholder="Kategori İsmi"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField

control={form.control}
name = "imageOfCategory"
render = {({field}) => (
    <FormItem className=" shadow-lg h-full border-[#050505]  p-[10px] ">
       <FormLabel > Kategori İçin Fotoğraf Ekleyin</FormLabel>
       <FormControl>
           <ImageUpload
           /* burda imageleri dönüp imagelerin urllerini value yapıyoz 
           imagelerde array of stringsle çalışınca onalrı dönüp tek tek stringleri dönmemiz lazım   */
            value={field.value.map((image) => image.url)}
             disabled = {loading}
             onChange={(url) => field.onChange([...field.value,{url}])}/* burda existing valueya urli ekliyoz */
            onRemove = {(url) =>field.onChange([...field.value.filter((current) => current.url !== url)])}
           /* on removeda direk işte silme mevzusunu yapıyoz removladığımız dışındaki listeyi dönüyor  */
           />
           
       </FormControl>
       <FormMessage/>
   </FormItem>
   
)}
/>
                   
                   <FormField
                control={form.control}
                name="anasayfa"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  shadow-lg border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        /* alttakini yazınca burda hata vardı onu */
                        //@ts-ignore
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-black">Ana Sayfa için Vitrin Etiketi</FormLabel>
                      <FormDescription>
                        Kategori Ana Sayfadaki Vitrinde Sergilenecek
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
             
          </div>

 


          <Button  variant={null}   disabled={loading} className=" w-fit border-[2px]  my-[10px] rounded-xl  text-white h-[35px] bg-black" type="submit">
            {action}
          </Button>
        </form>
        <Toaster />

      </Form>
    </>
  );
};

export default CategoryForm;
