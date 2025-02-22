import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import localFont from '@next/font/local'
import { satoshi_regular } from "@/public/fonts/fonts";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";


import './globals.css'
import ToastProvider from "@/providers/toast-provider";

export const metadata: Metadata = {
  title: {
    default:"DTTasarım El Emeği Göz Nuru",
    template  :"%s DTTasarım El Emeği Göz Nuru "
  },
  icons:{
    icon:'/favicon.ico'
  },
  description: "El Emeği Ürünlerimi Görmek İçin Websitemi Ziyaret Edebilirsiniz.",
};
const raleway = Raleway({
  subsets:["latin"],
  variable:'--font-raleway'
})


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={`${raleway.variable}`}>
      <link rel="icon" href="/favicon.ico" sizes="any" />

      <body 
       className={cn(
        "min-h-screen bg-background font-sans antialiased",
        satoshi_regular.variable,
      )}
     >             
     

       <ToastProvider/>
      <Providers>
        {children}
        
        </Providers>




      </body>
    </html>
  );
}


