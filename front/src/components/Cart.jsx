import React, { useState } from "react";
import axios from 'axios'
import CartItem from "./CartItem";
import Cookies from 'universal-cookie'



/*
    The cart component that is hoisted onto the main shopping page and slides in and oout
    calculates a total and renders the cart items inside of it
*/
const Cart = ({cartList, setCartList, setCheckout}) => {
// We calculate totals for all items in the cart
    const getTotal = () => 
    {
        var total = 0;
        for (var x = 0; x < cartList.length; x++)
        {
            total = total + parseFloat(cartList[x].quantity)*parseFloat(cartList[x].itemPrice).toFixed(2)
        }
        return total;
    }
    // navigate to checkout
    const handleCheckout = () =>
    {
        setCheckout(true);
    }
  
    // JSX html for cart, maps cartItemInfo to a cart item for every item in the users cart
  return (
    <div className="container">
        <div className="row">
            <div className="col" style={{textAlign:"center"}}>
                <h1>Your Cart:</h1>
            </div>      
        </div>
        <div className="row">
            <p> Cart items cards filled here</p>
            { cartList.map((cartItemInfo)=>( 
                <CartItem cartItemInfo = {cartItemInfo} setCartList = {setCartList}/>
                ))}             
        </div>
        <div style ={{padding:".5em", textAlign:"center"}}>
            Total: ${getTotal().toFixed(2)} 
        </div>

        <div className="row">
            <div className="col" style={{textAlign : "center" }} >
            <button className="btn btn-success" type="submit" onClick={handleCheckout}>
            Checkout
            </button>
                </div>
        </div>
    </div>
  );
};

export default Cart;