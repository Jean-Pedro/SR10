var db = require('./db.js');
module.exports = {
    readall: async () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Statut_Poste"
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    create: async (statut) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(*) AS count FROM Statut_Poste WHERE statut = ?", statut, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (result[0].count > 0){
                    return resolve(0);
                }
                else {
                    db.query("INSERT INTO Statut_Poste (statut) VALUES (?);", statut, (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(1);
                        }
                    })
                }
            })
        });
    },

    delete: async (statut) => {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM Statut_Poste WHERE statut = ?", [statut], (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(1);
                }
            })
        })
    }
}