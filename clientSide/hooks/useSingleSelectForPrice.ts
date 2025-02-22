"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export const useSingleSelectForPrice = (initialValue: string[]) => {
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
     
      const [selectedForPrice, setSelectedForPrice] = useState<string[]>(initialValue);

 /*      useEffect(() => {
        if (searchParams.has("priceFilter")) {
        const valueFromSearchparams = searchParams.get("priceFilter")
        setSelectedForPrice([valueFromSearchparams]);
    }

},[]) */
  
  const onChangeForPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (selectedForPrice.includes(value)  ) {
      setSelectedForPrice([]);
      const nextSearchParams = new URLSearchParams(searchParams.toString())
      nextSearchParams.delete('priceFilter')
      router.replace(`${pathname}?${nextSearchParams}`)    }
       else {
       
      setSelectedForPrice([value]);
      router.push(pathname + '?' + createQueryString('priceFilter', value))
    }
 
};
  const isSelectedForPrice = (value: string) => {
    return selectedForPrice.includes(value);
  };
  return { selectedForPrice, isSelectedForPrice, onChangeForPrice };
};