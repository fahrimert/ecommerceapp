import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Raleway} from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import {  satoshi_regular } from "@/public/fonts/fonts";
import MostSellingProducts from "@/components/MostSellingProducts";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCardButton from "./components/AddToCardButton";
import { formatter } from "@/lib/utils";
import HeadingOfSingleProduct from "./components/HeadingOfSingleProduct";
import { Separator } from "@/components/ui/separator";
import { Prisma } from "@prisma/client";
import { getJustSession } from "@/helpers/get-user-session";
import CommentComponent from "./components/CommentComponent";
import { ScrollArea } from "@/components/ui/scroll-area";


const raleway = Raleway({
  subsets:["latin"]
});



const NewProductsDetailPage = async ({
  params, 
}: {
  params: { categories: string; ıds: string };
}) => {

 
  const session = await getJustSession()
  const getInduvualComments =   await fetch(`http://localhost:3000/api/getAllCommentsInduvual?name=${params.ıds}`)
  const basedComments =  await getInduvualComments.json() as  ({
    whomadeit: {
      id: string;
      name: string | null;
      email: string;
      emailVerified: Date | null;
      image: string | null;
      password: string | null;
      createdAt: Date;
      updatedAt: Date;
  };
} & {
  id: string;
  comment: string;
  commentId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
})[]
  
  const basedProductDB = await fetch(`http://localhost:3000/api/getTheInduvualProduct?name=${params.ıds}`)
  const basedCategory =  await basedProductDB.json() as 
{ id: string;
  categoryId: string;
  order: number;
  name: string;
  price: number;
  quantity:number
  images: {
    id: string;
    productId: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}[];
  anasayfa: boolean;
  ek: Prisma.JsonValue[] | null;
  stok:number
  iadeSarti:String
  isFeatured:Boolean
  isArchived:Boolean
  createdAt:Date
  updatedAt: Date;}
  const formattedProducts = {
    id: basedCategory?.id,
    categoryId: basedCategory?.categoryId,
    order: basedCategory?.order,
    ek:basedCategory.ek,
    iadeSarti:basedCategory.iadeSarti,
    stok:basedCategory.stok,
    name: basedCategory?.name,
    image:basedCategory.images,
    price: formatter.format(basedCategory?.price),
    isFeatured: basedCategory?.isFeatured,
    isArchived: basedCategory?.isArchived,
    createdAt: basedCategory?.createdAt,
    updatedAt: basedCategory?.updatedAt,
    images: basedCategory?.images,
  };

  const mostSellingProducts = await fetch(`http://localhost:3000/api/getTheMostSoldProducts`)
  const obj = await mostSellingProducts.json() as
  ({
    product: {
      images: {
          id: string;
          productId: string;
          url: string;
          createdAt: Date;
          updatedAt: Date;
      }[];
  } & {
    id: string;
    categoryId: string;
    order: number;
    name: string;
    quantity:number
    price: number;
    anasayfa: boolean;
    ek: Prisma.JsonValue | null;
    stok:number
    iadeSarti:String
    isFeatured:Boolean
    isArchived:Boolean
    createdAt:Date
    updatedAt: Date;
  };
  howManyTimes: number;


})[]
 
  let flteredDataaaForMostSelling = {
    filteredData: obj
      .map((a) => ({
        id: a.product.id,
        categoryId: a.product.categoryId,
        images: a.product.images,
        order: a.product.order,
        quantity: a.product.quantity,
        name: a.product.name,
        price: formatter.format(a.product.price),
        isFeatured: a.product.isFeatured,
        isArchived: a.product.isArchived,
        createdAt: a.product.createdAt,
        updatedAt: a.product.updatedAt,
        howManyTimes: a.howManyTimes,
      }))
      .sort((a, b) => b.howManyTimes - a.howManyTimes),
  };
  const uniqueProducts = Object.values(
    flteredDataaaForMostSelling.filteredData.reduce((acc:any,  item) => {
      if (!acc[item.id]) {
        acc[item.id] = item;
      }
      return acc;
    }, {})
  ) as  {
    id: string;
    categoryId: string;
    images: {
        id: string;
        productId: string;
        url: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    order: number;
    quantity: number;
    name: string;
    price: string;
    isFeatured: Boolean;
    isArchived: Boolean;
    createdAt: Date;
    updatedAt: Date;
    howManyTimes: number;
}[]

  /* bu kısım çalışmayabilir belki orderlayınca belli olcak  */
  const response = formattedProducts
  const categoryNamee = params.categories

  const basedCategoryDB = await fetch(`http://localhost:3000/api/getTheBasedCategoryNames?name=${categoryNamee}`)
  const categoryName =  await basedCategoryDB.json() as{ 
    name: string;
}
const productDB = await fetch(`http://localhost:3000/api/getTheInduvualProduct?name=${params.ıds}`)
const productName =  await productDB.json() as  {
  id: string;
  name: string;
  order: number;
  anasayfa: boolean;
  createdAt: Date;
  updatedAt: Date;
  products:{
        id: string;
            categoryId: string;
            order: number;
            name: string;
            price: string;
            quantity:number
            images: {
              id: string;
              productId: string;
              url: string;
              createdAt: Date;
              updatedAt: Date;
          }[];
            anasayfa: boolean;
            ek: Prisma.JsonValue | null;
            stok:number
            iadeSarti:String
            isFeatured:Boolean
            isArchived:Boolean
            createdAt:Date
            updatedAt: Date;
            }[];
}
  const categoryNamesdb = await fetch('http://localhost:3000/api/getJustCategoryNames')
  const categoryNames = await categoryNamesdb.json() as  {
    id: string;
    name: string;
    order: number;
    anasayfa: boolean;
    createdAt: Date;
    updatedAt: Date;
}[]

if (categoryNames.map((item) => item.name).includes(categoryNamee)) {
    throw notFound();
  }
  const idsNames = await fetch('http://localhost:3000/api/getAllProductIds')
  const idsNamesa = await idsNames.json() as {
    id: string;
}[]
if (!idsNamesa.map((item) => item.id).includes(params.ıds)) {
    throw notFound();
  }
  

  return (
    <div className=" relative w-full h-fit flex flex-col justify-start items-center  bg-white my-[50px]">
        <div className=" relative w-full h-fit flex flex-col justify-center items-center">
   
          <div className=" w-[80%] h-fit flex flex-col justify-start items-start ">
        
            {/* indirim ve yeni eklenenler yapılacak bu arada */}
            <HeadingOfSingleProduct
            params={params}
            categoryNames = {categoryName}
            productName = {productName}
            />
          </div>

          <div className="relative w-[80%] h-fit flex flex-row gap-[30px] items-start  justify-start p-[10px] max-lg:flex max-lg:flex-col bg-white">
        <div className=" relative w-full h-fit flex flex-col gap-[12px] bg-white max-lg:w-[100%] ">
        <Carousel
    
      >
        <CarouselContent >
          {response?.images?.map((item) => (
            <>
                                        <CarouselItem className="w-fit h-[600px]" >
              <div className=" relative w-full h-[600px]  max-md:h-[300px] flex flex-row justify-center items-center gap-[10px] object-contain">
                <Image
                  src={item.url}
                  className=" w-fit h-fit flex flex-row justify-center items-center object-cover"
                  fill
                  alt="232"
                />
              </div>
              </CarouselItem>

            </>
          ))}
          </CarouselContent>
          </Carousel>
           <div className="relative w-full h-fit flex flex-col items-start   gap-[15px] p-[20px] bg-[#fafafa]">

      <div className=" relative w-full gap-[20px] h-fit  flex row p-[10px]  ">
      <Carousel
         autoplay={true}
         autoplayInterval={3000}
         opts={{
           loop: true,
         }}
      >
        <CarouselContent >
             {response?.images?.map((d,g) => (
                                        <CarouselItem className="w-fit  basis-1/2" key={g}>

     
     <div className=" w-full h-fit flex flex-col items-center justify-center   gap-[10px] ">


<Link href={`/${d.id}`}>
 <div className="   background-color: #fdf1ec;  " >

<div className="  h-fit w-full flex flex-col  ; 
">

<div className="float-left h-full w-full rounded-[15px]">
<Image
       src={d.url}
       alt="232"
        width={300}
        height={300}
       className="w-[300px] h-[300px]  object-fit rounded-[15px] object-cover"
 
     />
</div>
<div className=" h-fit w-full p-[10px] flex flex-col items-center">



 </div>
</div>
</div>

</Link>

</div>
</CarouselItem>

))}
</CarouselContent>
 </Carousel>

     
 
      </div>

</div>     

        </div>
        <div className="relative w-[60%] h-fit flex flex-col justify-start items-center gap-[16px] p-[20px] shadow-lg border-[1px] max-lg:w-[100%] ">
        <div className="h-[200px] w-full flex flex-col justify-start items-start">

          <div className=" relative w-full h-full flex flex-col justify-start items-start gap-[20px] p-0">
            <div className=" relative w-full h-full flex flex-col justify-start items-start gap-[10px] p-0">

            <h2 className="relative w-fit h-fit  text-[24px] leading-[28.8px]  ">
              {response?.name}         
            </h2>
            <h2 className="relative w-fit h-fit  text-[18px]  ">
              {response?.price} 
            </h2>
            </div>

            <div className=" w-full h-full flex flex-row   justify-center items-center  ">
                <AddToCardButton formattedProducts={response} session = {session} />
              </div>
          </div>

        </div>
          <div className="relative w-full h-full flex flex-row  justify-center items-start gap-[10px] ">
          <Tabs
              className="relative w-fit h-fit flex flex-col justify-center items-center  pt-[10px] bg-white"
              defaultValue="account"
            >
              <TabsList className="relative w-full h-fit flex flex-row justify-center items-center  pt-[10px] bg-white">
                <TabsTrigger value="product">Ürün Bilgisi</TabsTrigger>
                <TabsTrigger value="detail">Detaylar</TabsTrigger>
                
              </TabsList>


              <TabsContent
                value="product"
                className=" relative w-full h-fit flex flex-col items-start justify-center gap-[10px] bg-white"
              >
                <ScrollArea className="h-[600px]"> 

                <div className='relative  w-full h-fit flex flex-col justify-between items-start  p-[20px ]   bg-[##FAF9F7]'>
        {response.ek && response.ek.map((entry:any,z:any) =>   
        <>
            <div key={z} className=" w-full h-fit flex flex-col items-center justify-center gap-[10px] p-[10px]">
<h2 className="w-fit text-[18px]">

{entry.key} 
</h2>
<Separator/>

<h2 className={`w-full justify-start items-start flex flex-row  font-${raleway.className}   font-medium `}>

{entry.value}
</h2>
          </div>
        </>

  )}

                    </div>
                </ScrollArea>

              </TabsContent>

              <TabsContent
                value="detail"
                className=" relative w-full h-fit flex flex-col items-start justify-center gap-[10px] bg-white"
              >
                <ScrollArea className="h-[600px]">

                <div className='relative  w-full h-fit flex flex-col justify-between items-start  p-[20px ]   bg-[##FAF9F7]'>
                <div  className=" w-full h-fit flex flex-col items-center justify-center gap-[10px] p-[10px]">


                <h2 className="w-fit text-[18px]">
İade Şartı

                </h2>
<h2 className="w-full justify-start items-start flex flex-row">
  {response.iadeSarti}
</h2>
                <h2 className="w-fit text-[18px]">
Stok Bilgisi

                </h2>
                
<h2 className="w-full justify-start items-start flex flex-row">
  {response.stok} Tane Stoğumuzda Bu Üründen Kalmıştır.
</h2>
</div>

                </div>
                </ScrollArea>

              </TabsContent>
            </Tabs>
         
         
          </div>

        <div className=" w-full  h-fit flex flex-row justify-center items-center  gap-[17px]">
              <div className=" w-full h-full flex flex-row   justify-center items-center  ">
                <Button>
                  <Link
                    href={"https://www.instagram.com/craft_by_durdane/"}
                    className={`w-full h-full font-${satoshi_regular} text-white text-[18px] `}
                  >
                    {" "}
                    İnstagram İle İletişime Geç{" "}
                  </Link>
                </Button>
              </div>
            </div>
        </div>

      </div>
      {session &&
      <CommentComponent session = {session} ids = {params.ıds} basedComments = {basedComments}/> }

        </div>
        <Separator/>
        <MostSellingProducts session={session} flteredDataaaForMostSelling = {uniqueProducts}/>
      </div>
    
 
  );
};
export default NewProductsDetailPage;

    

 export async function generateStaticParams() {
  const categoryNamesdb = await fetch('http://localhost:3000/api/getAllProductIds')
  const categoryNames = await categoryNamesdb.json() as {
    id: string;
}[]

return categoryNames.map((item) => ({
  categories: `${item.id}`,
  ıds: `${item.id}`,

}));
  
}  