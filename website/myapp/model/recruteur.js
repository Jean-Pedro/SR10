var db = require('./db.js');
var user = require('./utilisateur.js')

module.exports = {
    read: async (email) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * from Recruteur JOIN Utilisateur ON id_recruteur=id_utilisateur WHERE email= ?", email, (err, results) => {
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
            const sql = "select * from Recruteur JOIN Utilisateur ON id_recruteur=id_utilisateur";
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    readByStatut: async (statut) => {
        return new Promise((resolve, reject) => {
            const sql = "select * from Recruteur join Utilisateur ON Recruteur.id_recruteur = Utilisateur.id_utilisateur where etat_demande = ?";
            db.query(sql, statut, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    // read: function (email, callback) {
    //     db.query("SELECT * from Recruteur JOIN Utilisateur ON id_recruteur=id_utilisateur WHERE email= ?",email, function (err, results) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },

    // readall: function (callback) {
    //     db.query("select * from Recruteur JOIN Utilisateur ON id_recruteur=id_utilisateur", function (err, results) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },


    // readByStatut: function (statut, callback) {
    //     db.query("select * from Recruteur join Utilisateur ON Recruteur.id_recruteur = Utilisateur.id_utilisateur where etat_demande = ?", statut, function(err, results) {
    //         if (err) {
    //             callback(err);
    //         } else {
    //             callback(null, results);
    //         }
    //     })
    // },

    create: async (email, nom, prenom, num_tel, password, organisation) => {
        return new Promise((resolve, reject) => {
            user.create(email, nom, prenom, num_tel, password, (err, id) => {
                if(err) {
                    return reject(err);
                } else {
                    console.log("ID : " + id)
                    const etat = "en attente";
                    const sql = "INSERT INTO Recruteur VALUES (?, ?, ?);"
                    db.query(sql, [id, organisation, etat], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                })
                }
                
            })
        });
    },

    createRecr: async (id, organisation) => {
        return new Promise((resolve, reject) => {
            const etat = "en attente";
            const sql = "INSERT INTO Recruteur VALUES (?, ?, ?);"
            db.query(sql, [id, organisation, etat], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    delete: function (email, callback) {
        db.query("UPDATE Utilisateur SET statut = 0 WHERE email = ?", [email], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, "Utilisateur supprimé");
            } 
        });
    },

    fired: async (id) => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM Recruteur WHERE id_recruteur = ?;";
            db.query(sql, id, (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    }
};