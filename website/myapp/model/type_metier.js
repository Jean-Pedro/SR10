var db = require('./db.js');
module.exports = {
    read: function (type, callback) {
        db.query("select * from Type_Metier where type= ?", type, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Type_Metier", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    create: function (type, callback) {       
        rows = db.query("INSERT INTO Type_Metier (type) VALUES (?);", type, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, "Type de métier correctement ajouté !");
            }
        });
    },

    delete: function (type, callback) {
        db.query("DELETE FROM Type_Metier WHERE type = ?", [type], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, "Type de métier supprimée avec succès");
            } 
        });
    },
}