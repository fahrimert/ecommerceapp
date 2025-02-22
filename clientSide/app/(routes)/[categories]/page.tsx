import React from "react";

import Products from "./component/Products";
import { Metadata } from "next";
import HeadingWithProduct from "./component/HeadingOfProducts";
import { Prisma } from "@prisma/client";
import { getJustSession } from "@/helpers/get-user-session";
import { formatter } from "@/lib/utils";

type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  color: string;
  material: string[];
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};
export const metadata:Metadata = {
  title:'Kategoriler | '
}
const HomePage = async ({
  params,
  searchParams,
}: {
  params: { categories: string };
  searchParams: { color: string };
}) => {


  const categoryNamee = params.categories;
  const basedCategoryDB = await fetch(`http://localhost:3000/api/getTheBasedCategoryNames?name=${categoryNamee}`)
  const basedCategory =  await basedCategoryDB.json() as{ 
    name: string;
} | null

  const productDB = await fetch(`http://localhost:3000/api/getProductBasedOnProducts?name=${categoryNamee}`)
  const products =  await productDB.json() as  {
    id: string;
    name: string;
    order: number;
    anasayfa: boolean;
    createdAt: Date;
    updatedAt: Date;
    products:{
          id: string;
              categoryId: string;
              order: number;
              name: string;
              price: number;
              quantity:number
              images: {
                id: string;
                productId: string;
                url: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
              anasayfa: boolean;
              ek: Prisma.JsonValue | null;
              stok:number
              iadeSarti:String
              isFeatured:Boolean
              isArchived:Boolean
              createdAt:Date
              updatedAt: Date;
              }[];
}
  const formattedProducts = ({
      id: products?.id,
      categoryName: products?.name,
      order: products?.order,
      createdAt: products?.createdAt,
      updatedAt: products?.updatedAt,
      products: products?.products.map((item) => ({
        id: item.id,
        categoryId: item.categoryId,
        order: item.order,
        quantity: item.quantity,
        name: item.name,
        price:   formatter.format(item.price),
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        images: item.images,
      })),
    })  

    const session = await getJustSession()
  return (
    <>
      <div className=" relative w-full h-fit flex flex-col justify-start items-center  bg-white ">
        <div className=" relative w-full h-fit flex flex-col justify-center items-center gap-[130px] mt-[50px] ">
   
          <div className=" w-full h-fit flex flex-col justify-start items-start ">
        
            {/* indirim ve yeni eklenenler yapılacak bu arada */}
            <HeadingWithProduct
              title={basedCategory}
          
              prices={formattedProducts?.products?.map((item) =>
                Number(item.price.replace(/[^0-9.-]+/g,""))
              )}
            />
          </div>
          <div className="z-10 p-[30px]">
          <Products session = {session} formattedProducts={formattedProducts} />
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;

export const dynamicParams = false;

 export async function generateStaticParams() {
  const categoryNamesdb = await fetch('http://localhost:3000/api/getJustCategoryNames')
  const categoryNames = await categoryNamesdb.json() as  {
    id: string;
    name: string;
    order: number;
    anasayfa: boolean;
    createdAt: Date;
    updatedAt: Date;
}[]

  return categoryNames.map((item) => ({
    categories: `${item.id}`,
  }));
}
 