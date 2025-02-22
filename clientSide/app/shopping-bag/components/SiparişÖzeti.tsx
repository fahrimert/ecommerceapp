"use client"
import { Button } from "@/components/ui/button"

import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import {
  Form,

} from "@/components/ui/form"
import { Cart } from "@/app/actions/add-to-card"
interface BagProps{
  cart :Cart |null
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

  //burda kaldım 
const SiparişÖzeti:React.FC<BagProps> = ({cart,session}) => {
  const items = cart?.items
  const totalPrice = items?.reduce((total,item) => {
    return total + Number(item.price.replace(/[^0-9.-]+/g,""))*item.quantity
  },0)
  const router = useRouter()
  const  productIds = items?.map((item) => item.id)
  
  const form = useForm()
  /* burda useeffectle eğer searchparams ödemeden sonra success yazdırırsa karttaki itemları siliyor yazdırmazsa false diyor  */
  function onSubmit(values:any) {
    if (!productIds || productIds.length === 0 ) {
      toast.error('Sepette Ürün Yok')
    }
    if (session !== null) {
      router.push(`/payment`) 

    }
    else{
      
      toast.success("Unauthenticted")
    }
 
 }
 console.log(cart?.items);
  /* burda checkoutla alakalı birşey yapıyor biz bunu databaseyle falan yapıcaz  */
    return (
    <div className="relative w-full h-fit flex flex-col justify-center items-center gap-[40px] max-lg:w-[100%]">
        <div className="relative w-full h-full flex flex-col  justify-start items-center gap-[20px]">
        <div className="relative w-full h-fit flex flex-row justify-start items-center gap-[10px]">
      <h2 className="relative w-full h-fit text-[18px] text-black border-b">
       {cart?.items.length !== 0 ? `${cart?.items.length} Tane İtem Var` : "0 Tane İtem Var" } 
      </h2>
    </div>
    <div className="relative w-full h-full flex flex-col justify-start items-start gap-[10px] bg-white  ">
      <div className="relative w-full h-fit flex flex-row justify-center items-center  ">
        <h2 className="relative w-full h-fit text-[16px] text-black">
          Ürün Sayısı:
        </h2>
        <h2 className="relative w-full h-fit text-[16px] text-black ">
         {items?.length} adet ürün var
        </h2>
      </div>
      <div className="relative w-full h-fit flex flex-row justify-center items-center   ">
        <h2 className="relative w-full h-fit text-[16px] text-black">
          Genel  Fiyat Toplamı:
        </h2>
        <h2 className="relative w-full h-fit text-[16px] text-black">
        {totalPrice}  
        </h2>
      </div>
    </div>
        </div>
   
<div className="h-fit w-full">

        <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full h-full flex justify-end items-end">
      <Button variant={null} className=" w-full h-full flex  justify-start items-center  bg-gray-200 rounded-lg">
      <h2 className="relative w-full h-fit text-[16px] text-black">
        Alışverişi tamamla
      </h2>
    </Button>
      </form>
    </Form>
</div>
   
  </div>  
  

)
}

export default SiparişÖzeti