"use client"
import { satoshi_black } from "@/public/fonts/fonts"
import { Separator } from "./ui/separator"
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
import { Checkbox } from "./ui/checkbox"
import { useCallback, useState } from "react"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useSingleSelect } from "@/hooks/useSingleSelect"
import { useSingleSelectForPrice } from "@/hooks/useSingleSelectForPrice"
import { useSingleSelectForCreatedDate } from "@/hooks/useSingleSelectForCreatedDate"

interface HeadingPageProps {
    title:string,
    description:Array<string>
    colors:string[] | undefined
    prices:number[] | undefined
}
const Heading:React.FC<HeadingPageProps> = ( {title,description,colors,prices}) => {
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
 
  

  const uniqueColors = colors?.map(item => item).filter((value, index, self) => self.indexOf(value) === index)

  const [color,setColor] = useState(false)

  const { selected, isSelected, onChange } = useSingleSelect([]);
  const { selectedForPrice, isSelectedForPrice, onChangeForPrice } = useSingleSelectForPrice([]);
  const { selectedForCreatedDate, isSelectedForCreatedDate, onChangeForCreatedDate } = useSingleSelectForCreatedDate([]);

  
  /* biz renke göre filtreleyecez ilk  */
  return (
    <>
    <div className=" w-full h-fit flex flex-col justify-center items-start gap-[10px] bg-white">
                    <h2 className={`${satoshi_black}  font-normal text-[32px]  items-center justify-center tracking-[-1.5px]`}>  
                    {title}</h2>
                    <div className=" w-full h-fit flex flex-row items-center justify-start gap-[30px]">
                   
                    {description.map((item) => 

                    
                     <h2 key={item} className={`${satoshi_black}  font-normmal text-[16px]  items-center justify-center tracking-[-0.32px] leading-[38px]`}>  
                    {item}
                    </h2>
                    )}
                   
                    </div>
    </div>
      <Separator />
      <div className=" relative w-full h-fit flex flex-row justify-between items-center">
        <div className=" relative w-fit h-full flex flex-row justify-center items-center gap-[10px]">
          
        <NavigationMenu  >
      <NavigationMenuList >
    


        <NavigationMenuItem>
                    <div>
        <NavigationMenuTrigger>
                    <h2
            className={`${satoshi_black}  font-black text-[16px]  items-center justify-center tracking-[-0.32px] leading-[38px]`}
          >
            Fiyat Aralığı
          </h2>
       
                  
           

        </NavigationMenuTrigger>
          <NavigationMenuContent>
                <NavigationMenuLink asChild>
                <div className=" w-[300px] h-fit flex flex-col  p-[10px]  m-[10px]  ">
                <div className="w-full h-fit flex flex-row items-center justify-start gap-[5px]  ">
                    <input
                  id={`0-${Math.min(...prices!)}`}
                  type="checkbox"
                  value={`0-${Math.min(...prices!)}`}
                  checked={isSelectedForPrice(`0-${Math.min(...prices!)}`)}
                  onChange={onChangeForPrice}
                />                 
            
             <h2>0-{Math.min(...prices!)}  Arası (6)</h2>
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
        <NavigationMenuItem>
                    <div>
        <NavigationMenuTrigger>
                    <h2
            className={`${satoshi_black}  font-black text-[16px]  items-center justify-center tracking-[-0.32px] leading-[38px]`}
          >
            Renk
          </h2>
       
                  
           

        </NavigationMenuTrigger>
          <NavigationMenuContent>
                <NavigationMenuLink asChild>
               <div className=" w-[300px] h-fit flex flex-col  p-[10px]  m-[10px]  ">
                {uniqueColors?.map((item,index) => 
                 <div key={index} className="w-full h-fit flex flex-row items-center justify-start gap-[5px]  ">
                <input
              id={item}
              type="checkbox"
              value={item}
              checked={isSelected(item)}
              onChange={onChange}
            />
                 <h2>{item}</h2>
               </div>
                )}
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
      </>
  )
}

export default Heading