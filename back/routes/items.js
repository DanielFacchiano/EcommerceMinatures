const express = require('express')
var db = require('../sql/db-connector');
const { param } = require('./orders');
const router = express.Router();

/* 
    path to update the quanity of items, most items db routes are actually in the shopping route
*/
router.patch('/', function(req, res, next){
    var orderList = [req.body.orderList];
    var params = [];
    for (let x = 0; x < orderList[0].length; x++){  
        params =[orderList[0][x].quantity, orderList[0][x].itemId];
        console.log("sending query with params...")
        console.log(params)
        var query = 'UPDATE Items SET onHand = onHand - ? WHERE itemId = ?';
        db.pool.query(query, params, function(err, result){
            if(err){
                console.log("query error");
                console.log(err)
                next(err);
                return;
            }
            console.log("query success")
        })
    }
    console.log("thething")
    res.json();
});

module.exports = router;