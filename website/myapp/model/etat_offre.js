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

    // readall: function (callback) {
    //     db.query("select * from Etat_Offre", function (err, results) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },

    // read: async (etat) => {
    //     return new Promise((resolve, reject) => {
    //         db.query("select * from Etat_Offre where etat= ?", id_fiche, (err, results) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 resolve(results[0]);
    //             }
    //         });
    //     });
    // },

    // create: function (etat, callback) {       
    //     rows = db.query("INSERT INTO Etat_Offre (etat) VALUES (?);", etat, function (err, results) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, "Etat d'offre correctement ajouté !");
    //         }
    //     });
    // },

    // delete: function (etat, callback) {
    //     db.query("DELETE FROM Etat_Offre WHERE etat = ?", [etat], function (err, results) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, "Etat d'offre supprimé avec succès");
    //         } 
    //     });
    // },
}