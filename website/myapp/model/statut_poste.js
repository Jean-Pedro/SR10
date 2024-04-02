var db = require('./db.js');
module.exports = {
    read: function (statut, callback) {
        db.query("select * from Statut_Poste where statut= ?", statut, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Statut_Poste", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    create: function (statut, callback) {       
        rows = db.query("INSERT INTO Statut_Poste (statut) VALUES (?);", statut, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, "Statut de poste correctement ajouté !");
            }
        });
    },

    delete: function (statut, callback) {
        db.query("DELETE FROM Statut_Poste WHERE statut = ?", [statut], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, "Statut de poste supprimé avec succès");
            } 
        });
    },
}