const express = require('express')
var db = require('../sql/db-connector');
/* 
    route to select items for a specific order with the pertinent attributes
*/
const router = express.Router();
router.put('/', function(req, res, next){
    var params = [req.body.orderId];
    var query =  'SELECT `Items`.itemId, `Items`.itemTitle, `Items`.itemPrice, `OrderItem`.quantity FROM `Items` INNER JOIN `OrderItem` ON `Items`.itemId = `OrderItem`.itemId WHERE `OrderItem`.orderId=?';
    db.pool.query(query, params, function(err, rows){
        if(err){
            next(err);
            return;
        }
        res.json(rows);
    });
});
/*
    route that lets us associate an item and quantity with a specific order (add to cart)
*/
router.post('/', function(req, res, next){
    var params = [req.body.orderId, req.body.itemId, req.body.quantity];
    //var params = ["1", "1", "1"];
    console.log(params);
    var query =  'INSERT INTO OrderItem (orderId, itemId, quantity) VALUES (?, ?, ?)';
    db.pool.query(query, params, function(err, result){
        if(err){
            next(err);
            console.log("error");
            return;

        }
        console.log(result);
        res.json(result);
    })
});
/* 
    path to remove an item from an order
*/
router.patch('/', function(req, res, next){
    console.log("hi boyo")
    var params = [req.body.orderId, req.body.itemId];
    console.log(params)
    var query =  'DELETE FROM OrderItem WHERE orderId=? AND itemId=?';
    db.pool.query(query, params, function(err, result){
        if(err){
            console.log("error")
            console.log(err)
            next(err);
            return;
        }
        console.log("resulto")
        console.log(result)
        res.json(result);
    })
});


module.exports = router;