"use client"

import { DataTable } from "@/components/ui/DataTable";
import React, { useState } from "react";
import { columns, ProductColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/hover-card"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { EffectCards } from 'swiper/modules';
interface A {
    formattedProducts : ProductColumn[]
}
const Ppage:React.FC<A> = ({formattedProducts}) => {
      const [showGenel,setshowGenel] = useState(true)
    
  return (
    <>
   <div className=" w-full h-[100px] flex flex-row ">

<div  className={cn(` w-full h-full  transition-all duration-150 flex justify-center items-center ` )} >
<Button onClick={() => {setshowGenel(!showGenel)}} className="p-[15px] w-[200px] h-[50px] rounded-[30px] bg-white " variant={null}>

<h2 className="text-black">
{!showGenel ?  "İlan Listesi" : "İlanların Görünümü" }
</h2>
</Button>


</div>

</div>
{ showGenel ? 
<div className={cn(`${!showGenel ?  "invisible opacity-0" : "visible opacity-100"} transition-all duration-300`)}>

<DataTable 

searchKey="name"
columns={columns}
data={formattedProducts}
/>  
</div>
: 



<div className={cn(`${showGenel ?  "invisible opacity-0" : "visible opacity-100"} transition-all duration-300 relative w-full h-fit flex flex-col justify-center items-start gap-[80px] p-[20px]`)}

>
<div className=" relative w-full h-fit flex flex-col justify-center items-start gap-[32px]">
  <div className=" relative w-full h-fit flex flex-col justify-center items-start bg-[#050505] p-[20px] rounded-[15px]">
    <div className="relative w-full h-fit flex flex-col justify-center items-start ">
     
    

      <Swiper
      className=" w-[400px] flex justify-center h-full"
      effect={'cards'}
      grabCursor={true}
      modules={[EffectCards]}
slidesPerView={1}
onSlideChange={() => console.log('slide change')}
onSwiper={(swiper) => console.log(swiper)}
>

{formattedProducts && formattedProducts.map((d) => 

<SwiperSlide key={d.id} className="  bg-white">

  
  <div className=" w-full h-fit flex flex-col bg-white " >
  <div className=" w-full h-fit flex flex-row items-center justify-center bg-white  gap-[10px]">

  <div className="  w-full flex flex-col  background-color: #fdf1ec;  " >

<div className="  h-fit w-fit flex flex-col
">

<div className="float-left h-[420px] w-[400px] ">
<Image
        src={d.images[0].url}
        alt="232"
        className="w-[400px] h-full  object-fit"
        width={400} 
        height={200}
      />
</div>
<div className="float-left h-fit w-full bg-white  p-[10px] ">

  <div className=" h-fit w-full  ">

 
    <h1 className = "text-[24px] text-[#474747] mr-0 my-0 ">{d.name}</h1>


  </div>
  <div className="h-fit w-full relative ">

    <p className=" inline-block  h-fit text-[14px] font-[lighter] text-[#474747] mr-0 my-0"><span className="inline-block h-fit text-[16px]">{d.price} TL</span></p>
  </div>
  </div>
</div>
</div>


</div>

  </div>
  
</SwiperSlide>
  )}
</Swiper>



    </div>
  </div>
</div>
</div>


}

    </>

  )
}

export default Ppage