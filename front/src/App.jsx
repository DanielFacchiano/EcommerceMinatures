import React, { useState } from "react";
import Cookies from "universal-cookie";
import Auth from "./components/Auth";
import Store from "./components/Store";
import Checkout from "./components/Checkout";



import "./index.css";
/*
    The main web page, where the use states determining what overlays are rendered 
*/
const App = () => {

    // if either of these states are true, we render these components instead of the main store page
    // If we set this state to true, we want the chat page to show the create channel page
  const [signIn, setSignIn] = useState(false);
    //  if we set this to true, we want the channel options to open
  const [checkout, setCheckout] = useState(false);
  //  used to toggle the cart state, toggles classname for components in Store component
  const [toggleCart, setToggleCart] = useState(false);

  const [cartList, setCartList] = useState([]);


// if sign in state, render the sign in component
  if(signIn)
  {
    return( 
    <Auth 
      cartList={cartList}
      setCartList={setCartList}
      signIn = {signIn}
      setSignIn = {setSignIn}
    />);
  }
  // if checkout state render checkout component
  if(checkout)
  {
    return ( 
    <Checkout
    setCheckout={setCheckout}
    />);
  }
  // else render the main store page
  return (
    // Pass the cart toggle function to the app so we can toggle the cart with the button
     <Store
     setCartList={setCartList}
     cartList={cartList}
     setSignIn={setSignIn}
    toggleCart={toggleCart}
    setToggleCart={setToggleCart}
    setCheckout={setCheckout}
    />
  );
};

export default App;
