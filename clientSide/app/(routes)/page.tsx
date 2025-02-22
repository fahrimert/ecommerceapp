import HomePageMain from "@/components/HomePageMain";
import { formatter } from "@/lib/utils";
import { format } from "util";
import { Metadata } from "next";
import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { getJustSession } from "@/helpers/get-user-session";
export const metadata:Metadata = {
  title:'Yardım Sayfası | '
}
export default async function Home() {

  const session = await getJustSession()
  const categories = await fetch('http://localhost:3000/api/getAllCategories') 
  let categoriesforMainPage = await categories.json() as  {
    name: string;
    id: string;
    imageOfCategory: {
        id: string;
        categoryId: string;
        url: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
}[]

const anaSayfacategoriesdb = await fetch('http://localhost:3000/api/getTheMainPageCategoriesAndTheirProduct') 
let anaSayfacategoriess = await anaSayfacategoriesdb.json() as 
  ({
    id: string,
    name: string,
    order: number,

    anasayfa: boolean,
    createdAt: Date,
    updatedAt: Date,
    products: {
      id: string;
      categoryId: string;
      order: number;
      name: string;
      price: number;
      quantity:number
      anasayfa: boolean;
      images: {
        id: string;
        productId: string;
        url: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
      ek: Prisma.JsonValue | null;
      stok:number
      iadeSarti:String
      isFeatured:Boolean
      isArchived:Boolean
      createdAt:Date
      updatedAt: Date;

  }[]}[])
 



const formattedProductss= 
{
  categories:anaSayfacategoriess?.map((item) => ({
  id:item.id,
  order:item.order,
  name : item.name, 
  anasayfa:item.anasayfa,
  createdAt: format(item.createdAt,"MMMM do, yyyy"),
  updatedAt:format(item.updatedAt,"MMMM do, yyyy"),
  products:item.products.map((g) => ({
    id: g.id,
    categoryId: g.categoryId,
    order: g.order,
    name: g.name,
    images:g.images,
    anasayfa: g.anasayfa,
    ek: g.ek,
    stok:g.stok,
    iadeSarti:g.iadeSarti,
    isFeatured:g.isFeatured,
    isArchived:g.isArchived,
    createdAt:g.createdAt,
    updatedAt: g.updatedAt,
    price:formatter.format(g.price),
    createdAtProduct: format(g.createdAt,"MMMM do, yyyy"),
    updatedAtProduct:format(g.updatedAt,"MMMM do, yyyy"),
  }))
  
}))}



    return (
    <div>
      <div className="w-full h-fit flex flex-col gap-[20px]" >
    
      <div className=" flex flex-col items-center justify-center w-full "> 

        <HomePageMain 
        result = {formattedProductss}
        categoriesforMainPage = {categoriesforMainPage}
   />
      </div>
      </div>
    </div>
  );
}
