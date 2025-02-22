"use client";
import React, { MouseEventHandler } from "react";


import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { satoshi_black, satoshi_regular } from "@/public/fonts/fonts";

interface ProductsProps {
  item:{
    id: string;
    categoryId: string;
    order: number;
    quantity: number;
    name: string;
    price: string;
    isFeatured: Boolean;
    isArchived: Boolean;
    createdAt: Date;
    updatedAt: Date;
    images: {
        id: string;
        productId: string;
        url: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
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
const SingleProduct: React.FC<ProductsProps> = ({ item,session }) => {
  const params = useParams();



  return (
    <Link href={`${params.categories}/${item.id}`} className=" ">
      <div className=" relative w-full h-fit flex flex-col items-center justify-center gap-[10px] bg-[#fee2e2]  shadow-lg  rounded-[15px]   ">
        <div className="  relative  h-fit  w-full  flex flex-col justify-center items-center gap-[10px]  hover:shadow-lg  hover:rounded-[15px]  hover:transition-all hover:duration-1000   hover:p-[25px]  p-[20px]">
          <Image
            src={item.images.map((a) => a.url)[0]}
            alt="232"
            className="w-[300px] hover:w-full h-[300px] z-0 object-cover hover:fade-in-50 hover:transition-all hover:duration-1000  roudned-[15px]"
            width={300}
            height={300}
            objectPosition="center"
          />
      
         
        </div>
        <div className="relative w-full h-fit flex flex-col justify-center items-start p-[10px] ">
          <h2 className="w-full h-fit font-inter  text-black text-[16px]  tracking-[-0.48]  uppercase    ">
            {item.name}
          </h2>
          <div className="relative w-full h-fit flex flex-col justify-center items-start">
            <h2 className={cn(`w-full h-fit font-${satoshi_black} inter font-medium  text-black text-[16px]  tracking-[-0.48]    `)} >
              {item.price} 
            </h2>
        
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleProduct;
