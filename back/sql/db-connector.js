var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'sql3.freemysqlhosting.net',
    user: 'sql3468854',
    password: 'pNYRClHHWC',
    database: 'sql3468854'
});

module.exports.pool = pool;
