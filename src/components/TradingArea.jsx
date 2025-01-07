import React from 'react'
import '../styles/tradingArea.css'

import { FaStar } from "react-icons/fa";

import { generateGraph } from '../services/chartService';

const TradingArea = () => {
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
                                      <div className="stock">AAPL</div>
                                      <div className="seperator">/</div>
                                      <div className="user-curr">USD</div>
                                  </div> 
                              </option>
                          </select>

                          <div className="price-wrapper">
                              <div className="curr-sym">$</div>
                              <div className="stock-price">10000.52</div>
                          </div>
                          
                          <div className="low-high-wrapper">
                              <div className="day-high">
                                  <div className="day-high-title">24h High</div>
                                  <div className="day-high-price">52.25</div>
                              </div>
                              <div className="day-low">
                                  <div className="day-low-title">24h Low</div>
                                  <div className="day-low-price">52.25</div>
                              </div>
                          </div>

                          <div className="watchlist-star">
                              <FaStar style={{borderColor: "white", backgroundColor: "white", color: "gray", fontSize: "32px"}} onClick={() => "On Click change color and update in watchlist"}/>
                          </div>
                      </div>
                      <div className="stock-chart">
                          <div className="chart-graph">
                              {generateGraph()}
                          </div>
                          <div className="stock-trade">
                              <div className="buy-stock"></div>
                              <div className="sell-stock"></div>
                          </div>
                      </div>
                  </div>
                  hi
              </div>
          </div>
      </>
  )
}

export default TradingArea