import React from 'react'

import '../styles/quickTrade.css'

import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

const QuickTrade = () => {
  return (
    <>
        <div className="quick-trade-holder">
              <div className="buy-sell-holder">
                <div className="btn-wrapper">
                    <span><FaArrowUp style={{fontSize: "32px", color: "green"}}/></span>
                    <div className="buy-btn">Buy</div>
                </div>
                <div className="btn-wrapper">
                    <span><FaArrowDown style={{fontSize: "32px", color: "red"}} /></span>
                    <div className="sell-btn">Sell</div>
                </div>
                
            </div>
        </div>
    </>
  )
}

export default QuickTrade