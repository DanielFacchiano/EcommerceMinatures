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
        res.json(rows);
    });
});

router.post('/', function(req, res, next){
    var queryString = req.body.queryString;
    var lQueryString = queryString.toLowerCase();
    rowArray = [];
    console.log("in route shopping getting rows")
    db.pool.query(`SELECT * FROM Items`, function(err, rows){
        if(err){
            next(err);
            return;
        }
		console.log(rows);
        rowArray = rows.filter((object) =>{
            return (object.tags.includes(lQueryString))
        });
        console.log(rowArray);
        res.json(rowArray);
    });
});

module.exports = router;