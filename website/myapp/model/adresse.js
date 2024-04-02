var db = require('./db.js');
module.exports = {
    read: function (id_lieu, callback) {
        db.query("select * from Adresse where id= ?", id_lieu, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Adresse", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    create: function (num, rue, ville, code_postal, callback) {       
        rows = db.query("INSERT INTO Adresse (id_lieu, num, rue, ville, code_postal) \
            VALUES(NULL, ?, ?, ?, ?);", [num, rue, ville, code_postal], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, "Adresse correctement ajoutée !");
            }
        });
    },

    updateNum: function (id_lieu, new_num, callback) {
        rows = db.query("UPDATE Adresse SET num = ? WHERE id_lieu =?", [new_num, id_lieu], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, true);
            }
        });
    },

    updateRue: function (id_lieu, new_rue, callback) {
        rows = db.query("UPDATE Adresse SET rue = ? WHERE id_lieu = ?", [new_rue, id_lieu], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    updateVille: function (id_lieu, new_ville, callback) {
        rows = db.query("UPDATE Adresse SET ville = ? WHERE id_lieu = ?", [new_ville, id_lieu], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    updateCode_postal: function (id_lieu, new_code_postal, callback) {
        rows = db.query("UPDATE Adresse SET code_postal = ? WHERE id_lieu = ?", [new_code_postal, id_lieu], function (err, results) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    },

    delete: function (id_lieu, callback) {
        db.query("DELETE FROM Adresse WHERE id_lieu = ?", [id_lieu], function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, "Adresse supprimée avec succès");
            } 
        });
    },
}