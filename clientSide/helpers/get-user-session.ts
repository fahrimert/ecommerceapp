"use server"

import { decrypt } from "@/lib/lib";
import { Decimal } from "@prisma/client/runtime/library";
import { cookies } from "next/headers";

export const getJustAddresss = async(g:any) =>  {
   const addressDB = await fetch(`http://localhost:3000/api/getInduvualAddressFromId?name=${g}`)
        const address = await addressDB.json() as {
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
        } | null

        return address
}

export const getJustSession = async() => {
  const sessionBasedOnCredentials = await decrypt(
    cookies().get("session")?.value
 ) as any
 const basedUserDB = await fetch(`http://localhost:3000/api/getInduvualUserid?name=${sessionBasedOnCredentials?.basedUser.id}`)
 const basedUser =  await basedUserDB.json() as 
{
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
} | null

 return basedUser
}