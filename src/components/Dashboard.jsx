import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import axios from "axios";
import UserInfo from "./UserInfo";

import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  plugins,
} from "chart.js";
import QuickTrade from "./QuickTrade";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

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
  const userSelector = useSelector((state) => state.user.userInfo);

  const [userStocks, setUserStocks] = useState([]);
  const [trending, setTrending] = useState([]);
  const [userTopStocks, setUserTopStocks] = useState()

  useEffect(() => {
    (async () => {
      try {
        setUserStocks(userSelector.account.stockAccount);
        console.log("SuperSu", userStocks);
      } catch (error) {}
    })();
  }, [userSelector]);

  // console.log("userS", userStocks.account)
  useEffect(() => {
    (async () => {
      const endpoint = `${process.env.REACT_APP_SERVER_URL}/stocks/trending`;
      const response = await axios.get(endpoint);

      if (response) {
        console.log("trennnnnnnnnnnn", response.data.trending);

        const trendingList = response.data.trending.map((item, key) => {
          console.log("each trend item", item.symbol);
          return <div key={key} className="bg-[#b95af8] w-[40%] rounded-lg h-[40px] px-1">{item.symbol}</div>;
        });
        // setTrending([...trending, response.data.trending])
        setTrending(trendingList);
      }
    })();
  }, []);

  // const lineData = {
  //   labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //   datasets: [
  //     {
  //       label: "fiat",
  //       data: [3000, 5000, 4500, 6000, 8580, 716, 9000],
  //       borderColor: "#3535e6dc",
  //       backgroundColor: "#3535e6dc",
  //       borderWidth: 2,
  //       tension: 0.4,
  //     },

  //     {
  //       label: "trade",
  //       data: [600, 5050, 4000, 2500, 6080, 756, 9890],
  //       borderColor: "#52e635dc",
  //       backgroundColor: "#52e635dc",
  //       borderWidth: 2,
  //       tension: 0.4,
  //     },
  //   ],
  // };

  // const pieData = {
  //   labels: ["Fiat", "Stocks", "Pending"],
  //   datasets: [
  //     {
  //       label: "Assets",
  //       data: [25000, 88500, 68000],
  //       backgroundColor: ["hotpink", "#52e635dc", "#3535e6dc"],
  //     },
  //   ],
  // };

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

  // var options = {
  //   maintainAspectRatio: false,
  //   plugins: {
  //     Legend: true,
  //   },
  //   scales: {
  //     x: {
  //       layout: {
  //         padding: {
  //           left: 0, // Removes the left margin
  //           right: 0,
  //           top: 0,
  //           bottom: 0,
  //         },
  //       },
  //       title: {
  //         display: true,
  //         title: "hi",
  //       },
  //       display: true,
  //       ticks: {
  //         callback: function (value, index) {
  //           return index === 0 ? "" : this.getLabelForValue(value);
  //         },
  //       },
  //     },
  //     y: {
  //       layout: {
  //         padding: {
  //           left: 0, // Removes the left margin
  //           right: 0,
  //           top: 0,
  //           bottom: 0,
  //         },
  //       },
  //       title: {
  //         display: false,
  //         title: "hi",
  //       },
  //       display: true,
  //     },
  //   },
  // };

  // const options = {
  //   scales: {
  //     x: {
  //       title: {
  //         display: false,
  //         text: "Time",
  //       },
  //       grid: {
  //         display: false,
  //       },
  //       ticks: {
  //         maxTicksLimit: 6,
  //         callback: function (value, index) {
  //           // return index % 2 === 0 ? this.getLabelForValue(value) : "";
  //           return index === 0 ? '' : this.getLabelForValue(value);
  //         },
  //       },
  //     },
  //     y: {
  //       title: {
  //         display: false,
  //         text: "Price",
  //       },
  //       grid: {
  //         display: false,
  //       },
  //     },
  //   },
  // };
  // const Line1 = <Line options={options} data={linearChartData} />

  return (
    <div className="dashboard-holder">
      <div className="analytics">
        <div className="menu-title">Dashboard</div>
        <div className="menu-content">
          <div className="overview-holder">
            <div className="assets-card">
              <div className="asset-title">Total Balance</div>
              <div className="asset-sym-value-holder">
                <div className="curr-sym">$</div>
                <div className="assets-value">10000</div>
              </div>
            </div>

            <div className="assets-card">
              <div className="asset-title">Stock Balance</div>
              <div className="asset-sym-value-holder">
                <div className="curr-sym">$</div>
                <div className="assets-value">10000</div>
              </div>
            </div>

            <div className="assets-card">
              <div className="asset-title">Fiat Balance</div>
              <div className="asset-sym-value-holder">
                <div className="curr-sym">$</div>
                <div className="assets-value">10000</div>
              </div>
            </div>

            {/* <div className="assets-card">
              <div className="asset-title">Pending Balance</div>
              <div className="asset-sym-value-holder">
                <div className="curr-sym">$</div>
                <div className="assets-value">10000</div>
              </div>
            </div> */}
          </div>
          <div className="top-stock title-holder">
            Top Stocks
          </div>
          <div className=" top-stock-con h-auto bg-[white] flex flex-wrap justify-between w-full gap-x-2 gap-y-2 box-border">
            
            {userStocks.map((item, key) => {
              const url = new URL(item.url)
              const hostUrl = url.hostname
              let imgLink = `https://img.logo.dev/${hostUrl.slice(4)}?greyscale=true&token=${process.env.REACT_APP_STOCK_IMG_TOKEN}`
              imgLink = `https://img.logo.dev/${hostUrl.slice(4)}?token=${process.env.REACT_APP_STOCK_IMG_TOKEN}`
              console.log("each logo", hostUrl, hostUrl.slice(4))
              // src="https://img.logo.dev/smith-wesson.com?greyscale=true&token=pk_ZJlMiU5ZSYCLHHybrbVDWg"
              return (
                <div className="stock-card w-[30%] bg-white rounded-large  flex flex-col flex-wrap rounded-lg box-border px-2" key={key}>
                  <div className="logo-symbol-holder box-border flex flex-wrap flex items-center justify-center bg-[#ffffff] w-[40%]">
                    <img
                      src={imgLink}
                      alt=""
                      width="50"
                      className="rounded-full"
                    />
                    <div className="stock-symbl">{item.ticker}</div>
                  </div>

                  <div className="stock-name">{item.tickerName}</div>
                  
                  
                </div>

              );
            })}
            
            
          </div>

          {/* <div className="visual-analysis-holder">
            <div className="charts-holder">
              <div className="chart-1 ">
                <Line data={lineData} options={options}  />
              </div>
              <div className="chart-2">
                <Pie data={pieData} options={options}  />
              </div>
            </div>
          </div> */}
          <div className="trending-holder">
            <div className="title-holder">Trending</div>
            {/* {trending.map((item, key) => {
              return (
                <div key={key}>{"huj"}</div>
              )
            })} */}
            <div className="trend-list-wrap">
              {trending}
            </div>
            

            {/* <div className="stocks-holder">------Trend Stocks------</div>
            <div className="stocks-holder">------Trend Stocks------</div>
            <div className="stocks-holder">------Trend Stocks------</div>
            <div className="stocks-holder">------Trend Stocks------</div> */}
          </div>
        </div>
      </div>
      <div className="user-profile">
        <UserInfo />
        <QuickTrade />
      </div>
    </div>
  );
};

export default Dashboard;
