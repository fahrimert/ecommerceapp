"use client";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import MostSellingProducts from "@/components/MostSellingProducts";
import CartItem from "./CartItem";
import SiparişÖzeti from "./SiparişÖzeti";
import { addItem, Cart, delAllItem } from "@/app/actions/add-to-card";
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import {  delItem } from "@/app/actions/add-to-card";
import { usePathname } from "next/navigation";
import { Prisma } from "@prisma/client";

interface BagProps{
cart :Cart | null
flteredDataaaForMostSelling: 
{

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
    quantity: number;
    name: string;
    price: string;
    isFeatured: Boolean;
    isArchived: Boolean;
    createdAt: Date;
    updatedAt: Date;
    howManyTimes: number;
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


const Bag :React.FC<BagProps>= ({cart,flteredDataaaForMostSelling,session}) => {
    const id = session?.id
    const pathname = usePathname()
     const onRemove = () => {
      }   
      const [quantity,setQuantity] = useState(0)
      const handlePlusQuantity = () => {
        setQuantity(quantity + 1)
      }
      
  return (
    <div className=" relative w-full h-fit flex flex-col justify-center items-center  gap-[10px]">
      <div className=" relative  w-[70%] h-fit flex flex-row justify-start items-start  bg-white border-[1px] shadow-lg  p-[20px] gap-[20px] max-lg:flex max-lg:flex-col">
        <div className=" relative w-[69%] h-fit flex flex-col justify-start items-center gap-[10px] max-lg:w-[100%] bg-[#fafafa]">
        <div className="w-full h-fit flex flex-col p-[20px]">
        <h2 className="text-[24px] ">
        Kart:  {cart?.items.length} item
        </h2>
        <Separator/>
        </div>

        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="flex flex-col w-full h-full gap-[20px]">
            {cart?.items.map((d) => (

            <div key={d.id} className=" flex flex-row w-full h-fit gap-[20px]">
              <Image width={200} height={200} className="w-[200px] h-[200px]" src={d.images && d.images[0].url  } alt={d.id}/>
              <div className=" flex flex-col w-full h-[200px] justify-between p-[10px]">
                <div className="w-full h-full flex flex-col justify-start items-start">
                  <h2 className="text-black text-[18px]">{d.name}</h2>
                  <h2 className="text-black text-[18px]">Sepetteki Sayısı:{d.quantity}</h2>
                  <div className="w-full h-fit flex flex-row items-center bg-[#fafafa]  ">
             <Button onClick={() => {delItem(session!.id,d.id,pathname)}} className="w-fit h-fit" variant={null}>

             <Minus    />
             </Button>
             <h2>Miktar : {d.quantity}</h2>
             <Button onClick={() => {addItem(cart.items,session!.id,d.id,pathname)}} className="w-fit h-fit" variant={null}>


             <Plus/>
             </Button>

             </div>
                           
                </div>
                <div className="w-full h-full justify-between items-end flex ">
                  <h2 className="text-black text-[18px]" >Fiyatı:      {Number(d.price ) * d.quantity}  </h2>
              
                </div>
              </div>
              
            </div>
            ))}
  <div className="w-full h-fit justify-end flex flex-row items-center">
                  
                  <Button onClick={() => {delAllItem(session!.id)}}>
                   <h2>
                     Sepeti Kaldır
                   </h2>
                  </Button>
                  </div> 
          </div>
</ScrollArea>

<div>

</div>
        </div>
<div className="w-[30%] h-[500px] flex flex-col items-center justify-center">

        <SiparişÖzeti cart = {cart} session = {session} />
</div>
      </div>
      <MostSellingProducts 
      session={session}
      flteredDataaaForMostSelling={flteredDataaaForMostSelling}/>

  
    </div>
  );
};

export default Bag;
