import React from 'react'

const SideMenu = () => {
  return (
    <>
      <div className='side-menu-con'>
        <ul>
          <li>
            <div className='menu-item'>
              <div className='menu-item-text'>
                Dashboard
              </div>
            </div>

            <div className='menu-item'>
              <div className='menu-item-text'>
                Assets
              </div>
            </div>


            <div className='menu-item'>
              <div className='menu-item-text'>
                Trade
              </div>
            </div>


            <div className='menu-item'>
              <div className='menu-item-text'>
                Watchlist/Alerts
              </div>
            </div>

            <div className='menu-item'>
              <div className='menu-item-text'>
                History
              </div>
            </div>
          </li>
        </ul>
        
        <ul>
          <li>
            <div className='menu-item'>
              <div className='menu-item-text'>
                Support
              </div>
            </div>

            <div className='menu-item'>
              <div className='menu-item-text'>
                Settings
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}

export default SideMenu