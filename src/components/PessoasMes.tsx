import { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default function BarChart({ data, label = '' }: { data: { name: string, tickets: number }[], label?: string }) {
  const chartRef: any = useRef(null);

  useEffect(() => {
    // Ordena os dados do maior para o menor com base no número de tickets
    const sortedData = [...data].sort((a, b) => b.tickets - a.tickets);

    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      const context = chartRef.current.getContext('2d');
      const newChart = new Chart(context, {
        type: 'bar',
        data: {
          labels: sortedData.map((item) => item.name),
          datasets: [
            {
              label,
              data: sortedData.map((item) => item.tickets),
              backgroundColor: [
                '#0a3299', '#517bee', '#14b1f2'
              ],
              datalabels: {
                color: 'black',
                anchor: 'end',
                align: 'top',
                font: {
                  family: 'Arial', // Defina a fonte desejada aqui
                  weight: 'bold',
                  size: 18,
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
  }, [data, label]);

  return (
    <canvas ref={chartRef} />
  )
}
