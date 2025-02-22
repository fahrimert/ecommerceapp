"use client";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { satoshi_black } from "@/public/fonts/fonts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Prisma } from "@prisma/client";
interface MainPageProps {
  result: {
    categories: {
        id: string;
        order: number;
        name: string;
        anasayfa: boolean;
        createdAt: string;
        updatedAt: string;
        products: {
            id: string;
            categoryId: string;
            order: number;
            name: string;
            images: {
                id: string;
                productId: string;
                url: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
            anasayfa: boolean
            ek: Prisma.JsonValue
            stok: number
            iadeSarti: String
            isFeatured: Boolean
            isArchived: Boolean
            createdAt: Date
            updatedAt: Date
            price: string
            createdAtProduct: string
            updatedAtProduct: string;
        }[];
    }[];
}
  categoriesforMainPage:{
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

}
const HomePageMain: React.FC<MainPageProps>  = ({categoriesforMainPage,result}) => {


  return (
    <div className="gap-[30px] flex flex-col w-full h-fit items-center justify-center">

    <div className="relative w-fit h-fit flex flex-col items-start   gap-[15px] p-[20px] bg-[#fafafa]">
<div className="w-fit flex flex-col items-start h-fit ">
  <h2 className={`${satoshi_black } font-medium text-[32px]`}>Kategorilerimiz</h2>
</div>
       <div className=" relative w-fit gap-[20px] h-fit  flex row p-[10px]  ">
      <Carousel
         autoplay={true}
         autoplayInterval={3000}
         opts={{
           loop: true,
         }}
      >
        <CarouselContent >
             {categoriesforMainPage.map((d,g) => (
                                        <CarouselItem className="w-fit  basis-1/4" key={g}>

     
     <div key={d.id} className=" w-full h-fit flex flex-col items-center justify-center   gap-[10px] ">


<Link href={`/${d.id}`}>
 <div className="   background-color: #fdf1ec;  " >

<div className="  h-fit w-full flex flex-col  ; 
">

<div className="float-left h-fit w-full rounded-[15px]">
<Image
       src={d.imageOfCategory.map((a) => a.url)[0]}
       alt="232"
       
       className="w-[200px] h-[200px]  object-fit rounded-[15px]"
       width={200} 
       height={200}
     />
</div>

<div className=" h-fit w-full p-[10px] flex flex-col items-center">

 <div className=" h-fit w-full">

    <h1 className = "text-[24px] text-[#474747] mr-0 my-0 ">{d.name}</h1>
   


 </div>

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

{result.categories.map((c,z) => 
<>
{z % 2 === 0 ? 
<div  className="relative w-[90%] h-fit flex flex-col items-center   gap-[15px] p-[20px] bg-[#fafafa]">

<div className="w-full h-fit flex flex-col  justify-center items-center gap-[15px]">
<div className="w-fit flex flex-col items-start h-fit text-[24px] ">
  <h2 className={`${satoshi_black } font-medium text-[32px]`}>{c.name}</h2>
</div>
<div className="w-full h-fit flex flex-row items-center justify-around max-lg:flex-col ">

      <div className=" relative w-fit gap-[20px] h-fit  grid grid-rows-3 max-xl:grid max-lg:grid-rows-3  max-md:grid max-md:grid-rows-2 p-[10px]  ">

      {c.products.slice(0,3).map((d) => (

      <div key={d.id} className=" w-full h-fit flex flex-col items-center justify-center   gap-[10px]  hover:scale-110 hover:transition-all hover:duration-400 ">


<Link href={`${d.categoryId}/${d.id}`}>
  <div className="   background-color: #fdf1ec;  " >

<div className="  h-fit w-full flex flex-col  ; 
">

<div className="float-left h-fit w-full rounded-[15px]">
<Image
        src={d.images.map((a) => a.url)[0]}
        alt="232"
        
        className="w-[300px] h-[300px]  object-fit rounded-[15px]"
        width={300} 
        height={300}
      /> 
</div>
<div className=" h-fit w-full p-[10px] flex flex-col items-center">

  <div className=" h-fit w-full">

    <h1 className = "text-[24px] text-[#474747] mr-0 my-0 ">{d.name}</h1>
    


  </div>
  <div className="h-fit w-full relative flex flex-col">

    <p className=" inline-block  h-fit  font-[lighter] text-[#474747] mr-0 my-0"><span className="inline-block h-fit text-[16px]">{d.price} </span></p>
  </div>
  </div>
</div>
</div>

</Link>

</div>
))}

      </div>
      <div className=" relative w-fit gap-[20px] h-fit  grid grid-rows-3 max-xl:grid max-lg:grid-rows-3  max-md:grid max-md:grid-rows-2 p-[10px]  ">

      {c.products.slice(3,c.products.length-1 ).map((d) => (

      <div key={d.id} className=" w-full h-fit flex flex-col items-center justify-center  gap-[10px] hover:scale-110 hover:transition-all hover:duration-400 ">


<Link  href={`${d.categoryId}/${d.id}`}>
  <div className="   background-color: #fdf1ec;  " >

<div className="  h-fit w-full flex flex-col  ; 
">

<div className="float-left h-fit w-full rounded-[15px]">
<Image
        src={d.images.map((a) => a.url)[0]}
        alt="232"
        
        className="w-[300px] h-[300px]  object-fit rounded-[15px]"
        width={300} 
        height={300}
      /> 
</div>
<div className=" h-fit w-full p-[10px] flex flex-col items-center ">

  <div className=" h-fit w-full">

    <h1 className = "text-[24px] text-[#474747] mr-0 my-0 ">{d.name}</h1>
    


  </div>
  <div className="h-fit w-full relative flex flex-col">

    <p className=" inline-block  h-fit  font-[lighter] text-[#474747] mr-0 my-0"><span className="inline-block h-fit text-[16px]">{d.price} </span></p>
  </div>
  </div>
</div>
</div>

</Link>

</div>
))}
     

      </div>
</div>

</div>
</div>
       :
<div  className="relative w-[90%] h-fit flex flex-col items-center  border-[1px] gap-[15px] p-[20px] bg-[#fafafa] ">
<div className="w-fit flex flex-col items-start h-fit text-[24px] ">
  <h2 className={`${satoshi_black } font-medium text-[32px]`}>{c.name}</h2>
</div>
      <div className=" relative w-fit gap-[20px] h-fit  grid grid-cols-4 max-xl:grid max-lg:grid-cols-3  max-md:grid max-md:grid-cols-1 p-[10px]  ">

      {c.products.map((d) => (

      <div key={d.id} className=" w-full h-fit flex flex-col items-center justify-center    gap-[10px]  hover:scale-110 hover:duration-400 hover:transition-all">


<Link  href={`${d.categoryId}/${d.id}`}>
  <div className="   background-color: #fdf1ec;  rounded-[15px] " >

<div className="  h-fit w-full flex flex-col  ; 
">

<div className="float-left h-fit w-full rounded-[15px]">
 <Image
        src={d.images.map((a) => a.url)[0]}
        alt="232"
        
        className="w-[300px] h-[300px]  object-fit rounded-[15px]"
        width={300} 
        height={300}
      /> 
</div>
<div className=" h-fit w-full p-[10px] flex flex-col items-center">

  <div className=" h-fit w-full">

    <h1 className = "text-[24px] text-[#474747] mr-0 my-0 ">{d.name}</h1>
    


  </div>
  <div className="h-fit w-full relative flex flex-col">

    <p className=" inline-block  h-fit  font-[lighter] text-[#474747] mr-0 my-0"><span className="inline-block h-fit text-[16px]">{d.price} </span></p>
  </div>
  </div>
</div>
</div>

</Link>

</div>
))}
     
 
      </div>
</div>
}
</>


)}

  

    </div>
  );
};

export default HomePageMain;
