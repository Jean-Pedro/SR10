var mysql = require("mysql");

var pool = mysql.createPool({
    host: "tuxa.sme.utc", //ou localhost
    user: "sr10p001",
    password: "7iVID3GZ5ya5",
    database: "sr10p001"
});

module.exports = pool;