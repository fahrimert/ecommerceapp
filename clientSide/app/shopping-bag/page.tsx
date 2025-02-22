import React from "react";

import Bag from "./components/Bag";
import { kv } from "@vercel/kv";
import { Cart } from "@/app/actions/add-to-card";
import { Metadata } from "next";
import { formatter } from "@/lib/utils";
import { getJustSession } from "@/helpers/get-user-session";
import { Prisma } from "@prisma/client";

export const metadata:Metadata = {
  title:'Ürün Sepeti | '
}
export default async function page  () {
  const session = await getJustSession()
const userId = session?.id
const cart : Cart | null = await kv.get(`testcart-${userId}`);
  const mostSellingProducts = await fetch(`http://localhost:3000/api/getTheMostSoldProducts`)
  const obj = await mostSellingProducts.json() as
  ({
    product: {
        images: {
            id: string;
            productId: string;
            url: string;
            createdAt: Date;
            updatedAt: Date;
        }[]
   id: string;
    categoryId: string;
    order: number;
    name: string;
    quantity:number
    price: number;
    anasayfa: boolean;
    ek: Prisma.JsonValue | null;
    stok:number
    iadeSarti:String
    isFeatured:Boolean
    isArchived:Boolean
    createdAt:Date
    updatedAt: Date;
 }

  id: string;
  orderId: string;
  productId: string;
  howManyTimes:number
})[]
 
  let flteredDataaaForMostSelling = 
obj.map((a) => ({
        id: a.product.id,
        categoryId: a.product.categoryId,
        images: a.product.images,
        order: a.product.order,
        quantity: a.product.quantity,
        name: a.product.name,
        price: formatter.format(a.product.price),
        isFeatured: a.product.isFeatured,
        isArchived: a.product.isArchived,
        createdAt: a.product.createdAt,
        updatedAt: a.product.updatedAt,
        howManyTimes: a.howManyTimes,
      }))
      .slice(0, 5)
      .sort((a, b) => b.howManyTimes - a.howManyTimes)

  return (
    <div className=" relative w-full h-fit flex flex-col justify-start items-center  ">
    <Bag 
    session = {session}
    cart = {cart}
    flteredDataaaForMostSelling = {flteredDataaaForMostSelling}/>
    </div>
  );
}
