import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, plugins } from 'chart.js'

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
)

const lineData = {
    labels: ['00:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '14:30', '15:30', '16:30', '17:30', '18:30'],
    datasets: [
      {
        label: "fiat",
        data: [244.8, 244.6, 244.6, 244.31, 244.55, 242.61, 245.09, 243.46, 242.97, 245.13, 243.74, 242.39, 243.14],
        borderColor: "#3535e6dc",
        backgroundColor: "#3535e6dc",
        borderWidth: 2,
        tension: 0.4,
      },

    ],
};
  
const generateGraph = async () => {
    return <Line options={{}} data={lineData} />
}

export {generateGraph}
