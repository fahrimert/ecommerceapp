"use client"
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useTransition } from "react"
import {  RegisterSchema } from "@/schema"
import { register } from "@/app/actions/register"
import { satoshi_regular } from "@/public/fonts/fonts"
import toast from "react-hot-toast"
import { Button } from '@/components/ui/button'
import { login } from '../../actions/login'
import { useFormState } from 'react-dom'

export type ProductFormValues = z.infer<typeof RegisterSchema>


  
export default function AuthPage() {
  const [isPending,startTransition] = useTransition() 
  const [isPendingForLogin,startTransitionForLogin] = useTransition()
  const [stateRegister, action] = useFormState(register, undefined);
  const [stateForSignin, actionForsignin] = useFormState(login, undefined);
  
  const [aauth,setAauth] = useState(true)

  
  useEffect(() => {
  
  if (stateRegister?.serverErrorForRegister) {
    toast.error(stateRegister?.serverErrorForRegister);
  }
  if ( stateRegister?.serverSuccessw) {
    toast.success(stateRegister?.serverSuccessw);
    setAauth(!aauth)
  }
  }, [stateRegister,aauth]);
  
  useEffect(() => {
    if (stateForSignin && stateForSignin?.serverError) {
      toast.error(stateForSignin?.serverError);
    }
  }, [stateForSignin ]);
  return (
    <div className=' relative w-full h-screen flex flex-col justify-center items-center bg-[#fffaf5] gap-[30px] z-0 '>
        <div className=' relative w-full h-full  flex flex-col justify-start items-center gap-[50px] max-lg:flex max-lg:flex-col max-lg:h-full p-[20px] '>
<div className='  w-full h-[150px] flex flex-col justify-center items-center gap-[30px] bg-[#fee2e2] p-[20px] z-10 absolute top-0 '>
<h2 className='  w-fit h-fit font-sans font-extrabold text-[40px]  text-white text-wrap '>El Emeği Göz Nuru</h2>
{/*   <Image src={imageAsset} alt='DWQD' width={500} height={100} className=' max-lg:w-[90%]'/>
 */}</div>
<div className='  relative w-fit h-full flex flex-col justify-center items-end p-[20px] gap-[20px] bg-white border-[1px]  shadow-xl ]  '>
  {aauth ? 
  <div className='relative  w-full h-fit mt-[20px] gap-[20px] flex flex-col'>
  <div className="relative  w-full h-fit   ">
<h2 className=' font-sans font-bold text-[28px] tracking-[-0.8px]   text-black'>Kayıt</h2>

  </div>
 <form 
              action={(formData) => {
                startTransition(() =>{
                  action(formData)  
              })
              }}
 
 className=" w-full  h-fit    flex flex-col gap-[10px]">
<div className='h-fit'>

         <h2  className={`font-${satoshi_regular} font-medium text-black text-[18px] tracking-[-0.8px]  `}>E Posta</h2>
           <Input
                         disabled = {isPending}
                      type="email"
                      name="email"
                      id="email"  
           />
              {stateRegister?.errors?.email && (
                  <h2 className=" w-full  ring-[#cd3e2f] rounded-[10px] animate-fade-down animate-ease-in-out animate-normal animate-duration-[400ms] text-red-400  ">
                    {stateRegister.errors.email}
                  </h2>
                )}
</div>
<div className='h-fit'>

         <h2  className={`font-${satoshi_regular} font-medium text-black text-[18px] tracking-[-0.8px]  `}>Password</h2>
           <Input     disabled = {isPending} className=" w-full"  
              
              type="password"
              name="password"
              id="password"  
            />
              {stateRegister?.errors?.password && (
                  <h2 className=" w-full  ring-[#cd3e2f] rounded-[10px] animate-fade-down animate-ease-in-out animate-normal animate-duration-[400ms] text-red-400  ">
                    {stateRegister.errors.password}
                  </h2>
                )}
</div>

   <Button     disabled = {isPending} type="submit" className=" w-full h-[50px] mt-[30px]">Kayıt Ol</Button> 
 </form>
  
  
 </div>
  
  : 
 <>
  <div className='relative  w-full h-fit mt-[20px] gap-[20px] flex flex-col'>

  <div className="relative  w-full h-fit ">
<h2 className=' font-sans font-bold text-[28px] tracking-[-0.8px] mt-[20px] text-black'>Giriş Yapın</h2>

  </div>
 <form className=" w-full flex flex-col gap-[10px]"  action={(formData) => {
                startTransition(() =>{
                  actionForsignin(formData)  
              })
              }}>
<div className='h-fit'>

       
         <h2 className={`font-${satoshi_regular} font-medium text-black text-[18px] tracking-[-0.8px]  `}>E Posta</h2>
           <Input 
                         disabled = {isPending}

           type="email"
           name="email"
           id="email"
          />
          {stateForSignin?.errors?.email && (
  
  <h2 
  
  
  className=" w-full text-[#e92021] text-[12px]  ring-[#cd3e2f] rounded-[10px] animate-fade-down animate-ease-in-out animate-normal animate-duration-[400ms]  ">
    {stateForSignin.errors.email}
  </h2>
)}
</div>

<div className=' w-full h-fit'>

         <h2  className={`font-${satoshi_regular} font-medium  text-[18px] tracking-[-0.8px]  `}>Password</h2>
           <Input className=" w-full"
           type= "password"  
           name="password"
           disabled = {isPending}

           id="password" 
              />
                <div className="w-full h-fit flex flex-row">


                 {stateForSignin?.errors?.password &&
                      stateForSignin?.errors?.password.map((b,index) => (

                        <h2 key={index} 
                      className=" w-fit text-[#e92021] text-[12px]  ring-[#cd3e2f] rounded-[10px] animate-fade-down animate-ease-in-out animate-normal animate-duration-[400ms]  ">
                        
                            {b}
                        </h2>

                      ))}
                </div>
</div>


   <Button 
                         disabled = {isPending}
   
   type="submit" className=" w-full h-[50px] mt-[50px] ">Giriş Yapın</Button> 
   
 </form>
 </div>
  
 </> 
  
  
  
  
  }
  <div className=' w-full h-fit  bg-none flex flex-row justify-center items-center '>
  <h2 className=' w-full font-sans font-extrabold text-[24px] leading-[28.8px]  text-white  '  >  
  {aauth ? "Mevcut Hesabınız Varsa " : "Hesanınız Yokmu ?"} </h2>
<Button   
                         disabled = {isPending}

className=" w-fit h-full  bg-none flex justify-center items-center"  onClick={() => {setAauth(!aauth)}}> 
<h2 className=' font-sans font-extrabold text-[16px]   text-white '  >  
{aauth ? "Giriş Yapın": "Kayıt Olun"}  </h2></Button>  
  </div>


</div>

        </div>
        
 
    </div>
  )
}
