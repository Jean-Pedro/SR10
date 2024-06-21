var db = require('./db.js');
module.exports = {
    readall: async () => {
        return new Promise((resolve, reject) => {
            const sql = "select * from Etat_Offre";
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
}