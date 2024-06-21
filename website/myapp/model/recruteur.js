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

    readByID: async (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * from Recruteur JOIN Utilisateur ON id_recruteur=id_utilisateur WHERE id_recruteur= ?", id, (err, results) => {
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


    readByOrga: async (orga) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * from Recruteur JOIN Utilisateur ON id_recruteur=id_utilisateur WHERE organisation= ?", orga, (err, results) => {
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
            const sql = "select u.id_utilisateur, u.prenom, u.nom, o.nom as orga, o.siren, u.email, u.num_tel from Recruteur as r join Utilisateur as u ON r.id_recruteur = u.id_utilisateur join Organisation as o on r.organisation = o.siren where r.etat_demande = ?";
            db.query(sql, statut, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },


    readDemRecrOrgaT: async () => {
        return new Promise((resolve, reject) => {
            const sql = "select u.id_utilisateur, u.prenom, u.nom, o.nom as orga, o.siren, u.email, u.num_tel from Recruteur as r join Utilisateur as u ON r.id_recruteur = u.id_utilisateur join Organisation as o on r.organisation = o.siren where r.etat_demande = 'en attente' and o.etat_demande = 'acceptée' ";
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
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
                    resolve(id);
                }
            });
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
    },

    validationDemande: async (id) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Recruteur SET etat_demande = 'acceptée' WHERE id_recruteur =?";
            db.query(sql, [id], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    refusDemande: async (id) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Recruteur SET etat_demande = 'refusée' WHERE id_recruteur =?";
            db.query(sql, [id], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    }
};