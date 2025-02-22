"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ProductColumn } from "./columns"
import { Button } from "@/components/ui/button";
import { Copy, Delete, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { deleteProduct } from "@/actions/delete-product";

interface CellActionProps {
    data:ProductColumn;
}
export const CellAction:React.FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()
    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const handleDelete = (productId:string) => {
        deleteProduct(productId)
    }

  return (
    <>

    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 ">
                <span className="sr-only">Menuyu Açın</span>
                <MoreHorizontal className="h-4 w-4 "/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuLabel>
                Aksiyonlar
            </DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer" onClick={() =>router.push(`products/${data.id}`)}>
                <Edit className="mr-2 h-4 w-4 "/>
                Ürünü Güncelle
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer"             onClick={() => handleDelete(data.id)}
            >
                <Trash className="mr-2 h-4 w-4 "/>
                Ürünü Sil
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </>
)
}
