var db = require('./db.js');
module.exports = {
    readall: async () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Type_Metier"
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    create: async (type) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(*) AS count FROM Type_Metier WHERE type = ?", type, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (result[0].count > 0){
                    return resolve(0);
                }
                else {
                    db.query("INSERT INTO Type_Metier (type) VALUES (?);", type, (err, results) => {
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

    delete: async (type) => {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM Type_Metier WHERE type = ?", [type], (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(1);
                }
            })
        })
    }
}