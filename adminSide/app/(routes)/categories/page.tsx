"use server";
import prismadb from "@/lib/db";
import React from "react";
import CategoryPageHeading from "./components/CategoryHeading";
import { CategoryColumn, columns } from "./components/columns";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/DataTable";
import { CategoryWithProducts } from "@/types";

const CategoryPage = async () => {

  const dataa = await prismadb.categories.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });



  const formattedProducts: CategoryColumn[] = dataa.map((item) => ({
    id: item.id,
    categoryName: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  

  return (
    <>
      <div className=" relative w-full flex flex-col   items-start justify-center gap-0 p-0">
        <CategoryPageHeading
          title="Kategoriler"
          description="Ürün Kategorilerinizi Görüntüleyin"
        />
      </div>
      <DataTable
    
        searchKey="categoryName"
        columns={columns}
        data={formattedProducts}
      />
    </>
  );
};

export default CategoryPage;
