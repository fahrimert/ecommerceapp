'use client'
import React, { MouseEventHandler } from 'react'
import { MdAddShoppingCart } from "react-icons/md";

import Link from "next/link";
import { addItem } from '@/app/actions/add-to-card';
import { usePathname, useRouter } from 'next/navigation';
import { Prisma } from '@prisma/client';
interface MainPageProps {
  flteredDataaaForMostSelling: {
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
const MostSellingProducts: React.FC<MainPageProps>  = ({flteredDataaaForMostSelling,session}) => {

  return (
<>
<div className=" w-full h-fit flex flex-col justify-center items-center p-[20px]">

<div className=" relative w-full h-fit  grid grid-cols-4 justify-center items-center gap-[10px] bg-white  max-xl:grid max-xl:grid-cols-2 max-md:grid max-md:grid-cols-1  border-[1px]  p-[10px] shadow-lg rounded-[15px]   ">

{flteredDataaaForMostSelling.map((b) => 



 <Link  href={`../${b.categoryId}/${b.id}`} key = {b.id}className=" relative w-full h-full flex flex-col items-center justify-center gap-[18px] ">
    <div className="  relative  h-[400px] w-full  flex flex-col justify-center items-center gap-[10px]">
     <div
       className="w-fit h-full"
       style={{
         backgroundImage: `url(${b.images[0].url})`,
        backgroundSize: "cover",
         width: "100%",
         height: "100%",
       }}
     >
     
     </div>{" "}
   </div>
   <div className="relative w-full h-fit flex flex-col justify-start items-start gap-[5px]">
     <div className="relative w-full h-fit flex flex-col justify-center items-start">
       <h2 className="w-full h-fit font-inter  text-black text-[16px]  tracking-[-0.48]  leading-[30px]  ">
         {b.name}
       </h2>
       <h2 className="w-full h-fit font-inter  text-black text-[16px]  tracking-[-0.48]  leading-[30px]  ">
         {b.price}
       </h2>
     </div>

   </div>
 </Link>
)}


</div>

</div>
</>
  )
}

export default MostSellingProducts