import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function BarChart({ label, usedata }) {
  const data = {
    labels: label, //["A", "B", "C"], // Replace with your actual labels
    datasets: [
      {
        label: "Percentage",
        data: usedata, // Replace with your actual data
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Customize the bar color
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // Customize the maximum value on the y-axis
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
