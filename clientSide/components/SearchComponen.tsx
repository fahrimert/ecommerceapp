"use client";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useSearch } from "@/hooks/use-address";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { Prisma } from "@prisma/client";
const SearchComponen = ({
  result,
}: {
 result : {
  id: string;
  name: string;
  categoryId: string;
  category: {
      id: string;
      name: string;
      order: number;
      anasayfa: boolean;
      createdAt: Date;
      updatedAt: Date;
  };
}[]
}) => {
  const search = useSearch();

  const [open, setOpen] = useState(false);
  const getTheSearchValues = async (e: any) => {
    search.setSearchQuery(e);
  };

  return (
    <>
      <div className="w-full h-fit flex  flex-row items-end justify-end  ">
        <Dialog
          open={open}
          onOpenChange={() => {
            setOpen(!open);
          }}
        >
          <DialogTrigger>
            <div className="flex flex-row bg-white w-fit h-[50px] items-center justify-center p-[10px] text-white rounded-[10px] border-red-100 border-[1px]  ring-offset-2  ring-2 ring-red-100">
              <MdSearch
                width={50}
                height={50}
                className="bg-white text-red-100 w-full h-full flex rounded-[10px]"
              />
              <Input
                onFocus={() => setOpen(!open)}
                className=" h-[30px] w-fit  bg-[#f7f7f7]   "
              />
            </div>
          </DialogTrigger>
          <DialogContent className="w-full h-fit">
            <div className="flex flex-col w-full h-full p-[10px] gap-[10px]">
              <div className="flex flex-row bg-white w-full h-[50px] gap-[10px] items-center justify-start p-[10px] text-black rounded-[10px] border-red-100 border-[1px]  ring-offset-2  ring-2 ring-red-100">
                <MdSearch
                  width={50}
                  height={50}
                  className="bg-white text-red-100 w-fit h-full flex rounded-[10px]"
                />
                <Input
                  value={search.searchQuery}
                  onChange={(e) => getTheSearchValues(e.target.value)}
                  className=" h-[30px] w-fit  bg-[#f7f7f7] border-red-100  "
                />
              </div>
              <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                {search.searchQuery &&
                  result
                    .filter((a) =>
                      a.name
                        .toLowerCase()
                        .includes(search.searchQuery.toLocaleLowerCase())
                    )
                    .map((item) => (
                      <Link
                        key={item.id}
                        className=" relative w-full h-full flex flex-row justify-start items-center gap-[10px] p-[5px]"
                        href={`${item.categoryId}/${item.id}`}
                      >
                        <div className=" relative w-full h-full flex flex-col justify-center items-start gap-[10px] bg-[#050505] rounded-[10px] p-[5px]">
                          <div className="flex flex-row items-center gap-[5px]">
                            <MdSearch
                              width={60}
                              height={60}
                              color="black"
                              className="bg-white w-[40px] h-fit flex rounded-[10px]"
                            />

                            <h2 className=" relative w-full h-[30px] text-[16px] text-white">
                              {item.name}
                            </h2>
                          </div>
                        </div>
                      </Link>
                    ))}
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default SearchComponen;
