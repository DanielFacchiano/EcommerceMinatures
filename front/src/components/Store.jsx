import React, { useState } from "react";
import Navbar from "./Navbar";
import Cart from "./Cart";
import axios from 'axios'
import Cookies from 'universal-cookie'
import ItemContainer from "./ItemContainer";
const cookies = new Cookies();

/*  
    citation
    01/24/2022
    Sidebar react/bootstrap implementation adapted from basic html/boostrap implementation explained at:
    https://www.broculos.net/2015/08/how-to-build-collapsible-sidebars-with.html Credit: Nuno Freitas

*/
/*
  citation
  01/24/2022
  Citation for useful axios examples used as refrence:
  https://zetcode.com/javascript/axios/
*/

/*
  The main store page, renders the cart, the item container, and the navbar. Holds all 
  the various changing states of its children components, so that these components can 
  interact with one another via the parent state holding them.
*/
const Store = ({ toggleCart, setToggleCart, setCheckout, setSignIn, setCartList, cartList }) => {


  const [itemsList, setItemsList] = useState([]);

  const axios = require('axios')
  var URL ="http://localhost:3005/shopping";
  /*
    Gets the items to initially render in our store page
  */
  const getItems = async () => {
    let res
    try{
    res = await axios.get(URL);
    }catch(err){
      //prevent error spam while requests attempted but rest of the program is loading
      return
    }
    
    let data = res.data;
    setItemsList(data);
  }
/*
  willl go off if their is an orderid in the cookies, will get the user previous cart
  after a new sign in
*/
  const getOrders = async (orderId1) => {
    let url = "http://localhost:3005/orderItem/"
    let payload = {orderId : orderId1}
    let res
    try{
    res = await axios.put(url, payload);
    }catch(err){
      //prevent error spam while requests attempted but rest of the program is loading
    return
  }
    setCartList(res.data)
  }
  

  // Set the initial item list, get it from our backend DB
  if (itemsList.length === 0)
  {
    getItems();
  }
  // if there is an order id, we get the cart so we can render it in the cart component
  if (cookies.get("orderId") != null)
  {
    getOrders(cookies.get("orderId"));
  }

/*
    Renders the three components, the navbar, store and cart.  The structure of this 
    ordering is faciltated with bootstrap conventions (row, col) which will oreitnate our
    components for us. Pass the components the props they might need, such as the cart list
    or the ability to toggle overlays for embedded buttons
*/
  return (
    <div className="container">
        <Navbar 
        setSignIn={setSignIn}
        setToggleCart={setToggleCart}
        toggleCart={toggleCart}
        setItemsList={setItemsList}
        />
        <div className="row" id="main-row">
            <div className={`${toggleCart ? "col-md-9" : "col-md-12"}`} id="card-holder">
            <ItemContainer 
            cartList={cartList}
            setSignIn = {setSignIn}
            itemsList={itemsList}
            setCartList = {setCartList}
            />
            </div>

            <div className={`${toggleCart ? "col-md-3" : "col-md-3 collapsed"}`} id="cart-container"> 
            <Cart 
            setCheckout = {setCheckout}
            cartList = {cartList}
            setCartList={setCartList}
            />
            </div>
        </div>
    </div>
  );
};

export default Store;
