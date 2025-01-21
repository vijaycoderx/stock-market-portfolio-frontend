import React, { useEffect, useState } from 'react'
import '../styles/tradingArea.css'

import { FaStar } from "react-icons/fa";

import { generateGraph } from '../services/chartService';

import { getHistoricalData } from '../services/stockService';
import { GiRank3 } from 'react-icons/gi';

import { BiSolidUpArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";

import { getStockSymbols } from '../constants.js/stockSymbols';
import { TimeRange } from '../constants.js/timeRangeConstants';
import { useSelector } from 'react-redux';
// import yahooFinance from 'yahoo-finance2';

const TradingArea = () => {

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
        stockAmount: 0,
        stockAmountValue: 0,
        stockQuantityValue: 0,
    })

    // const [stockPrice, setStockPrice] = useState(0)
    const fiatSelector = useSelector((state) => state.user.userInfo.account.fiatAccount.amount)
    const stocksSelector = useSelector((state) => state.user.userInfo.account.stockAccount)
    const stockSymbolsList = getStockSymbols()
    
    
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
                setTrade({...trade, stockAmount: fiatSelector, stockQuantity: getCurrentStockQuantity({ticker: selectedStock.ticker})})
                

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
                setSelectedStock({...selectedStock, ticker: item})
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
    //     const percentageAmount = (trade.stockAmount * p).toFixed(2)
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
    //     const percentageAmount = (trade.stockAmount * p).toFixed(2)
    //     const percentageStock = (trade.stockQuantity * p).toFixed(2)

    //     if (trade.selectedOperation == "buy") {
    //         console.log("quantitya",percentageAmount/selectedStock.stockPrice)
    //     } else {
    //         console.log("quantityb",percentageStock * selectedStock.stockPrice)
    //     }
    // }

    const calAmountQuantity = (per) => {
        const percentageAmount = Math.floor((trade.stockAmount * per) * 100) / 100
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
        if (trade.selectedOperation === "buy") {
            
        }else{

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
                              <FaStar style={{borderColor: "white", backgroundColor: "", color: "gray", fontSize: "28px"}} onClick={() => "On Click change color and update in watchlist"}/>
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
                                        //   const stockAmount = getCurrentStockQuantity(selectedStock)
                                          setTrade({...trade, selectedOperation: "buy", portionColor:"lightgreen", stockAmount: fiatSelector, stockAmountValue: 0, stockQuantityValue: 0})
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
                                          <div className="avail-val">{trade.selectedOperation === "buy" ? trade.stockAmount : trade.stockQuantity}</div>
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
                                                  <input type="text" placeholder='Stock Quantity' value={trade.stockQuantityValue} />
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
                                                  <input type="text" placeholder='Amount' value={trade.stockAmountValue} />
                                                  <span className="curr">USD</span>
                                                  
                                              </div>
                                              
                                              {/* <span>hi</span> */}

                                              {/* <span className="arrow-holder" >
                                                  <BiSolidUpArrow style={{}} />
                                                  <BiSolidDownArrow style={{}} />
                                                  
                                              </span> */}
                                          </span>
                                          
                                          
                                      </div>

                                      <div className="order-btn">Order</div>

                                      
                                              
 
                                    
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