import React, { useState } from "react";
import axios from 'axios'
import Cookies from 'universal-cookie'
const cookies = new Cookies();


/*
    Rendered in the item container of the main shopping page, builds item card components that users can interact with
    to add and remove to their cart and search for and what not. Built with information passed to it from the main store
    page.
*/
const ItemCard = ({itemInfo, setCartList, setSignIn, cartList}) => {
    //console.log(itemInfo)

    const [addCartState, setAddCartState] = React.useState(false);
    let urlString = "http://localhost:3005/images/"
    urlString = urlString + itemInfo.itemId
    urlString = urlString + ".png"
    
    // hit button, IF NO OPEN ORDER IN COOKIES: posts to back, returns an open orderId. Set this in the cookies
    // after the above, get order id from cookies, get item id from itemInfo prop, get quantity from quantity input (using modulo magic)
    // insert these as a row in OrderItems. After every insert, get the rows from OrderItem with orderId in cookies, set the cart usestate
    // with these. Then write the code to build the cart front end using these rows we have set in the usestate.
    // bonus points if we implement removing stuff from the cart
    const setOrder = async () => 
    {
      let url = "http://localhost:3005/orders"
      let payload = {userId : cookies.get("userId")}
      let res = await axios.post(url, payload);
      let data = res.data;
      cookies.set('orderId', data[0].orderId, {sameSite: 'lax'});
    }
    /*
      allows us to add our item to our order and thus our cart
    */
    const insertOrders = async (orderId1, quantity1, itemId1 ) =>{
      let url = "http://localhost:3005/orderItem"
      let payload = {orderId : orderId1, quantity: quantity1, itemId: itemId1}
      let res = await axios.post(url, payload);
    }
    // get the cart after we have added something to it
    const getOrders = async (orderId1) =>{
      let url = "http://localhost:3005/orderItem/"
      let payload = {orderId : orderId1}
      let res = await axios.put(url, payload);
      return res.data
    }
    
    // when the add to cart button is clicked, this handler
    // detects add errors, and then facilitates adding the item to the users cart
    const handleAddtoCart = async (event) =>
    {
      event.preventDefault();
      if(addCartState){
        return
      }
      for (let indx in cartList )
      {
        if(cartList[indx].itemId == itemInfo.itemId)
        {
          console.log("in here");
          alert("item already in your cart");
          return
        }
      }

      console.log("out here");
      setAddCartState(true);
      let rows = []
      var itemId = itemInfo.itemId
      var idInputStr = "quantityInput";
      idInputStr = idInputStr + itemId.toString()
      var quantityInput = document.getElementById(idInputStr);
      var quantity = quantityInput.value;
      if (itemInfo.onHand < quantity){
        alert("The quantity requested cannot exceed the available quantity");
        setAddCartState(false);
        return;
      }

      var orderId = cookies.get("orderId");
    

      if(cookies.get("userId") == null ||cookies.get("userId") == "null")
      {
        setSignIn(true);
        return
      }

      // So when you set cookies to null, it actually sets it to a string named null
      // Why does it do this? This is an incredibly stupid. If I wanted "null" I would type "null"
      // and not null. What were you guys smoking over there?
      if (orderId == null || orderId =="null"){
        console.log("inside the null")
        await setOrder()
        orderId = cookies.get("orderId");
      }

      await insertOrders(orderId, quantity, itemId);
      rows = await getOrders(orderId, quantity, itemId);
      setCartList(rows);

    // insert these as a row in OrderItems with axions. 
    // After the insert, get the rows from OrderItem with the orderId that is in cookies using axios
    // Then set the cart's usestate with the results
      setAddCartState(false);
    }
  return (
    <div className="container">
        <div style = {{textAlign:"center", alignItems:"center"}}>
           {itemInfo.itemTitle}
        </div>
        <div style = {{textAlign:"center", alignItems:"center"}}>
        <img src={urlString} width="140" height="180" />  
        </div>
        <div style = {{textAlign:"center", alignItems:"center"}} >
        Available: {itemInfo.onHand}
        </div>
        <div style = {{textAlign:"center", alignItems:"center"}} >
        Price: ${itemInfo.itemPrice.toFixed(2)}
        </div>
        <div style = {{textAlign:"center", alignItems:"center"}}>
            <input id={`quantityInput${itemInfo.itemId}`} type="number" name="quantity" min="1" max={itemInfo.onHand} maxLength="4" size="4"/>
            <button className="btn btn-success"  onClick={handleAddtoCart}>            
              <span style={{fontSize: ".7em"}}>Add to Cart</span>
            </button>
        </div>
    </div>
  );
};

export default ItemCard;