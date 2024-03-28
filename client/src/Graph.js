// Graph.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const Graph = ({ data }) => {
  const chartData = {
    labels: data.map(entry => new Date(entry.timestamp)), // Convert timestamps to Date objects
    datasets: [
      {
        label: 'Temperature',
        data: data.map(entry => entry.temperature),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time', // Use 'time' scale for x-axis
        time: {
          unit: 'second', // Adjust based on your data granularity
          displayFormats: {
            second: 'h:mm:ss a', // Format for displaying timestamps
          },
        },
        title: {
          display: true,
          text: 'Timestamp',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)', // Label for y-axis
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Graph;
