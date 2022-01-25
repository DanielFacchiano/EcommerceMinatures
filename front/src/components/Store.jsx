import React, { useState } from "react";
import Cookies from "universal-cookie";
import Navbar from "./Navbar";
import Cart from "./Cart";
import ItemContainer from "./ItemContainer";

/*
    Sidebar react/bootstrap implementation adapted from basic html/boostrap implementation explained at:
    https://www.broculos.net/2015/08/how-to-build-collapsible-sidebars-with.html Credit: Nuno Freitas

*/

const Store = ({ toggleCart, setToggleCart }) => {
    //events for buttons go here
  
  return (
    <div className="container">
        <Navbar 
        setToggleCart={setToggleCart}
        toggleCart={toggleCart}
        />
        <div className="row" id="main-row">
            <div className={`${toggleCart ? "col-md-9" : "col-md-12"}`} id="card-holder">
            <ItemContainer />
            </div>

            <div className={`${toggleCart ? "col-md-3" : "col-md-3 collapsed"}`} id="cart-container"> 
            <Cart />
            </div>
        </div>
    </div>
  );
};

export default Store;
