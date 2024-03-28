import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const [numPoints, setNumPoints] = useState(10); // default to 10 data points

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.18.91:3005/data?numPoints=${numPoints}`);
        const data = response.data;
        setDataPoints(data.slice(0, numPoints)); // Slice data to number of points needed
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 3000); // Fetch data every 3 seconds

    return () => clearInterval(interval); // Cleanup

  }, [numPoints]); // Trigger useEffect whenever numPoints changes

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setNumPoints(value);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={numPoints}
        onChange={handleInputChange}
        placeholder="Enter number of data points"
      />
      <ul>
        {dataPoints.map((point, index) => (
          <li key={index}>
           Time {point.timestamp} ::::::::: Temperature {point.temp} C
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;
