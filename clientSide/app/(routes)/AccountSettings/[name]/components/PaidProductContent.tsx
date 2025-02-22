"use client"
import Image from "next/image";

interface CartItemProps {
    a:  {
      id: string;
      orderId: string;
      productId: string;
      product:  {
        id: string;
        categoryId: string;
        images: {
            id: string;
            productId: string;
            url: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        quantity: number
        order: number;
        name: string;
        price: string;
        isFeatured: Boolean;
        isArchived: Boolean;
        createdAt: Date;
        updatedAt: Date;
    }
  };
    totalPrice:number | undefined
}
const PaidProductContent : React.FC<CartItemProps> = ({a,totalPrice}) => {
  return (
    <div className="relative w-full h-fit flex flex-row justify-between items-center bg-white">
              <div className=" relative w-full h-full flex flex-row justify-start items-center gap-[10px]">
                <div className=" w-[75px] h-full bg-black">
                <Image src={a?.product?.images.map((item) => item.url)[0]} alt="232" className="w-[75px] h-full  object-cover" width={75} height={75}   objectPosition="center"/></div>
                <div className=" relative w-fit h-full flex flex-col justify-center items-start gap-[10px]">
                  <h2 className=" relative w-fit h-[30px] text-[16px]">
                    {a.product.name}
                  </h2>
             
             
                </div>
              </div>
              <div className="relative w-full h-full flex flex-row justify-between items-center bg-white">
                <h2 className="relative w-full h-full text-[16px ] flex items-center justify-center">
                  {Number(a.product.price.replace(/[^0-9.-]+/g,""))} 
                </h2>
                <h2 className="relative w-full h-full text-[16px] flex items-center justify-center">
                  Miktar:{a.product.quantity}
                </h2>
              
              </div>
            </div>
  )
}

export default PaidProductContent