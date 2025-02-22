import { Separator } from "./ui/separator";

interface HeadingProps {
  title: String;
  description: String;
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <>
      <div className="relative w-full  h-fit flex flex-col justify-center items-center gap-0 p-0">
        <div className="relative w-full h-fit flex flex-col justify-center items-center  px-[10px]">
          <div className="relative w-full h-fit flex flex-row  justify-center items-center   p-0">
            <h2 className=" relative w-full h-fit  text-[36px]  text-black " >
              {title}
            </h2>
          </div>
          <div className="w-full h-[40px] ">
            <h2 className="w-full h-full text-[16px]  items-start">
              {description}
            </h2>
          </div>
          <div className="w-full h-[3px]  bg-gray-300" />
        </div>
      </div>
    </>
  );
};

export default Heading;
