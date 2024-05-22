"use client"

import { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from'chartjs-plugin-datalabels';


export default function BarChart({ data, label = '' }: { data: { name: string, tickets: number }[], label?: string }) {
  const chartRef: any = useRef(null);
  useEffect(() => {
    if (chartRef.current){
      if (chartRef.current.chart){
        chartRef.current.chart.destroy();
      }
      const context = chartRef.current.getContext('2d');
      const newChart = new Chart(context, {
        type: 'bar',
        data: {
          labels: data.map((item) => item.name),
          datasets: [
            {
              label,
              data: data.map((item) => item.tickets),
              backgroundColor: [
                '#2b3a67',
                '#496A81',
                '#66999B'
              ],
              datalabels: {
                color: 'black',
                anchor: 'end',
                align: 'top',
                font: {
                  weight: 'bold',
                  size: 15,
                }                               
              }
            },
          ],
        },
        plugins: [ChartDataLabels],
        options: {          
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: false
              }              
            },
            x: {
              type: 'category',
              grid: {
                display: false
              }
            }
          },
        },
      })
      chartRef.current.chart = newChart;
    }
  }, [])
  return (
    <canvas ref={chartRef} />
  )
}
