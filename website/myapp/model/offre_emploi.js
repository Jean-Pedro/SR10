var db = require('./db.js');
module.exports = {
    read: async (num) => {
        return new Promise((resolve, reject) => {
            db.query("select * from Offre_Emploi where num= ?", num, (err, results) => {
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
            const sql = "select * from Offre_Emploi"
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    readPieces: async (num) => {
        return new Promise((resolve, reject) => {
            db.query("select indications from Offre_Emploi where num= ?", num, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    if (results.length > 0) {
                        const indications = results[0].indications;
                        const indicationsArray = indications.split(',').map(indication => indication.trim());
                        resolve(indicationsArray);
                    } else {
                        resolve([]);
                    }
                }
            });
        });
    },

    create: async (date_validite, indications, fiche, etat) => {
        return new Promise((resolve, reject) => {
                var date = new Date();
                db.query("INSERT INTO Offre_Emploi VALUES (NULL, ?, ?, ?, ?, ?);", [date_validite, indications, fiche, etat, date], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        const num = results.insertId
                        resolve(num);
                    }
                })
        });
    },

    delete : async (num) => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM Offre_Emploi WHERE num = ?";
            db.query(sql, num, (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    },


    allinfo: async () => {
        return new Promise((resolve, reject) => {
            db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren ORDER BY Offre_Emploi.date_depot DESC", (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },


    allinfoValide: async () => {
        return new Promise((resolve, reject) => {
            const now = new Date();
            db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren where Offre_Emploi.date_validite > ? ORDER BY Offre_Emploi.date_depot DESC", [now], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },



    allinfoID: async (id) => {
        return new Promise((resolve, reject) => {
            db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren where Fiche_Poste.id_fiche = ?;", id, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    allinfoOffre: async (num) => {
        return new Promise((resolve, reject) => {
            db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren where Offre_Emploi.num = ?;", num, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },
    
    allinfoSiren: async (siren) => {
        return new Promise((resolve, reject) => {
            db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren where Organisation.siren = ?;", siren, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    
    allinfoByRecruteur: async (id) => {
        return new Promise((resolve, reject) => {
            db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren where Fiche_Poste.recruteur = ?;", id, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    
    allinfosearch: async (search) => {
        return new Promise((resolve, reject) => {
            db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren where Fiche_Poste.intitule like ?", ['%'+search+'%'], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    
    allinfoLocate: async (search) => {
        return new Promise((resolve, reject) => {
            db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren join Adresse ON Adresse.id_lieu = Organisation.siege_social where Adresse.ville like ?", ['%'+search+'%'], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    
    allinfoSalaire: async (search) => {
        return new Promise((resolve, reject) => {
            db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren join Adresse ON Adresse.id_lieu = Organisation.siege_social where Fiche_Poste.salaire_min >= ?", search, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    
    candidatByOffre: async (num) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM Candidature JOIN Offre_Emploi ON Candidature.offre = Offre_Emploi.num JOIN Utilisateur ON Candidature.candidat = Utilisateur.id_utilisateur WHERE Candidature.offre = ?", [num], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    
    updateDate_validite: async (num, new_date_validite) => {
        return new Promise((resolve, reject) => {
            db.query("UPDATE Offre_Emploi SET date_validite = ? WHERE num =?", [new_date_validite, num], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    },

    updateIndications: async (num, new_indications) => {
        return new Promise((resolve, reject) => {
            db.query("UPDATE Offre_Emploi SET indications = ? WHERE num = ?", [new_indications, num], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    },

    updateFiche: async (num, new_fiche) => {
        return new Promise((resolve, reject) => {
            db.query("UPDATE Offre_Emploi SET fiche = ? WHERE num = ?", [new_fiche, num], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    },
    
    updateEtat: async (num, new_etat) => {
        return new Promise((resolve, reject) => {
            db.query("UPDATE Offre_Emploi SET etat = ? WHERE num = ?", [new_etat, num], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    },

    // read: function (num, callback) {
    //     db.query("select * from Offre_Emploi where num= ?",num, function(err, results) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },

    

    // readall: function (callback) {
    //     db.query("select * from Offre_Emploi", function (err, results) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },

    // //à voir
    // create: function (num, date_validite, indications, fiche, etat, callback) {
    //     //voir comment faire pour les clés étrangères     
    //     rows = db.query("INSERT INTO Offre_Emploi (num, date_validite, indications, fiche, etat) \
    //     VALUES(?, ?, ?, ?, ?);", [num, date_validite, indications, fiche, etat], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(err, "Offre d'emploi ajoutée !");
    //         }
    //     });
    // },
    

    // delete: function (num, callback) {
    //     db.query("DELETE FROM Offre_Emploi WHERE num = ?", [num], function (err, results) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, "Offre d'emploi supprimée avec succès");
    //         } 
    //     });
    // },

    // allinfo: function (callback) {
    //     db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren ORDER BY Offre_Emploi.date_depot DESC", function (err, results) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },

    // allinfoID: function (id, callback) {
    //     db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren where Fiche_Poste.id_fiche = ?;",[id], function (err, results) {
    //         if (err) {
    //             callback(err);
    //         } else {
    //             callback(null, results);
    //         }
    //     });
    // },

    // allinfoSiren: function (siren, callback) {
    //     db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren where Organisation.siren = ?;",[siren], function (err, results) {
    //         if (err) {
    //             callback(err);
    //         } else {
    //             callback(null, results);
    //         }
    //     });
    // },

    // allinfoByRecruteur: function (id, callback) {
    //     db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren where Fiche_Poste.recruteur = ?;",[id], function (err, results) {
    //         if (err) {
    //             callback(err);
    //         } else {
    //             callback(null, results);
    //         }
    //     });
    // },

    // allinfosearch: function (search, callback) {
    //     db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren where Fiche_Poste.intitule like ?", ['%'+search+'%'], function (err, results) {
    //         if (err) {
    //             callback(err);
    //         } else {
    //             callback(null, results);
    //         }
    //     });
    // },

    // allinfoLocate: function (search, callback) {
    //     db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren join Adresse ON Adresse.id_lieu = Organisation.siege_social where Adresse.ville like ?", ['%'+search+'%'], function (err, results) {
    //         if (err) {
    //             callback(err);
    //         } else {
    //             callback(null, results);
    //         }
    //     });
    // },

    // allinfoSalaire: function (search, callback) {
    //     db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren join Adresse ON Adresse.id_lieu = Organisation.siege_social where Fiche_Poste.salaire_min >= ?", search, function (err, results) {
    //         if (err) {
    //             callback(err);
    //         } else {
    //             callback(null, results);
    //         }
    //     });
    // },

    // candidatByOffre: function (num, callback) {
    //     db.query("SELECT * FROM Candidature JOIN Offre_Emploi ON Candidature.offre = Offre_Emploi.num JOIN Utilisateur ON Candidature.candidat = Utilisateur.id_utilisateur WHERE Candidature.offre = ?", [num], function (err, results) {
    //         if (err) {
    //             callback(err);
    //         } else {
    //             callback(null, results);
    //         }
    //     });
    // },

    // updateDate_validite: function (num, new_date_validite, callback) {
    //     rows = db.query("UPDATE Offre_Emploi SET date_validite = ? WHERE num =?", [new_date_validite, num], function (err, results) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // updateIndications: function (num, new_indications, callback) {
    //     rows = db.query("UPDATE Offre_Emploi SET indications = ? WHERE num = ?", [new_indications, num], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // updateFiche: function (num, new_fiche, callback) {
    //     rows = db.query("UPDATE Offre_Emploi SET fiche = ? WHERE num = ?", [new_fiche, num], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // updateEtat: function (num, new_etat, callback) {
    //     rows = db.query("UPDATE Offre_Emploi SET etat = ? WHERE num = ?", [new_etat, num], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

}