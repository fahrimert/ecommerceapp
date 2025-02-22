'use server'
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import PaidProducts from "../components/PaidProducts";
import Link from "next/link";
import { Cart } from "@/app/actions/add-to-card";
import { getJustSession } from "@/helpers/get-user-session";
import UnPaidProducts from "./UnPaidProducts";


interface OrdersProducts {
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

formattedPaidProducts: {
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
        quantity: number
        name: string;
        price: string;
        isFeatured: Boolean;
        isArchived: Boolean;
        createdAt: Date;
        updatedAt: Date;
    }
  }[];
}[] | undefined
  cart:Cart|null
}
const OrdersForClient: React.FC<OrdersProducts> = async({
  formattedPaidProducts,
  formattedUnPaidProducts,
  cart
}) => {
  const sideNavRoutes = [
    {
      href: `account`,
      name: " Hesap Ayarları ",
    },
    {
      href: `orders`,
      name: "Siparişlerim",
    },
  ];
  const session = await getJustSession();
  


  return (
    <>
      <div className="relative w-full h-fit flex flex-row justify-center items-start gap-[10px]">
        <div className="w-[20%] h-full flex flex-col justify-start items-start gap-[20px]  pt-[60px]">
          <div className="relative w-full h-fit flex flex-col justify-start items-start gap-[10px] p-[10px] bg-white">
            <h2 className=" relative w-full h-fit  text-[16px] leading-[16px] text-black">
              Account{" "}
            </h2>
          </div>

          <div className="relative w-full h-fit flex flex-col justify-start items-start gap-[10px] pl-[10px] ">
            <ul>
              {sideNavRoutes.map((route, index) => (
                <li key={index}>
                  <Link
                    href={route.href}
                    key={route.name}
                    className={cn(
                      " relative w-full h-fit transition-colors hover:text-primary font-satoshi text-[16px ]  font-medium spacing tracking-[-0.32px] "
                    )}
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className=" relative w-full h-fit flex flex-col justify-center items-center gap-[10px]  bg-white">
          <div className="relative w-full h-fit flex flex-col justify-center items-start p-[45px]">
            <Tabs
              className="relative w-full h-fit flex flex-col justify-around items-start  pt-[10px] bg-white"
              defaultValue="paidProducts"
            >
              <TabsList className="relative w-full h-fit flex flex-row justify-center items-center  pt-[10px] bg-white">
                <TabsTrigger value="paidProducts">
                  Ödenen Siparişler
                </TabsTrigger>
                <TabsTrigger value="unpaidProducts">
                  Ödenmeyen Siparişler
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="paidProducts"
                className=" relative w-full h-fit flex flex-col items-start justify-center gap-[10px] bg-white"
              >
                <PaidProducts
                session = {session}
                  formattedPaidProducts={formattedPaidProducts}
               
                />
              </TabsContent>

              <TabsContent
                value="unpaidProducts"
                className=" relative w-full h-fit flex flex-col items-start justify-center gap-[10px] bg-white"
              >
                <UnPaidProducts
                  formattedUnPaidProducts={formattedUnPaidProducts}
               
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersForClient;
