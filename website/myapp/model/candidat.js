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

    // create: function (email, nom, prenom, num_tel, password, callback) {
    //     user.create(email, nom, prenom, num_tel, password, function(err, id) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             console.log("ID : " + id);
    //         }
    //         rows = db.query("INSERT INTO Candidat VALUES (?);", id, function (err, results) {
    //             if (err) {
    //                 callback(err, null);
    //             } else {
    //                 callback(null, results);
    //             }
    //         });
    //     });
    // },

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

    // delete: function (email, callback) {
    //     db.query("UPDATE Utilisateur SET statut = 0 WHERE email = ?", [email], function (err, results) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, "Utilisateur supprimé");
    //         } 
    //     });
    // },

    // read: function (email, callback) {
    //     db.query("SELECT * from Candidat JOIN Utilisateur ON id_candidat=id_utilisateur WHERE email= ?",email, function (err, results) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },

    // readall: function (callback) {
    //     db.query("select * from Candidat JOIN Utilisateur ON id_candidat=id_utilisateur", function (err, results) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },


    /*delete: function (email, callback) {
        user.read(email, function (err, results) {
            if (err) throw err;
            callback(results);
            var id = results[0].id_candidat;
            db.query("DELETE FROM Candidat WHERE id_candidat = ?", [id], function (err, results) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, "Utilisateur supprimé des candidats");
                } 
            });
            user.delete(email, function (err, results) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, "Utilisateur supprimé avec succès");
                } 
            });
        });
    },*/

    // areValid: function (email, password, callback) {
    //     sql = "SELECT password FROM Candidat JOIN Utilisateur ON id_candidat=id_utilisateur WHERE email = ?";
    //     rows = db.query(sql, email, function (err, results) {
    //         if (err) throw err;
    //         if (rows.length == 1 && rows[0].pwd === password) {
    //             callback(true)
    //         } else {
    //             callback(false);
    //         }
    //     });
    // },  
};