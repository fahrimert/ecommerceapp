import HomePageFooter from "@/components/HomePageFooter";
import HomePageMain from "@/components/HomePageMain";
import Navbar from "@/components/Navbar";
import { formatter } from "@/lib/utils";
import { kv } from "@vercel/kv";
import { format } from "util";
import { Cart } from "../actions/add-to-card";
import Splinee from "@/components/Spline";
import { Metadata } from "next";
import axios from "axios";
import { getJustSession } from "@/helpers/get-user-session";

export default async function Layout ({children} :{children:React.ReactNode}){

const productsDB = await fetch('http://localhost:3000/api/getAllProducts') 
const products = await productsDB.json() as  {
  id:string
  name: string;
  categoryId: string;
  category: {
      id: string;
      name: string;
      order: number;
      anasayfa: boolean;
      createdAt: Date;
      updatedAt: Date;
  };
}[]



const categoryNamesdb = await fetch('http://localhost:3000/api/getJustCategoryNames')
const categoryNames = await categoryNamesdb.json() as  {
  id: string;
  name: string;
  order: number;
  anasayfa: boolean;
  createdAt: Date;
  updatedAt: Date;
}[]

      
      
    const session = await getJustSession();
    const userId = session?.id
    const cart : Cart | null = await kv.get(`testcart-${userId}`);



 
    return<div className="bg-white flex flex-col gap-[20px]">
    
        <Navbar  
        categoryNames ={categoryNames}
        slot = {<Splinee/>}
        result = {products}
        cart = {cart}
        session={session}
       />
    {children}
    <HomePageFooter />
    
    </div>
}