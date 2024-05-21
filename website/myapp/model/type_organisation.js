var db = require('./db.js');
module.exports = {
    readall: async () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Type_Organisation"
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    create: async (nom) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(*) AS count, nom FROM Type_Organisation WHERE nom = ?", nom, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (result[0].count > 0){
                    return resolve(result[0].nom);
                }
                else {
                    db.query("INSERT INTO Type_Organisation (nom) VALUES (?);", nom, (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(nom);
                        }
                    })
                }
            })
            });
        },

    delete: async (nom) => {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM Type_Organisation WHERE nom = ?", [nom], (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(1);
                }
            })
        })
    }
}