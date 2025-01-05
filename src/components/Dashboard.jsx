import React from 'react'
import "../styles/dashboard.css"

import UserInfo from './UserInfo'

import { Line, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, plugins} from 'chart.js'
import QuickTrade from './QuickTrade'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

const Dashboard = () => {
  // const data = {
  //   labels: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
  //   datasets: [
  //     {
  //       label: "steps-A",
  //       data: [3000, 5000, 4500, 6812, 8820, 7000, 19000],
  //       borderColor: "red",
  //     },
  //     {
  //       label: "steps-B",
  //       data: [3500, 6000, 5050, 8000, 1000, 3000, 2000],
  //       borderColor: "green",
  //     },
  //   ],
  // };
  
  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: "fiat",
        data: [3000, 5000, 4500, 6000, 8580, 716, 9000],
        borderColor: "#3535e6dc",
        backgroundColor: "#3535e6dc",
        borderWidth: 2,
        tension: 0.4,
      },

      {
        label: "trade",
        data: [600, 5050, 4000, 2500, 6080, 756, 9890],
        borderColor: "#52e635dc",
        backgroundColor: "#52e635dc",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const pieData = {
    labels: ["Fiat", "Stocks", "Pending"],
    datasets: [
      {
        label: "Assets",
        data: [25000, 88500, 68000],
        backgroundColor: ["hotpink", "#52e635dc", "#3535e6dc"]
      },
    ],
  };


  // var options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: true,
  //       position: "top",
  //     },
  //   },
  //   scales: {
  //     x: {
  //       title: {
  //         display: true,
  //         text: "Days of the Week",
  //       },
  //     },
  //     y: {
  //       title: {
  //         display: true,
  //         text: "Steps",
  //       },
  //       beginAtZero: true,
  //     },
  //   },
  // };
  var options = {
    maintainAspectRatio: false,
    plugins: {
      Legend: true,

    },
    scales: {
      x: {
        title: {
          display: true,
          title: "hi"
        },
        display: true
      },
      y: {
        title: {
          display: true,
          title: "hi"
        },
        display: true
      }
    }
  }
  // const Line1 = <Line options={options} data={linearChartData} />


  return (
    <div className='dashboard-holder'>
      <div className='analytics'>
        <div className='menu-title'>
            Dashboard
        </div>
        <div className='menu-content'>
            <div className='overview-holder'>
                <div className='assets-card'>
                    <div className='asset-title'>Total Balance</div>
                    <div className='asset-sym-value-holder'>
                      <div className='curr-sym'>$</div>
                      <div className='assets-value'>10000</div>
                    </div>
                </div>
                
                <div className='assets-card'>
                    <div className='asset-title'>Stock Balance</div>
                    <div className='asset-sym-value-holder'>
                      <div className='curr-sym'>$</div>
                      <div className='assets-value'>10000</div>
                    </div>
                </div>
                
                <div className='assets-card'>
                    <div className='asset-title'>Fiat Balance</div>
                    <div className='asset-sym-value-holder'>
                      <div className='curr-sym'>$</div>
                      <div className='assets-value'>10000</div>
                    </div>
                </div>
                
                <div className='assets-card'>
                    <div className='asset-title'>Pending Balance</div>
                    <div className='asset-sym-value-holder'>
                      <div className='curr-sym'>$</div>
                      <div className='assets-value'>10000</div>
                    </div>
                </div>
            </div>
            <div className='visual-analysis-holder'>
              <div className='charts-holder'>
                  <div className='chart-1'>
                    <Line options={options} data={lineData} />
                  </div>
                  <div className='chart-2'>
                    <Pie options={options} data={pieData}/>
                  </div>
                    
              </div>
            </div>
            <div className='trending-holder'>
              <div className='title-holder'>Trending</div>
              <div className='stocks-holder'>------Trend Stocks------</div>
              <div className='stocks-holder'>------Trend Stocks------</div>
              <div className='stocks-holder'>------Trend Stocks------</div>
              <div className='stocks-holder'>------Trend Stocks------</div>
            </div>
        </div>
      </div>
      <div className='user-profile'>
        <UserInfo />
        <QuickTrade />
      </div>
    </div>
  )
}

export default Dashboard