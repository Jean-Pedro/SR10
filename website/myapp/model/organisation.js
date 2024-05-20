var db = require('./db.js');
module.exports = {
    read: async (siren) => {
        return new Promise((resolve, reject) => {
            const sql = "select * from Organisation where siren= ?";
            db.query(sql, siren, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    },


    readall: async () => {
        return new Promise((resolve, reject) => {
            const sql = "select * from Organisation";
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    },

    readByStatut: async (statut) => {
        return new Promise((resolve, reject) => {
            const sql = "select * from Organisation where etat_demande = ?";
            db.query(sql, statut, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    },


    // read: function (siren, callback) {
    //     db.query("select * from Organisation where siren= ?",siren, function(err, results) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },

    // readall: function (callback) {
    //     db.query("select * from Organisation", function (err, results) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },

    

    // readByStatut: function (statut, callback) {
    //     db.query("select * from Organisation where etat_demande = ?", statut, function(err, results) {
    //         if (err) {
    //             callback(err);
    //         } else {
    //             callback(null, results);
    //         }
    //     })
    // },




    readByStatut: async (statut) => {
        return new Promise((resolve, reject) => {
            const sql = "select * from Organisation where etat_demande = ?";
            db.query(sql, statut, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    },



    //à voir
    create: function (siren, nom, siege_social, type, logo, callback) {
        //voir comment faire pour le siege social et le type     
        rows = db.query("INSERT INTO Organisation (siren, nom, siege_social, type, logo) \
        VALUES(?, ?, ?, ?, ?);", [siren, nom, siege_social, type, logo], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(err, "Organisation ajoutée !");
            }
        });
    },


    updateNom: function (siren, new_nom, callback) {
        rows = db.query("UPDATE Organisation SET nom = ? WHERE siren =?", [new_nom, siren], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, true);
            }
        });
    },

    updateSiege_social: function (siren, new_siege_social, callback) {
        rows = db.query("UPDATE Organisation SET siege_social = ? WHERE siren = ?", [new_siege_social, siren], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    updateType: function (siren, new_type, callback) {
        rows = db.query("UPDATE Organisation SET type = ? WHERE siren = ?", [new_type, siren], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    updateLogo: function (siren, new_logo, callback) {
        rows = db.query("UPDATE Organisation SET logo = ? WHERE siren = ?", [new_logo, siren], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    delete: function (siren, callback) {
        db.query("DELETE FROM Organisation WHERE siren = ?", [siren], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, "Organisation supprimée avec succès");
            } 
        });
    },
}