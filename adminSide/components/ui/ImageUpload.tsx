"use client"

import { useEffect, useState } from "react";
import { Button } from "./button";
import { CloudUploadIcon, ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import {CldUploadWidget } from 'next-cloudinary'

interface ImageUploadProps {
    disabled? : boolean;
    value : string[]
    onChange : (value:string[]) => void
    onRemove : (value:string) => void
}
 
const İmageUpload:React.FC<ImageUploadProps> = (
    { disabled,
      onChange,
      onRemove,
      value
    }
) => {
    const [isMounted,setİsMounted] = useState(false)
    
    useEffect(() => {
     setİsMounted(true)
    },[])
    
    const onUpload = (result:any) => {
        console.log(result.info.secure_url)
        onChange(result.info.secure_url)
    }
    if(!isMounted) {
        return null
    }
    return (
<div>
        <div className="mb-4  items-center gap-4 grid grid-cols-2">
            {value.map((url) =>(
                <div key={url} className="relative w-[200px] h-[200px] overflow-hidden">
                    <div className="z-10 absolute op-2 right-2">
                        <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                            <Trash className="h-4 w-4"></Trash>
                        </Button>
                    </div>
                    <Image fill className="object-cover" alt="Image" src={url}/>
                </div>
            ))}

        </div>
        <CldUploadWidget  onUpload = {onUpload} uploadPreset="vssfrtpo">
            {({open}) => {
                const onClick = () => {
                    open()
                }
                return(
                     <Button 
                     type="button"
                     disabled = {disabled}
                     variant={null}
                     className=" bg-[#050505] text-white rounded-[10px] p-[20px]"
                     onClick={onClick}>
                        <ImagePlus className="h-4 w-4 mr-2 "/>
                        Fotoğraf Ekleyin
                    </Button>
                )
            }}
        </CldUploadWidget>
    </div>
  )
}

export default İmageUpload