import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";

const API_URL =
  "https://3aabe6b2-07df-4a39-9f4c-2d71bcd57212-00-2ol8qq1ivxcvq.worf.replit.dev/api";

const PieChartComponent = ({ levelId }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("📡 Fetching chart data for level:", levelId);
        const response = await axios.get(`${API_URL}/chart-data/${levelId}/`);
        console.log("✅ Chart Data Received:", response.data);
        setChartData(response.data);
      } catch (error) {
        console.error("❌ Error fetching chart data:", error);
      }
    }

    if (levelId) {
      fetchData();
    } else {
      console.error("❌ No levelId detected!");
    }
  }, [levelId]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

  return (
    <div>
      {chartData.length === 0 ? (
        <p>Loading chart data...</p>
      ) : (
        <div className="chart-container">
          <PieChart
            width={320}
            height={320}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(1)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default PieChartComponent;
