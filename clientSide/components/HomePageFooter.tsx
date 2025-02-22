
import Link from "next/link";

const HomePageFooter = () => {
  return (
    <>
 
     <div className="relative w-full h-fit flex flex-col justify-start items-center gap-[32px] p-[64px] bg-[#fee2e2]">
          <div className="relative w-full h-fit flex flex-row justify-start items-start gap-[128px] p-[48px]  max-lg:flex-col">
            <div  className=" relative w-fit h-fit flex flex-col justify-start items-start gap-[24px] ">
<h2 className=" relative w-fit h-fit text-[32px]  flex items-start text-black">DTasarim</h2>
            </div>

            <div className="relative w-full h-fit flex flex-row justify-start items-start">
              <div className=" relative w-full h-fit flex flex-col justify-start items-start  ">
              <h2 className="text-black relative w-fit h-fit text-[16px]   py-[8px] ">Hızlı Linkler</h2>
              <div className=" relative w-full h-fit flex flex-col justify-start items-start ">
                  <Link href={'/anasayfa'} className="relative w-full h-fit flex flex-row justify-start items-start py-[8px]">
                      <h2 className="text-black w-fit h-fit text-[14px] ">Home Page</h2>
                  </Link>
                  <Link href={'/hakkimizda'} className="relative w-full h-fit flex flex-row justify-start items-start py-[8px]">
                      <h2 className="text-black w-fit h-fit text-[14px] ">Hakkımızda</h2>
                  </Link>
               
              </div>
              </div>

              <div className=" relative w-full h-fit flex flex-col justify-start items-start gap-[16px]">
              <div className=" relative w-full h-fit flex flex-col justify-start items-start ">
              <Link href={'/iletisimClient'} className="relative w-full h-fit flex flex-row justify-start items-start py-[8px]">
                      <h2 className="text-black w-fit h-fit text-[14px] ">İletişim Bilgileri</h2>
                  </Link>
                 
                  <Link href={'/danismanListesi'} className="relative w-full h-fit flex flex-row justify-start items-start py-[8px]">
                      <h2 className="text-black w-fit h-fit text-[14px] ">Danışman Listesi</h2>
                  </Link>
                  <Link href={'/photogalery'} className="relative w-full h-fit flex flex-row justify-start items-start ">
                      <h2 className=" text-black w-fit h-fit text-[14px] ">Ofis Fotoğraf Galerimiz</h2>
                  </Link>
               
                
              </div>
              </div>
     


            </div>
          </div>
     </div>
  
    </>
  );
};

export default HomePageFooter;
