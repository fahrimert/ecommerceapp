"use client"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { useRouter } from 'next/navigation'

interface ProductPageHeadingProps {
    title:String ,
    description:String,
}


const ProductPageHeading:React.FC<ProductPageHeadingProps> = ({title ,description}) =>  {
    const router = useRouter()

  return (
    <>
    <div className="relative w-full  h-fit flex flex-col justify-center items-center gap-0 p-0">

        <div className="relative w-full h-fit flex flex-col justify-center items-center gap-[5px] p-0 ">
            <div className="relative w-full h-fit flex flex-row  justify-center items-center   p-0">
                <h2 className=" relative w-full h-fit  text-[36px]  text-black">{title}</h2>
       
            </div>
            <div className="w-full h-[3px]  bg-gray-300" />

            <div className="w-full h-[40px] ">
                <h2 className="w-full h-full text-[16px]  items-start">
                    {description}
                </h2>
            </div>


        </div>
       
        
    </div>
    
    </>
  )
}

export default ProductPageHeading


/* <!-- HTML !-->
<button class="button-46" role="button">Button 46</button>

/*
.button-46 {
    align-items: center;
    background-color: rgba(240, 240, 240, 0.26);
    border: 1px solid #DFDFDF;
    border-radius: 16px;
    box-sizing: border-box;
    color: #000000; 
    cursor: pointer;
    display: flex;
    font-family: Inter, sans-serif;
    font-size: 18px;
    justify-content: center;
    line-height: 28px;
    max-width: 100%;
    padding: 14px 22px;
    text-decoration: none;
    transition: all .2s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 100%;
  }
  
  .button-46:active,
  .button-46:hover {
    outline: 0;
  }
  
  .button-46:hover {
    background-color: #FFFFFF;
    border-color: rgba(0, 0, 0, 0.19);
  }
  
  @media (min-width: 768px) {
    .button-46 {
      font-size: 20px;
      min-width: 200px;
      padding: 14px 16px;
    }
  } */