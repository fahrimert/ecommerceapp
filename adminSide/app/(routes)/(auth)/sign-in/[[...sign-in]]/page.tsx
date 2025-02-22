import { Container } from "@/components/container";
import { SignIn } from "@clerk/nextjs";

export default function Page() {

  return(
    <div className="w-full h-screen flex items-center justify-center bg-[#050505] " >
       <SignIn 
       
       fallbackRedirectUrl='/dashboard' path="/sign-in"  />
    </div>

  )
}