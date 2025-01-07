// import yahooFinance from "yahoo-finance2";

import yahooFinance from "yahoo-finance2";
import { currConverter } from "./currConverter.js";
// const yahooFinance = require('yahoo-finance2').default;

const getStockPrice = async (data) => {
    // const stock = data.stock;
    data = {
        currA: "CNY",
        currB: "USD",
        amount: 25000,
    }
    // const curr = "inr";

    const currToUsd = await currConverter({currA: data.currA, currB: data.currB})
    console.log("hi1", currToUsd)
    const amount = data.amount * currToUsd
    const stockObject = await yahooFinance.quote("AAPL");
    // console.log(stockObject)
    console.log("hi2", stockObject.regularMarketPrice)
    console.log("quantity", amount / stockObject.regularMarketPrice )
    return stockObject.regularMarketPrice
}

const getHistoricalData = async (data) => {
    data = {
        currA: "INR",
        stock: "AAPL",
        timePeriod: "1m"
    }

    // const stockObject = await yahooFinance.chart(data.stock, { range: data.timePeriod })
    // console.log(stockObject)

    const result = await yahooFinance.chart('AAPL', {
        period1: '2025-01-07', interval: "1h"// Fetch the last 1 month of data
    });
    console.log(result)
}

// getStockPrice();
getHistoricalData();
export {getStockPrice}