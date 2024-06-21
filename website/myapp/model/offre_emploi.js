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

    readByFiche: async (fiche) => {
        return new Promise((resolve, reject) => {
            db.query("select * from Offre_Emploi where fiche= ?", fiche, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
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
            db.query("select f.salaire_min, o.logo, o.nom, o.siren, off.date_depot, f.id_fiche, off.num, o.type, f.intitule, f.description, off.date_validite, a.ville from Fiche_Poste as f JOIN Offre_Emploi as off on f.id_fiche = off.fiche join Organisation as o on f.organisation = o.siren join Adresse as a on o.siege_social = a.id_lieu ORDER BY off.date_depot DESC", (err, results) => {
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
            db.query("select o.logo, o.nom, o.siren, o.date_depot, f.id_fiche, off.num, o.type, f.intitule, f.description, off.date_validite from Fiche_Poste as f JOIN Offre_Emploi as off on f.id_fiche = off.fiche join Organisation as o on f.organisation = o.siren join Adresse as a ON a.id_lieu = o.siege_social where a.ville like ?", ['%'+search+'%'], (err, results) => {
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
            db.query("select * from Fiche_Poste JOIN Offre_Emploi on Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren where Fiche_Poste.salaire_min >= ?", search, (err, results) => {
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
}