import React from "react";

import "../styles/assets.css";
const Assets = () => {
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
                  <div className="assets-value">10000</div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Assets;
