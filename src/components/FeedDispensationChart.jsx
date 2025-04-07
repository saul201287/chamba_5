import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FeedDispensationChart = ({ pesoActual }) => {
  const [chartData, setChartData] = useState({
    labels: [
      "00:00-04:00",
      "04:00-08:00",
      "08:00-12:00",
      "12:00-16:00",
      "16:00-20:00",
      "20:00-24:00",
    ],
    datasets: [
      {
        label: "Cantidad (kg)",
        data: [0, 0, 0, 0, 0, 0], 
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [lastPeso, setLastPeso] = useState(null); 
  useEffect(() => {
    if (lastPeso === null) {
      setLastPeso(pesoActual);
      return;
    }

    const diferencia = Math.abs(pesoActual - lastPeso); 
    const currentHour = new Date().getHours();

    let index;
    if (currentHour < 4) index = 0; 
    else if (currentHour < 8) index = 1; 
    else if (currentHour < 12) index = 2; 
    else if (currentHour < 16) index = 3;
    else if (currentHour < 20) index = 4; 
    else index = 5; 

    setChartData((prevData) => {
      const newData = [...prevData.datasets[0].data];
      newData[index] = (newData[index] || 0) + diferencia; 
      return {
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: newData,
          },
        ],
      };
    });

    setLastPeso(pesoActual);
  }, [lastPeso, pesoActual]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Dispensación de Alimento (kg por hora)",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Cantidad (kg): ${context.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Rango Horario",
        },
      },
      y: {
        title: {
          display: true,
          text: "Cantidad (kg)",
        },
        beginAtZero: true, 
        min: 0, 
        suggestedMax: 0.5, 
        ticks: {
          stepSize: 0.05, 
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default FeedDispensationChart;
