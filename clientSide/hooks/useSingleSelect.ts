"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export const useSingleSelect = (initialValue: string[]) => {
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
     
      const [selected, setSelected] = useState<string[]>(initialValue);

      useEffect(() => {
        if (searchParams.has("color")) {
        const valueFromSearchparams = searchParams.get("color")
        setSelected([valueFromSearchparams!]);
    }

},[])
  
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (selected.includes(value)  ) {
      setSelected([]);
      const nextSearchParams = new URLSearchParams(searchParams.toString())
      nextSearchParams.delete('color')
      router.replace(`${pathname}?${nextSearchParams}`)    }
       else {
       
      setSelected([value]);
      router.push(pathname + '?' + createQueryString('color', value))
    }
 
};
  const isSelected = (value: string) => {
    return selected.includes(value);
  };
  return { selected, isSelected, onChange };
};