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


    // read: function (id_c, callback) {
    //     db.query("SELECT * from Candidature where id_c= ?", id_c, function(err, results) {
    //         if (err) throw err;
    //         callback(null, results);
    //     });
    // },


    // //à voir
    // create: function (date_candidature, offre, candidat, callback) {
    //     //voir comment faire pour les clés étrangères   
    //     rows = db.query("INSERT INTO Candidature (id_c, date_candidature, offre, candidat) \
    //     VALUES(NULL, ?, ?, ?);", [date_candidature, offre, candidat], function (err, results) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, results);
    //         }
    //     });
    // },

    // readall: function (callback) {
    //     db.query("select * from Candidature", function (err, results) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },

    // readByIdCandidat: function (id, callback) {
    //     db.query("SELECT * from Candidature where candidat= ?", id, function(err, results) {
    //         if (err) throw err;
    //         callback(null, results);
    //     });
    // },

    // readTest: function (callback) {
    //     db.query("SELECT * from Candidature JOIN Offre_Emploi ON Candidature.offre = Offre_Emploi.num JOIN Fiche_Poste ON Fiche_Poste.id_fiche = Offre_Emploi.fiche join Organisation on Fiche_Poste.organisation = Organisation.siren where Candidature.candidat= ?", 1, function(err, results) {
    //         if (err) throw err;
    //         callback(null, results);
    //     });
    // },

    // readPiecesByFiche: function (id, callback) {
    //     // on devrait pouvoir enlever le join et garder que offre_emploi vu ce qu'on utilise
    //     db.query("SELECT Offre_Emploi.indications FROM Fiche_Poste JOIN Offre_Emploi ON Offre_Emploi.fiche = Fiche_Poste.id_fiche where id_fiche = ?", id, function(err, results) {
    //         if (err) throw err;
    //         if (results.length > 0) {
    //             // Obtenez les indications de la première ligne (supposant une seule ligne)
    //             const indications = results[0].indications;
    //             // Séparez les indications en fonction de la virgule
    //             const indicationsArray = indications.split(',').map(indication => indication.trim());
    //             // Passez le tableau d'indications au callback
    //             callback(null, indicationsArray);
    //         } else {
    //             // Si aucun résultat n'est renvoyé, passez un tableau vide au callback
    //             callback(null, []);
    //         }
    //     });
    // },

    // readPieces: function (id, callback) {
    //     db.query("SELECT * FROM Piece_Dossier where candidature = ?", id, function(err, results) {
    //         if (err) throw err;
    //         callback(null, results);
    //     });
    // },

}