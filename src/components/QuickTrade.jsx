import React from 'react'

import '../styles/quickTrade.css'

import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '../constants.js/menuConstants';
import { selectMenuOption } from '../reduxManager/features/slices/menuSlice';



const QuickTrade = () => {
  const menuSelection = useSelector((state) => state.menu.menuOptionSelected)
  const dispatch = useDispatch()
  
  return (
    <>
        <div className="quick-trade-holder">
              <div className="buy-sell-holder">
                <div className="btn-wrapper">
                    <span><FaArrowUp style={{fontSize: "32px", color: "green"}} className='hidden lg:block' /></span>
                    <div className="buy-btn" onClick={() => {
                      dispatch(selectMenuOption(Menu.TRADE))
                      
                    }}>Buy</div>
                </div>
                <div className="btn-wrapper">
                    <span><FaArrowDown style={{fontSize: "32px", color: "red"}} className='hidden lg:block' /></span>
                    <div className="sell-btn" onClick={() => {
                      dispatch(selectMenuOption(Menu.TRADE))
                      
                    }}>Sell</div>
                </div>
                
            </div>
        </div>
    </>
  )
}

export default QuickTrade