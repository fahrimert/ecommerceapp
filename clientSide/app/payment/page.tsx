'use server'
import React from 'react'


import Adresses from './components/Adresses';
import { kv } from '@vercel/kv';
import { Cart } from '../actions/add-to-card';
import NavbarForPayment from './components/NavbarForPay';
import { getJustSession } from '@/helpers/get-user-session';
import axios from 'axios';
import { Decimal } from '@prisma/client/runtime/library';
import { formatter } from '@/lib/utils';

const FormPayment =  async () => {
  const session = await getJustSession()

const userId = session?.id
const cart : Cart | null = await kv.get(`testcart-${userId}`);
const addressesdb = await fetch(`http://localhost:3000/api/getAdresses`) 
const address =  await addressesdb.json() as {
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
const formattedAddress = address.map((c) =>( {
  id:c.id,
  addressTitle:c.addressTitle,
  BuyerName:c.BuyerName,
  BuyerNumber: Number(c.BuyerNumber),
  AddressDescription:c.AddressDescription,
  country:c.country,
  county:c.county,
  zipcode:Number(c.zipcode),
  addressId:c.addressId,
  createdAt:c.createdAt,
  updatedAt:c.updatedAt

}))

console.log(address);
  return (
    
    <>
    <NavbarForPayment/>
    <Adresses session = {session} cart = {cart} addressesdb = {formattedAddress} />
   
    </>

  )
}

export default FormPayment