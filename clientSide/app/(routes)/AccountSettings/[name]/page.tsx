import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import * as React from "react"
 
import { cn, formatter } from "@/lib/utils"



import Link from "next/link";
import AddressSettings from "../components/AddressSettings";
import AccountSettings from "../components/AccountSettings";
import { headers } from "next/headers";

import { kv } from "@vercel/kv";
import OrdersForClient from "./components/OrdersForClient";
import { Cart } from "@/app/actions/add-to-card";
import { Metadata } from "next";
import { getJustSession } from "@/helpers/get-user-session";
import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import axios from "axios";
import { notFound } from "next/navigation";
export const metadata:Metadata = {
  title:'Kullanıcı Bilgileri | '
}
const page = async (params : {params: {name:string} },  searchParams?: { [key: string]: string | string[] | undefined }) => {
 
  if (params.params.name != "orders" && params.params.name !== 'account') {
      throw notFound();
    }
  const heads = headers()
  const headersList = headers();
    const domain = headersList.get('host') || "";
    const fullUrl = headersList.get('referer') || "";
  const abc = new URL(fullUrl).pathname
  console.log(fullUrl);
    console.log(fullUrl);
  const session = await getJustSession()
  const cart: Cart| null = await kv.get(`testcart-${session?.id}`)
  const paidAndUnpaidProductsDB = await fetch(`http://localhost:3000/api/getPaidAndUnpaidProduct?name=${session?.id}`) 
  const data = await paidAndUnpaidProductsDB.json() as
  {
    paidProducts: {
        id: string;
        isPaid: boolean;
        phone: string;
        address: string;
        createdAt: Date;
        updatedAt: Date;
        madePersonsId:String
        orderItems: {
          product: {
              id: string;
                  categoryId: string;
                  order: number;
                  name: string;
                  price: Decimal;
                  quantity: number;
                  images: {
                      id: string;
                      productId: string;
                      url: string;
                      createdAt: Date;
                      updatedAt: Date;
                  }[];
                  anasayfa: boolean;
                  ek: Prisma.JsonValue | null;
                  stok: number;
                  iadeSarti: String;
                  isFeatured: Boolean;
                  isArchived: Boolean;
                  createdAt: Date;
                  updatedAt: Date;
        };
          id: string;
          orderId: string;
          productId: string;
      }[];
    }[] | null,
    unPaidProducts:   {
      id: string;
      isPaid: boolean;
      phone: string;
      madePersonsId:string
      address: string;
      createdAt: Date;
      updatedAt: Date;
      orderItems: {
        product: {
            id: string;
                categoryId: string;
                order: number;
                name: string;
                price: Decimal;
                quantity: number;
                images: {
                    id: string;
                    productId: string;
                    url: string;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
                anasayfa: boolean;
                ek: Prisma.JsonValue | null;
                stok: number;
                iadeSarti: String;
                isFeatured: Boolean;
                isArchived: Boolean;
                createdAt: Date;
                updatedAt: Date;
      };
        id: string;
        orderId: string;
        productId: string;
    }[];

  }[] | null }| null
  const formattedPaidProducts= data?.paidProducts?.map((item) => 
  
({
  id:item.id,
  isPaid: item.isPaid,
  madePersonsId:item.madePersonsId,
  phone: item.phone,
  address: item.phone,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
  orderItems:item.orderItems.map((itema) => ({
        id: itema.id,
        orderId:itema.orderId,
        productId: itema.productId,
        
        product:{
          id:itema.product.id,
          categoryId: itema.product.categoryId,
          images: itema.product.images.map((a) =>({
            id:a.id,
            productId: a.productId,
            url: a.url,
            createdAt: a.createdAt,
            updatedAt: a.updatedAt
          })),
          order: itema.product.order,
          name: itema.product.name,
          price: itema.product.price.toString(),
          quantity:itema.product.quantity,
          isFeatured: itema.product.isFeatured,
          isArchived: itema.product.isArchived,
          createdAt: itema.product.createdAt,
          updatedAt: itema.product.updatedAt
        }
  }))

}) )
  const formattedUnPaidProducts= data?.unPaidProducts?.map((item) => 
  
({
  id:item.id,
  isPaid: item.isPaid,
  phone: item.phone,
  address: item.phone,
  madePersonsId:item.madePersonsId,

  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
  orderItems:item.orderItems.map((itema) => ({
        id: itema.id,
        orderId:itema.orderId,
        productId: itema.productId,
        product:{
          id:itema.product.id,
          categoryId: itema.product.categoryId,
          images: itema.product.images.map((a) =>({
            id:a.id,
            productId: a.productId,
            url: a.url,
            createdAt: a.createdAt,
            updatedAt: a.updatedAt
          })),
          order: itema.product.order,
          name: itema.product.name,
          price: itema.product.price.toString(),
          isFeatured: itema.product.isFeatured,
          isArchived: itema.product.isArchived,
          createdAt: itema.product.createdAt,
          updatedAt: itema.product.updatedAt
        }
  }))

}) )
console.log(data);
console.log(data?.paidProducts);

  const users = await fetch(`http://localhost:3000/api/getInduvualUseridAndDetails?name=${session?.id}`) 
  const dataForUser = await users.json() as
  {
    detail: {
      id: string;
      name: string | null;
      email: string;
      emailVerified: Date | null;
      image: string | null;
      password: string | null;
      createdAt: Date;
      updatedAt: Date;
      detailOfUser: {
        id: string;
        educationsituation: string;
        surname: string;
        detailId: string;
        phone: Decimal;
        occupation: string;
        createdAt: Date;
        updatedAt: Date;
    }[]
    },
    addres: {
      id: string;
      name: string | null;
      email: string;
      emailVerified: Date | null;
      image: string | null;
      password: string | null;
      createdAt: Date;
      updatedAt: Date;
      address: {
        id: string;
        addressTitle: string;
        BuyerName: string;
        BuyerNumber: Decimal;
        AddressDescription: string;
        country: string;
        county: string;
        zipcode: Decimal;
        addressId: string;
        createdAt: Date;
        updatedAt: Date;
      }[]
     
    }
  }
   const formattedDetail= 


   {
     id: dataForUser?.detail.id,
     name:dataForUser?.detail.name,
     email:dataForUser?.detail.email,
     emailVerified:dataForUser?.detail.emailVerified,
     image:dataForUser?.detail.image,
     password:dataForUser?.detail.password,
     createdAt:dataForUser?.detail.createdAt,
     updatedAt:dataForUser?.detail.updatedAt,
     detailOfUser:dataForUser?.detail.detailOfUser.map((item) => ({
       id: item.id,
       educationsituation: item.educationsituation,
       surname: item.educationsituation,
       detailId: item.detailId,
       phone: item.phone.toString(),
       occupation: item.occupation,
       createdAt:item?.createdAt,
       updatedAt:item?.updatedAt,
   }))}
   const formattedAddress= 


   {
     id: dataForUser.addres.id,
     name:dataForUser.addres.name,
     email:dataForUser.addres.email,
     emailVerified:dataForUser.addres.emailVerified,
     image:dataForUser.addres.image,
     password:dataForUser.addres.password,
     createdAt:dataForUser.addres.createdAt,
     updatedAt:dataForUser.addres.updatedAt,
     addres:dataForUser.addres.address.map((item) => ({
       id: item.id,
       addressTitle: item.addressTitle,
       BuyerName: item.BuyerName,
       BuyerNumber: item.BuyerNumber.toString(),
       AddressDescription: item.AddressDescription,
       country: item.country,
       county: item.county,
       zipcode: item.zipcode.toString(),
       addressId: item.addressId,
       createdAt:item?.createdAt,
       updatedAt:item?.updatedAt,
   }))}
   
    const sideNavRoutes  = [
        {
            href : `account`,
            isActive : abc === "account",
             name:" Hesap Ayarları "
        },
        {
            href : `orders`,
            isActive : abc === "orders",
            name:"Siparişlerim"
        },
    ]
    if (params.params.name == "account") {
        return ( 
   <>
            <div className="relative w-full h-fit flex flex-row justify-center items-start gap-[10px]">
            <div className="w-[20%] h-full flex flex-col justify-start items-start gap-[20px]  pt-[60px]">
                <div className="relative w-full h-fit flex flex-col justify-start items-start gap-[10px] p-[10px] bg-white">
                    <h2 className=" relative w-full h-fit  text-[16px] leading-[16px] text-black">Account </h2>
                </div>
        
                
                <div className="relative w-full h-fit flex flex-col justify-start items-start gap-[10px] pl-[10px] ">
                <ul>
                    {
                        sideNavRoutes.map((route,index) =>(
                        <li key={index}>
        
                            <Link href={route.href} key={route.name}  className={cn(
                                " relative w-full h-fit transition-colors hover:text-primary font-satoshi text-[16px ]  font-medium spacing tracking-[-0.32px] ",
                                route.isActive ? " text-black dark:text-white" : "text-muted-foreground"
                                )} >
                            {route.name}
                            </Link>
                        </li>
                        ))
                     }
                    </ul>
               
                </div>
            </div>
            <div  className=" relative w-full h-fit flex flex-col justify-center items-center gap-[10px]  bg-white">
        <div className="relative w-full h-fit flex flex-col justify-center items-start p-[45px]">
            <Tabs className="relative w-full h-fit flex flex-col justify-around items-start  pt-[10px] bg-white" defaultValue="account">
          <TabsList className="relative w-full h-fit flex flex-row justify-between items-center  pt-[10px] bg-white">
            <TabsTrigger value="account">Üyelik Bilgileri</TabsTrigger>
            <TabsTrigger value="adress">Adres Ekle</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className=" relative w-full h-fit flex flex-col items-start justify-center gap-[10px] bg-white">
        <AccountSettings session = {session} formattedDetail = {formattedDetail}/>
        
        </TabsContent>
        
          

        <TabsContent value="adress" className=" relative w-full h-fit flex flex-col items-start justify-center gap-[10px] bg-white">
        
        <AddressSettings formattedAddress = {formattedAddress}/>
        
        </TabsContent>
        
        </Tabs>
        
        </div>
                </div>
            </div>
           
                    </>

        )
    }
 
    if (params.params.name == "orders") {
        return ( 

            <>
      <OrdersForClient
      cart = {cart}
      formattedPaidProducts = {formattedPaidProducts!}
      formattedUnPaidProducts = {formattedUnPaidProducts}
      />          
        
                    </>        )
    }
 

}

export default page

export async function generateStaticParams() {

  return [{bane:"account"},{name:"orders"}]
} 
