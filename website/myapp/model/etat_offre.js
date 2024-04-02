var db = require('./db.js');
module.exports = {
    read: function (etat, callback) {
        db.query("select * from Etat_Offre where etat= ?", etat, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Etat_Offre", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    create: function (etat, callback) {       
        rows = db.query("INSERT INTO Etat_Offre (etat) VALUES (?);", etat, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, "Etat d'offre correctement ajouté !");
            }
        });
    },

    delete: function (etat, callback) {
        db.query("DELETE FROM Etat_Offre WHERE etat = ?", [etat], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, "Etat d'offre supprimé avec succès");
            } 
        });
    },
}