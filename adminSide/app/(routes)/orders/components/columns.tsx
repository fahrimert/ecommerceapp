"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = {
  id: string
  phone :string
  address:string 
  isPaid:boolean
  totalPrice:string 
  products:string 
  createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Ürünler",
  },
  {
    accessorKey: "phone",
    header: "Telefon Numarası",
  },
  {
    accessorKey: "address",
    header: "Adressi",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Ödenen Miktar",
  },
  {
    accessorKey: "isPaid",
    header: "Ödendi Mi? ",
  },
  {
    accessorKey: "createdAt",
    header: "Sipariş Tarihi",
  },
]
