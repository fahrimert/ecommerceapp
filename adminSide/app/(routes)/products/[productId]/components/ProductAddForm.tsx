"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import {Categories, Image, Product } from "@prisma/client"
import { Trash } from "lucide-react";
import { redirect, useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {string, z} from "zod";
import ImageUpload from "@/components/ui/ImageUpload"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Heading from "@/components/heading";
import prismadb from "@/lib/db";
import { createProduct } from "@/actions/create-product";
import { updateSingleProduct } from "@/actions/update-product";
import { deleteProduct } from "@/actions/delete-product";
import { AlertModal } from "@/components/modals/alert-modal";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
interface ProductFormProps{
    initialData:Product & {
        images : Image[]
    } | null;
    categories:Categories[]
}

const formSchema = z.object({
    name:z.string().min(1,{
        message:"Name must be at least 1 character"
    }),
    price:z.coerce.number().min(1),
    ek:z.array(z.object({
        key: z.string().min(1),
        value: z.string().min(1),
      })).optional(),
    iadeSarti:z.string().min(1),
    anaVitrin: z.boolean().default(false).optional(),

    stok:z.coerce.number().min(1),
    images : z.object({url:z.string()}).array() ,
    categoryId:z.string().min(1),

    isFeatured:z.boolean().default(false).optional(),
    isArchived:z.boolean().default(false).optional()
})



export type ProductFormValues = z.infer<typeof formSchema>


const ProductForm:React.FC<ProductFormProps> = ({
    initialData,
    categories,
}) => {

    const params = useParams()
    const router = useRouter()
    const title = initialData ? "Ürün Güncelle" :"Ürün Ekle"
    const description= initialData ? "Ürünlerinizi Güncelleyin" :"Yeni Ürünler Ekleyin"
    const action = initialData ? "Güncelle" :"Ekle "

    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const form = useForm<ProductFormValues>({
    resolver:zodResolver(formSchema),
    defaultValues:initialData ? {
        ...initialData,
        price:parseFloat(String(initialData?.price)),
    }: {
        name : "",
        images : [],
        ek: [],
        iadeSarti:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis harum ut libero! Maxime provident temporibus ut aliquid eveniet asperiores harum numquam praesentium quam, incidunt ipsa unde explicabo, tenetur ullam assumenda eligendi, beatae quaerat reiciendis eius saepe hic laborum. Praesentium, minima! Cumque ipsa aspernatur a vitae quaerat eius exercitationem ut quo est rem, possimus reprehenderit saepe aliquam error officia earum dolor cum accusamus excepturi cupiditate odio nulla incidunt itaque fugit. Quasi nihil illum veritatis doloremque distinctio dolore recusandae ea est aperiam cumque ab sunt vero magni dignissimos minima blanditiis vitae consectetur laborum incidunt, esse consequuntur beatae reiciendis mollitia! Molestias, alias harum.",
        anaVitrin: false,
        stok:0,
        price:0,
        categoryId:'',
        isFeatured:false,
        isArchived:false

    }
  });

  const [showGenel,setshowGenel] = useState(false)

  
  const onSubmit = async (data:ProductFormValues) => {
    
    const payload = {
        ...data,
        ek: data.ek,
      };
    try {
        if (initialData) {
            updateSingleProduct(payload,params.productId)
        }
        else{
            createProduct(data)

        }

    } catch (error) {
      console.log(error);
    }
/*     finally{
   router.push('/products')
    router.refresh()
    } */
  
  }
const onDelete = async () => {
    
    try {
        setLoading(true)
        deleteProduct(params.productId)
    } catch (error) {
console.log(error)
    }
    finally{
        setLoading(false)
        setOpen(false)
    }
    router.push('/products')
    router.refresh()
} 
const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ek", // formSchema'daki key
  });
  return (
    <>
   <AlertModal
    isOpen = {open}
    onClose={() => setOpen(false)}
    onConfirm={onDelete}
    loading = {loading}/> 
<div className="flex flex-col gap-[15px]">

    <div className="flex flex-col items-center justify-between gap-[10px]">
        <Heading
        title= {title}
        description = {description}
        />
        
    </div>
    <Separator/>
    <div className=" w-full h-fit bg-[#050505] flex flex-col p-[30px] rounded-[30px]">
   <div className=" w-full h-[100px] flex flex-row ">

      <div  className={cn(` w-full h-full  transition-all duration-150 flex justify-center items-center ` )} >
      <Button onClick={() => {setshowGenel(!showGenel)}} className="p-[15px] w-[200px] h-[50px] rounded-[30px] bg-white " variant={null}>

<h2 className="text-black">
 {showGenel ?  "Genel Özellikler" : "Ek Özellikler" }
</h2>
  </Button>


      </div>
   
   </div>
   <div className="w-full h-fit flex flex-row rounded-[30px]">

  <Form {...form} >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
         
            className={cn(`space-y-8 w-full   flex flex-col  rounded-[30px]` )} 
          >
       
<div className="w-full h-fit flex flex-row gap-[5px]">
<div className={cn(` w-full h-full flex flex-col gap-8 bg-white  p-[20px] justify-center transition-all duration-300 rounded-[30px] `)} >
<ScrollArea className=" w-full h-[500px]">


<div className = "flex flex-col  gap-8">
<h3 className=" w-full h-fit text-[24px] font-semibold">Genel Özellikler</h3>
          <h2 className="w-full h-fit text-[14px]" >Zorunlu Özellikleri Ekleyin. </h2>
    
<FormField

                 control={form.control}
                 name = "images"
                 render = {({field}) => (
                    <FormItem className=" border-[1px] border-[#050505]  p-[10px] rounded-[30px]">
                        <FormLabel className="underline"> Ürün Fotoğrafları</FormLabel>
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
                 name = "name"
                 render = {({field}) => (
                    <FormItem>
                        <FormLabel>Ürün İsmi</FormLabel>
                        <FormControl>
                            <Input disabled = {loading} placeholder="Ürün İsmi" {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
)}
/>
                <FormField
                 control={form.control}
                 name = "iadeSarti"
                 render = {({field}) => (
                    <FormItem>
                        <FormLabel>İade Şartı</FormLabel>
                        <FormControl>
                            <Input disabled = {loading} placeholder="İade Şartı Metni" {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
)}
/>
<FormField
                control={form.control}
                name="anaVitrin"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
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
                        İlan Ana Sayfadaki Vitrinde Sergilenecek
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
                <FormField
                 control={form.control}
                 name = "stok"
                 render = {({field}) => (
                    <FormItem>
                        <FormLabel>Ürünün Stokdaki Miktarı</FormLabel>
                        <FormControl>
                            <Input disabled = {loading} placeholder="15" {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
)}
/>
                <FormField
                 control={form.control}
                 name = "price"
                 render = {({field}) => (
                    <FormItem>
                        <FormLabel>Ürün Fiyatı</FormLabel>
                        <FormControl>
                            <Input type="number" disabled = {loading} placeholder="9.99" {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
)}
/>
     
              
<FormField
          /* bunu category componentından aldık  */
          control={form.control}
                 name = "categoryId"
                 render = {({field}) => (
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                       <Select disabled = {loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger >
                        <SelectValue defaultValue={field.value} placeholder = "Select A Category">

                        </SelectValue>
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-black text-white cursor-pointer">
                         {categories.map((category) => (
                            <SelectItem
                            className="cursor-pointer"
                            key={category.id}
                            value={category.id}>
                                {category.name}
                            </SelectItem>
                         ))}
                    </SelectContent>
                       </Select>
                        <FormMessage/>
                    </FormItem>
)}
/>


<FormField
                 control={form.control}
                 name = "isFeatured"
                 render = {({field}) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                        checked = {field.value}
                        /* alttakini yazınca burda hata vardı onu */
                        //@ts-ignore
                        onCheckedChange={field.onChange}/>
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                            Sitede Görüntüleme
                        </FormLabel>
                        <FormDescription>
                            Bu ürün bunu işaretlerseniz sitede gözükecek
                        </FormDescription>
                      </div>
                    </FormItem>
)}
/>
<FormField
                 control={form.control}
                 name = "isArchived"
                 render = {({field}) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                        checked = {field.value}
                        //@ts-ignore
                        onCheckedChange={field.onChange}/>
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Ürün arşivleme
                        </FormLabel>
                        <FormDescription>
                          Bu ürün bunu işaretlerseniz arşivlenecek 
                        </FormDescription>
                      </div>
                    </FormItem>
)}
/>
</div>
</ScrollArea>

</div>


<ScrollArea className=" w-full h-[550px]">
            <div className={cn(` w-full h-full flex flex-col gap-8 bg-white rounded-[30px] p-[20px] justify-start ${!showGenel == true ? "invisible opacity-0" : "visible opacity-100"} transition-all duration-300 `)}>
          
            <div className=" w-full h-fit space-y-4  max-xl:flex max-xl flex-col">
          <h3 className=" w-full h-fit text-[24px] font-semibold">Ek Özellikler</h3>
          <h2 className="w-full h-fit text-[14px]" > Eklemek İstediğiniz Ek Özellikleri Ekleyin. </h2>
    

          <div className="w-full h-fit space-y-4  flex flex-col max-xl:flex max-xl ">


          {fields.map((field, index) => (
            <div key={field.id} className=" w-full  h-fit flex flex-col gap-4 items-start max-xl:flex max-xl:flex-col">
              <div className="w-full h-fit  gap-[10px] flex flex-col">

              <FormField
                control={form.control}
                name={`ek.${index}.key`}
                
                render={({ field }) => (
                  <FormItem>
                    <div className=" flex flex-row w-full justify-between items-center">
                    <FormLabel className="w-full h-full">Özellik Adı</FormLabel>
                        <Button
                variant={null}
                type="button"

                className="bg-red-400 rounded-[15px]"
                onClick={() => remove(index)} // Özelliği silmek için
              >
                Sil
              </Button>
                      
              </div>

                    <FormControl>
                      <Input placeholder="Ek Özellik Adı" className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`ek.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Özellik İçeriği</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ek Özellik İçeriği" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>

          
            </div>
          ))}

          </div>

          <Button
            type="button"
            className=" bg-black text-white rounded-[15px]"
            variant={null}
            onClick={() =>
              append({ key: "", value: "" }) // Yeni bir özellik eklemek için
            }
            >
            Ek Özellik Ekle
          </Button>
        </div>
            </div>
            </ScrollArea>
</div>

              
              <Button disabled={loading} variant={null} className="ml-auto text-black bg-white rounded-[15px] " type="submit" >
                {action}
              </Button>
          </form>
        </Form>
   
 </div>

        
      
      </div>
</div>

    {/* bu form mevzusu da docda yazıyor böyle  */}

    
            </>
  )
}

export default ProductForm