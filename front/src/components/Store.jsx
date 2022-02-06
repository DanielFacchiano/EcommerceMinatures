import React, { useState } from "react";
import Cookies from "universal-cookie";
import Navbar from "./Navbar";
import Cart from "./Cart";
import axios from 'axios'
import ItemContainer from "./ItemContainer";

/*
    Sidebar react/bootstrap implementation adapted from basic html/boostrap implementation explained at:
    https://www.broculos.net/2015/08/how-to-build-collapsible-sidebars-with.html Credit: Nuno Freitas

*/
/*
  Citation for useful axios examples used as refrence:
  https://zetcode.com/javascript/axios/
*/
const Store = ({ toggleCart, setToggleCart }) => {
  const [itemsList, setItemsList] = useState([]);
  const axios = require('axios')
  var URL ="http://localhost:3005/shopping";
  
  const getItems = async () => {
    let res = await axios.get(URL);
    let data = res.data;
    setItemsList(data);
  }

  // Set the initial item list, get it from our backend DB
  if (itemsList.length === 0)
  {
    getItems();
  }
    // events for buttons go here
    // So we need to put our list of initial list of items here and pass it to the item container and
    // the navbar component. The navbar can change the list when a query string is subbmitted
    // on detection of a change in the list of items, we reload he item container component with
    // the proper list of items in it.

    // 1. Get initial list of items here
    // 2. pass that list as prop to item container, build the item cards with it in item container
    // 3. build navbar post function to reset the list of items array in store component, on
    //    change set it to reload the item container (it might do this auto because react)
    
  return (
    <div className="container">
        <Navbar 
        setToggleCart={setToggleCart}
        toggleCart={toggleCart}
        setItemsList={setItemsList}
        />
        <div className="row" id="main-row">
            <div className={`${toggleCart ? "col-md-9" : "col-md-12"}`} id="card-holder">
            <ItemContainer 
            itemsList={itemsList}
            />
            </div>

            <div className={`${toggleCart ? "col-md-3" : "col-md-3 collapsed"}`} id="cart-container"> 
            <Cart />
            </div>
        </div>
    </div>
  );
};

export default Store;
