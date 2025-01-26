import React, { useEffect, useState } from 'react'
import '../styles/userInfo.css'
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../reduxManager/features/slices/userSlice';
import { readJWT } from '../services/jwtUtils';
import axios from 'axios';


const UserInfo = () => {
    const [user, setUser] = useState({})
    const [topStocks, setTopStocks] = useState([])
    // const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
          const userSessionData = readJWT(localStorage.getItem('session_token'))
          const endpoint = `${process.env.REACT_APP_SERVER_URL}/user/${userSessionData.username}`
          console.log("end", endpoint)
          const response = await axios.get(endpoint)
          console.log("resxxxxxxxxxxxxxxxxxxx", response.data)
            //   dispatch(setUserInfo(response.data))
            
          if(response.data){
            //   let stockAccountSelector = response.data?.account?.stockAccount
              let stockAccountSelector = response.data.account.stockAccount
              let username = response.data.username

              
              const getTopFiveStocks = () => {
                let lowStockNumber = 0;
                let memo = {}
                let stocksList = []
                let topFive = []
    
                for (let i = 0; i < stockAccountSelector.length; i++) {
    
                    if (memo[stockAccountSelector[i].quantity]) {
                        // memo[stockAccountSelector[i].quantity] = { ...memo[stockAccountSelector[i].quantity], [stockAccountSelector[i].quantity]: [...memo[stockAccountSelector[i].quantity], stockAccountSelector[i].ticker] }
                        memo[stockAccountSelector[i].quantity] = [...memo[stockAccountSelector[i].quantity], stockAccountSelector[i].ticker]
                    } else {
                        memo[stockAccountSelector[i].quantity] = []
                        memo[stockAccountSelector[i].quantity].push(stockAccountSelector[i].ticker)
                        stocksList.push(stockAccountSelector[i].quantity)
                    }
                }
                console.log("meeeeeeeeeeeeemo", memo,  stocksList.sort())  
                
                for (let j = (stocksList.length - 1); j >= 0; j--){
                    console.log("each  item", stocksList[j], memo[stocksList[j]])
                    if (topFive.length != 5) {
                        for (let k = 0; k < memo[stocksList[j]].length; k++){
                            console.log("inside ele x", JSON.stringify(memo[stocksList[j]][k]))
                            topFive.push({ticker: memo[stocksList[j]][k], quantity: stocksList[j] < 0.001 ? 0 : stocksList[j]})
                        }
                    }
                }
                    
                
                return topFive;
            }
            let x = getTopFiveStocks()
            console.log("top five", x, "xyz")
            setTopStocks(getTopFiveStocks)
            setUser({...user, username: username})
          }
        
        

        
        //   setUser({...user, ...response.data})
        })()
      }, [])
    // const userNameSelector = useSelector((state) => state.user.userInfo.username)
    // let stockAccountSelector = []

    // const userSlection = useSelector((state) => state.user.userInfo)

    // console.log(user.account, "crzeeeeeey")
    // console.log(accountSelector)
    // const stockAccountSelector = userSlection.account.stockAccount

    // const getTopFiveStocks = () => {
    //     let lowStockNumber = 0;
    //     let memo = {}
    //     let stocksList = []
    //     let topFive = []

    //     for (let i = 0; i < stockAccountSelector.length; i++) {

    //         if (memo[stockAccountSelector[i].quantity]) {
    //             memo[stockAccountSelector[i].quantity] = { ...memo[stockAccountSelector[i].quantity], [stockAccountSelector[i].quantity]: [...memo[stockAccountSelector[i].quantity], stockAccountSelector[i].ticker] }
    //         } else {
    //             memo[stockAccountSelector[i].quantity] = []
    //             memo[stockAccountSelector[i].quantity].push(stockAccountSelector[i].ticker)
    //             stocksList.push(stockAccountSelector[i].quantity)
    //         }
    //     }
    //     console.log("meeeeeeeeeeeeemo", memo, userSlection.account.stockAccount, stocksList.sort())  
        
    //     for (let j = (stocksList.length - 1); j >= 0; j--){
    //         console.log("each  item", stocksList[j], memo[stocksList[j]])
    //         if (topFive.length != 5) {
    //             for (let k = 0; k < memo[stocksList[j]].length; k++){
    //                 console.log("inside ele", memo[stocksList[j]].length, k)
    //                 topFive.push(memo[stocksList[j]][k])
    //             }
    //         }
    //     }
            
        
    //     return topFive;
    // }
    // let x = getTopFiveStocks()

    // console.log("top five", x)
    
    const topFiveStocks = topStocks.map((item, key) => {
        return (
            <div className="each-stock" key={key}>
                <div className="stock-sym">{item.ticker}</div>
                <div className="each-quantity">{item.quantity}</div>
            </div>
        )
    })
    console.log("top five array", topFiveStocks)
        // console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuser", userNameSelector)
    return (
        <>
            <div className='user-info-holder'>
                <div className="user-holder">
                    <FaRegUserCircle style={{ fontSize: "100px", color: "orangered" }} />
                    <div className="userid" onLoad={() => {
                        // console.log("crazy1",userSlection.account.stockAccount)
                    }} onClick={() => {
                        // console.log("crazy2",userSlection.account.stockAccount)
                    }}>{user.username}</div>
                </div>

                <div className="top-stocks">
                    <div className="top-title">user stocks</div>
                    <div className="list-stocks">
                        {/* <div className="each-stock">
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
                            <div className="stock-sym">AoPL</div>
                            <div className="each-quantity" onClick={() => {
                                // console.log(userSlection.account.stockAccount)
                            }}>52.50</div>
                        </div>  */}
                        
                        {topFiveStocks}
                        
                        {/* {getTopFiveStocks()} */}
                        {/* {userSlection.account.stockAccount} */}

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