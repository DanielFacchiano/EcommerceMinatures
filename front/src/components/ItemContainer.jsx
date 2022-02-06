import React, { useState } from "react";
import ItemCard from "./ItemCard";



const ItemContainer = ({itemsList}) => {
  // When we work on the item container in detail, we will retreive a list of items
  // we will build the items in the container with the information in the list of items

  const [pageIncrement, setPageIncrement] = React.useState(0);

  const handleNewPage = (event) => {
    var oldPage = document.getElementsByClassName("pageactive")[0];
    oldPage.className = "";
    var newPage = event.target;
    newPage.className = "pageactive";
    var pnum = parseInt(newPage.textContent);
    setPageIncrement((pnum-1)*16)
  }

  return (
    <div className="container">
      <div className="row " >
        <div className="col text-primary" style={{textAlign : "center",  }}>
          <h3>Our Catalog:</h3>
        </div>
      </div>
        <div className="row gy-2">
            <div className="col-md-3" id="item0">
              { 0 + pageIncrement < itemsList.length ?
              (itemsList[0 + pageIncrement] != null ?
               <ItemCard
               itemInfo = {itemsList[0 + pageIncrement]}
               />: 
               "Loading Item Card...") : "" }
            </div>
            <div className="col-md-3" id="item1">
              { 1 + pageIncrement < itemsList.length ?
              (itemsList[1 + pageIncrement] != null ?
               <ItemCard
               itemInfo = {itemsList[1 + pageIncrement]}
               />: 
               "Loading Item Card...") : "" }     
            </div>
            <div className="col-md-3" id="item1">
              { 2 + pageIncrement < itemsList.length ?
              (itemsList[2 + pageIncrement] != null ?
               <ItemCard
               itemInfo = {itemsList[2 + pageIncrement]}
               />: 
               "Loading Item Card...") : "" }     
            </div>
            <div className="col-md-3" id="item1">
              { 3 + pageIncrement < itemsList.length ?
              (itemsList[3 + pageIncrement] != null ?
               <ItemCard
               itemInfo = {itemsList[3 + pageIncrement]}
               />: 
               "Loading Item Card...") : "" }     
            </div>
            <div className="col-md-3" id="item1">
              { 4 + pageIncrement < itemsList.length ?
              (itemsList[4 + pageIncrement] != null ?
               <ItemCard
               itemInfo = {itemsList[4 + pageIncrement]}
               />: 
               "Loading Item Card...") : "" }     
            </div>
            <div className="col-md-3" id="item1">
              { 5 + pageIncrement < itemsList.length ?
              (itemsList[5 + pageIncrement] != null ?
               <ItemCard
               itemInfo = {itemsList[5 + pageIncrement]}
               />: 
               "Loading Item Card...") : "" }     
            </div>
            <div className="col-md-3" id="item1">
              { 6 + pageIncrement < itemsList.length ?
              (itemsList[6 + pageIncrement] != null ?
               <ItemCard
               itemInfo = {itemsList[6 + pageIncrement]}
               />: 
               "Loading Item Card...") : "" }     
            </div>
            <div className="col-md-3" id="item1">
              { 7 + pageIncrement < itemsList.length ?
              (itemsList[7 + pageIncrement] != null ?
               <ItemCard
               itemInfo = {itemsList[7 + pageIncrement]}
               />: 
               "Loading Item Card...") : "" }     
            </div>
            <div className="col-md-3" id="item1">
              { 8 + pageIncrement < itemsList.length ?
              (itemsList[8 + pageIncrement] != null ?
               <ItemCard
               itemInfo = {itemsList[8 + pageIncrement]}
               />: 
               "Loading Item Card...") : "" }     
            </div>
            <div className="col-md-3" id="item1">
              { 9 + pageIncrement < itemsList.length ?
              (itemsList[9 + pageIncrement] != null ?
               <ItemCard
               itemInfo = {itemsList[9 + pageIncrement]}
               />: 
               "Loading Item Card...") : "" }     
            </div>
            <div className="col-md-3" id="item1">
              { 10 + pageIncrement < itemsList.length ?
              (itemsList[10 + pageIncrement] != null ?
               <ItemCard
               itemInfo = {itemsList[10 + pageIncrement]}
               />: 
               "Loading Item Card...") : "" }     
            </div>
            <div className="col-md-3" id="item1">
              { 11 + pageIncrement < itemsList.length ?
              (itemsList[11 + pageIncrement] != null ?
               <ItemCard
               itemInfo = {itemsList[11 + pageIncrement]}
               />: 
               "Loading Item Card...") : "" }     
            </div>
            <div className="col-md-3" id="item1">
              { 12 + pageIncrement < itemsList.length ?
              (itemsList[12 + pageIncrement] != null ?
               <ItemCard
               itemInfo = {itemsList[12 + pageIncrement]}
               />: 
               "Loading Item Card...") : "" }     
            </div>
            <div className="col-md-3" id="item1">
              { 13 + pageIncrement < itemsList.length ?
              (itemsList[13 + pageIncrement] != null ?
               <ItemCard
               itemInfo = {itemsList[13 + pageIncrement]}
               />: 
               "Loading Item Card...") : "" }     
            </div>
            <div className="col-md-3" id="item1">
              { 14 + pageIncrement < itemsList.length ?
              (itemsList[14 + pageIncrement] != null ?
               <ItemCard
               itemInfo = {itemsList[14 + pageIncrement]}
               />: 
               "Loading Item Card...") : "" }     
            </div>
            <div className="col-md-3" id="item1">
              { 15 + pageIncrement < itemsList.length ?
              (itemsList[15 + pageIncrement] != null ?
               <ItemCard
               itemInfo = {itemsList[15 + pageIncrement]}
               />: 
               "Loading Item Card...") : "" }     
            </div>
        </div>
        <div className="col-md-3 mx-auto pagination" style={{ paddingTop:"2em", paddingBottom:"1em"}}>
          <p onClick = {handleNewPage} id="page1" style={{cursor:"pointer"}} className="pageactive">1</p>
          <p onClick = {handleNewPage} id="page2" style={{cursor:"pointer"}} >2</p>
          <p onClick = {handleNewPage} id="page3" style={{cursor:"pointer"}} >3</p>
          <p onClick = {handleNewPage} id="page4" style={{cursor:"pointer"}} >4</p>
          <p onClick = {handleNewPage} id="page5" style={{cursor:"pointer"}} >5</p>
          </div>
        <div className="row">
                
        </div>
    </div>
  );
};

export default ItemContainer;
