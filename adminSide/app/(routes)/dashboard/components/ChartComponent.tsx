"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


export const ChartComponent  = ({result}: {result: 
  
{
    name: string;
    count: any;
}[]
} ) => {
/*   let count = a.map((d) =>d.orderItems).reduce((acc:any, child) => {
    const bra = (acc[child] || 0) + 1;
    return bra;
  }, {});  */
  console.log(result);

  let data= result.map((c) =>  ({
      label:  c.name,
      value: c.count,
      /* burda şöyle mi yapabiliriz acaba hedefimiz şu adamın ilanları içindeki ilan türlerinin toplamına göre bu kısmın yoğunluğu */
      color: [
        `rgb(255, ${99*c.count}, 132)`,
    
      ],
      cutout: "50%",
    })
   
   
 )
       
      
        const options: any = {
          plugins: {
            responsive: true,
          },
          cutout: data.map((item) => item.cutout),
        };
      
        const finalData = {
          labels: data.map((item) => item.label),
          datasets: [
            {
              data: data.map((item) => Math.round(item.value)),
              backgroundColor: data.map((item) => item.color),
              borderColor: data.map((item) => item.color),
              borderWidth: 1,
              dataVisibility: new Array(data.length).fill(true),
            },
          ],
        };
      
        return <Doughnut  className="flex flex-row w-full h-full" data={finalData} options={options} />;
}

