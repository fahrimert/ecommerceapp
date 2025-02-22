"use client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

interface CategoryPageHeadingProps {
  title: String;
  description: String;
}

const CategoryPageHeading: React.FC<CategoryPageHeadingProps> = ({
  title,
  description,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="relative w-full  h-fit flex flex-col justify-center items-center gap-0 p-0">

        <div className="relative w-full h-fit flex flex-col justify-center items-center gap-[5px] p-0 ">
          <div className="relative w-full h-fit flex flex-row  justify-center items-center   p-0">
            <h2 className=" relative w-full h-fit  text-[36px]  text-black">
              {title}
            </h2>
   
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
  );
};

export default CategoryPageHeading;
