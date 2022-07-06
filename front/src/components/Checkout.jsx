import React, { useState } from "react";
import close from '../assets/close.png'
import axios from 'axios'
import Cookies from 'universal-cookie'
import CartItem from "./CartItem";

const cookies = new Cookies();

// Citation that I adapted credit card input formatting from at:
// 1/24/2022
// https://stackoverflow.com/questions/48534229/what-is-the-correct-input-type-for-credit-card-numbers
// - User jabacchetta's post
// on loading checkout, we use the user id in cookies to get the users cart

/*
    component holds all of the inputs for the forms for checkout,
    also renders all of the items in the users cart currently
    so that the user can view them and what not
*/
const Checkout = ({setCheckout}) => {

    // When we work on Checkout in detail we will retrieve a list of cart items and dynamically
    // build a list of the items in the cart
    const axios = require('axios')
    const [cartList, setCartList] = useState([]);
    const [cardInformation, setCardInformation] = React.useState("");
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [street, setStreet] = React.useState("");
    
    /*
        function to get the cart items to build in the checkout screen
    */
    const getOrders = async (orderId1) => {
      let url = "http://localhost:3005/orderItem/"
      let payload = {orderId : orderId1}
      let res = await axios.put(url, payload);
      setCartList(res.data)
    }
    /*
        function to set an order to submitted upon order completion
    */
    const setOrders = async (orderId1) => {
      let url = "http://localhost:3005/orders/"
      console.log(orderId1);
      let payload = {orderId : orderId1}
      let res = await axios.patch(url, payload);
    }
    /*
        function to adjust the store on hand quantity after and order
        was succesffully placed
    */
    const setQuantity = async () => {
      let url = "http://localhost:3005/items/"
      let payload = {orderList : cartList}
      console.log("payload is");
      console.log(payload);
      let res = await axios.patch(url, payload);
      console.log("res complete");
    }
    /*
      gets the total amount in usd for the items currently in the users cart
    */
    const getTotal = () => 
    {
        var total = 0;
        for (var x = 0; x < cartList.length; x++)
        {
            total = total + parseFloat(cartList[x].quantity)*parseFloat(cartList[x].itemPrice).toFixed(2)
        }
        return total;
    }
    /*
      Goes off when the user wants to checkout, sets the order to submitted,
      sets the quantity to the correct amounts, resets order cookies and
      redirects back to the main page
    */
    const handleCheckout = (event) =>
    {
      event.preventDefault();
      // 
      setOrders(cookies.get("orderId"));
      // clear the order cookies
      setQuantity();
      cookies.set('orderId', null, {sameSite: 'lax'});
      // set checkout to false;
      alert("Order Complete!");
      setCheckout(false);
    }
    /*
      return to the shopping page by flipping the use state
    */
    const goBack = () =>
    {
      setCheckout(false);
    }
    getOrders(cookies.get("orderId"));

    /*
      renders the proper inputs and the cart items with the passed in props
    */
return (
      <div className="container " style={{backgroundColor:"lightblue"}}>
          <div className="row">
              <div className="col" style={{textAlign:"center"}}>
                  <h1>Checkout: </h1>
              </div>
          </div>
          <div>
          <img src={close} height="32" width="32" onClick={goBack} style={{cursor: "pointer"}}/>
          </div>
          <div className="row">
              <div className="col" style={{textAlign:"center"}}>
                  <h3>Your Items: </h3>
              </div>
          </div>
          <div style={{overflowY: "scroll", overflowX: "hidden", height: "200px" }}>
                <div style={{height:"100%"}}>
                { cartList.map((cartItemInfo)=>( 
                <CartItem cartItemInfo = {cartItemInfo} setCartList = {setCartList}/>
                ))}
              </div>
          </div>
          <div className="row">
              <div className="col" style={{textAlign:"center"}}>
              <h3 className="">Total: ${getTotal().toFixed(2)}</h3> 
              </div>
          </div>
          <div className="row">
              <div className="col" style={{textAlign:"center", paddingBottom : '2em'}}>
                  <form onSubmit={handleCheckout}>
                  <h3>Enter Checkout Information Here: </h3>
                  <p>Card Information:
              <input
                name="cardInformation"
                type="tel"
                inputMode="numeric"
                pattern="[0-9\s]{13,19}"
                maxLength="19" 
                placeholder="xxxx xxxx xxxx xxxx"
                value={cardInformation}
                onChange={event => setCardInformation(event.target.value)}
                required />
                </p>
                <p>City:
              <input
                name="city"
                type="city"
                value={city}
                onChange={event => setCity(event.target.value)}
                required />
                </p>
                <p>State:
              <input
                name="state"
                type="state"
                value={state}
                onChange={event => setState(event.target.value)}
                required />
                </p>
                <p>Street Address:
              <input
                name="street"
                type="street"
                value={street}
                onChange={event => setStreet(event.target.value)}
                required />
                </p>
                <button className=" btn btn-success">Submit Order</button>
                </form>
              </div>
          </div>
      </div>
    );
  };
  
  export default Checkout;