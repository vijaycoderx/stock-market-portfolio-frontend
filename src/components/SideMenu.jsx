import React from 'react'
import '../styles/sideMenu.css'

import { LuLayoutDashboard } from "react-icons/lu";
import { BiDollarCircle } from "react-icons/bi";
import { RiStockLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoHelpCircleOutline } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
const SideMenu = () => {
  return (
    <>
      <div className='side-menu-con'>
        
        <ul className='first-unorder'>
          <li className='mt-8'>
            <div className='menu-item'>
              <div className='icon'>
                <LuLayoutDashboard style={{fontSize: "18px"}}/>
              </div>
              <div className='menu-item-text'>
                Dashboard
              </div>
              {/* <hr /> */}
            </div>
          </li>
          <li>
            <div className='menu-item'>
              <div className='icon'>
                <BiDollarCircle style={{fontSize: "20px"}} />
              </div>
              <div className='menu-item-text'>
                Assets
              </div>
              {/* <hr /> */}
            </div>
          </li>
          <li>
            <div className='menu-item'>
            <div className='icon'>
                <RiStockLine style={{fontSize: "20px"}} />
              </div>
              <div className='menu-item-text'>
                Trade
              </div>
              {/* <hr /> */}
            </div>
          </li>
          <li>
            <div className='menu-item'>
              <div className='icon'>
                <FaRegStar style={{fontSize: "20px"}} />
              </div>
              <div className='menu-item-text'>
                Watchlist
              </div>
              {/* <hr /> */}
            </div>
          </li>
          <li>
            <div className='menu-item'>
                <div className='icon'>
                  <MdHistory style={{fontSize: "20px"}} />
                </div>
              <div className='menu-item-text'>
                History
              </div>
              {/* <hr /> */}
            </div>
          </li>

          <li>
            <div className='menu-item'>
              <div className='icon'>
                <IoSettingsOutline style={{fontSize: "20px"}} />
              </div>
              <div className='menu-item-text'>
                Settings
              </div>
            </div>
          </li>

        </ul>
        
        <ul className='second-unorder'>
          <li>
            <div className='menu-item'>
              <div className='icon'>
                <IoHelpCircleOutline style={{fontSize: "20px"}} />
              </div>
              
              <div className='menu-item-text'>
                Support
              </div>
            </div>
          </li>

          

          <li>
            <div className='menu-item'>
                <div className='icon'>
                  <CgLogOut style={{fontSize: "20px"}} />
                </div>
              <div className='menu-item-text'>
                Log out
              </div>
            </div>
          </li>

        </ul>
      </div>
    </>
  )
}

export default SideMenu