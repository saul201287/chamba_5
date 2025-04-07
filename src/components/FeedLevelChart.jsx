import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FeedLevelChart = ({ nivelAlimento }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Nivel",
        data: [],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false,
        tension: 0.1,
        pointBackgroundColor: (context) => {
          const value = context.raw;
          if (value >= 75) return "green";
          if (value >= 50) return "yellow";
          if (value >= 25) return "orange";
          return "red";
        },
        pointBorderColor: (context) => {
          const value = context.raw;
          if (value >= 75) return "green";
          if (value >= 50) return "yellow";
          if (value >= 25) return "orange";
          return "red";
        },
        pointRadius: 8,
      },
    ],
  });

  useEffect(() => {
    setChartData((prevData) => {
      const newLabels = [...prevData.labels];
      const newData = [...prevData.datasets[0].data];
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (newLabels.length >= 7) {
        newLabels.shift(); 
        newData.shift(); 
      }

      newLabels.push(currentTime);
      newData.push(nivelAlimento);

      return {
        ...prevData,
        labels: newLabels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: newData,
          },
        ],
      };
    });
  }, [nivelAlimento]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Nivel de Alimento (Tiempo Real)",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hora",
        },
      },
      y: {
        title: {
          display: true,
          text: "Nivel (%)",
        },
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default FeedLevelChart;
