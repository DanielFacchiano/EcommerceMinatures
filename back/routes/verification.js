const express = require('express')
var db = require('../sql/db-connector');

const router = express.Router();
/*
    Used to see if a user exists before further action for certain operations
*/
router.post('/', async function(req, res, next){
    console.log("helloooooo")
    var params = [req.body.userName];
    var query =  'SELECT * from Customers WHERE userName = ?';
    db.pool.query(query, params, function(err, result){
        if(err){
            console.log("query error");
            next(err);
            return;
        }
        res.json(result);
    })
});

module.exports = router;