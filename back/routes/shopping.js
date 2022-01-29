const express = require('express')
var db = require('../sql/db-connector');

const router = express.Router();
router.get('/', function(req, res, next){
    console.log("in route shopping getting rows")
    db.pool.query(`SELECT * FROM Items`, function(err, rows){
        if(err){
            next(err);
            return;
        }
		console.log(rows);
        //res.json(rows);
    });
});

module.exports = router;