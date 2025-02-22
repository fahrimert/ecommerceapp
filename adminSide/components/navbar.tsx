"use client"
import { cn } from "@/lib/utils"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import {  usePathname } from "next/navigation"
const Navbar = () => {
  
    const path = usePathname()
  

    return (
    <nav className="relative w-full h-fit flex flex-col  pt-[20px] pr-[10px] ">
        <div  className="relative w-full h-fit  flex flex-row  p-0 m-0   justify-end  "  >
        <div className="  lg:w-[20%] h-fit  justify-end  text-gray-500   ">
            <ul className="lg:w-full  flex flex-row   h-fit items-center justify-end  sm: gap-5">
            <li className=" w-fit justify-end"><UserButton/></li>
            </ul>
        </div>
        </div>
    </nav>
    
  )
}

export default Navbar