import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import * as React from "react";

import { cn, formatter } from "@/lib/utils";

import AccountSettings from "./components/AccountSettings";
import AddressSettings from "./components/AddressSettings";

import Link from "next/link";
import { headers } from "next/headers";
import { Metadata } from "next";
import { getJustSession } from "@/helpers/get-user-session";
import { Decimal } from "@prisma/client/runtime/library";

export const metadata: Metadata = {
  title: "Kullanıcı Bilgileri | ",
};
const page = async () => {
  const session = await getJustSession()
  const headersList = headers();
  const domain = headersList.get('host') || "";
  const fullUrl = headersList.get('referer') || "";
  const heads = headers()

  const pathname = heads.get('next-url')
  console.log(pathname);
  const users = await fetch(`http://localhost:3000/api/getInduvualUseridAndDetails?name=${session?.id}`) 
  const data = await users.json() as
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
  

  
  const formattedDetail = {
    id: data.detail.id,
    name: data.detail?.name,
    email: data.detail?.email,
    emailVerified: data.detail?.emailVerified,
    image: data.detail?.image,
    password: data.detail?.password,
    createdAt: data.detail?.createdAt,
    updatedAt: data.detail?.updatedAt,
    detailOfUser: data.detail?.detailOfUser.map((item) => ({
      id: item.id,
      educationsituation: item.educationsituation,
      surname: item.educationsituation,
      detailId: item.detailId,
      phone: item.phone.toString(),
      occupation: item.occupation,
      createdAt: item?.createdAt,
      updatedAt: item?.updatedAt,
    })),
  };
  const formattedAddress = {
    id: data.addres?.id,
    name: data.addres?.name,
    email: data.addres?.email,
    emailVerified: data.addres?.emailVerified,
    image: data.addres?.image,
    password: data.addres?.password,
    createdAt: data.addres?.createdAt,
    updatedAt: data.addres?.updatedAt,
    addres: data.addres?.address.map((item) => ({
      id: item.id,
      addressTitle: item.addressTitle,
      BuyerName: item.BuyerName,
      BuyerNumber: item.BuyerNumber.toString(),
      AddressDescription: item.AddressDescription,
      country: item.country,
      county: item.county,
      zipcode: item.zipcode.toString(),
      addressId: item.addressId,
      createdAt: item?.createdAt,
      updatedAt: item?.updatedAt,
    })),
  };


  const sideNavRoutes = [
    {
      href: `AccountSettings/account`,
      name: " Hesap Ayarları ",
    },
    {
      href: `AccountSettings/orders`,
      name: "Siparişlerim",
    },
  ];

  return (
    <>
      <div className="relative w-full h-fit flex flex-row justify-center items-start gap-[10px] p-[20px] ">
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
              defaultValue="account"
            >
              <TabsList className="relative w-full h-fit flex flex-row justify-center items-center  pt-[10px] bg-white">
                <TabsTrigger value="account">Üyelik Bilgileri</TabsTrigger>
                <TabsTrigger value="adress">Adres Ekle</TabsTrigger>
              </TabsList>

              <TabsContent
                value="account"
                className=" relative w-full h-fit flex flex-col items-start justify-center gap-[10px] bg-white"
              >
                <AccountSettings session = {session} formattedDetail={formattedDetail} />
              </TabsContent>

              <TabsContent
                value="adress"
                className=" relative w-full h-fit flex flex-col items-start justify-center gap-[10px] bg-white"
              >
                <AddressSettings formattedAddress={formattedAddress} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
