import React, { useState } from "react";

const ItemCard = ({itemInfo}) => {
    //console.log(itemInfo)
    let urlString = "http://localhost:3005/images/"
    urlString = urlString + itemInfo.itemId
    urlString = urlString + ".png"

  return (
    <div className="container">
        <div style = {{textAlign:"center", alignItems:"center"}}>
           {itemInfo.itemTitle}
        </div>
        <div style = {{textAlign:"center", alignItems:"center"}}>
        <img src={urlString} width="140" height="180" />  
        </div>
        <div style = {{textAlign:"center", alignItems:"center"}} >
        Currently on Hand: {itemInfo.onHand}
        </div>
        <div style = {{textAlign:"center", alignItems:"center"}}>
            <input  type="number" name="quantity" min="1" max={itemInfo.onHand} maxLength="4" size="4"/>
            
            <button className="btn btn-success" type="submit">            
              <span style={{fontSize: ".7em"}}>Add to Cart</span>
            </button>
        </div>
    </div>
  );
};

export default ItemCard;