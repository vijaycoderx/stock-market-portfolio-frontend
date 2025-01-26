import React, { useEffect, useState } from 'react'
import '../styles/tradingArea.css'


import { FaStar } from "react-icons/fa";

import { generateGraph } from '../services/chartService';

import { addFav, buyStock, getHistoricalData, sellStock } from '../services/stockService';
import { GiRank3 } from 'react-icons/gi';

import { BiSolidUpArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";

import { getStockSymbols } from '../constants.js/stockSymbols';
import { TimeRange } from '../constants.js/timeRangeConstants';
import { useDispatch, useSelector } from 'react-redux';
import { readJWT } from '../services/jwtUtils';
import { setUserInfo } from '../reduxManager/features/slices/userSlice';
import axios from 'axios';
// import yahooFinance from 'yahoo-finance2';

const TradingArea = () => {

    const fetchUpdatedUserData = async () => {
        const userSessionData = readJWT(localStorage.getItem('session_token'))
        const endpoint = `${process.env.REACT_APP_SERVER_URL}/user/${userSessionData.username}`
        console.log("end", endpoint)
        const response = await axios.get(endpoint)
        console.log("resxxxxxxxxxxxxxxxxxxx", response.data)
        dispatch(setUserInfo(response.data))
        if (response) {
            
            return response.data
        }
        
    }

    const [graph, setgraph] = useState();
    const [searchbar, setSearchbar] = useState();
    const [searchbarOptions, setSearchbarOptions] = useState([]);
    const [selectedStock, setSelectedStock] = useState({
        ticker: "AAPL",
        curr: "USD",
        range: "1d",
        currSymbol: "$",
        stockPrice: 0,
        low: 0,
        high: 0,
    })

    const [trade, setTrade] = useState({
        selectedOperation: "buy",
        portion: 0.0,
        portionColor: "lightgreen",
        stockQuantity: 0,
        accountBalance: 0,
        stockAmountValue: 0,
        stockQuantityValue: 0,
    })

    // const [stockPrice, setStockPrice] = useState(0)
    // const [updateBal, setUpdateBal] = useState(false)

    const dispatch = useDispatch()
    const fiatSelector = useSelector((state) => state.user.userInfo.account.fiatAccount.amount)
    const stocksSelector = useSelector((state) => state.user.userInfo.account.stockAccount)
    // const updatedFiatSelector = useSelector((state) => updateBal ? state.user.userInfo.account.fiatAccount.amount : "hex")

    
    const stockSymbolsList = getStockSymbols()
    
    // setTrade({...trade, accountBalance: fiatSelector})
    const findStocks = (stockText) => {
        let filtered
        if (stockText == "") {
            filtered = []
            
        } else {
            filtered = stockSymbolsList.filter((item) => {
                return item.toLowerCase().includes(stockText.toLowerCase())
            })
        }
        
        filtered.sort()
        console.log("findstocks", filtered, stockText)
        setSearchbarOptions(filtered.slice(0,10))
    }
    // console.log("stocks", stockSymbolsList, "fil",filtered)

    const getCurrentStockQuantity = (stock) => {
        for (let i = 0; i < stocksSelector.length; i++) {
            const element = stocksSelector[i];
            if (element.ticker === stock.ticker) {
                console.log("Element matched:", element, "Quantity:", element.quantity, "Stock:", stock.ticker);
                return element.quantity;
            }
        }
        console.log("Stock not found:", stock.ticker);
        return 0;
    }
    // useEffect(() => {
        
    // }, [fiatSelector])
    
    useEffect(() => {
        console.log("hi1")
        const fetcher = async () => {
            try {
                const now = new Date();
                console.log("current date", now)
                const intervals = {
                    "1d": () => {
                        let startDate = new Date(now)
                        startDate.setUTCDate(now.getUTCDate() - 1)

                        let interval = "5m"
                        return [startDate, interval]
                    },
                    "1w": () => {
                        let startDate = new Date(now);
                        startDate.setUTCDate(now.getUTCDate() - 7)
                        let interval = "5m"
                        return [startDate, interval]
                    },
                    "1m": () => {
                        let startDate = new Date(now);
                        startDate.setUTCMonth(now.getUTCMonth() - 1)
                        let interval = "1d"
                        return [startDate, interval]
                    },
                    "6m": () => {
                        let startDate = new Date(now);
                        startDate.setUTCMonth(now.getUTCMonth() - 6)
                        let interval = "1d"
                        return [startDate, interval]
                    },
                    "1y": () => {
                        let startDate = new Date(now);
                        startDate.setUTCFullYear(now.getUTCFullYear() - 1)
                        let interval = "1d"
                        console.log("now", now, "updated", startDate.getFullYear())
                        return [startDate, interval]
                    },
                }
                const [startDate, interval] = intervals[selectedStock.range]()
                // console.log("date", intervals[selectedStock.range](), startDate, interval, "hi", startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`)
                const isoDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`
                console.log("iso date", isoDate, startDate.toLocaleDateString(), selectedStock.ticker)
                const data = { "stock": selectedStock.ticker, "startDate": isoDate, "interval": interval }
                const stockHistoricalData = await getHistoricalData(data)

                // setStockPrice(stockHistoricalData.data.stockPrice)

                //set current stock params

                setSelectedStock({ ...selectedStock, stockPrice: stockHistoricalData.data.stockPrice, high: stockHistoricalData.data.stockPriceHigh, low: stockHistoricalData.data.stockPriceLow })
                // console.log("000000000000000iiii", getCurrentStockQuantity({ticker: selectedStock.ticker}), "0000000000iii", selectedStock.ticker)
                setTrade({...trade, accountBalance: fiatSelector, stockQuantity: getCurrentStockQuantity({ticker: selectedStock.ticker})})
                

                console.log("history", stockHistoricalData)
                const quotes = stockHistoricalData.data.historicalData.quotes
                
                const GRAPH = generateGraph(quotes)
                setgraph(GRAPH)
            } catch (error) {
                console.log("error", error.message)
            }
            
        }
        fetcher();
        console.log("hi2")
    }, [selectedStock.ticker, selectedStock.range])


    const filteredStocks = searchbarOptions
    console.log("fi", filteredStocks, "top")

    const getTopTenStocks = filteredStocks.map((item, key) => {
        return (
            <div key={key} onClick={() => {
                setSearchbarOptions([])
                setSearchbar("")
                setSelectedStock({ ...selectedStock, ticker: item })
                
            }}>{item}</div>
        )
    })

    
    console.log("fil1111111", filteredStocks, "topTen",getTopTenStocks, selectedStock)
    
    // const stocksSelector = useSelector((state) => state.user.userInfo.account.stockAccount)
    
    // if (trade.selectedOperation === "buy") {
    //     const fiatSelector = useSelector((state) => state.user.userInfo.account.fiatAccount.amount)
    // } else if (trade.selectedOperation === "sell"){
    //     const stockSelector = useSelector((state) => state.user.userInfo.account.stockAccount.amount)
    // }

    // const getCurrentStockQuantity = (stock) => {
    //     for (let i = 0; i < stocksSelector.length; i++) {
    //         const element = stocksSelector[i];
    //         if (element.ticker === stock.ticker) {
    //             console.log("Element matched:", element, "Quantity:", element.quantity, "Stock:", stock.ticker);
    //             return element.quantity;
    //         }
    //     }
    //     console.log("Stock not found:", stock.ticker);
    //     return 0;
    // }
    
    // const calAmount = (p) => {
    //     const percentageAmount = (trade.accountBalance * p).toFixed(2)
    //     const percentageStock = (trade.stockQuantity * p).toFixed(2)
    //     if (trade.selectedOperation == "buy") {
            
    //         // let approxQuantity = (percentageAmount/selectedStock.stockPrice).toFixed(2)
    //         // console.log(percentageAmount, "q", approxQuantity)
    //         console.log("amount in $", percentageAmount)
            
    //     } else if (trade.selectedOperation == "buy"){
    //         console.log("amount in $", percentageStock * selectedStock.stockPrice)
    //     }
    // }
    // const calQuantity = (p) => {
    //     const percentageAmount = (trade.accountBalance * p).toFixed(2)
    //     const percentageStock = (trade.stockQuantity * p).toFixed(2)

    //     if (trade.selectedOperation == "buy") {
    //         console.log("quantitya",percentageAmount/selectedStock.stockPrice)
    //     } else {
    //         console.log("quantityb",percentageStock * selectedStock.stockPrice)
    //     }
    // }
    
    const calAmountQuantity = (per) => {
        const percentageAmount = Math.floor((trade.accountBalance * per) * 100) / 100
        const percentageStock = Math.floor((trade.stockQuantity * per) * 100) / 100

        if (trade.selectedOperation == "buy") {
            const fQunatity = Math.floor(((percentageAmount / selectedStock.stockPrice) * 100)) / 100
            
            setTrade({...trade, stockAmountValue: percentageAmount, stockQuantityValue: fQunatity})
            console.log("Amount", percentageAmount, "quantity", fQunatity)
        } else {
            const fAmount = Math.floor(((percentageStock * selectedStock.stockPrice) * 100)) / 100
            setTrade({...trade, stockAmountValue: fAmount, stockQuantityValue: percentageStock})
            console.log("Amount", fAmount, "quantity", percentageStock)
        }
    }

    console.log("trade state", trade)

    
    const performTrade = async (data) => {
        const sessionToken = localStorage.getItem("session_token")
        const session_token = readJWT(sessionToken)
        
        const username = session_token.username
        const stockData = {
            username: username,
            ticker: selectedStock.ticker,
            quantity: trade.stockQuantityValue,
            token: sessionToken,
            type: trade.selectedOperation
        }
        console.log("tradddddddddddddddddddde", stockData,"trade", trade)

        
        if (trade.selectedOperation === "buy") {
            const buyStockRes = await buyStock(stockData)
            if (buyStockRes) {
                // dispatch(setUserInfo())
                const stateRefreshRes = await fetchUpdatedUserData()
                // const fiatSelector = useSelector((state) => state.user.userInfo.account.fiatAccount.amount)
                // const stocksSelector = useSelector((state) => state.user.userInfo.account.stockAccount)
                if (stateRefreshRes) {
                    console.log("buy completed", trade.accountBalance, fiatSelector, "sec", fiatSelector, stateRefreshRes)
                    
                    const getCurrentStockQuantityLocal = (stock) => {
                        const stocksSelector = stateRefreshRes.account.stockAccount
                        console.log("local", stateRefreshRes.account.stockAccount, stock)
                        for (let i = 0; i < stocksSelector.length; i++) {
                            const element = stocksSelector[i];
                            if (element.ticker === stock.ticker) {
                                console.log("Element matchedLocal:", element, "QuantityLocal:", element.quantity, "Stock:", stock.ticker);
                                return element.quantity;
                            }
                        }
                        console.log("Stock not found:", stock.ticker);
                        return 0;
                    }
                    
                    const updatedStockQuantity = getCurrentStockQuantityLocal({stock: trade.selectedStock})

                    setTrade({...trade, accountBalance: stateRefreshRes.account.fiatAccount.amount, stockAmountValue: 0, stockQuantityValue: 0, stockQuantity: updatedStockQuantity})
                }
                
                // setUpdateBal(true)
                
                
            }
        } else {
            
            const sellStockRes = await sellStock(stockData)
            console.log("sell res", sellStockRes)
            if (sellStockRes) {
                // dispatch(setUserInfo())
                const stateRefreshRes = await fetchUpdatedUserData()
                // const fiatSelector = useSelector((state) => state.user.userInfo.account.fiatAccount.amount)
                // const stocksSelector = useSelector((state) => state.user.userInfo.account.stockAccount)
                if (stateRefreshRes) {
                    console.log("sell completed", trade.accountBalance, fiatSelector, "sec", fiatSelector, stateRefreshRes, selectedStock.ticker)

                    const getCurrentStockQuantityLocal = (stock) => {
                        const stocksSelector = stateRefreshRes.account.stockAccount
                        console.log("local", stateRefreshRes.account.stockAccount, stock)
                        for (let i = 0; i < stocksSelector.length; i++) {
                            const element = stocksSelector[i];
                            if (element.ticker === stock.ticker) {
                                console.log("Element matchedLocal:", element, "QuantityLocal:", element.quantity, "Stock:", stock.ticker);
                                return element.quantity;
                            }
                        }
                        console.log("Stock not found:", stock.ticker);
                        return 0;
                    }
                    const updatedStockQuantity = getCurrentStockQuantityLocal({ticker: selectedStock.ticker})

                    setTrade({...trade, accountBalance: stateRefreshRes.account.fiatAccount.amount, stockAmountValue: 0, stockQuantityValue: 0, stockQuantity: updatedStockQuantity})
                }
                
                // setUpdateBal(true)
                
                
            }
        }

    }

    const addWishlist = async () => {
        const sessionToken = localStorage.getItem("session_token")
        const session_token = readJWT(sessionToken)
        const username = session_token.username
        const data = {ticker: selectedStock.ticker, token: sessionToken, username: username}
        const markFav = await addFav(data)
        console.log("maaaaaaaaaaaaaaaaaaaaaaaaaaaaaark", markFav)
        if (markFav) {
            console.log("performrf add/remove  fav")
            const stateRefreshRes = await fetchUpdatedUserData()

            if (stateRefreshRes) {
                console.log("refreshed")
            }
        }
    }

  return (
      <>
          <div className="trade-holder">
              <div className="trade-content">
                  <div className="menu-title">
                      Trade
                  </div>

                  <div className="chart-buy-sell-holder">
                      <div className="stock-bar">
                          <select name="stock" id="" className="ticker">
                              <option value="" className="ticker-item">
                                  <div className="stock-wrapper">
                                      <div className="stock">{selectedStock.ticker}</div>
                                      <div className="seperator">/</div>
                                      <div className="user-curr">{selectedStock.curr}</div>
                                  </div> 
                              </option>
                          </select>

                          <div className="price-wrapper">
                              <div className="curr-sym">{selectedStock.currSymbol}</div>
                              <div className="stock-price">{selectedStock.stockPrice}</div>
                          </div>
                          
                          <div className="low-high-wrapper">
                              <div className="day-high">
                                  <div className="day-high-title">24h High</div>
                                  <div className="day-high-price">{selectedStock.high}</div>
                              </div>
                              <div className="day-low">
                                  <div className="day-low-title">24h Low</div>
                                  <div className="day-low-price">{selectedStock.low}</div>
                              </div>
                          </div>

                          <div className="watchlist-star">
                              <FaStar style={{ borderColor: "white", backgroundColor: "", color: "gray", fontSize: "28px" }} onClick={() => {
                                  addWishlist()
                                  console.log("On Click change color and update in watchlist")
                              }}/>
                          </div>

                          <div className="time-period">
                              <div className=" 1d 1-day t-item" onClick={() => {
                                  setSelectedStock({ ...selectedStock, range: TimeRange.DAY })
                                  console.log("selesced stock", selectedStock)
                              }}>1D</div>
                              <div className="1w 7-day t-item" onClick={() => {
                                  setSelectedStock({ ...selectedStock, range: TimeRange.WEEK })
                                  console.log("selesced stock", selectedStock)
                              }}>7D</div>
                              <div className="1m 1-month t-item" onClick={() => {
                                  setSelectedStock({ ...selectedStock, range: TimeRange.MONTH })
                                  console.log("selesced stock", selectedStock)
                              }}>1M</div>
                              <div className="6m 6-month t-item" onClick={() => {
                                  setSelectedStock({ ...selectedStock, range: TimeRange.SIXMONTH })
                                  console.log("selesced stock", selectedStock)
                              }}>6M</div>
                              <div className="1y 1-year t-item" onClick={() => {
                                  setSelectedStock({ ...selectedStock, range: TimeRange.YEAR })
                                  console.log("selesced stock", selectedStock)
                              }}>1Y</div>
                          </div>

                          <div className="search-bar-holder">
                              <input type="text" placeholder='search stock' value={searchbar} onChange={(e) => {
                                  findStocks(e.target.value)
                                  setSearchbar(e.target.value)
                                //   console.log(e.target.value, "hey input", searchbar)
                                  
                              }}/>
                              <div className="search-stocks-holder">
                                  {getTopTenStocks}
                              </div>
                              {/* <div className="xol">space1</div>
                              
                              
                              
                              <div className="xol">space1</div>
                              <div className="xol">space1</div> */}
                          </div>
                      </div>
                      <div className="stock-chart">
                          <div className="chart-graph bg-white">
                              {/* {generateGraph()} */}
                              {graph}
                              {/* hex */}
                          </div>
                          <div className="stock-trade">
                              <div className="stock-market-holder">
                                  <div className="buy-sell-holder">
                                      <div className="buy-stock ele-item" onClick={() => {
                                        //   const accountBalance = getCurrentStockQuantity(selectedStock)
                                          setTrade({...trade, selectedOperation: "buy", portionColor:"lightgreen", accountBalance: fiatSelector, stockAmountValue: 0, stockQuantityValue: 0})
                                      }}>buy</div>
                                      <div className="sell-stock ele-item" onClick={() => {
                                          const stockQuantity = getCurrentStockQuantity(selectedStock)
                                          console.log("jjjjjjjjjjjjjjjjj", stockQuantity)
                                          setTrade({...trade, selectedOperation: "sell", portionColor:"lightred", stockQuantity: stockQuantity, stockAmountValue: 0, stockQuantityValue: 0})
                                      }}>sell</div>
                                  </div>
                                  <div className="buy-sell-config-holder">

                                      <div className="as-balance">
                                          <div className="avail">Available</div>
                                          <div className="avail-val">{trade.selectedOperation === "buy" ? trade.accountBalance >= 0 ? (Math.floor(trade.accountBalance * 100))/100 : 0 : parseFloat(trade.stockQuantity) >= 0.001 ? trade.stockQuantity : 0}</div>
                                          {/* {trade.stockQuantity} */}
                                      </div>
                                      <div className="amount-of-bal">
                                          <div className="amount-vol-holder">
                                              <span className={`per-btn ${trade.selectedOperation == "buy" ? "bg-[#6cff6c]": "bg-[#ff6666]"}`} onClick={() => {
                                                  calAmountQuantity(0.25)
                                              }}>
                                                  25%
                                              </span>
                                              <span className={`per-btn ${trade.selectedOperation == "buy" ? "bg-[#6cff6c]": "bg-[#ff6666]"}`} onClick={() => {
                                                  calAmountQuantity(0.50)
                                              }}>
                                                  50%
                                              </span>
                                              <span className={`per-btn ${trade.selectedOperation == "buy" ? "bg-[#6cff6c]": "bg-[#ff6666]"}`} onClick={() => {
                                                  calAmountQuantity(0.75)
                                              }}>
                                                  75%
                                              </span>
                                              <span className={`per-btn ${trade.selectedOperation == "buy" ? "bg-[#6cff6c]": "bg-[#ff6666]"}`} onClick={() => {
                                                  calAmountQuantity(1)
                                              }}>
                                                  100%
                                              </span>
                                          </div>
                                      </div>
                                      <div className="set-price">
                                          <span className="ele-holder">
                                              <div className="price-curr-holder">
                                                  <input type="text" placeholder='Stock Quantity' value={trade.stockQuantityValue} onChange={(e) => {
                                                      setTrade({...trade, stockQuantityValue: e.target.value})
                                                  }}/>
                                                  <span className="curr">AAPL</span>
                                                  
                                              </div>
                                              
                                              {/* <span>hi</span> */}
                                              
                                              {/* <span className="arrow-holder" >
                                                  <BiSolidUpArrow style={{}} />
                                                  <BiSolidDownArrow style={{}} />
                                                  
                                              </span> */}
                                          </span>
                                          

                                      </div>
                                      
                                      <div className="set-price">
                                          <span className="ele-holder">
                                              <div className="price-curr-holder">
                                                  <input type="text" placeholder='Amount' value={trade.stockAmountValue} onChange={(e) => {
                                                      setTrade({...trade, stockAmountValue: e.target.value})
                                                  }}/>
                                                  <span className="curr">USD</span>
                                                  
                                              </div>
                                              
                                              {/* <span>hi</span> */}

                                              {/* <span className="arrow-holder" >
                                                  <BiSolidUpArrow style={{}} />
                                                  <BiSolidDownArrow style={{}} />
                                                  
                                              </span> */}
                                          </span>
                                          
                                          
                                      </div>

                                      <div className="order-btn" onClick={() => performTrade()}>Order</div>

                                      
                                              
 
                                    
                                </div>
                                  
                              </div>
                              
                              
                          </div>
                      </div>
                  </div>
                  {/* hi */}
              </div>
          </div>
      </>
  )
}

export default TradingArea