const express = require('express')
var db = require('../sql/db-connector');
const router = express.Router();
const bcrypt = require('bcrypt')

// create user
// post to user, insert received into the db
router.post('/', async function(req, res, next){
    console.log("creating user...")
    var hashedPassword = await bcrypt.hash(req.body.password, 10)    // hash that password baby!
    var params = [req.body.userName, hashedPassword, req.body.email, req.body.firstName, req.body.lastName];
    var query =  'INSERT INTO Customers (userName, hashedPassword, email, firstName, lastName) VALUES (?, ?, ?, ?, ?)';
    db.pool.query(query, params, function(err, result){
        if(err){
            console.log("query error");
            next(err);
            return;
        }
        console.log(result)
        res.json(result);
    })
});

// get a user, check the password to the user, if there is a hashmatch we know its va lid user
router.patch('/', async function(req, res, next){
    // var hashMatch = await bcrypt.compare(req.body.password, users[0].hashedPassword) 
//    var query =  'SELECT * FROM Orders WHERE customerId=? AND submitted=0';
    console.log("getting user...")
    var params = [req.body.userName];
    var query =  'SELECT customerId, hashedPassword FROM Customers WHERE userName = ? ';
    db.pool.query(query, params, async function(err, rows){
        if(err){
            console.log("query error");
            next(err);
            return;
        }
        console.log(rows[0].hashedPassword);
        var hashMatch = await bcrypt.compare(req.body.password, rows[0].hashedPassword)
        console.log(hashMatch)
        if(hashMatch)
        {
            console.log("hasmatch returning")
            console.log(rows[0].customerId)
            res.json(rows[0].customerId)
        }
        else
        {
            console.log("no hash match");
            res.json(null);
        }  
    })

});

module.exports = router;