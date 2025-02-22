"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./CellAction"

export type ProductColumn = {
  id: string
  name: string
  price:string 
  category:string
  images:{
    id: string;
    productId: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}[]
  isFeatured:boolean
  isArchived:boolean
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Ürün İsmi",
  },
  {
    accessorKey: "category",
    header: "Kategorisi",
  },
  {
    accessorKey: "isArchived",
    header: "Arşiv Durumu",
  },
  {
    accessorKey: "isFeatured",
    header: "Sitede Görüntüleniyormu",
  },
  {
    accessorKey: "price",
    header: "Fiyatı",
  },
  {
    accessorKey: "createdAt",
    header: "Eklendiği Gün",
  },


  {
    id:"actions",
    cell : ({row}) => <CellAction data ={row.original}/>
  }
]
