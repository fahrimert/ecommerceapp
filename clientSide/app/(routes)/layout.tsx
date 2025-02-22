
import HomePageFooter from "@/components/HomePageFooter";
import Navbar from "@/components/Navbar";

import { kv } from "@vercel/kv";
import { Cart } from "../actions/add-to-card";
import Splinee from "@/components/Spline";

import { getJustSession } from "@/helpers/get-user-session";

export default async function Layout ({children} :{children:React.ReactNode}){
  const session = await getJustSession()
 
    const userId = session?.id
    const cart : Cart | null = await kv.get(`testcart-${userId}`);
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

    return<div className="bg-white flex flex-col">
    
        <Navbar  
        categoryNames ={categoryNames}
        session = {session}
        slot = {<Splinee/>}
        result = {products}
        cart = {cart}
     />
    {children}
    <HomePageFooter />
    
    </div>
}