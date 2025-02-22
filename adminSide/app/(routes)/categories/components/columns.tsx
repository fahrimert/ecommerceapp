"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./CellAction";

export type CategoryColumn = {
  id: string;
  categoryName: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "categoryName",
    header: "Kategori İsmi",
  },
  {
    accessorKey: "createdAt",
    header: "Kategori Üretilme Tarihi",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
