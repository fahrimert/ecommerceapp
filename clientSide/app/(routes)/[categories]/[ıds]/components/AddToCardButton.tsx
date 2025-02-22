"use client"
import { addItem} from "@/app/actions/add-to-card";
import { Button } from "@/components/ui/button"
import { Image, Prisma } from "@prisma/client";
import { redirect, usePathname, useRouter } from "next/navigation";
import { MouseEventHandler, useTransition } from "react";
interface  AddToCardButton {
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
    formattedProducts: {    
            id: string;
            categoryId: string;
            order: number;
            ek: Prisma.JsonValue[] | null;
            iadeSarti: String;
            stok: number;
            name: string;
            image: {
                id: string;
                productId: string;
                url: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
            price: string
            isFeatured: Boolean
            isArchived: Boolean
            createdAt: Date
            updatedAt: Date
            images: {
                id: string;
                productId: string;
                url: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
       }
}
const AddToCardButton:React.FC<AddToCardButton> = ({formattedProducts,session}) => {

const userId = session?.id
const router = useRouter()
const pathname = usePathname()

const onAddToCard = (products:any,userId:string) => {
    if (userId) {
        addItem([products],userId,products.id,pathname)
    }
else{
    router.push('/authPage')
}                    // Initiating a transition when the button is clicked
   };
  return (
    <Button onClick={() => (onAddToCard(formattedProducts,userId!))} className=" relative w-full h-fit text-[16px] text-white">Sepete Ekle</Button>
)
}

export default AddToCardButton