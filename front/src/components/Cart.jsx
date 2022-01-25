import React, { useState } from "react";

// We will later construct the function to build rows of items in the cart later
// For Now we have placeholders and the button
const Cart = () => {
    // When we work on the cart in detail we will build a list of the items in our cart
    // we will render the items in the cart based upon what is in this list of items
    const [cartList, setCartList] = useState([]);

  return (
    <div className="container">
        <div className="row">
            <div className="col" style={{textAlign:"center"}}>
                <h1>Your Cart:</h1>
            </div>      
        </div>
        <div className="row">
            <p> Cart items cards filled here</p>
        </div>
        <div className="row">
            <div className="col" style={{textAlign : "center" }} >
            <button className="btn btn-success" type="submit" >
            Checkout
            </button>
                </div>
        </div>
    </div>
  );
};

export default Cart;