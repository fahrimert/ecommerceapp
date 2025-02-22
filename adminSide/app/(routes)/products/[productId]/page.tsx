import { Separator } from "@/components/ui/separator"
import Heading from "@/components/heading"
import ProductForm from "./components/ProductAddForm"
import prismadb from "@/lib/db"

const ProductPage = async ({params}:{params:{productId:string}}) => {
    const categories = await prismadb.categories.findMany()
    const product = await prismadb.product.findUnique({
        where:{
            id:params.productId
        },
        include:{
            images:true
        }
        //burda tek tek productların ayrıca image modalının da include olmasını sağlıyoruz 
      })  
      return (
    <>
          <ProductForm  
          initialData={product} 
          categories={categories}/>
    </>
  )
}

export default ProductPage