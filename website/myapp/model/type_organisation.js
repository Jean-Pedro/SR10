var db = require('./db.js');
module.exports = {
    read: function (nom, callback) {
        db.query("select * from Type_Organisation where nom= ?", nom, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Type_Organisation", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    create: function (nom, callback) {       
        rows = db.query("INSERT INTO Type_Organisation (nom) VALUES (?);", nom, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, "Type d'organisation correctement ajouté !");
            }
        });
    },

    delete: function (nom, callback) {
        db.query("DELETE FROM Type_Organisation WHERE nom = ?", [nom], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, "Type d'organisation supprimé avec succès");
            } 
        });
    },
}