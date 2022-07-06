const express = require('express')
var db = require('../sql/db-connector');

const router = express.Router();

/*
    Path to set an order to submitted, does this by setting submitted integer to 1
*/
router.patch('/', function(req, res, next){
    var query = 'UPDATE Orders SET submitted=1 WHERE orderId=?';
    var params = [req.body.orderId];
    db.pool.query(query, params, function(err, result){
        if(err){
            next(err);
            console.log("error")
            return;
        }
        res.json(result);
    });
});
/*
    Route for getting a customers order id and returning it to the front, if none is found an 
    open order is created and its id is returned to the front end
*/
router.post('/', function(req, res, next){
    console.log("hello")
    var query =  'SELECT * FROM Orders WHERE customerId=? AND submitted=0';
    var params = [req.body.userId];
    // Check if there is a pre-existing open order, if so return it to front
    db.pool.query(query, params, function(err, rows){
        if(err){
            next(err);
            console.log("error")
            return;
        }
        if (rows.length != 0){
        console.log("found open order, returning to front end...")
        res.json(rows);
        }
        else{
            // If there is no open order, we need to create one
            console.log("Creating order...")
            query =  'INSERT INTO Orders (customerId, timeStamp) VALUES (?, CURRENT_TIME)';
            db.pool.query(query, params, function(err, result){
                if(err){
                    next(err);
                    console.log("error")
                    return;
                }
                console.log(result)
                // After we have created an unsubmitted order, we get it and return it to the front
                console.log("Retreiving created order...")
                query =  'SELECT * FROM Orders WHERE customerId=? AND submitted=0';
                db.pool.query(query, params, function(err, rows){
                    if(err){
                        next(err);
                        console.log("error")
                        return;
                    }
                    console.log(rows)  
                    res.json(rows);                  
                });
            });
        };
    });
});

module.exports = router;