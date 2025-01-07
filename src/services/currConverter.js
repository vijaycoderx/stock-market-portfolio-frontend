import yahooFinance from "yahoo-finance2";

const currConverter = async (data) => {
    // const currA = data.currA ? data.currA : "USD";
    // const currB = data.currB ? data.currB : "USD";

    const currA = data.currA;
    const currB = data.currB;

    const currPrice = await yahooFinance.quote(`${currA}${currB}=X`)
    // const currPrice = await yahooFinance.quote(`CNYUSD=X`)
    console.log(currPrice)
    return currPrice.regularMarketPrice
}
// currConverter()
export { currConverter };