"use client"
import { satoshi_black } from "@/public/fonts/fonts"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useCallback, useState } from "react"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useSingleSelect } from "@/hooks/useSingleSelect"
import { useSingleSelectForPrice } from "@/hooks/useSingleSelectForPrice"
import { useSingleSelectForCreatedDate } from "@/hooks/useSingleSelectForCreatedDate"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


interface HeadingPageProps {
    title:{
      name: string;
  } | null

    prices:number[] | undefined
}
const HeadingWithProduct:React.FC<HeadingPageProps> = ( {title,prices}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
  const[checked,setChecked] = useState(false)
 
  



  const { selected, isSelected, onChange } = useSingleSelect([]);
  const { selectedForPrice, isSelectedForPrice, onChangeForPrice } = useSingleSelectForPrice([]);
  const { selectedForCreatedDate, isSelectedForCreatedDate, onChangeForCreatedDate } = useSingleSelectForCreatedDate([]);

  
  /* biz renke göre filtreleyecez ilk  */
  return (
    <div className="z-0 w-full h-[200px] absolute">
    <div className=" w-full h-[200px] flex flex-col justify-start items-start gap-[10px] bg-[#fee2e2]   z-0 p-[20px] ">
              
      <div className=" relative w-fit h-fit flex flex-row justify-start items-start ">
        <div className=" relative w-fit h-full flex flex-row justify-start items-start gap-[10px] mr-[30px] bg-white rounded-[15px] p-[5px]">
          
        <NavigationMenu  >
      <NavigationMenuList >
    


        <NavigationMenuItem>
                    <div>
        <NavigationMenuTrigger>
                    <h2
            className={`${satoshi_black}  font-medium text-[16px]  items-center justify-center tracking-[-0.32px] leading-[38px]`}
          >
            Fiyat Filtresi
          </h2>
       
                  
           

        </NavigationMenuTrigger>
          <NavigationMenuContent>
                <NavigationMenuLink asChild>
                <div className=" w-[300px] h-fit flex flex-col  p-[10px]    ">
                <div className="w-full h-fit flex flex-row items-center justify-start gap-[5px]  ">
                    <input
                  id={`0-${Math.min(...prices!)}`}
                  type="checkbox"
                  value={`0-${Math.min(...prices!)}`}
                  checked={isSelectedForPrice(`0-${Math.min(...prices!)}`)}
                  onChange={onChangeForPrice}
                />                 
            
             <h2>0-{Math.min(...prices!)} TL Arası (6)</h2>
                </div>
                <div className="w-full h-fit flex flex-row items-center justify-start gap-[5px]  ">
                <input
                  id={`${Math.min(...prices!)}-${Math.max(...prices!) + Math.min(...prices!)/2}`}
                  type="checkbox"
                  value={`${Math.min(...prices!)}-${(Math.max(...prices!) + Math.min(...prices!))/2}`}
                  checked={isSelectedForPrice(`${Math.min(...prices!)}-${(Math.max(...prices!) + Math.min(...prices!))/2}`)}
                  onChange={onChangeForPrice}
                />     
                  <h2>{Math.min(...prices!)}-{(Math.max(...prices!) + Math.min(...prices!)) /2 }  Arası (6)</h2>
                </div>
                <div className="w-full h-fit flex flex-row items-center justify-start gap-[5px]  ">
                <input
                  id={`${(Math.max(...prices!) + Math.min(...prices!)) /2 }-${Math.max(...prices!)}`}
                  type="checkbox"
                  value={`${(Math.max(...prices!) + Math.min(...prices!)) /2 }-${Math.max(...prices!)}`}
                  checked={isSelectedForPrice(`${Math.min(...prices!)}-${(Math.max(...prices!) + Math.min(...prices!))/2}`)}
                  onChange={onChangeForPrice}
                />  
                  <h2>{(Math.max(...prices!) + Math.min(...prices!)) /2 }-{Math.max(...prices!)}  Arası (6)</h2>
                </div>
               </div>
                </NavigationMenuLink>
          </NavigationMenuContent>

                       
                    </div>
        </NavigationMenuItem>
  

        </NavigationMenuList>
        </NavigationMenu>
       
        </div>
        <div className=" relative w-fit h-full flex flex-row justify-center items-center gap-[10px]">
          <h2
            className={`${satoshi_black}  font-black text-[16px]  items-center justify-center tracking-[-0.32px] leading-[38px]`}
          >
   {/*          <NavigationMenu  >
      <NavigationMenuList >
    


        <NavigationMenuItem>
                    <div>
        <NavigationMenuTrigger>
                    <h2
            className={`${satoshi_black}  font-black text-[16px]  items-center justify-center tracking-[-0.32px] leading-[38px]`}
          >
            Diğer Filtreler
          </h2>
       
                  
           

        </NavigationMenuTrigger>
          <NavigationMenuContent>
                <NavigationMenuLink asChild>
                <div className=" w-[300px] h-fit flex flex-col  p-[10px]  m-[10px]  ">
                <div className="w-full h-fit flex flex-row items-center justify-start gap-[5px]  ">
                    <input
                  id={'asc'}
                  type="checkbox"
                  value={'asc'}
                  checked={isSelectedForCreatedDate('asc')}
                  onChange={onChangeForCreatedDate}
                />                 
                <h2>En Yeniler</h2>
                </div>
         
               </div>
                </NavigationMenuLink>
          </NavigationMenuContent>

                       
                    </div>
        </NavigationMenuItem>
  
        </NavigationMenuList>
        </NavigationMenu> */}
          </h2>
      
        </div>
      </div>
              <div className='  w-full h-fit flex flex-col justify-start items-center gap-[30px]   '>
<h2 className='  w-fit h-fit font-sans font-extrabold text-[40px]  text-black text-wrap '>{title?.name}</h2>
</div>
                 
    </div>
      </div>
  )
}

export default HeadingWithProduct