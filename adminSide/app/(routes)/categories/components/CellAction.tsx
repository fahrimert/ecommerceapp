"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {  Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CategoryColumn } from "./columns";
import { deleteCategory } from "@/actions/categoryActions/delete-category";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
  data: CategoryColumn;
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const handleDelete = (productId:string) => {
        deleteCategory(productId)
    }
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
  
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button  className="h-8 w-8 p-0 ">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4 " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className=" mr-[20px] bg-white">
          <DropdownMenuLabel>Aksiyonlar</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`categories/${data.id}`)}
          >  <Button>
            <Edit className="mr-2 h-4 w-4 " />
          Güncelle</Button>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Button
          onClick={() => handleDelete(data.id)}
            
            >

            <Trash className="mr-2 h-4 w-4 " />
            Sil
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
