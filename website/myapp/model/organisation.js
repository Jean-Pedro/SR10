var db = require('./db.js');
module.exports = {
    read: function (email, callback) {

        db.query("select * from Organisation where email= ?",email, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Organisation", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    areValid: function (email, password, callback) {
        sql = "SELECT pwd FROM USERS WHERE email = ?";
        rows = db.query(sql, email, function (err, results) {
            if (err) throw err;
            if (rows.length == 1 && rows[0].pwd === password) {
                callback(true)
            } else {
                callback(false);
            }
        });
    },  

    creat: function (email, nom, prenom, pwd, type, callback) {
        //todo
        return false;
    }
}