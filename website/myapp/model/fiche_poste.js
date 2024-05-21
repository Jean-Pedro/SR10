var db = require('./db.js');
module.exports = {
    read: async (id_fiche) => {
        return new Promise((resolve, reject) => {
            db.query("select * from Fiche_Poste where id_fiche= ?", id_fiche, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },

    readall: async () => {
        return new Promise((resolve, reject) => {
            const sql = "select * from Fiche_Poste";
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    create: async (intitule, resp_hierarchique, rythme_travail, teletravail, salaire_min, salaire_max, description, type, statut, lieu, organisation, recruteur) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO Fiche_Poste (id_fiche, intitule, resp_hierarchique, rythme_travail, teletravail, salaire_min, salaire_max, description, type, statut, lieu, organisation, recruteur) \
            VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
            db.query(sql, [intitule, resp_hierarchique, rythme_travail, teletravail,  salaire_min, salaire_max, description, type, statut, lieu, organisation, recruteur], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const id = results.insertId;
                    resolve(id);
                }
            });
        });
    },

    delete: async (id_fiche) => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM Fiche_Poste WHERE id_fiche = ?";
            db.query(sql, id_fiche, (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },
    
    updateIntitule: async (id_fiche, new_intitule) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Fiche_Poste SET intitule = ? WHERE id_fiche =?";
            db.query(sql, [new_intitule, id_fiche], (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    updateRythme: async (id_fiche, new_rythme) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Fiche_Poste SET rythme_travail = ? WHERE id_fiche = ?";
            db.query(sql, [new_rythme, id_fiche], (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },
    
    updateTeletravail: async (id_fiche, new_teletravail) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Fiche_Poste SET teletravail = ? WHERE id_fiche = ?";
            db.query(sql, [new_teletravail, id_fiche], (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    updateSalaire_min: async (id_fiche, new_min) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Fiche_Poste SET salaire_min = ? WHERE id_fiche = ?";
            db.query(sql, [new_min, id_fiche], (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },
    
    updateSalaire_max: async (id_fiche, new_max) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Fiche_Poste SET salaire_max = ? WHERE id_fiche = ?";
            db.query(sql, [new_max, id_fiche], (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },
    
    updateDescription: async (id_fiche, new_desc) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Fiche_Poste SET description = ? WHERE id_fiche = ?";
            db.query(sql, [new_desc, id_fiche], (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },
    
    updateType: async (id_fiche, new_type) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Fiche_Poste SET type = ? WHERE id_fiche = ?";
            db.query(sql, [new_type, id_fiche], (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },
    
    updateStatut: async (id_fiche, new_statut) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Fiche_Poste SET statut = ? WHERE id_fiche =?";
            db.query(sql, [new_statut, id_fiche], (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },
    
    updateLieu: async (id_fiche, new_lieu) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Fiche_Poste SET lieu = ? WHERE id_fiche = ?";
            db.query(sql, [new_lieu, id_fiche], (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },
    
    updateOrganisation: async (id_fiche, new_orga) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Fiche_Poste SET organisation = ? WHERE id_fiche = ?";
            db.query(sql, [new_orga, id_fiche], (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },
    
    updateRecruteur: async (id_fiche, new_recruteur) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Fiche_Poste SET recruteur = ? WHERE id_fiche = ?";
            db.query(sql, [new_recruteur, id_fiche], (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    // read: function (id_fiche, callback) {
    //     db.query("select * from Fiche_Poste where id_fiche= ?",id_fiche, function(err, results) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },

    // readall: function (callback) {
    //     db.query("select * from Fiche_Poste", function (err, results) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },

    // //à voir
    // create: function (id_fiche, intitule, rythme_travail, teletravail, salaire_min, salaire_max, description, type, statut, lieu, organisation, recruteur, callback) {
    //     //voir comment faire pour les clés étrangèrs
    //     rows = db.query("INSERT INTO Fiche_Poste (id_fiche, intitule, rythme_travail, teletravail, salaire_min, salaire_max, description, type, statut, lieu, organisation, recruteur) \
    //     VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [id_fiche, intitule, rythme_travail, teletravail,  salaire_min, salaire_max, description, type, statut, lieu, organisation, recruteur], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(err, "Fiche de poste ajoutée !");
    //         }
    //     });
    // },

    // delete: function (id_fiche, callback) {
    //     //voir si il faut suppr les trucs qui l'ont en clé étrangère
    //     db.query("DELETE FROM Fiche_Poste WHERE id_fiche = ?", [id_fiche], function (err, results) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, "Fiche de poste supprimée avec succès");
    //         } 
    //     });
    // },

    // updateIntitule: function (id_fiche, new_intitule, callback) {
    //     rows = db.query("UPDATE Fiche_Poste SET intitule = ? WHERE id_fiche =?", [new_intitule, id_fiche], function (err, results) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // updateRythme: function (id_fiche, new_rythme, callback) {
    //     rows = db.query("UPDATE Fiche_Poste SET rythme_travail = ? WHERE id_fiche = ?", [new_rythme, id_fiche], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // updateTeletravail: function (id_fiche, new_teletravail, callback) {
    //     rows = db.query("UPDATE Fiche_Poste SET teletravail = ? WHERE id_fiche = ?", [new_teletravail, id_fiche], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // updateSalaire_min: function (id_fiche, new_min, callback) {
    //     rows = db.query("UPDATE Fiche_Poste SET salaire_min = ? WHERE id_fiche = ?", [new_min, id_fiche], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // updateSalaire_max: function (id_fiche, new_max, callback) {
    //     rows = db.query("UPDATE Fiche_Poste SET salaire_max = ? WHERE id_fiche = ?", [new_max, id_fiche], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // updateDescription: function (id_fiche, new_desc, callback) {
    //     rows = db.query("UPDATE Fiche_Poste SET description = ? WHERE id_fiche = ?", [new_desc, id_fiche], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // updateType: function (id_fiche, new_type, callback) {
    //     rows = db.query("UPDATE Fiche_Poste SET type = ? WHERE id_fiche = ?", [new_type, id_fiche], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // updateStatut: function (id_fiche, new_statut, callback) {
    //     rows = db.query("UPDATE Fiche_Poste SET statut = ? WHERE id_fiche =?", [new_statut, id_fiche], function (err, results) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // updateLieu: function (id_fiche, new_lieu, callback) {
    //     rows = db.query("UPDATE Fiche_Poste SET lieu = ? WHERE id_fiche = ?", [new_lieu, id_fiche], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // updateOrganisation: function (id_fiche, new_orga, callback) {
    //     rows = db.query("UPDATE Fiche_Poste SET organisation = ? WHERE id_fiche = ?", [new_orga, id_fiche], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // updateRecruteur: function (id_fiche, new_recruteur, callback) {
    //     rows = db.query("UPDATE Fiche_Poste SET recruteur = ? WHERE id_fiche = ?", [new_recruteur, id_fiche], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },
}