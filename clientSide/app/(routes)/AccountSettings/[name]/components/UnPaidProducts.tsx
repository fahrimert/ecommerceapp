'use client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { AccordionContentPaid, AccordionItemPaid, AccordionPaid, AccordionTriggerPaid } from "./AccordionOfPaidAndUnpaid";
import UnPaidProductContent from "./UnPaidProductContent";
import { format } from "util";

interface UnPaidProducts {

  formattedUnPaidProducts: {
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
          price: string;
          isFeatured: Boolean;
          isArchived: Boolean;
          createdAt: Date;
          updatedAt: Date;
      }
    }[];
  }[] | undefined
}
const UnPaidProducts :React.FC<UnPaidProducts>= ({formattedUnPaidProducts}) => {
    const totalPrice = formattedUnPaidProducts?.map((a) =>a.orderItems.map((b) => b.product).reduce((total,item) => {
        return total + Number(item.price.replace(/[^0-9.-]+/g,""))
      },0))[0]
    return (

    <>
    {formattedUnPaidProducts?.map((item) => 
    
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
        
    <UnPaidProductContent key={a.id} a={a} />
        )}
    <h2 className="relative w-full h-fit text-[16px] text-black">
        Total Ödenmeyen Tutar : {totalPrice} 
        </h2>
        {/* burda bakiyeni kapatmak için butonu var seni tokena atıp ödemeyi tamamlayabilme imkanı sunuyor  */}
            </AccordionContentPaid>
  </AccordionItemPaid>
</AccordionPaid>
    
    )}
    </>
  )
}

export default UnPaidProducts