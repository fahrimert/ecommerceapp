"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export const useSingleSelectForCreatedDate = (initialValue: string[]) => {
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
     
      const [selectedForCreatedDate, setSelectedForCreatedDate] = useState<string[]>(initialValue);

      useEffect(() => {
        if (searchParams.has("createdDate")) {
        const valueFromSearchparamsForCreatedDate = searchParams.get("createdDate")
        setSelectedForCreatedDate([valueFromSearchparamsForCreatedDate!]);
    }

},[])
  
  const onChangeForCreatedDate  = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (selectedForCreatedDate.includes(value)  ) {
      setSelectedForCreatedDate([]);
      const nextSearchParams = new URLSearchParams(searchParams.toString())
      nextSearchParams.delete('createdDate')
      router.replace(`${pathname}?${nextSearchParams}`)    }
       else {
       
      setSelectedForCreatedDate([value]);
      router.push(pathname + '?' + createQueryString('createdDate', value))
    }
 
};
  const isSelectedForCreatedDate = (value: string) => {
    return selectedForCreatedDate.includes(value);
  };
  return { selectedForCreatedDate, isSelectedForCreatedDate, onChangeForCreatedDate };
};