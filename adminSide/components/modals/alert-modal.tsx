"use-client"

import { useEffect, useState } from "react"
import { Modal } from "../ui/modal"
import { Button } from "../ui/button"

interface AlertModalProps{
    isOpen:boolean,
    onClose : () => void
    onConfirm : () => void
    loading:boolean
}
/* kendimize alert modal yapıyoruz  */

export const AlertModal:React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {
    const [isMounted,setIsMounted] = useState(false)

    useEffect(() => {
     setIsMounted(true)
    },[])
    /* bu hydration mevzusu için yapılıyormuş  */

    if(!isMounted) {
        return null
    }
    return(
       <Modal 
    
       title="Emin Misiniz?"
       description="Bu Aksiyon Geri Alınamaz "
       isOpen = {isOpen}
       onClose={onClose}>
       <div className=" w-full h-full pt-6 space-x-2 flex items-center justify-end  bg-black">
        <Button disabled = {loading} variant = "outline" onClick={onClose}>İptal</Button>
        <Button disabled = {loading} variant="destructive" onClick={onConfirm}>Devam</Button>
        </div> 
       </Modal> 
       /* bu modal herhalde direk delete modalı  */
    )
}