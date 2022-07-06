import React, { useState } from "react";
import axios from 'axios'
import Cookies from 'universal-cookie'
import close from '../assets/close.png'

const cookies = new Cookies();



/*  
  Cart item is built from information passed down to it from the cartItemInfo prop
  this information allows us to built cart items, which appear both in the checkout
  page and in the cart in the main page. This component allows deletion with a call
  to a route.
*/
const CartItem = ({cartItemInfo, setCartList}) => 
{
    // Usestate, detects if we are running a delete so we avoid bug with concurrent functions
    const [deleteCartState, setDeleteCartState] = React.useState(false);
    let urlString = "http://localhost:3005/images/"
    urlString = urlString + cartItemInfo.itemId
    urlString = urlString + ".png"

     // gets the cart information after a delete so we can rebuild the cart
  const getOrders = async (orderId1) => {
    let url = "http://localhost:3005/orderItem/"
    let payload = {orderId : orderId1}
    let res = await axios.put(url, payload);
    setCartList(res.data)
  }

  // deletes the item that was clicked, with a server route, then gets the updated cart and sets 
  // the new cart with it. Sets deletestate to avoid concurrent calls to this function
  const handleDelete = async () =>
  {
    if(deleteCartState){
      return
    }
    setDeleteCartState(true);
    let url = "http://localhost:3005/orderItem"
    let payload = {orderId : cookies.get("orderId"), itemId: cartItemInfo.itemId}
    console.log(payload)
    let res = await axios.patch(url, payload);
    await getOrders(cookies.get("orderId"));
    setDeleteCartState(false);
  }
  /*
    print the various information about the cart item we received, calculates the total price*quantity
    retreives the image from the public folder for this card and puts it on the screen
  */
  return (
    <div className="container" style={{padding: ".5em"}}>
        <div style = {{textAlign:"center", alignItems:"center"}}>
            <div>
           {cartItemInfo.itemTitle}
           </div>
           <div style = {{textAlign:"center", alignItems:"center"}}>
            <img src={urlString} width="60" height="80" />  
            </div>
           Price: ${(parseFloat(cartItemInfo.quantity)*parseFloat(cartItemInfo.itemPrice)).toFixed(2)}
           <div>
           Quantity: {cartItemInfo.quantity}
            </div>   
            <div>
            <img src={close} height="32" width="32" onClick={handleDelete} style={{cursor: "pointer"}}/>
        </div> 
        </div>
    </div>
  );
}

export default CartItem;