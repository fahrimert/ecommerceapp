"use client"
import {  delItem } from "@/app/actions/add-to-card";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image, { ImageLoaderProps } from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface CartItemProps {
    data: {
        id: string;
        categoryId: string;
        order: number;
        name: string;
        price: string;
        color: {
          id: string;
          colorName: string;
          value: string;
          createdAt: Date;
          updatedAt: Date;
      } | undefined,
      images: {
          id: string;
          productId: string;
          url: string;
          createdAt: Date;
          updatedAt: Date;
      }[] ,
        isFeatured: boolean;
        isArchived: boolean;
        colorId: string;
        createdAt: Date;
        updatedAt: Date;
        quantity:number
    }
}

const CartItem : React.FC<CartItemProps> = ({data}) => {
  const session = useSession()
  const id = session.data?.user?.id
  const pathname = usePathname()
   const onRemove = () => {
        delItem(id!,data.id,pathname)
    }   
    const [quantity,setQuantity] = useState(0)
    const handlePlusQuantity = () => {
      setQuantity(quantity + 1)
    }
      /* miktarda seçtiğimiz zaman carttaki itemin pricecisini güncelleyebilir */
  return (
    <div className="relative w-full h-fit flex flex-row justify-between items-center bg-white">
              <div className=" relative w-full h-full flex flex-row justify-start items-center gap-[10px]">
                <div className=" w-[75px] h-full bg-black">
                <Image src={data?.images?.map((item) => item.url)[0]} alt="232" className="w-[75px] h-full  object-cover" width={75} height={75}   objectPosition="center"/></div>
                <div className=" relative w-fit h-full flex flex-col justify-center items-start gap-[10px]">
                  <h2 className=" relative w-fit h-[30px] text-[16px]">
                    {data.name}
                  </h2>
                  <div className=" h-fit w-fit flex flex-row">
                  <h2 className=" relative w-fit h-[30px] text-[16px]">
                    Renk:
                  </h2>

        <div className="h-6 w-6 rounded-full border"
        style={{backgroundColor:data.color?.value }}>
          {/* burda direk coloru aldık çnkü pagede öyle direk valuesini mapleyip buraya props göndermişiz  */}
        </div>
                  </div>
             
                </div>
              </div>
              <div className="relative w-full h-full flex flex-row justify-between items-center bg-white">
                <h2 className="relative w-full h-full text-[16px ] flex items-center justify-center">
                 {Number(data.price)} 
                </h2>
                <h2 className="relative w-full h-full text-[16px] flex items-center justify-center">
              {data.quantity}
                </h2>
                <h2 className="relative w-full h-full text-[16px] flex items-center justify-center">
                {Number(data.price ) * data.quantity}  
                </h2>
                <Button  onClick={onRemove} className="relative w-full h-full text-[16px] flex items-center justify-center " variant={null} >
 
                <h2 className="relative w-full h-full text-[16px] flex items-center justify-center">
                <X/>
                </h2>
                </Button>
              </div>
            </div>
  )
}

export default CartItem