"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiShoppingBasket } from "react-icons/ci";
import { MdAccountBox } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import React, {  ReactNode,    useEffect,    useRef, useState } from "react";
import {LogInIcon, LogOut, MenuIcon, Minus, Plus,  } from "lucide-react";
import { satoshi_black, satoshi_regular } from "@/public/fonts/fonts";
import { cn} from "@/lib/utils";
import { addItem, Cart, delAllItem, delItem } from "@/app/actions/add-to-card";
import SearchComponen from "./SearchComponen";
import { Separator } from "@radix-ui/react-select";
import { logout } from "@/app/actions/signOut";
import Image from "next/image";
import { Button } from "./ui/button";

interface NavbarProps {

cart :Cart  |null
slot:ReactNode
categoryNames:  {
  id: string;
  name: string;
  order: number;
  anasayfa: boolean;
  createdAt: Date;
  updatedAt: Date;
}[]

result:   {
  id: string;
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
session: {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
} | null
}

const Navbar: React.FC<NavbarProps> = ({session, slot,cart ,result,categoryNames}) => {
  const btnRef = useRef(null);
  const path = usePathname();
  const items = cart?.items

  const totalPrice = items?.reduce((total,item) => {
    return total + Number(item.price.replace(/[^0-9.-]+/g,"")) *item.quantity
  },0)
     const [quantity,setQuantity] = useState(0)
        const handlePlusQuantity = () => {
          setQuantity(quantity + 1)
        }
        
  useEffect(() => {
  },[cart?.items])
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  return (
    <div className="w-full h-fit flex flex-col justify-center items-center  gap-[20px] bg-[#ffffff]  z-10 ">

    <div className=" md: relative w-full h-fit flex flex-row  justify-between items-center gap-[10px] p-[10px] max-xl:flex-col max-md:flex-row  bg-[#ffffff] ">
    <div className=" w-fit h-fit   items-center ">
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
          <div
          className="w-fit"
            style={{
              position: "relative",
              height: "60px",
              width: "100px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                left: "0",
                top: "0",
              }}
            >
              {slot}
           </div>
          </div>
   
         
           

        </div>
      </div>
      <div>
        
      <Sheet  >
  <SheetTrigger className="hidden max-md:flex  w-fit h-fit ${satoshi_regular} hfont-medium hover:scale-105 hover:transition-all hover:duration-200 text-black border-[1px] border-red-100    bg-red-100 p-[5px] rounded-[15px]  flex flex-row justify-start items-start gap-[5px]  text-[14px]">
  <MenuIcon size={20} color="black"></MenuIcon>
  <h2 className="text-black">Menü</h2>
  </SheetTrigger>
  <SheetContent>
    
  <div className="relative w-full h-full flex flex-col items-start justify-start   gap-[15px]  bg-[#fafafa]">
    <div className="bg-white w-fit h-fit gap-[5px] flex flex-col shadow-lg p-[10px] ">

    <h2 className="text-[24px]">
      Arama İşlemi
    </h2>
    <Separator/>
  <SearchComponen result = {result}/>
  </div>
<div className="relative w-full h-fit flex flex-col items-start justify-start   gap-[15px]  bg-[#fafafa]">
<div className="bg-white w-full h-fit gap-[5px] flex flex-col shadow-lg p-[10px] ">

<h2 className="text-[24px]">
      Üyelik İşlemi
    </h2>
    <Separator/>
      <div className="lg: relative w-full h-fit  flex  justify-start items-start  p-0  bg-[#fafafa]  ">
   
        {session   && 
            <div className="w-[40px] h-full">
            <Link href={"/AccountSettings"}>
            <MdAccountBox size={30}  />
              </Link>
          </div>}                   
       
       
        {session   ?  
        
        <Popover>
        <PopoverTrigger>  <div className="w-[60px]     h-full  flex flex-row items-center justify-start gap-[5px] bg-slate-300  ">
             
                <CiShoppingBasket size={"30px"} color="black" />
                <h2 className="text-black">
                  
                  
                  { cart?.items.length }
                  </h2>
              </div></PopoverTrigger>
      </Popover>
        
      
      : null}
   

        <div className="w-fit h-fit">
        {session ? <button onClick={() => logout()}> 
        <div className="w-[115px]    h-full  flex flex-row items-center justify-start gap-[5px]  ">
          <LogOut size={"20px"} color="black" />
          <h2 className="text-black ">Çıkış Yap</h2>
        </div>


        </button>:
     
     <Link  href={"/authPage"} >
<div className={`w-fit h-fit ${satoshi_regular}  font-medium hover:scale-105 hover:transition-all hover:duration-200 text-black border-[1px] border-red-100    bg-red-100 p-[5px] rounded-[15px]  flex flex-row justify-center items-center gap-[5px]  text-[14px] `}>
      
      <h2 className="w-fit h-fit  text-[18px] hover:transition-all hover:duration-400 ">Giriş Yap</h2>


        
        </div>
        </Link>
         }
 
        </div>

        
      </div>
  </div>

</div>
<div className="relative w-full h-fit flex flex-col items-start justify-start   gap-[15px]  bg-[#fafafa]">
<div className="bg-white w-full h-fit gap-[5px] flex flex-col shadow-lg p-[10px] ">

<h2 className="text-[24px] cursor-pointer">
     Kategoriler
    </h2>
<div className=" relative w-fit h-full gap-[20px]  flex flex-col  justify-start  ">

       {categoryNames.map((d,g) => (
                                  <div className="w-fit  " key={g}>


<div className=" w-full h-fit flex flex-col items-center justify-center   gap-[10px] ">


<Link href={`/${d.id}`}>
<div className="   background-color: #fdf1ec;  " >

<div className="  h-fit w-full flex flex-col  ; 
">


<div className=" h-fit w-full p-[10px] flex flex-col items-center">

<div className=" h-full w-full">


<h2 className ="w-full h-full ${satoshi_regular}  font-medium hover:scale-110 hover:transition-all hover:duration-200 text-black border-[1px] border-red-100    bg-red-100 p-[5px] rounded-[15px]  flex flex-row justify-center items-center gap-[5px]  text-[24px]">{d.name}</h2>



</div>

</div>
</div>
</div>

</Link>

</div>
</div>

))}



</div>
</div>
  </div>

</div>


  </SheetContent>
</Sheet>
      </div>
      <div className=" flex flex-row w-full h-fit items-center  max-md:hidden">

      <Sheet >
  <SheetTrigger className="w-fit h-fit ${satoshi_regular}  font-medium hover:scale-105 hover:transition-all hover:duration-200 text-black border-[1px] border-red-100    bg-red-100 p-[5px] rounded-[15px]  flex flex-row justify-center items-center gap-[5px]  text-[14px]">
  <MenuIcon size={20} color="black"></MenuIcon>
  <h2 className="text-black">Kategoriler</h2>
  </SheetTrigger>
  <SheetContent>
    
  <div className="relative w-full h-full flex flex-col items-start justify-start   gap-[5px]   p-[10px] bg-[#fafafa]">

<div className=" relative w-full h-full gap-[5px]  flex flex-col  justify-start  ">
<h2 className="text-black text-[18px]">Kategoriler</h2>
<Separator className="h-[1px] bg-black"/>

       {categoryNames.map((d,g) => (
                                  <div className="w-full  " key={g}>


<div className=" w-full h-fit flex flex-col items-start justify-start   gap-[5px] ">


<Link href={`/${d.id}`}>
<div className="  w-full    " >

<div className="  h-fit w-full flex flex-col  ; 
">


<div className=" h-fit w-full  flex flex-col items-center">

<div className=" h-full w-full bg[#fcfcfc]">


<h2 className ="w-full h-full ${satoshi_regular}  font-medium  hover:bg-[#86c5dd] hover:scale-110 hover:transition-all hover:duration-200 text-black    p-[5px] rounded-[15px]  flex flex-row justify-center items-center gap-[5px]  text-[18px]">{d.name}</h2>



</div>

</div>
</div>
</div>

</Link>

</div>
</div>

))}



</div>
</div>  
  </SheetContent>
</Sheet>
 
    <SearchComponen result = {result}/>
      <div className="lg: relative w-full h-fit  flex  justify-end items-center  p-0 gap-[5px]   ">
   
            <div className="w-fit h-full bg-[#fee2e2] flex items-center ">
              <DropdownMenu>
  <DropdownMenuTrigger>
  <MdAccountBox size={30}  />

  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Hesap</DropdownMenuLabel>
    <DropdownMenuSeparator />
      {session && 
    <DropdownMenuItem>
    <Link href={"/AccountSettings"} className="flex flex-row items-center gap-[5px]">
            <MdAccountBox size={30}  />
            Hesap Bİlgileri
              </Link>
    </DropdownMenuItem>
      }
    <DropdownMenuItem>
    {session ? <button onClick={() => logout()}> 
        <div className="w-[115px]    h-full  flex flex-row items-center justify-start gap-[5px]    ">
          <LogOut size={"20px"} color="black" />
          <h2 className="text-black ">Çıkış Yap</h2>
        </div>


        </button>:
     
     <Link  href={"/authPage"} >
<div className={`w-fit h-fit ${satoshi_regular}  font-medium hover:scale-105 hover:transition-all hover:duration-200   p-[5px] rounded-[15px]  flex flex-row justify-center items-center gap-[5px]  text-[14px] `}>
<div className="w-[115px]    h-full  flex flex-row items-center justify-start gap-[5px]    ">
          <LogInIcon size={"20px"} color="black" />
          <h2 className="text-black ">Giriş Yap</h2>
        </div>


        
        </div>
        </Link>
         }
    </DropdownMenuItem>

  </DropdownMenuContent>
</DropdownMenu>
          
          </div>                 
      
          
        {session   ?  
        
        <Popover>
        <PopoverTrigger>  <div className="w-[60px]     h-full  flex flex-row items-center justify-start gap-[5px] bg-[#fee2e2]  ">
             
                <CiShoppingBasket size={"30px"} color="black" />
                <h2 className="text-black">
                  
                  
                  { cart?.items.length }
                  </h2>
              </div></PopoverTrigger>
        <PopoverContent className="p-[10px] gap-[20px]  w-fit " >
          {cart?.items.length ?  
          
          <div className="w-full h-fit flex-col gap-[20px] p-[5px]">
           <h2 className="w-full h-fit text-[18px] pb-[10px]">

           { cart?.items.length } Tane İtem Var

           </h2>
           <Separator/>
           {cart?.items.map((g) => (
             <div key={g.id} className="w-full h-fit  flex flex-row">
             <div className="w-full h-fit  flex flex-row gap-[5px] ">
            
               <Link href={`/shopping-bag`} className="">
             <Image alt="13" width={100} height={100} className="w-fit h-fit object-fill" src={g?.images && g.images[0].url } />
           </Link>
             <div className="w-full h-[150px] flex flex-col justify-start">
            <div className="h-full p-[10px] bg-[#fafafa]">

             <h2 className="w-full h-fit  flex flex-col justify-start items-start">{g.name}</h2>
             <div className="w-full h-fit flex flex-row items-center bg-[#fafafa]  ">
             <Button onClick={() => {delItem(session.id,g.id,pathname)}} className="w-fit h-fit" variant={null}>

             <Minus    />
             </Button>
             <h2>Miktar : {g.quantity}</h2>
             <Button onClick={() => {addItem(cart.items,session.id,g.id,pathname)}} className="w-fit h-fit" variant={null}>


             <Plus/>
             </Button>

             </div>
            </div>
             <h2 className="w-full h-full flex flex-col justify-end items-start p-[10px]">Fiyatı:      {Number(g.price ) * g.quantity}  </h2>
             </div>
             </div>
           </div>

           ))}
           {cart?.items.length ?
           
           <div className="w-full h-fit justify-between flex flex-row items-center">
            <h2>


            Total Fiyat: {totalPrice} 
            </h2>

           <Button onClick={() => {delAllItem(session.id)}}>
            <h2>
              Sepeti Kaldır
            </h2>
           </Button>
           </div> : null
           }

          </div>
          : null
          }
         
          <Link href={'/shopping-bag'}>
          <Button>

          <h2>
            Sepete Git
          </h2>
          </Button>

         </Link>
         </PopoverContent>
      </Popover>
        
      
      : null}


        
      </div>
      </div>

    </div>
  
    </div>

  );
};

export default Navbar;
