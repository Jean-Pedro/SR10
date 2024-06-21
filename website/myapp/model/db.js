var mysql = require("mysql");

var pool = mysql.createPool({
    host: "tuxa.sme.utc", //ou localhost
    user: "xxx",
    password: "xxx",
    database: "xxx"
});

module.exports = pool;