var db = require('./db.js');
module.exports = {
    read: async (siren) => {
        return new Promise((resolve, reject) => {
            const sql = "select * from Organisation where siren= ?";
            db.query(sql, siren, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
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

    readAllSiren: async () => {
        return new Promise((resolve, reject) => {
            const sql = "select siren from Organisation";
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    },

    create: async (siren, nom, siege_social, type, logo) => {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO Organisation (siren, nom, siege_social, type, logo, etat_demande) \
            VALUES(?, ?, ?, ?, ?, ?);", [siren, nom, siege_social, type, logo, "en attente"], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(siren);
                }
            });
        });
    },
    
    delete : async (siren) => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM Organisation WHERE siren = ?";
            db.query(sql, siren, (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    },

    updateNom : async (siren, new_nom) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Organisation SET nom = ? WHERE siren =?";
            db.query(sql, [new_nom, siren], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    updateSiege_social : async (siren, new_siege_social) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Organisation SET siege_social = ? WHERE siren =?";
            db.query(sql, [new_siege_social, siren], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    updateType : async (siren, new_type) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Organisation SET type = ? WHERE siren =?";
            db.query(sql, [new_type, siren], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    updateLogo : async (siren, new_logo) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Organisation SET logo = ? WHERE siren =?";
            db.query(sql, [new_logo, siren], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },


    updateEtatDemande : async (siren, new_etat) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Organisation SET etat_demande = ? WHERE siren =?";
            db.query(sql, [new_etat, siren], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },
    


    // //à voir
    // create: function (siren, nom, siege_social, type, logo, callback) {
    //     //voir comment faire pour le siege social et le type     
    //     rows = db.query("INSERT INTO Organisation (siren, nom, siege_social, type, logo) \
    //     VALUES(?, ?, ?, ?, ?);", [siren, nom, siege_social, type, logo], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(err, "Organisation ajoutée !");
    //         }
    //     });
    // },

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

}