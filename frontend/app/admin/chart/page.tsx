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
    <div style={{overflowY: 'auto' }}>
      <div className='flex p-2'>
        <div className=''>
        <h2>Biểu đồ người truy cập</h2>
        <Bar data={dataVisitors} />
        </div>
        <div className=''>
        <h2>Biểu đồ số giao dịch</h2>
        <Bar data={dataTransactions} />
        </div>
      </div>
    </div>
  )
}