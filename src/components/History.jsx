import React from 'react'
import '../styles/history.css'
import { useSelector } from 'react-redux'

const History = () => {
    const txnsSelector =  useSelector((state) => state.user.userInfo.account.transactions)
    console.log("h user", txnsSelector)
    
    const txnList = txnsSelector.map((item, key) => {
        let timeStamp = new Date(item.timeStamp)
        let localTimeStamp = timeStamp.toLocaleString()
        // timeStamp = timeStamp.toLocaleDateString()
        // const localTime = `${timeStamp.getFullYear()}-${timeStamp.getMonth()}-${timeStamp.getDate()} - ${timeStamp.getHours()} -  ${timeStamp.getMinutes()} - ${timeStamp.getSeconds()}`
        // console.log("new time raw", timeStamp, "just local",localTime, "to localstring", localTimeStamp)
        return (
            <tr key={item._id}>
                <td>{item.ticker}</td>
                <td>{item.type === "buy" ? "trade/buy" : item.type === "sell" ? "trade/sell":"null"}</td>
                <td>{item.price.toFixed(2)}</td>
                <td>{item.quantity.toFixed(2)}</td>
                <td>{item.total.toFixed(2)}</td>
                <td>{localTimeStamp}</td>
            </tr>
        )
    } )
    return (
        <>
            <div className="history-holder">
                <div className="history">
                    <div className="menu-title">
                        Transaction History
                        {/* {userSelector} */}
                    </div>

                    <table border="1" cellspacing="0" cellpadding="5" className='border-2 lg:ml-8' >
                        <tr align="left" bgcolor="gray">
                            <th  width="20%">Stock</th>
                            <th  width="20%">Type</th>
                            
                            <th  width="20%">Price</th>
                            <th  width="20%">Quantity</th>
                            <th  width="20%">Total</th>
                            <th  width="20%">Time</th>
                        </tr>
                        
                        <tbody>
                            {txnList}
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </>
    )
}

export default History