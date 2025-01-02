import React from 'react'
import "../styles/NavBar.css"
import logo from "../assets/logos/candlestick-chart.png"

import { IoReorderThreeOutline } from "react-icons/io5";
import { CiBellOn } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
// import logo from "/public/logo512.png"

const NavBar = () => {
  const logox = "/logo512.png"
  return (
    
    <>
      <div className='top-nav-bar'>
        <div className='brand'>
          <img src={logo} />
          {/* <div className='desc'>One Trade</div> */}
        </div>

        <div className='alert-menu-btn-con'>
          <div className='alert'>
              <FaRegBell className='ele'/>
          </div>
                
          <div className='menu-btn'>
            <GiHamburgerMenu className='ele'/>
          </div> 
        </div>
            
      </div>
    </>
  )
}

export default NavBar