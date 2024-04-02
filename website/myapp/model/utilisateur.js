
var db = require('./db.js');
module.exports = {
    read: function (email, callback) {

        db.query("select * from Utilisateur where email= ?",email, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Utilisateur", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    areValid: function (email, password, callback) {
        sql = "SELECT password FROM Utilisateur WHERE email = ?";
        rows = db.query(sql, email, function (err, results) {
            if (err) throw err;
            if (rows.length == 1 && rows[0].pwd === password) {
                callback(true)
            } else {
                callback(false);
            }
        });
    },  

    generateHash: function (plaintextPassword, callback) {
        bcrypt.hash(plaintextPassword, 10, function (err, hash) {
            // call the function that Store hash in the database
            callback(hash);
        });
    },

    create: function (email, nom, prenom, num_tel, password, callback) {
        console.log("mabite");
        var ladate = new Date();
        var date_creation = ladate.getFullYear() + "-" + (ladate.getMonth() + 1) + "-" + ladate.getDate();        
        this.generateHash(password, function (hash) {
            rows = db.query("INSERT INTO Utilisateur (id_utilisateur, email, nom, prenom, num_tel, date_creation, last_login, statut, password) \
            VALUES(NULL, ?, ?, ?, ?, ?, ?, 1, ?);", [email, nom, prenom, num_tel, date_creation, date_creation, hash], function (err, results) {
                console.log(results);
                if (err) {
                    callback(err, false);
                } else {
                    var id = results.insertId;
                    callback(err, id);
                }
            });
        });
    },


    getbyID: function (id, callback) {
        db.query("SELECT * FROM Utilisateur WHERE id_utilisateur= ?", id, function(err, result) {
            if (err) throw err;
            callback(results);
        });
    },

    getInfos: function (email, callback) {
        db.query("SELECT nom, prenom, num_tel FROM Utilisateur WHERE email = ?", email, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    // latitude longitude

    updateNom: function (email, new_nom, callback) {
        rows = db.query("UPDATE Utilisateur SET nom = ? WHERE email =?", [new_nom, email], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(err, true);
            }
        });
    },

    updatePrenom: function (email, new_prenom, callback) {
        rows = db.query("UPDATE Utilisateur SET prenom = ? WHERE email = ?", [new_prenom, email], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(err, true);
            }
        });
    },

    delete: function (email, callback) {
        db.query("DELETE FROM Utilisateur WHERE email = ?", [email], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, "Utilisateur supprimé avec succès");
            } 
        });
    },


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