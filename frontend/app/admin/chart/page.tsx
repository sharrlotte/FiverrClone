"use client";
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const dataVisitors = {
  labels: ['Ngày 1', 'Ngày 2', 'Ngày 3','Ngày 4', 'Ngày 5', 'Ngày 6'],
  datasets: [
    {
      label: 'Số lượng người truy cập',
      data: [120, 150, 100, 50, 80, 60],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
}

const dataTransactions = {
  labels: ['Ngày 1', 'Ngày 2', 'Ngày 3','Ngày 4', 'Ngày 5', 'Ngày 6'],
  datasets: [
    {
      label: 'Số giao dịch',
      data: [80, 90, 70, 12, 9, 5],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    },
  ],
}

export default function page() {
  return (
    <div style={{ overflowY: 'auto', padding: '20px', backgroundColor: '#f9f9f9' }}>
      <div className='flex flex-col md:flex-row justify-between items-center'>
        <div className='w-full md:w-1/2 p-4'>
        <h2 className='text-xl font-semibold text-center'>Biểu đồ người truy cập</h2>
        <Bar data={dataVisitors} />
        <button className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'>Xuất dữ liệu</button>
        </div>
        <div className='w-full md:w-1/2 p-4'>
        <h2 className='text-xl font-semibold text-center'>Biểu đồ số giao dịch</h2>
        <Bar data={dataTransactions} />
        <button className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'>Xuất dữ liệu</button>
        </div>
      </div>
    </div>
  )
}