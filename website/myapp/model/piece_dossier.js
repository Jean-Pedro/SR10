var db = require('./db.js');
var cand = require('./candidature.js')
module.exports = {
    read: async (id_piece) => {
        return new Promise((resolve, reject) => {
            db.query("select * from Piece_Dossier where id_piece= ?", id_piece, (err, results) => {
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
            const sql = "select * from Piece_Dossier"
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    create: async (type, candidature, fichier) => {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO Piece_Dossier (id_piece, type, candidature, fichier) \
            VALUES(NULL, ?, ?, ?);", [type, candidature, fichier], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    var id = results.insertId;
                    resolve(id);
                }
            });
        });
    },

    delete : async (id_piece) => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM Piece_Dossier WHERE id_piece = ?";
            db.query(sql, id_piece, (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    },

    updateType : async (id_piece, new_type) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Piece_Dossier SET type = ? WHERE id_piece =?";
            db.query(sql, [new_type, id_piece], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    updateFichier : async (id_piece, new_fichier) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Piece_Dossier SET fichier = ? WHERE id_piece = ?";
            db.query(sql, [new_fichier, id_piece], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },
}