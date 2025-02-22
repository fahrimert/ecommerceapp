import { ToasterProvider } from "@/app/ToasterProvider";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/Sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Layout ({children} :{children:React.ReactNode}){

    return<>
      <div className="relative w-full h-full flex flex-row max-xl:flex-col max-xl:p-0  justify-between  items-start  bg-[#f1f0ee] min-h-screen">
          <ToasterProvider />
           <Sidebar  />
            <div className="w-full h-full flex flex-col px-[15px]   max-xl:p-0 max-xl:gap-0 max-xl:w-full ">
            <Navbar/> 

         
            <div >

            {children}
            </div>
            </div>

        </div>
    
    </>
}