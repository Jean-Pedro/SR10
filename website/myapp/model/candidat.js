const { createPoolCluster } = require('mysql');
var db = require('./db.js');
var user = require('./utilisateur.js')

module.exports = {
    read: function (email, callback) {

        db.query("select * from Candidat where email= ?",email, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Candidat", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    areValid: function (email, password, callback) {
        sql = "SELECT password FROM Candidat WHERE email = ?";
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
        console.log("beihfzeo");
        user.create(email, nom, prenom, num_tel, password, function(err, id) {
            if (err) {
                console.log("Aie1");
                callback(err, false);
            } else {
                console.log("ID : " + id);
                callback(err, true);
            }
            rows = db.query("INSERT INTO Candidat VALUES (?);", id, function (err, results) {
                if (err) {
                    console.log("Aie2");
                    callback(err, false);
                } else {
                    console.log("yeay");
                    callback(err, true);
                }
                console.log(results);
            });
        });
    }
};