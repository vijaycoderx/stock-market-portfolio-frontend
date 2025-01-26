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
  plugins,
} from "chart.js";
import { useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// useEffect(() => {
//     const fetcher = async () => {
//         const result = await yahooFinance.chart('AAPL', {
//             period1: '2025-01-07', interval: "5m"// Fetch the last 1 month of data
//         });
//         console.log(result)
//     }
//     fetcher()

// }, [])

// const lineData = {
//     labels: ['00:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '14:30', '15:30', '16:30', '17:30', '18:30'],
//     datasets: [
//       {
//         label: "fiat",
//         data: [244.8, 244.6, 244.6, 244.31, 244.55, 242.61, 245.09, 243.46, 242.97, 245.13, 243.74, 242.39, ],
//         borderColor: "#3535e6dc",
//         backgroundColor: "#3535e6dc",
//         borderWidth: 2,
//         tension: 0.4,
//       },

//     ],
// };

const generateGraph = (data) => {
  console.log("item", data);
  const timeList = data.map((item) =>
    new Date(item.date).toLocaleDateString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const dataList = data.map((item) => item.close);

  const linearGraphData = {
    labels: timeList,

    datasets: [
      {
        label: "Stock Price",
        data: dataList,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: false,
          text: "Time",
        },
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 6,
          callback: function (value, index) {
            // return index % 2 === 0 ? this.getLabelForValue(value) : "";
            return index === 0 ? '' : this.getLabelForValue(value);
          },
        },
      },
      y: {
        title: {
          display: false,
          text: "Price",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return <Line data={linearGraphData} options={options} />;
};

export { generateGraph };
