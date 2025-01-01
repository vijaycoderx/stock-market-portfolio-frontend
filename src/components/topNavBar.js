import React from 'react'

const topNavBar = () => {
  return (
    <>
      <div>
        <div className='top-nav-bar'>
                  
          <div className='brand'>
              logo
          </div>
        
          <div className='trending-stocks'>
              aapl/amzn/msft
          </div>
                
          <div className='notifications'>
              alert price crossed or dipped
          </div>
                
        </div>     
      </div>
    </>
  )
}

export default topNavBar