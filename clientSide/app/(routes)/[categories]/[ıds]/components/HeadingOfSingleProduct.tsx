"use client"

import { useCallback, useState } from "react"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useSingleSelect } from "@/hooks/useSingleSelect"
import { useSingleSelectForPrice } from "@/hooks/useSingleSelectForPrice"
import { useSingleSelectForCreatedDate } from "@/hooks/useSingleSelectForCreatedDate"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Prisma } from "@prisma/client"



const HeadingOfSingleProduct = ({params,categoryNames,productName}: {
  params: { categories: string; ıds: string };
 categoryNames: {
    name: string;
}
productName: {
  id: string;
  name: string;
  order: number;
  anasayfa: boolean;
  createdAt: Date;
  updatedAt: Date;
  products: {
      id: string;
      categoryId: string;
      order: number;
      name: string;
      price: string;
      quantity: number;
      images: {
          id: string;
          productId: string;
          url: string;
          createdAt: Date;
          updatedAt: Date;
      }[];
      anasayfa: boolean;
      ek: Prisma.JsonValue | null;
      stok: number;
      iadeSarti: String;
      isFeatured: Boolean;
      isArchived: Boolean;
      createdAt: Date;
      updatedAt: Date;
  }[];
}
} ) => {
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
    <div className="w-full h-fit">
    <div className=" w-full h-fit flex flex-col justify-start items-start gap-[10px] bg-[#fffaf5] border-[1px] shadow-lg   p-[20px] ">
              
      <div className=" relative w-fit h-fit flex flex-row justify-start items-start ">
        <div className=" relative w-fit h-full flex flex-row justify-start items-start gap-[10px] mr-[30px] rounded-[15px] p-[5px]">
          
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Ana Sayfa</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
       <BreadcrumbLink href={`/${params.categories}`}>
                {categoryNames?.name}
              </BreadcrumbLink> 
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
        <BreadcrumbLink href={`${params.ıds}`}>
                {productName?.name}
              </BreadcrumbLink> 
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
       
        </div>
    
      </div>
          
                 
    </div>
      </div>
  )
}

export default HeadingOfSingleProduct