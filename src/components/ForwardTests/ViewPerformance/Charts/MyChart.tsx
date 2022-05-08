import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./MyChart.module.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MyChart: React.FC<{ setA: string[]; setB: number[]; label: string }> = (props) => {
  const { setA, setB, label } = props;
  ChartJS.defaults.font.family = "Quicksand-Regular";
  const data = {
    labels: setA,
    datasets: [
      {
        label: label,
        data: setB,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.8)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
  };

  return (
    <div className={styles.myChart}>
      <p className={styles.label}>{label}</p>
      <Line options={options} data={data} />
    </div>
  );
};

export default MyChart;
