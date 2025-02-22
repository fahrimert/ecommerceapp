import { Separator } from "@/components/ui/separator"
import Heading from "@/components/heading"
import prismadb from "@/lib/db"
import CategoryForm from "./components/CategoryForm"
import CategoryIdHeading from "./components/CategoryIdHeading"

const CategoryPage = async ({params}:{params:{categoryId:string}}) => {
  const data = await prismadb.categories.findFirst(
  )
  const category = await prismadb.categories.findUnique({
    where:{
        id:params.categoryId
    },
    include:{
      imageOfCategory:true
    }
  

  })  
  const categories = await prismadb.categories.findMany({
 include:{
  imageOfCategory:true
 }
  

  })  
      return (
    <>
        <div className=" gap-[10px] flex flex-col">
          <CategoryIdHeading title={"Ürün Kategorisi"}
            description={"Buradan Ürün kategorileri Ekleyin mesela Biblolar,Çantalar gibi... "}
          />
          <CategoryForm
          categories = {categories}
          initialData = { category}
      />
        </div>
    </>
  )
}

export default CategoryPage