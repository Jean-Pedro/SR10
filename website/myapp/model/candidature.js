var db = require('./db.js');
module.exports = {
    read: async (id_c) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * from Candidature where id_c= ?", id_c, (err, results) => {
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
            const sql = "select * from Candidature";
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    
    readByIdCandidat: async (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * from Candidature where candidat= ?", id, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    readByIdCandidatOffre: async (id, offre) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * from Candidature where candidat= ? and offre = ?", [id, offre], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },

    readByOffre: async (offre) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * from Candidature where offre = ?", [offre], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    
    readTest: async () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * from Candidature JOIN Offre_Emploi ON Candidature.offre = Offre_Emploi.num JOIN Fiche_Poste ON Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren where Candidature.candidat= ?", 1, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    readCandidatureByCandidat: async (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * from Candidature JOIN Offre_Emploi ON Candidature.offre = Offre_Emploi.num JOIN Fiche_Poste ON Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren where Candidature.candidat= ?", id, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    readPiecesByFiche: async (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT Offre_Emploi.indications FROM Fiche_Poste JOIN Offre_Emploi ON Offre_Emploi.fiche = Fiche_Poste.id_fiche where id_fiche = ?", id, (err, results) => {
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
    
    readPieces: async (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM Piece_Dossier where candidature = ?", id, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    

    create: async (offre, candidat) => {
        return new Promise((resolve, reject) => {
            var ladate = new Date();
            db.query("INSERT INTO Candidature (id_c, date_candidature, offre, candidat) \
            VALUES(NULL, ?, ?, ?);", [ladate, offre, candidat], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    var id = results.insertId;
                    resolve(id);
                }
            });
        });
    },

    delete : async (id_c) => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM Candidature WHERE id_c = ?";
            db.query(sql, id_c, (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    },
}