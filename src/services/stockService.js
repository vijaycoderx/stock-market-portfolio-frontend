// import yahooFinance from "yahoo-finance2";

// import { currConverter } from "./currConverter.js";
import axios from "axios"
// const yahooFinance = require('yahoo-finance2').default;

// const getStockPrice = async (data) => {
//     // const stock = data.stock;
//     data = {
//         currA: "CNY",
//         currB: "USD",
//         amount: 25000,
//     }
//     // const curr = "inr";

//     const currToUsd = await currConverter({currA: data.currA, currB: data.currB})
//     console.log("hi1", currToUsd)
//     const amount = data.amount * currToUsd
//     const stockObject = await yahooFinance.quote("AAPL");
//     // console.log(stockObject)
//     console.log("hi2", stockObject.regularMarketPrice)
//     console.log("quantity", amount / stockObject.regularMarketPrice )
//     return stockObject.regularMarketPrice
// }
const getStocksPrice = async (data) => {
    const getStocks = await axios.get(`${process.env.REACT_APP_SERVER_URL}/stocks`, { symbols: data })
    console.log("list of stocks",getStocks)
}

const getHistoricalData = async (data) => {
    // data = {
    //     currA: "INR",
    //     stock: "AAPL",
    //     timePeriod: "1m",
    //     startDate: "2025-01-07"
    // }

    // // const stockObject = await yahooFinance.chart(data.stock, { range: data.timePeriod })
    // // console.log(stockObject)

    // const result = await yahooFinance.chart('AAPL', {
    //     period1: '2025-01-07', interval: "5m"// Fetch the last 1 month of data
    // });
    // // console.log(result)
    // return result;
    // try {
        
    // } catch (error) {
    //     console.log("stock fetching error", error.message)
    // }
    console.log(process.env.REACT_APP_SERVER_URL, data)
    const getStockTimePeriodData = await axios.post(`${process.env.REACT_APP_SERVER_URL}/marketplace/chart`, {
        stock: data.stock,
        startDate: data.startDate,
        interval: data.interval
    })

    console.log("res", getStockTimePeriodData)

    return getStockTimePeriodData
}

const buyStock = async(data) => {
    const buyStockRes = await axios.post(`${process.env.REACT_APP_SERVER_URL}/marketplace/chart`, {})
}
// getStockPrice();
// getHistoricalData();
export { getHistoricalData}