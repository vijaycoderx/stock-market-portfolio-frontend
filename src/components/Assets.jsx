import React from "react";

import "../styles/assets.css";
import { useSelector } from "react-redux";


const Assets = () => {
  const fiatSelector = useSelector((state) => state.user.userInfo.account.fiatAccount.amount)
  console.log("eee", fiatSelector)
  return (
    <>
      <div className="assets-holder">
        <div className="assets-content">
          <div className="menu-title">Assets</div>

          <div className="assets-fiat-stock-holder">
            <div className="fiat-holder">
              <div className="balance-holder">
                <div className="fiat-holder-title">Fiat Balance </div>
                <div className="asset-sym-value-holder">
                  <div className="curr-sym">$</div>
                  <div className="assets-value">{fiatSelector}</div>
                </div>
              </div>

              <div className="deposit-withdraw-holder">
                <div className="deposit">Deposit</div>
                <div className="withdraw">Withdraw</div>
              </div>
            </div>
            <div className="stock-holder">
              <div className="stock-holder-title">Stock Balance </div>
              <div className="stocks-list-holder">hi</div>
              <table cellPadding={50}>
                <tr>
                  <th>Stock</th>
                  <th>Total</th>
                  <th>Available Amount</th>
                  <th>In Orders</th>
                </tr>
                <tr>
                  <td>
                    <div className="stock-name-holder">
                      <img src="" alt="" />
                      <div className="stcok-name">AAPL</div>
                    </div>
                  </td>
                  <td>5</td>
                  <td>4.5</td>
                  <td>0.5</td>
                </tr>
                

              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Assets;
