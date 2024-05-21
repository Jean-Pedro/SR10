var db = require('./db.js');
module.exports = {
    read: async (id_lieu) => {
        return new Promise((resolve, reject) => {
            const sql = "select * from Adresse where id_lieu= ?";
            db.query(sql, id_lieu, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            })
        })
    },

    readall: async () => {
        return new Promise((resolve, reject) => {
            const sql = "select * from Adresse"
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },


    create: async (num, rue, ville, code_postal) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(*) AS count, id_lieu FROM Adresse WHERE num = ? and rue = ? and ville = ? and code_postal = ?", [num, rue, ville, code_postal], (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (result[0].count > 0){
                    return resolve(result[0].id_lieu);
                }
                else {
                    db.query("INSERT INTO Adresse (id_lieu, num, rue, ville, code_postal) \
                    VALUES(NULL, ?, ?, ?, ?);", [num, rue, ville, code_postal], (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            const id = results.insertId;
                            resolve(id);
                        }
                    })
                }
            })
        });
    },

    delete : async (id_lieu) => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM Adresse WHERE id_lieu = ?";
            db.query(sql, id_lieu, (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    // read: function (id_lieu, callback) {
    //     db.query("select * from Adresse where id= ?", id_lieu, function(err, results) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },

    // readall: function (callback) {
    //     db.query("select * from Adresse", function (err, results) {
    //         if (err) throw err;
    //         callback(results);
    //     });
    // },

    // create: function (num, rue, ville, code_postal, callback) {       
    //     rows = db.query("INSERT INTO Adresse (id_lieu, num, rue, ville, code_postal) \
    //         VALUES(NULL, ?, ?, ?, ?);", [num, rue, ville, code_postal], function (err, results) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, "Adresse correctement ajoutée !");
    //         }
    //     });
    // },

    updateNum : async (id_lieu, new_num) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Adresse SET num = ? WHERE id_lieu =?";
            db.query(sql, [new_num, id_lieu], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    updateRue : async (id_lieu, new_rue) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Adresse SET rue = ? WHERE id_lieu =?";
            db.query(sql, [new_rue, id_lieu], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    updateVille : async (id_lieu, new_ville) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Adresse SET ville = ? WHERE id_lieu =?";
            db.query(sql, [new_ville, id_lieu], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },
    
    updateCodePostal : async (id_lieu, new_code_postal) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Adresse SET code_postal = ? WHERE id_lieu =?";
            db.query(sql, [new_code_postal, id_lieu], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },
    

    


    // updateNum: function (id_lieu, new_num, callback) {
    //     rows = db.query("UPDATE Adresse SET num = ? WHERE id_lieu =?", [new_num, id_lieu], function (err, results) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // updateVille: function (id_lieu, new_ville, callback) {
    //     rows = db.query("UPDATE Adresse SET ville = ? WHERE id_lieu = ?", [new_ville, id_lieu], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // updateRue: function (id_lieu, new_rue, callback) {
    //     rows = db.query("UPDATE Adresse SET rue = ? WHERE id_lieu = ?", [new_rue, id_lieu], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // updateCode_postal: function (id_lieu, new_code_postal, callback) {
    //     rows = db.query("UPDATE Adresse SET code_postal = ? WHERE id_lieu = ?", [new_code_postal, id_lieu], function (err, results) {
    //         if (err) {
    //             callback(err, false);
    //         } else {
    //             callback(null, true);
    //         }
    //     });
    // },

    // delete: function (id_lieu, callback) {
    //     db.query("DELETE FROM Adresse WHERE id_lieu = ?", [id_lieu], function (err, results) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, "Adresse supprimée avec succès");
    //         } 
    //     });
    // },
}