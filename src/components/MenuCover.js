import React from 'react'
import "../styles/menuCover.css"

const MenuCover = () => {
  return (
    <>
      <div className='menu-cover-con'>
        <ul className='first-unorder'>
          <li className='mt-6'>
            <div className='menu-item'>
              <div className='menu-item-text'>
                Dashboard
              </div>
            </div>
            <hr />
          </li>
          <li>
            <div className='menu-item'>
              <div className='menu-item-text'>
                Assets
              </div>
            </div>
            <hr />
          </li>
          <li>
            <div className='menu-item'>
              <div className='menu-item-text'>
                Trade
              </div>
            </div>
            <hr />
          </li>
          <li>
            <div className='menu-item'>
              <div className='menu-item-text'>
                Watchlist
              </div>
            </div>
            <hr />
          </li>
          <li>
            <div className='menu-item'>
              <div className='menu-item-text'>
                History
              </div>
            </div>
            <hr />
          </li>

          <li>
            <div className='menu-item'>
              <div className='menu-item-text'>
                Support
              </div>
            </div>
            <hr />
          </li>
          <li>
            <div className='menu-item'>
              <div className='menu-item-text'>
                Settings
              </div>
            </div>
            <hr />
          </li>
          
          
          
        
        </ul>
        
        <div className='btn-holder'>
            <div>Log out</div>
        </div>
        {/* <ul className='second-unorder'>
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
        </ul> */}
      </div>
    </>
  )
}

export default MenuCover