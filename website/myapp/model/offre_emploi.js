var db = require('./db.js');
module.exports = {
    read: function (num, callback) {
        db.query("select * from Offre_Emploi where num= ?",num, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Offre_Emploi", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    allinfo: function (callback) {
        db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    allinfoID: function (id, callback) {
        db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren where Fiche_Poste.id_fiche = ?;",[id], function (err, results) {
            if (err) {
                callback(err);
            } else {
                callback(null, results);
            }
        });
    },

    allinfosearch: function (search, callback) {
        db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren where Fiche_Poste.intitule like ?", ['%'+search+'%'], function (err, results) {
            if (err) {
                callback(err);
            } else {
                callback(null, results);
            }
        });
    },
    

    //à voir
    create: function (num, date_validite, indications, fiche, etat, callback) {
        //voir comment faire pour les clés étrangères     
        rows = db.query("INSERT INTO Offre_Emploi (num, date_validite, indications, fiche, etat) \
        VALUES(?, ?, ?, ?, ?);", [num, date_validite, indications, fiche, etat], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(err, "Offre d'emploi ajoutée !");
            }
        });
    },


    updateDate_validite: function (num, new_date_validite, callback) {
        rows = db.query("UPDATE Offre_Emploi SET date_validite = ? WHERE num =?", [new_date_validite, num], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, true);
            }
        });
    },

    updateIndications: function (num, new_indications, callback) {
        rows = db.query("UPDATE Offre_Emploi SET indications = ? WHERE num = ?", [new_indications, num], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    updateFiche: function (num, new_fiche, callback) {
        rows = db.query("UPDATE Offre_Emploi SET fiche = ? WHERE num = ?", [new_fiche, num], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    updateEtat: function (num, new_etat, callback) {
        rows = db.query("UPDATE Offre_Emploi SET etat = ? WHERE num = ?", [new_etat, num], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    delete: function (num, callback) {
        db.query("DELETE FROM Offre_Emploi WHERE num = ?", [num], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, "Offre d'emploi supprimée avec succès");
            } 
        });
    },
}