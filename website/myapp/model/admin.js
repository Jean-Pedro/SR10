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


    /*delete: function (email, callback) {
        user.read(email, function (err, results) {
            if (err) throw err;
            callback(results);
            var id = results[0].id_candidat;
            db.query("DELETE FROM Adminictrateur WHERE id_administrateur = ?", [id], function (err, results) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, "Utilisateur supprimé des adminstrateurs");
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


    // read: function (email, callback) {
    //     db.query("SELECT * from Administrateur JOIN Utilisateur ON id_administrateur=id_utilisateur WHERE email= ?",email, function (err, results) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },

    // readall: function (callback) {
    //     db.query("select * from Administrateur JOIN Utilisateur ON id_administrateur=id_utilisateur", function (err, results) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },

    // create: function (email, nom, prenom, num_tel, password, callback) {
    //     user.create(email, nom, prenom, num_tel, password, function(err, id) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             console.log("ID : " + id);
    //         }
    //         rows = db.query("INSERT INTO Administrateur VALUES (?);", id, function (err, results) {
    //             if (err) {
    //                 callback(err, null);
    //             } else {
    //                 callback(null, results);
    //             }
    //         });
    //     });
    // },
};