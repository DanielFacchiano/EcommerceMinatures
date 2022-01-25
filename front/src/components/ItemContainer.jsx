import React, { useState } from "react";

const ItemContainer = () => {
  // When we work on the item container in detail, we will retreive a list of items
  // we will build the items in the container with the information in the list of items
  const [itemsList, setItemsList] = useState([]);

  return (
    <div className="container">
      <div className="row " >
        <div className="col text-primary" style={{textAlign : "center",  }}>
          <h3>Our Catalog:</h3>
        </div>
      </div>
        <div className="row gy-5" >
            <div className="col-md-3">
              Item Card Placeholder
            </div>
            <div className="col-md-3">
              Item Card Placeholder
            </div>
            <div className="col-md-3">
              Item Card Placeholder
            </div>
            <div className="col-md-3">
              Item Card Placeholder
            </div>
            <div className="col-md-3">
              Item Card Placeholder
            </div>
            <div className="col-md-3">
              Item Card Placeholder
            </div>
            <div className="col-md-3">
              Item Card Placeholder
            </div>
            <div className="col-md-3">
              Item Card Placeholder
            </div>
        </div>
    </div>
  );
};

export default ItemContainer;
