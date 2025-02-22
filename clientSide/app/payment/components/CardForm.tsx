"use client"

import { useSearchParams } from "next/navigation"

const CardForm = ({response} : {response : string}) => {
  const searchParams  = useSearchParams()
  const token = searchParams.get('token')
  return (
 <div className=" w-full h-[1500px]}">,
          
              
            <div id="iyzipay-checkout-form" className="responsive"></div>
            <script
dangerouslySetInnerHTML={{
  __html: `
         ${response}
      `,
}}
></script>
          
</div>


)
}

export default CardForm
