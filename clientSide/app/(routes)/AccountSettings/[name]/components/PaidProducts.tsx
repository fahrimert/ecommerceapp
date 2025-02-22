"use client"

import { AccordionContentPaid, AccordionItemPaid, AccordionPaid, AccordionTriggerPaid } from "./AccordionOfPaidAndUnpaid";
import PaidProductContent from "./PaidProductContent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Cart, delAllItem } from "@/app/actions/add-to-card";


interface UnPaidProducts {
  formattedPaidProducts: {
    id: string;
    isPaid: boolean;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    orderItems: {
        id: string;
        orderId: string;
        productId: string;
        product:  {
          id: string;
          categoryId: string;
          images: {
              id: string;
              productId: string;
              url: string;
              createdAt: Date;
              updatedAt: Date;
          }[];
          order: number;
          name: string;
          quantity: number
          price: string;
          isFeatured: Boolean;
          isArchived: Boolean;
          createdAt: Date;
          updatedAt: Date;
      }
    }[];
  }[] | undefined
    

    session:{
      id: string;
      name: string | null;
      email: string;
      emailVerified: Date | null;
      image: string | null;
      password: string | null;
      createdAt: Date;
      updatedAt: Date;
  } | null| null
}
const PaidProducts :React.FC<UnPaidProducts>= ({formattedPaidProducts,session}) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const order = searchParams.get('order')?.split("-") as string[]

    const id = session?.id
          if (order && order[0] ==    'success' ) {
            toast.success('Ödemeniz Başarıyla Alındı.', {
                style: {
                  border: '1px solid black z-10 ',
                },
              });
              
                            delAllItem(id!)
                            // perform this inside function call or button click etc
                            router.replace('http://localhost:3001/AccountSettings/orders')
                            /* buraya ortada gelecek şekilde buton lazım  */
          }

          
        } ,[router,searchParams,session?.id])
    const totalPrice = formattedPaidProducts?.map((a) =>a.orderItems.map((b) => b.product).reduce((total,item) => {
        return total + Number(item.price.replace(/[^0-9.-]+/g,""))
      },0))[0]
    
    
    return (

    <>
    {formattedPaidProducts?.map((item) => 
    
    <AccordionPaid key={item.id} type="single" collapsible className=" w-full">
  <AccordionItemPaid value={item.id}>
    <AccordionTriggerPaid>
        <div className=" w-full h-full flex flex-col justify-start items-start">

         <div className=" w-full h-full flex flex-row justify-between">
            <h2>

        Sipariş No:{item.id}
            </h2>
         
        </div>
        {item.createdAt.toString()}
        <div></div>
        </div>
       </AccordionTriggerPaid>
    <AccordionContentPaid>
        {item.orderItems.map((a) => 
        
    <PaidProductContent key={a.id} a={a} totalPrice = {totalPrice} />
        )}
    <h2 className="relative w-full h-fit text-[16px] text-black">
        Total Ödenen Tutar : {totalPrice}  
        </h2>
        {/* burda bakiyeni kapatmak için butonu var seni tokena atıp ödemeyi tamamlayabilme imkanı sunuyor  */}
            </AccordionContentPaid>
  </AccordionItemPaid>
</AccordionPaid>
    
    )}
    </>
  )
}

export default PaidProducts