var db = require('./db.js');
module.exports = {
    read: function (email, callback) {

        db.query("select * from Utilisateur where email= ?",email, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Utilisateur", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    areValid: function (email, password, callback) {
        sql = "SELECT password FROM Utilisateur WHERE email = ?";
        rows = db.query(sql, email, function (err, results) {
            if (err) throw err;
            if (rows.length == 1 && rows[0].pwd === password) {
                callback(true)
            } else {
                callback(false);
            }
        });
    },  

    create: function (email, nom, prenom, num_tel, password, callback) {
        date = Date.now();
        sql = "INSERT INTO Utilisateur VALUES (NULL, ?, ?, ?, ?, ?, ?, 1, ?)";
        db.query(sql, [email, nom, prenom, num_tel, date, date, password], function(err, result) {
            if (err) throw err;
            console.log(result);
        })
        return false;
    }
}