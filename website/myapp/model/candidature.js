var db = require('./db.js');
module.exports = {
    read: function (id_c, callback) {
        db.query("SELECT * from Candidature where id_c= ?", id_c, function(err, results) {
            if (err) throw err;
            callback(null, results);
        });
    },

    readall: function (callback) {
        db.query("select * from Candidature", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readByIdCandidat: function (id, callback) {
        db.query("SELECT * from Candidature where candidat= ?", id, function(err, results) {
            if (err) throw err;
            callback(null, results);
        });
    },

    readTest: function (callback) {
        db.query("SELECT * from Candidature JOIN Offre_Emploi ON Candidature.offre = Offre_Emploi.num JOIN Fiche_Poste ON Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren where Candidature.candidat= ?", 1, function(err, results) {
            if (err) throw err;
            callback(null, results);
        });
    },

    readPieces: function (id, callback) {
        db.query("SELECT * FROM Piece_Dossier where candidature = ?", id, function(err, results) {
            if (err) throw err;
            callback(null, results);
        });
    },

    //à voir
    create: function (date_candidature, offre, candidat, callback) {
        //voir comment faire pour les clés étrangères   
        rows = db.query("INSERT INTO Candidature (id_c, date_candidature, offre, candidat) \
        VALUES(NULL, ?, ?, ?);", [date_candidature, offre, candidat], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
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