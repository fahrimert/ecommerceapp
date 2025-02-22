"use server";
import prismadb from "@/lib/db";
import React from "react";
import { DataTable } from "@/components/ui/DataTable"
import { columns, ProductColumn } from "./components/columns";
import ProductPageHeading from "./components/ProductPageHeading";
import { formatter } from "@/lib/utils";
import {format} from 'date-fns'
import Ppage from "./components/Ppage";

const ProductPage = async () => {
   const data = await prismadb.product.findMany({
    include:{
      category:true,
      images:true
    },
    orderBy:{
      createdAt:'desc'
    }
  }
  )
  const formattedProducts : ProductColumn[] = data.map((item) => ({
    id:item.id,
    images:item.images,
    name : item.name,
    isFeatured:item.isFeatured,
    isArchived:item.isArchived,
    price:formatter.format(item.price.toNumber()),
    category:item.category.name,
    createdAt: format(item.createdAt,"MMMM do, yyyy")
  }))
  console.log(formattedProducts);
  return (
    <>
      <div className=" relative w-full h-fit flex flex-col   items-start justify-center gap-0 p-0">
        <ProductPageHeading title="Ürünler" description="Mağazanızdaki Ürünleri Görün" />
      </div>
 <Ppage formattedProducts={formattedProducts}  />


    </> 
  );
};

export default ProductPage;
