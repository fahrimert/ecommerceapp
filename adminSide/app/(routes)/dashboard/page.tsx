
import React from "react";
import DashboardMain from "./components/DashboardGraphs";
import prismadb from "@/lib/db";

const OverviewPage = async () => {
  const orders = await prismadb.order.findMany({
    include:{
      orderItems:true,
    }
  })
  const orderItems = await prismadb.orderItem.findMany({
  })

  const productCount = orderItems.reduce((acc, item) => {
    acc[item.productId] = (acc[item.productId] || 0) + 1;
    return acc;
}, {});

const productIds = Object.keys(productCount);


const products = await prismadb.product.findMany({
  where: {
      id: { in: productIds }
  },
  select: {
      id: true,
      name: true,
      
    }
});

const result = products.map(product => ({
  name: product.name,
  count: productCount[product.id] || 0
}));

console.log(result)
  
  return (
    <div>
      <div className=" h-fit ">
        <DashboardMain orders = {orders} 
                      result = {result}
        
        />
      </div>
    </div>
  );
};

export default OverviewPage;
