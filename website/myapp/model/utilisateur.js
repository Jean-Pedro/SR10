const bcrypt = require('bcrypt')
var db = require('./db.js');

module.exports = {
    read: async (email) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM Utilisateur WHERE email = ?", email, (err, results) => {
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
            const sql = "SELECT * FROM Utilisateur"
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    

    arevalid: async (email, password) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT password FROM Utilisateur WHERE email = ?";
            db.query(sql, email, (err, results) => {
                if (err) {
                    reject(err);
                } 
                if (rows.length == 1 && rows[0] === this.generateHash(password))
                    {
                        resolve(true);
                    }
                else {
                    resolve(false);
                }
            });
        });
    },

    generateHash: function (plaintextPassword, callback) {
        bcrypt.hash(plaintextPassword, 10, function (err, hash) {
            // call the function that Store hash in the database
            callback(hash);
        });
    },

    

    create: async (email, nom, prenom, num_tel, password) => {
        return new Promise((resolve, reject) => {
            var ladate = new Date();
            var date_creation = ladate.getFullYear() + "-" + (ladate.getMonth() + 1) + "-" + ladate.getDate();
            
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return reject(err);
                }
    
                db.query("INSERT INTO Utilisateur (id_utilisateur, email, nom, prenom, num_tel, date_creation, last_login, statut, password) \
                VALUES(NULL, ?, ?, ?, ?, ?, ?, 1, ?);", [email, nom, prenom, num_tel, date_creation, date_creation, hash], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        var id = results.insertId;
                        resolve(id);
                    }
                });
            });
        });
    },

    

    updateNom : async (email, new_nom) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Utilisateur SET nom = ? WHERE email =?";
            db.query(sql, [new_nom, email], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    updatePrenom : async (email, new_prenom) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Utilisateur SET prenom = ? WHERE email =?";
            db.query(sql, [new_prenom, email], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    updateTel : async (email, new_tel) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Utilisateur SET num_tel = ? WHERE email =?";
            db.query(sql, [new_tel, email], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    delete : async (email) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Utilisateur SET statut = 0 WHERE email = ?";
            db.query(sql, email, (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },


    fullDelete : async (email) => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM Utilisateur WHERE email = ?";
            db.query(sql, email, (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    getbyID: async (id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Utilisateur WHERE id_utilisateur= ?"
            db.query(sql, id, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    getInfos: async (email) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT nom, prenom, num_tel FROM Utilisateur WHERE email = ?"
            db.query(sql, email, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    // readall: function (callback) {
    //     db.query("select * from Utilisateur", function (err, results) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },


    // areValid: function (email, password, callback) {
    //     sql = "SELECT password FROM Utilisateur WHERE email = ?";
    //     rows = db.query(sql, email, function (err, results) {
    //         if (err) throw err;
    //         if (rows.length == 1 && rows[0].pwd === password) {
    //             callback(true)
    //         } else {
    //             callback(false);
    //         }
    //     });
    // },  

    // create: function (email, nom, prenom, num_tel, password, callback) {
    //     var ladate = new Date();
    //     var date_creation = ladate.getFullYear() + "-" + (ladate.getMonth() + 1) + "-" + ladate.getDate();        
    //     this.generateHash(password, function (hash) {
    //         rows = db.query("INSERT INTO Utilisateur (id_utilisateur, email, nom, prenom, num_tel, date_creation, last_login, statut, password) \
    //         VALUES(NULL, ?, ?, ?, ?, ?, ?, 1, ?);", [email, nom, prenom, num_tel, date_creation, date_creation, hash], function (err, results) {
    //             if (err) {
    //                 callback(err, false);
    //             } else {
    //                 var id = results.insertId;
    //                 callback(err, id);
    //             }
    //         });
    //     });
    // },

    // updateNom: function (email, new_nom, callback) {
    //     rows = db.query("UPDATE Utilisateur SET nom = ? WHERE email =?", [new_nom, email], function (err, results) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // updatePrenom: function (email, new_prenom, callback) {
    //     rows = db.query("UPDATE Utilisateur SET prenom = ? WHERE email = ?", [new_prenom, email], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // updateTel: function (email, new_tel, callback) {
    //     rows = db.query("UPDATE Utilisateur SET num_tel = ? WHERE email = ?", [new_tel, email], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },
    

    // getbyID: function (id, callback) {
    //     db.query("SELECT * FROM Utilisateur WHERE id_utilisateur= ?", id, function(err, result) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },

    
    // getInfos: function (email, callback) {
    //     db.query("SELECT nom, prenom, num_tel FROM Utilisateur WHERE email = ?", email, function (err, results) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, results);
    //         }
    //     });
    // },

    // latitude longitude

    

    // delete: function (email, callback) {
    //     db.query("UPDATE Utilisateur SET statut = 0 WHERE email = ?", [email], function (err, results) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, "Utilisateur supprimé");
    //         } 
    //     });
    // },


    TEST_MAIL: function (email_a_tester, callback) {
        // Vérification de l'adresse e-mail 
        // Format :
        //  - 1 ou plusieurs caractères alphanumériques ou caractères spéciaux . _ - +
        //  - @
        //  - 1 ou plusieurs caractères alphanumériques ou caractères spéciaux . _ - +
        //  - .
        //  - 2 ou 3 caractères alphanumériques

        var correct_email_test = /^([a-zA-Z0-9_\.\-+]+)@([a-zA-Z0-9_\.\-+]+)\.([a-zA-Z]{2,3})$/;
        callback(correct_email_test.test(email_a_tester));
    },


    TEST_MDP: function (mdp1, callback) {
        // 12 caractères minimum dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial parmis : &~"#'{}[]()-|`_\^@=/*-+.,?;:!<>€$£*
        var correct_password_test = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&~"#'{}[\]\(\)-|`_\^@=/*-+.,?;:!<>€$£*]).{12,}$/;
        callback(correct_password_test.test(mdp1));
    },

    TEST_TEL: function (num_tel, callback) {
        // Vérification du numéro de téléphone 
        // Format : 
        // - Commence par un + (optionnel) suivi de 1 à 3 chiffres (indicatif pays)
        // - 0 ou 1 espace (optionnel)
        // - 9 chiffres
        var correct_tel_test = /(0|\+33)[1-9]( *[0-9]{2}){4}/;
        callback(correct_tel_test.test(num_tel));
    },


}