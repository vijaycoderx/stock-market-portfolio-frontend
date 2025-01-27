import React from "react";
import "../styles/menuCover.css";
import { useDispatch, useSelector } from "react-redux";
import {
  menuToggleSelection,
  selectMenuOption,
} from "../reduxManager/features/slices/menuSlice";
import { Menu } from "../constants.js/menuConstants";
import { resetSession } from '../services/sessionManager';
// import { menuToggleSelection } from '../reduxManager/features/slices/menuSlice';

const MenuCover = () => {
  const dispatch = useDispatch();
  const menuSelection = useSelector((state) => state.menu.menuOptionSelected);
  const menuToggleSelector = useSelector((state) => state.menu.menuToggle);

  const menuToggle = () => {
    if (menuToggleSelector) {
      dispatch(menuToggleSelection(false));
    } else {
      dispatch(menuToggleSelection(true));
    }
  };

  return (
    <>
      <div className="menu-cover-con">
        <ul className="first-unorder">
          <li className="mt-6">
            <div
              className="menu-item"
              onClick={() => {
                dispatch(selectMenuOption(Menu.DASHBOARD));
                menuToggle();
              }}
            >
              <div className="menu-item-text">Dashboard</div>
            </div>
            <hr />
          </li>
          <li>
            <div
              className="menu-item"
              onClick={() => {
                dispatch(selectMenuOption(Menu.ASSETS));
                menuToggle();
              }}
            >
              <div className="menu-item-text">Assets</div>
            </div>
            <hr />
          </li>
          <li>
            <div
              className="menu-item"
              onClick={() => {
                dispatch(selectMenuOption(Menu.TRADE));
                menuToggle();
              }}
            >
              <div className="menu-item-text">Trade</div>
            </div>
            <hr />
          </li>
          <li>
            <div
              className="menu-item"
              onClick={() => {
                dispatch(selectMenuOption(Menu.WATCHLIST));
                menuToggle();
              }}
            >
              <div className="menu-item-text">Watchlist</div>
            </div>
            <hr />
          </li>
          <li>
            <div
              className="menu-item"
              onClick={() => {
                dispatch(selectMenuOption(Menu.HISTORY));
                menuToggle();
              }}
            >
              <div className="menu-item-text">History</div>
            </div>
            <hr />
          </li>

          <li>
            <div
              className="menu-item"
              onClick={() => {
                dispatch(selectMenuOption(Menu.DASHBOARD));
                menuToggle();
              }}
            >
              <div className="menu-item-text">Support</div>
            </div>
            <hr />
          </li>
          <li>
            <div
              className="menu-item"
              onClick={() => {
                dispatch(selectMenuOption(Menu.SETTINGS));
                menuToggle();
              }}
            >
              <div className="menu-item-text">Settings</div>
            </div>
            <hr />
          </li>
        </ul>

        <div className="btn-holder" onClick={(e) => {
              resetSession()
              window.location.href = `${process.env.REACT_APP_CLIENT_URL}/auth`
            }}>
          <div>Log out</div>
        </div>
        {/* <ul className='second-unorder'>
          <li>
            <div className='menu-item'>
              <div className='menu-item-text'>
                Support
              </div>
            </div>

            <div className='menu-item'>
              <div className='menu-item-text'>
                Settings
              </div>
            </div>
          </li>
        </ul> */}
      </div>
    </>
  );
};

export default MenuCover;
