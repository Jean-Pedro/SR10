var db = require('./db.js');
module.exports = {
    read: function (id_c, callback) {
        db.query("select * from Candidature where id_c= ?", id_c, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Candidature", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    //à voir
    create: function (date_candidature, offre, candidat, callback) {
        //voir comment faire pour les clés étrangères   
        rows = db.query("INSERT INTO Candidature (id_c, date_candidature, offre, candidat) \
        VALUES(NULL, ?, ?, ?);", [id_c, date_candidature, offre, candidat], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(err, "Candidature ajoutée !");
            }
        });
    },

    delete: function (id_c, callback) {
        db.query("DELETE FROM Candidature WHERE id_c = ?", [id_c], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, "Candidature supprimée avec succès");
            } 
        });
    },
}