var db = require('./db.js');
module.exports = {
    read: function (id_fiche, callback) {
        db.query("select * from Fiche_Poste where id_fiche= ?",id_fiche, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Fiche_Poste", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    //à voir
    create: function (id_fiche, intitule, rythme_travail, teletravail, salaire_min, salaire_max, description, type, statut, lieu, organisation, recruteur, callback) {
        //voir comment faire pour les clés étrangèrs
        rows = db.query("INSERT INTO Fiche_Poste (id_fiche, intitule, rythme_travail, teletravail, salaire_min, salaire_max, description, type, statut, lieu, organisation, recruteur) \
        VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [id_fiche, intitule, rythme_travail, teletravail,  salaire_min, salaire_max, description, type, statut, lieu, organisation, recruteur], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(err, "Fiche de poste ajoutée !");
            }
        });
    },


    updateIntitule: function (id_fiche, new_intitule, callback) {
        rows = db.query("UPDATE Fiche_Poste SET intitule = ? WHERE id_fiche =?", [new_intitule, id_fiche], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, true);
            }
        });
    },

    updateRythme: function (id_fiche, new_rythme, callback) {
        rows = db.query("UPDATE Fiche_Poste SET rythme_travail = ? WHERE id_fiche = ?", [new_rythme, id_fiche], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    updateTeletravail: function (id_fiche, new_teletravail, callback) {
        rows = db.query("UPDATE Fiche_Poste SET teletravail = ? WHERE id_fiche = ?", [new_teletravail, id_fiche], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    updateSalaire_min: function (id_fiche, new_min, callback) {
        rows = db.query("UPDATE Fiche_Poste SET salaire_min = ? WHERE id_fiche = ?", [new_min, id_fiche], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    updateSalaire_max: function (id_fiche, new_max, callback) {
        rows = db.query("UPDATE Fiche_Poste SET salaire_max = ? WHERE id_fiche = ?", [new_max, id_fiche], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    updateDescription: function (id_fiche, new_desc, callback) {
        rows = db.query("UPDATE Fiche_Poste SET description = ? WHERE id_fiche = ?", [new_desc, id_fiche], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    updateType: function (id_fiche, new_type, callback) {
        rows = db.query("UPDATE Fiche_Poste SET type = ? WHERE id_fiche = ?", [new_type, id_fiche], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    updateStatut: function (id_fiche, new_statut, callback) {
        rows = db.query("UPDATE Fiche_Poste SET statut = ? WHERE id_fiche =?", [new_statut, id_fiche], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, true);
            }
        });
    },

    updateLieu: function (id_fiche, new_lieu, callback) {
        rows = db.query("UPDATE Fiche_Poste SET lieu = ? WHERE id_fiche = ?", [new_lieu, id_fiche], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    updateOrganisation: function (id_fiche, new_orga, callback) {
        rows = db.query("UPDATE Fiche_Poste SET organisation = ? WHERE id_fiche = ?", [new_orga, id_fiche], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    updateRecruteur: function (id_fiche, new_recruteur, callback) {
        rows = db.query("UPDATE Fiche_Poste SET recruteur = ? WHERE id_fiche = ?", [new_recruteur, id_fiche], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    delete: function (id_fiche, callback) {
        //voir si il faut suppr les trucs qui l'ont en clé étrangère
        db.query("DELETE FROM Fiche_Poste WHERE id_fiche = ?", [id_fiche], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, "Fiche de poste supprimée avec succès");
            } 
        });
    },
}