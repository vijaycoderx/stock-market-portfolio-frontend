import React from 'react'
import '../styles/userInfo.css'
import { FaRegUserCircle } from "react-icons/fa";

const UserInfo = () => {

    return (
        <>
            <div className='user-info-holder'>
                <div className="user-holder">
                    <FaRegUserCircle style={{ fontSize: "100px", color: "orangered" }} />
                    <div className="userid">username</div>
                </div>

                <div className="top-stocks">
                    <div className="top-title">user stocks</div>
                    <div className="list-stocks">
                        <div className="each-stock">
                            <div className="stock-sym">AAPL</div>
                            <div className="each-quantity">52.50</div>
                        </div>  

                        <div className="each-stock">
                            <div className="stock-sym">AAPL</div>
                            <div className="each-quantity">52.50</div>
                        </div> 

                        <div className="each-stock">
                            <div className="stock-sym">AAPL</div>
                            <div className="each-quantity">52.50</div>
                        </div> 

                        <div className="each-stock">
                            <div className="stock-sym">AAPL</div>
                            <div className="each-quantity">52.50</div>
                        </div> 

                        <div className="each-stock">
                            <div className="stock-sym">AAPL</div>
                            <div className="each-quantity">52.50</div>
                        </div> 

                        {/* <div className="each-stock">
                            <div className="stock-sym">AAPL</div>
                            <div className="each-quantity">52.50</div>
                        </div>  */}

                        {/* <div className="each-stock">
                            <div className="stock-sym">GOOG</div>
                            <div className="each-quantity">52.50</div>
                        </div> */}

                        {/* <div className="each-stock">
                            <div className="stock-sym">MSFT</div>
                            <div className="each-quantity">52.50</div>
                        </div> */}
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default UserInfo