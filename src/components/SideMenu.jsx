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

import { useDispatch, useSelector } from 'react-redux';

import { selectMenuOption } from '../reduxManager/features/counter/menuSlice';

import { Menu } from '../constants.js/menuConstants';
import { resetSession } from '../services/sessionManager';

const SideMenu = () => {
  const dispatch = useDispatch();
  const menuSelection = useSelector((state) => state.menu.menuOptionSelected)
  console.log("ff", menuSelection)
  return (
    <>
      <div className='side-menu-con'>
        
        <ul className='first-unorder'>
          <li className='mt-8'>
            {console.log(menuSelection, menuSelection === Menu.DASHBOARD, Menu.DASHBOARD)}
            <div className={`menu-item ${menuSelection === Menu.DASHBOARD ? 'bg-[#d1eef8]' : 'bg-white'}  ${menuSelection === Menu.NULL ? 'bg-[#d1eef8]' : 'bg-white'}` } onClick={() => {
                dispatch(selectMenuOption(Menu.DASHBOARD))
              }}>
              <div className='icon'>
                <LuLayoutDashboard style={{fontSize: "18px"}}/>
              </div>
              <div className='menu-item-text' >
                Dashboard
              </div>
              {/* <hr /> */}
            </div>
          </li>
          <li>
            <div className={`menu-item ${menuSelection === Menu.ASSETS ? 'bg-[#d1eef8]' : 'bg-white'} `} onClick={() => {
                dispatch(selectMenuOption(Menu.ASSETS))
              }}>
              <div className='icon'>
                <BiDollarCircle style={{fontSize: "20px"}} />
              </div>
              <div className='menu-item-text' >
                Assets
              </div>
              {/* <hr /> */}
            </div>
          </li>
          <li>
            <div className={`menu-item ${menuSelection === Menu.TRADE ? 'bg-[#d1eef8]' : 'bg-white'} `} onClick={() => {
                dispatch(selectMenuOption(Menu.TRADE))
              }}>
            <div className='icon'>
                <RiStockLine style={{fontSize: "20px"}} />
              </div>
              <div className='menu-item-text' >
                Trade
              </div>
              {/* <hr /> */}
            </div>
          </li>
          <li>
            <div className={`menu-item ${menuSelection === Menu.WATCHLIST ? 'bg-[#d1eef8]' : 'bg-white'} `} onClick={() => {
                dispatch(selectMenuOption(Menu.WATCHLIST))
              }}>
              <div className='icon'>
                <FaRegStar style={{fontSize: "20px"}} />
              </div>
              <div className='menu-item-text' >
                Watchlist
              </div>
              {/* <hr /> */}
            </div>
          </li>
          <li>
            <div className={`menu-item ${menuSelection === Menu.HISTORY ? 'bg-[#d1eef8]' : 'bg-white'} `} onClick={() => {
                dispatch(selectMenuOption(Menu.HISTORY))
              }}>
                <div className='icon'>
                  <MdHistory style={{fontSize: "20px"}} />
                </div>
              <div className='menu-item-text' >
                History
              </div>
              {/* <hr /> */}
            </div>
          </li>

          <li>
            <div className={`menu-item ${menuSelection === Menu.SETTINGS ? 'bg-[#d1eef8]' : 'bg-white'} `} onClick={() => {
                dispatch(selectMenuOption(Menu.SETTINGS))
              }}>
              <div className='icon'>
                <IoSettingsOutline style={{fontSize: "20px"}} />
              </div>
              <div className='menu-item-text' >
                Settings
              </div>
            </div>
          </li>

        </ul>
        
        <ul className='second-unorder'>
          <li>
            <div className={`menu-item ${menuSelection === Menu.SUPPORT ? 'bg-[#d1eef8]' : 'bg-white'} `} onClick={() => {
                dispatch(selectMenuOption(Menu.SUPPORT))
              }}>
              <div className='icon'>
                <IoHelpCircleOutline style={{fontSize: "20px"}} />
              </div>
              
              <div className='menu-item-text' >
                Support
              </div>
            </div>
          </li>

          

          <li>
            <div className='menu-item' onClick={(e) => {
              resetSession()
              window.location.href = `${process.env.REACT_APP_CLIENT_URL}/home`
            }}>
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