import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import axios from "axios";
import UserInfo from "./UserInfo";

import { Line, Pie } from "react-chartjs-2";

import QuickTrade from "./QuickTrade";
import { useSelector } from "react-redux";
import { readJWT } from "../services/jwtUtils";



const Dashboard = () => {
  
  // const fiatSelector = useSelector((state) => state.user.userInfo.account.fiatAccount.amount)
  // const stocksSelector = useSelector((state) => state.user.userInfo.account.stockAccount)
  const userSelector = useSelector((state) => state.user.userInfo);
  const menuSelection = useSelector((state) => state.menu.menuOptionSelected)

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
  }, [userSelector, userStocks]);

  // console.log("userS", userStocks.account)
  useEffect(() => {
    (async () => {
      const endpoint = `${process.env.REACT_APP_SERVER_URL}/stocks/trending`;
      const response = await axios.get(endpoint);

      if (response) {
        console.log("trennnnnnnnnnnn", response.data.trending);

        const trendingList = response.data.trending.map((item, key) => {
          console.log("each trend item", item.symbol);
          return <div key={key} className="bg-[#ffffff] w-[40%] rounded-lg h-[40px] px-1 box-border border-2">{item.symbol}</div>;
        });
        // setTrending([...trending, response.data.trending])
        setTrending(trendingList);
      }
    })();
  }, []);

  const [totalStockAmount, setTotalStockAmount] = useState(0)

  useEffect(() => {
    (async() => {
      try {
        const sessionToken = localStorage.getItem("session_token")
        const session_token = readJWT(sessionToken)
      
        const username = session_token.username
        const stockData = {
            username: username,
            token: sessionToken,
        }

        const stockList = userSelector.account.stockAccount.map((item) => item.ticker)

        const endpoint = `${process.env.REACT_APP_SERVER_URL}/${username}/totalstocks`;
        const totRes = await axios.post(endpoint, {...stockData,stocklist: stockList })

        console.log("amount TTTTT", totRes.data, stockList)
        setTotalStockAmount(totRes.data.totalAmount)
      
        
      } catch (error) {
        
      }
    })()
  },[userSelector, menuSelection])
  


  const getFiatBalance = () => {
    try {
      return userSelector.account.fiatAccount.amount
    } catch (error) {
      
    }
  }

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
                <div className="assets-value">{Math.floor((getFiatBalance() + totalStockAmount) * 100)/100}</div>
              </div>
            </div>

            <div className="assets-card">
              <div className="asset-title">Stock Balance</div>
              <div className="asset-sym-value-holder">
                <div className="curr-sym">$</div>
                <div className="assets-value">{Math.floor(totalStockAmount * 100)/100}</div>
              </div>
            </div>

            <div className="assets-card">
              <div className="asset-title">Fiat Balance</div>
              <div className="asset-sym-value-holder">
                <div className="curr-sym">$</div>
                <div className="assets-value">{Math.floor(getFiatBalance() *100)/100}</div>
              </div>
            </div>

            
          </div>
          <div className="top-stock title-holder">
            Top Stocks
          </div>
          <div className=" top-stock-con h-auto bg-[white] flex flex-wrap justify-between w-full gap-x-2 gap-y-2 box-border">
            
            {userStocks.map((item, key) => {
              let imgLink = ""
              try {

                const url = new URL(item.url)
                const hostUrl = url.hostname
                // let imgLink = `https://img.logo.dev/${hostUrl.slice(4)}?greyscale=true&token=${process.env.REACT_APP_STOCK_IMG_TOKEN}`
                imgLink = `https://img.logo.dev/${hostUrl.slice(4)}?token=${process.env.REACT_APP_STOCK_IMG_TOKEN}`
              } catch (error) {
                
              }
              // const url = new URL(item.url)
              // const hostUrl = url.hostname
              // // let imgLink = `https://img.logo.dev/${hostUrl.slice(4)}?greyscale=true&token=${process.env.REACT_APP_STOCK_IMG_TOKEN}`
              // let imgLink = `https://img.logo.dev/${hostUrl.slice(4)}?token=${process.env.REACT_APP_STOCK_IMG_TOKEN}`
              // // console.log("each logo", hostUrl, hostUrl.slice(4))
              // console.log("url is", item.url)
              

              // src="https://img.logo.dev/smith-wesson.com?greyscale=true&token=pk_ZJlMiU5ZSYCLHHybrbVDWg"
              return (
                <div className="stock-card w-[30%] bg-white rounded-large  flex flex-col flex-wrap rounded-lg box-border p-2 border-2"  key={key}>
                  <div className="logo-symbol-holder box-border flex flex-wrap items-center justify-start bg-[#ffffff] w-full gap-x-1">
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
