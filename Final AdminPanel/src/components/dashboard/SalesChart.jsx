import React from 'react';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SalesChart = ({ dateRange }) => {
  // Mock data based on date range
  let labels = [];
  let salesData = [];
  let ordersData = [];

  switch (dateRange) {
    case 'weekly':
      labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      salesData = [1200, 1900, 1500, 2500, 2200, 3000, 2800];
      ordersData = [30, 52, 38, 65, 58, 83, 76];
      break;
    case 'monthly':
      labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      salesData = [9800, 12400, 15600, 13800];
      ordersData = [280, 325, 390, 352];
      break;
    case 'yearly':
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      salesData = [42000, 38000, 45000, 50000, 49000, 55000, 60000, 58000, 52000, 57000, 62000, 68000];
      ordersData = [1100, 980, 1200, 1350, 1280, 1450, 1580, 1520, 1340, 1490, 1620, 1780];
      break;
    default:
      labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      salesData = [1200, 1900, 1500, 2500, 2200, 3000, 2800];
      ordersData = [30, 52, 38, 65, 58, 83, 76];
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Sales ($)',
        data: salesData,
        borderColor: 'rgb(124, 58, 237)',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Orders',
        data: ordersData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 6,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.dataset.label.includes('Sales')) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            } else {
              label += context.parsed.y;
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          },
        },
        grid: {
          borderDash: [5, 5],
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 3,
        hoverRadius: 6,
      },
    },
  };

  return (
    <div className="w-full h-[300px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesChart;