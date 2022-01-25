import React, { useState } from "react";

// Refrence that I adapted credit card input formatting from at:
// https://stackoverflow.com/questions/48534229/what-is-the-correct-input-type-for-credit-card-numbers
// - User jabacchetta's post

// on loading checkout, we use the user id in cookies to get the users cart
const getCartItem = () =>
{
    // function to get the users cart here > return list of users cart information objects
}

const Checkout = () => {

    // When we work on Checkout in detail we will retrieve a list of cart items and dynamically
    // build a list of the items in the cart
    const [cartList, setCartList] = useState([]);
    const [cardInformation, setCardInformation] = React.useState("");
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [street, setStreet] = React.useState("");

    //  setCartList(getCartItem);

    const handleCheckout = (event) =>
    {
      event.preventDefault();
      console.log(`Shooting ${cardInformation} and ${city} to the backend through Axios!`);
      console.log("Oh man, that was succesful, totally setting up cookies and redirecting to store")

    }

  return (
    <div className="container " style={{backgroundColor:"lightblue"}}>
        <div className="row">
            <div className="col" style={{textAlign:"center"}}>
                <h1>Checkout: </h1>
            </div>
        </div>
        <div className="row">
            <div className="col" style={{textAlign:"center"}}>
                <p> *List of items in cart rendered here* </p>            
            {/* {cartList.map((cartItemInfo)=>( 
                <CartItem cartItemInfo = {cartItemInfo}/>
                ))}             */}
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