"use client"
import React from "react";


import { useParams, useSearchParams } from "next/navigation";
import SingleProduct from "./SingleProduct";


interface ProductsProps {
  formattedProducts:
  {
    id: string;
    categoryName: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    products: {
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
    }[]
  }[]
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
const Products :React.FC<ProductsProps> = ({formattedProducts,session}) => {
  const searchParams = useSearchParams()
  

  const priceFilter = searchParams.get("priceFilter")
  const minPrice = priceFilter?.split("-")[0]
  const maxPrice = priceFilter?.split("-")[1]

  const filteredProductsBasedOnPrice = formattedProducts?.products?.map((item) => item).filter(a =>Number(a.price.replace(/[^0-9.-]+/g,"")) >= Number(minPrice!) && Number(a.price.replace(/[^0-9.-]+/g,"")) <=  Number(maxPrice!))
  return (
    <div className=" w-full h-fit flex flex-col justify-center items-center p-[20px]  ">

    <div className=" relative w-full h-fit  grid grid-cols-4 justify-center items-center gap-[10px] bg-white  max-xl:grid max-xl:grid-cols-2 max-md:grid max-md:grid-cols-1   border-[1px]  p-[10px] shadow-lg rounded-[15px]   ">

  {priceFilter  && filteredProductsBasedOnPrice?.map((item,index) => 
<SingleProduct 
session = {session}
key={index}
item = {item}/>
    )} 
   { !priceFilter && formattedProducts?.products?.map((item,index) => 
<SingleProduct 
session = {session}

key={index}
item = {item}/>

    )}


   </div>
 </div>  )
}

export default Products