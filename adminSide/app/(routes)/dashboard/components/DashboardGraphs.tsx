import prismadb from "@/lib/db";
import { cn } from "@/lib/utils";

import { ChartComponent } from "./ChartComponent";
import BarChart from "./LineChart";
import { Order } from "@prisma/client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import  Calendar  from "./Calendar";

interface DashboardMain {
  result: {
    name: string;
    count: any;
}[]
   orders: ({
    orderItems: {
        id: string;
        orderId: string;
        productId: string;
    }[];
} & {
    id: string;
    isPaid: boolean;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
})[]
}
const DashboardMain: React.FC<DashboardMain> =({orders,result}) => {
  return (
    <>
    <div className={cn(`relative w-full h-full flex flex-col items-start  justify-center  gap-[24px] p-0 `)}  >
    <NavigationMenu className="w-fit h-fit">
  <NavigationMenuList>
    <NavigationMenuItem className="bg-[#050505] w-fit h-fit p-[20px] flex justify-center items-center rounded-[30px] ">
     <Link href={'#ilanTürü'} >
    <h2 className="w-fit h-full text-white text-[18px] ">Satış Grafikleri</h2>

     </Link> 
    </NavigationMenuItem>
    <NavigationMenuItem className="bg-[#050505] w-fit h-fit p-[20px] flex justify-center items-center rounded-[30px] ">
     <Link href={'#aylaragöre'} >
    <h2 className="w-fit h-full text-white text-[18px] ">Aylara Göre İlan Grafiği</h2>

     </Link> 
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

<Calendar/>

         <div id="ilanTürü" className="relative w-full h-fit flex flex-col justify-between items-center  bg-[#050505] p-[20px] gap-[20px] rounded-[30px] ">
          <h2 className="w-full h-fit flex justify-start items-center text-white text-[24px]  border-b-[1px]">Satılan Ürün Türleri  </h2>
        <div className="w-full h-fit flex flex-col justify-center items-center">


          <div className="w-full h-full flex flex-row items-center" >
      
          <div id="aylaragöre" className="w-full h-fit flex p-[20px] items-center justify-center ">
             <div className=" w-fit h-[500px] flex flex-row ">

               <ChartComponent result={result}  />
             </div>
             
          
         
          </div>
          </div>
      
       
        </div>
          
        
        </div>
     
     

   {/*      <div className="relative w-full h-fit flex flex-col justify-between items-center  bg-[#050505] p-[20px] gap-[20px] rounded-[30px] ">
          <h2 className="w-full flex justify-start items-center text-white text-[24px]  border-b-[1px]">Danışmanlar Ve İlan Türleri Grafiği </h2>
        <div className="w-full h-fit justify-around">


          <div className="w-full h-fit flex flex-col">
          <div className=" w-full h-fit">
            <h2 className="text-white">Koyduğunuz İlanların İlan Türlerine Göre Tablosu</h2>

          </div>
          <div className="w-full h-[300px] flex p-[20px] items-center justify-start ">
          {usera.Ilanlar.length !== 0 ? 
             <div className=" w-full h-[300px] flex flex-row ">

               <ChartComponent a={usera} />
             </div>
             
             : 
             <h2 className="w-full h-full flex justify-center items-center text-white rounded-[30px] bg-[#14213f]"> Henüz Bir İlanı Yok Danışmanın</h2> }
         
          </div>
          </div>
       
        </div>
          
        
        </div> */}
          <div id="#aylaragöre" className=" bg-[#050505] w-full h-full flex justify-center items-center rounded-[20px] p-[20px] ">
          <BarChart orders = {orders}/>
          </div>

         

      
      </div> 
  </>
  );
};

export default DashboardMain;
