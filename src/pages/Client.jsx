import React, { use, useEffect } from 'react'
import "../styles/clientArea.css"
import NavBar from "../components/NavBar"
import SideMenu from '../components/SideMenu'
import MenuCover from '../components/MenuCover'
import Dashboard from '../components/Dashboard'
import Assets from '../components/Assets'
import TradingArea from '../components/TradingArea'
import WatchList from '../components/WatchList'
import History from '../components/History'
import Settings from '../components/Settings'

import { Menu } from '../constants.js/menuConstants'
import { setUserInfo } from '../reduxManager/features/counter/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { readJWT } from '../services/jwtUtils'

const Client = () => {
  console.log("xxyyxx")

  const dispatch = useDispatch();
  const menuSelection = useSelector((state) => state.menu.menuOptionSelected)

  const userSlection = useSelector((state) => state.user.userInfo)

  useEffect(() => {
    (async () => {
      const userSessionData = readJWT(localStorage.getItem('session_token'))
      const endpoint = `${process.env.REACT_APP_SERVER_URL}/user/${userSessionData.username}`
      console.log("end", endpoint)
      const response = await axios.get(endpoint)
      console.log("resxxxxxxxxxxxxxxxxxxx", response.data)
      dispatch(setUserInfo(response.data))
    })()
  }, [])

  console.log("xxxxxx", menuSelection,"yyyyyy", userSlection)
  return (
    <div className='root-con'>
      <div className='holder'>
        <div className='nav-holder'>
          
          <NavBar />
        </div>

        <div className='main-holder'>
          <div className='side-main-holder'>
            <div className='side-menu-holder'>
              <SideMenu />
            </div>

            <div className='main-content-holder'>
              <div className='content-holder'>
                {/* <Dashboard /> */}
                {/* <Assets /> */}
                {/* <TradingArea /> */}
                {/* <WatchList /> */}
                {/* <History /> */}
                {/* <Settings /> */}
                {menuSelection === Menu.DASHBOARD ? <Dashboard /> : ''}
                {menuSelection === Menu.ASSETS ? <Assets /> : ""}
                {menuSelection === Menu.TRADE ? <TradingArea /> : ""}
                {menuSelection === Menu.WATCHLIST ? <WatchList /> : ""}
                {menuSelection === Menu.HISTORY ? <History /> : ""}
                {menuSelection === Menu.SETTINGS ? <Settings /> : ""}
                {menuSelection === Menu.SUPPORT ? <Dashboard /> : ""}
                {menuSelection === Menu.NULL ? <Dashboard /> : ""}
              </div>
            </div>
          </div>
          

          
          
          {/* <SideMenu /> */}
          
          <MenuCover />
          
        </div>
      </div>
    </div>
  )
}

export default Client