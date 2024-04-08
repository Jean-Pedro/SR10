var mysql = require("mysql");

var pool = mysql.createPool({
    host: "tuxa.sme.utc", //ou localhost
    user: "sr10p001",
    password: "Ady5aLK8l2Ht",
    database: "sr10p001"
});

module.exports = pool;