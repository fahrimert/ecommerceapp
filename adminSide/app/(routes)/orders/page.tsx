import prismadb from "@/lib/db"
import { formatter } from "@/lib/utils"
import { format } from "date-fns"
import ProductPageHeading from "../products/components/ProductPageHeading"
import { DataTable } from "@/components/ui/DataTable"
import { columns } from "./components/columns"
import { OrderColumn } from "./components/columns"
import OrdersPageHeading from "./components/OrdersPageHeading"
const OrdersPage = async () => {

  const orders = await prismadb.order.findMany({
    include: {
        orderItems:{
            include:{
                product:true
            }
        }
    },
    orderBy:{
        createdAt:'desc'
    }
  })
  const formattedOrders:OrderColumn[] = orders.map((item) => ({
    id:item.id,
    phone:item.phone,
    address:item.address,
    products:item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    totalPrice:formatter.format(item.orderItems.reduce((total,item) =>{
        return total + Number(item.product.price)
     },0)),
    isPaid:item.isPaid,
    createdAt: format(item.createdAt,"MMMM do, yyyy")

  })) 
  return (
    <>
    <div className=" relative w-full h-fit flex flex-col   items-start justify-center gap-0 p-0">
      <OrdersPageHeading title="Siparişler" description="Mağazanızdaki Siparişleri Görün." />
    </div>
 
     <DataTable
    searchKey="name"
    columns={columns}
    data={formattedOrders}
    /> 
  </>   )
}

export default OrdersPage