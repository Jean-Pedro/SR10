var db = require('./db.js');
var user = require('./utilisateur.js')

module.exports = {
    read: async (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * from Candidat WHERE id_candidat = ?", id, (err, results) => {
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
            db.query("SELECT * from Candidat JOIN Utilisateur ON id_candidat=id_utilisateur WHERE email= ?", email, (err, results) => {
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
            const sql = "select * from Candidat JOIN Utilisateur ON id_candidat=id_utilisateur";
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
            db.query("INSERT INTO Candidat VALUES(?);", id, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(id);
                }
            });
        });
    },


    delete : async (id) => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM Candidat WHERE id_candidat = ?";
            db.query(sql, id, (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    },
 
};