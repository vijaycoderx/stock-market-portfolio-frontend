import React from 'react'
import "../styles/clientArea.css"
import NavBar from "../components/NavBar"
import SideMenu from '../components/SideMenu'
import MenuCover from '../components/MenuCover'
import Dashboard from '../components/Dashboard'
import Assets from '../components/Assets'

const Client = () => {

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
                <Dashboard />
                {/* <Assets /> */}
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