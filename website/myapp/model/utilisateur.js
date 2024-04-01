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

    creat: function (email, nom, prenom, num_tel, last_login, password, statut, callback) {
        sql = "INSERT INTO Candidat (email, nom, prenom, num_tel, date_creation, last_login, password, statut, callback) values (?,?,?,?,?,?,?,?,?)"
        date_creation = Date.now();

        return false;
    }
}