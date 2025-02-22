"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {format} from 'date-fns'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Separator } from "@/components/ui/separator";

import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createComment } from "@/app/actions/create-comment";
import toast from "react-hot-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const FirstFormSchema = z.object({
    comment:z.string().min(10,{
        message:"Yorum En Az 10 karakter olmalı"
    }),


})
const CommentComponent = ({session,ids,basedComments} : {session : {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
 }| null , ids : string,basedComments:({
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
})[]}) => {
    console.log(session);
    const Firstform = useForm<z.infer<typeof FirstFormSchema>>({
        resolver: zodResolver(FirstFormSchema),
        defaultValues: {
          comment: "",
       
        },
      })
      const  onSubmit  = async (values: z.infer<typeof FirstFormSchema>)  => {
        createComment(session?.id!,values.comment,ids)
      toast.success('Yorum Eklendi')
    
    }
  return (
    <div className="w-[80%] h-fit flex flex-col justify-start items-start p-[10px] gap-[10px]">
    <h2 className="w-fit h-fit">Yorum Atın</h2>
    <Separator/>
    <Form {...Firstform}>
        <form onSubmit={Firstform.handleSubmit(onSubmit)}  className=" relative w-full h-fit flex flex-col gap-[10px]">
          <div  className=" relative w-full h-fit flex flex-row gap-[10px]" >
     
          <FormField
            control={Firstform.control}
            name="comment"
            render={({ field }) => (
              <FormItem className=" w-full h-full">
                <FormControl>
                  <Textarea  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
     
   
       
       
       
          </div>
          <Button className="w-fit" type="submit">Ekle</Button>
        </form>
      </Form>
      <ScrollArea className="h-[500px]  w-full shadow-lg">
                   <div className='relative  w-full h-fit flex flex-col justify-start items-start  p-[20px]   '>

                <h2 className="w-fit text-[18px]">
Yorumlar

                </h2>
                    {basedComments.map((c) => (

                <div key={c.id}  className=" w-full h-fit flex flex-col items-start justify-start gap-[10px] ">

<div  
        className=
        {cn("relative w-full h-fit flex flex-col justify-center items-start gap-[10px]  p-[10px]" )}
        > 
          <div
            className={cn("relative w-full h-fit flex flex-row justify-end items-center  ")}
          >
            <div className="relative  w-full h-fit   flex flex-row justify-start items-start  flex-wrap gap-[10px]  border-[2px] border-[#EFF1F1] rounded-[30px] break-words  p-[20px] ">
   
          <div className=" w-[300px] h-full flex flex-col gap-[5px]">
    <div className=" w-[300px] h-full flex flex-col gap-[10px]">
    
            <div className="relative flex flex-col ">
                <h2 className="relative  text-[16px]">
                  {c.whomadeit.name}
                </h2>
              </div>
              <h2 className=" w-full" >{c.comment}</h2>
    </div>
    
              <div  className="relative w-full h-fit flex flex-col justify-end items-end  flex-wrap gap-[10px] border-[2px] border-[#EFF1F1] rounded-[30px] text-wrap  px-[10px] ">
    
              <h2 className=" w-fit h-full ">{`${format(new Date(c.createdAt), 'yyyy:MM:dd')}-${format(new Date(c.createdAt),'kk:mm')}`}</h2>
              </div>
              </div>
     
 
             
            </div>
          </div>
        </div>

              
</div>
                    ))}

                </div>
      </ScrollArea>
    </div>
  )
}

export default CommentComponent