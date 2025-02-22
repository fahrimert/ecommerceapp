"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";




import React, {  ReactNode,  useEffect,  useRef } from "react";
import { satoshi_black, satoshi_regular } from "@/public/fonts/fonts";
import { cn } from "@/lib/utils";


import { Progress } from "@/components/ui/progress"


const NavbarForPayment = () => {

  const path = usePathname();

  return (
    <div className="w-full h-fit flex flex-col justify-center items-center  gap-[20px] bg-[#ffffff]  z-10 ">

    <div className=" md: relative w-full h-fit flex flex-col  justify-start items-center gap-[10px] p-[10px] bg-[#ffffff] ">
    <div className=" w-full h-fit   items-start justify-start ">
        <div className=" w-fit flex flex-row justify-center items-center">
  
          <Link
            href={"/"}
            key={"/"}
            className={cn(
              "w-fit transition-colors hover:text-primary font-satoshi font-[16px ]  font-medium spacing tracking-[-0.32px]",
              path === "/"
                ? " text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            <h2
              className={`${satoshi_black}  font-black text-[32px]  items-center justify-center tracking-[-3.2px]`}
            >
              dTCraft
            </h2>
          </Link>
 
   
         
           

        </div>
      </div>
<div className="w-[200px] flex flex-col items-center h-full">
      <Progress value={path == "/payment" ? 100 : 0} className="w-full h-[5px]" />
            <h2>Ödeme Sayfası </h2>
</div>

      <div>
        

      </div>
 
    </div>
  
    </div>

  );
};

export default NavbarForPayment;
