"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';

import React from 'react'

import {format} from 'date-fns'
import { Order } from '@prisma/client';
export const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
    ssr: false,
    });
const BarChart = ({orders} : {orders: ({
  orderItems: {
      id: string;
      orderId: string;
      productId: string;
  }[];
} & {
  id: string;
  isPaid: boolean;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
})[]}) => {


  const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentYear = new Date().getFullYear(); // İçinde bulunduğumuz yıl (2025)
const filteredOrders = orders.filter(toplamIlan => format(new Date(toplamIlan.createdAt), 'y-MMMM').startsWith(`${currentYear}-`));
const toplamIlan = filteredOrders.map((d) => format(new Date(d.createdAt), 'MMMM')) as any;

const ilanSayilari = toplamIlan.reduce((acc:any, ay) => {
  acc[ay] = (acc[ay] || 0) + 1; 
  return acc;
}, {});

const sonuc = labels.map((ay) => ({
  month: ay,
  count: ilanSayilari[ay] || 0,
}));





/* toplamilanda gezsin eğer labeldaki herhangi biriyle aynı oluyosa ona 1 eklesin onu bi sayı yapsın */

const data = {
  labels: sonuc.map((d) => d.month),
  datasets: [
    {
      label: 'Sipariş Sayısı',
      data: sonuc.map((d) => d.count),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
    return (
    <div className='w-full h-full p-[20px]'>
      <h1 className='text-white'>Aylara Göre Alınan Sipariş Sayısı</h1>
      <Bar data={data} />
    </div>
  );
};
export default BarChart;