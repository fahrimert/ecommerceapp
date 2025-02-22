"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
import { Dialog, DialogContent, DialogHeader,DialogDescription ,DialogTitle} from "./dialog";

interface ModalProps {
    title:string
    description:string
    isOpen:boolean 
    onClose : () => void;
    children?:React.ReactNode
}

/* interface kısmı typelarımızı yazmak için typescript için laızm  */
export const Modal:React.FC<ModalProps> = ({
    title,
    description,
    isOpen,
    onClose,
    children
}) => {
    const onChange = (open:boolean) => {
        if (!open) {
            onClose()
        }
    }
    /* bu kısım standart yazılış  */

    return (
        /* bu da standart  */
        <AlertDialog  open = {isOpen} onOpenChange={onChange}>
            <AlertDialogContent className="bg-black">
                <AlertDialogHeader>
                    <AlertDialogTitle> <h2 className="text-white">  {title}</h2></AlertDialogTitle>
                    <AlertDialogDescription ><h2 className="text-white">
                    <h2 className="text-white">

                    {description}
                    </h2>
                        </h2></AlertDialogDescription>
                </AlertDialogHeader>
                <div>
                <h2 className="text-white">
                {children}

                </h2>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

/* modalı hooksdan ui yerine aldım sıkıntı çıkarabilir  */  