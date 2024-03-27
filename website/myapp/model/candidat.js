var db = require('./db.js');
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

    creat: function (id_candidat, email, nom, prenom, num_tel, password, type, callback) {
        sql = "INSERT INTO Candidat values "
        return false;
    }
}