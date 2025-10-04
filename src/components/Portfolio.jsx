import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Line } from "react-chartjs-2";
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

// Register chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Portfolio = () => {
  const [dates, setDates] = useState([]);
  const [focused, setFocused] = useState([]);
//   const [nifty, setNifty] = useState([]);

  useEffect(() => {
    const fetchExcel = async () => {
      try {
        const response = await fetch("/QuantActiveFund.xlsx");
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Assuming Excel has columns: Date, Focused, NIFTY50
        const parsedDates = jsonData.map((row) => row.NAVDate);
        const parsedFocused = jsonData.map((row) => row.NAV(Rs));
        // const parsedNifty = jsonData.map((row) => row.NIFTY50);

        setDates(parsedDates);
        setFocused(parsedFocused);
        setNifty(parsedNifty);
      } catch (error) {
        console.error("Error reading excel file:", error);
      }
    };

    fetchExcel();
  }, []);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Focused Portfolio",
        data: focused,
        borderColor: "green",
        fill: false,
      },
    //   {
    //     label: "NIFTY50",
    //     data: nifty,
    //     borderColor: "blue",
    //     fill: false,
    //   },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Equity Curve (Portfolio vs NIFTY50)" },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Portfolio Insights</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default Portfolio;
