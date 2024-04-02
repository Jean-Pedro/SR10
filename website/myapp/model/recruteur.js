var db = require('./db.js');
var user = require('./utilisateur.js')

module.exports = {
    read: function (email, callback) {
        db.query("SELECT * from Recruteur JOIN Utilisateur ON id_recruteur=id_utilisateur WHERE email= ?",email, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Recruteur JOIN Utilisateur ON id_recruteur=id_utilisateur", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    areValid: function (email, password, callback) {
        sql = "SELECT password FROM Recruteur JOIN Utilisateur ON id_recruteur=id_utilisateur WHERE email = ?";
        rows = db.query(sql, email, function (err, results) {
            if (err) throw err;
            if (rows.length == 1 && rows[0].pwd === password) {
                callback(true)
            } else {
                callback(false);
            }
        });
    },  

    create: function (email, nom, prenom, num_tel, password, organisation, callback) {
        user.create(email, nom, prenom, num_tel, password, function(err, id) {
            if (err) {
                callback(err, null);
            } else {
                console.log("ID : " + id);
            }
            rows = db.query("INSERT INTO Recruteur VALUES (?, ?);", [id, organisation], function (err, results) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, results);
                }
            });
        });
    },

    delete: function (email, callback) {
        db.query("UPDATE Utilisateur SET statut = 0 WHERE email = ?", [email], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, "Utilisateur supprimé");
            } 
        });
    },

    /*delete: function (email, callback) {
        user.read(email, function (err, results) {
            if (err) throw err;
            callback(results);
            var id = results[0].id_candidat;
            db.query("DELETE FROM Recruteur WHERE id_recruteur = ?", [id], function (err, results) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, "Utilisateur supprimé des recruteurs");
                } 
            });
            user.delete(email, function (err, results) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, "Utilisateur supprimé avec succès");
                } 
            });
        });
    },*/
};