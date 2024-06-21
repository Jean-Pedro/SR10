var db = require('./db.js');
var user = require('./utilisateur.js')

module.exports = {
    read: async (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * from Administrateur WHERE id_administrateur = ?", id, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },


    readByEmail: async (email) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * from Administrateur JOIN Utilisateur ON id_administrateur=id_utilisateur WHERE email= ?", email, (err, results) => {
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
            const sql = "select * from Administrateur JOIN Utilisateur ON id_administrateur=id_utilisateur";
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    
    create: async (id) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO Administrateur VALUES (?);"
            db.query(sql, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(id);
                }
            });
        });
    },

    delete: async (id) => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM Administrateur WHERE id_administrateur = ?;";
            db.query(sql, id, (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    },
};