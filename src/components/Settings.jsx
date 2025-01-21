import React from 'react'
import '../styles/settings.css'

const Settings = () => {
  return (
      <>
          <div className="settings-holder">
              <div className="settings">
                  <div className="menu-title">
                      User Settings
                  </div>

                  <div className="settings-content">
                      <form action="">
                          <div className="item-wrapper">
                            <label htmlFor="lang">Language</label>
                            <select name="" id="lang">
                                <option value="">us-en</option>
                            </select>                              
                          </div>
                          
                          <div className="item-wrapper">
                            <label htmlFor="curr">Currency</label>
                            <select name="" id="curr">
                                <option value="">USD</option>
                                <option value="">INR</option>
                                <option value="">CNY</option>
                                <option value="">JPY</option>
                                <option value="">RUB</option>
                            </select>                             
                          </div>

                          <div className="item-wrapper">
                            <label htmlFor="mode">Theme</label>
                            <select name="" id="mode">
                                <option value="">Light</option>
                                {/* <option value="">Dark</option> */}
                            </select>       

                          </div>

                          <div className="item-wrapper">
                            <label htmlFor="notify">Notifications</label>
                            <select name="" id="notify">
                                <option value="">Not Available</option>
                                {/* <option value="">ON</option> */}
                                {/* <option value="">OFF</option> */}
                                {/* <option value="">Dark</option> */}
                            </select>                             
                          </div>

                          


                      </form>
                  </div>
              </div>
          </div>
      </>
  )
}

export default Settings