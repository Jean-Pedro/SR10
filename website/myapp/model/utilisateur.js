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

    readByID: async (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM Utilisateur WHERE id_utilisateur = ?", id, (err, results) => {
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


    checkRole: async (id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT role FROM Utilisateur where id_utilisateur = ?"
            db.query(sql, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
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
                if (results.length == 1) {
                    bcrypt.compare(password, results[0]["password"], (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        else if (result){
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    });
                } else {
                    resolve(false);
                }
                
            });
        });
    },

    isActive: async (email) => {
        return new Promise((resolve, reject) => {
            const sql = "select * from Utilisateur where email = ? and statut = 1";
            db.query(sql, email, (err, result) => {
                if(err){
                    return reject(err)
                }
                if(result.length === 0){
                    resolve(false)
                } else{
                    resolve(true)
                }
            })
        })
    },


    checkType: async (email) => {
        return new Promise((resolve, reject) => {
            db.query("select id_utilisateur from Utilisateur where email = ?;", email, (err, id) => {
                if(err) {
                    return reject(err);
                }
                const id_user = id[0]["id_utilisateur"]
                db.query("select * from Administrateur where id_administrateur = ?", id_user, (err, resAdmin) => {
                    if(err) {
                        reject(err);
                    }
                    if(resAdmin[0]) {
                        resolve("admin")
                    }
                    db.query("select * from Recruteur where id_recruteur = ? and etat_demande = 'acceptée';", id_user, (err, resRecr) => {
                        if(err) {
                            reject(err);
                        }
                        if(resRecr[0]) {
                            resolve("recruteur")
                        }
                        db.query("select * from Candidat where id_candidat = ?", id_user, (err, resCandidat) => {
                            if(err) {
                                reject(err);
                            }
                            if(resCandidat[0]) {
                                resolve("candidat")
                            }
                            
                        })
                        
                    })
                })
            })
        })
    },   

    create: async (email, nom, prenom, num_tel, password) => {
        return new Promise((resolve, reject) => {
            var ladate = new Date();
            var date_creation = ladate.getFullYear() + "-" + (ladate.getMonth() + 1) + "-" + ladate.getDate();
            
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return reject(err);
                }
    
                db.query("INSERT INTO Utilisateur (id_utilisateur, email, nom, prenom, num_tel, date_creation, last_login, statut, password, role) \
                VALUES(NULL, ?, ?, ?, ?, ?, ?, 1, ?, 'candidat');", [email, nom, prenom, num_tel, date_creation, date_creation, hash], (err, results) => {
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

    updateMail : async (email, new_mail) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Utilisateur SET email = ? WHERE email =?";
            db.query(sql, [new_mail, email], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    updatePassword : async (email, new_password) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(new_password, 10, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                const sql = "UPDATE Utilisateur SET password = ? WHERE email =?";
                db.query(sql, [hash, email], (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                })
            });
        })
    },

    updateCandidat : async (id) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Utilisateur SET role = 'candidat' WHERE id_utilisateur =?";
            db.query(sql, [id], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    updateRecruteur : async (id) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Utilisateur SET role = 'recruteur' WHERE id_utilisateur =?";
            db.query(sql, [id], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    updateAdministrateur : async (id) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Utilisateur SET role = 'admin' WHERE id_utilisateur =?";
            db.query(sql, [id], (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    updateLastLogin : async (id) => {
        return new Promise((resolve, reject) => {
            const now = new Date();
            const sql = "UPDATE Utilisateur SET last_login = ? WHERE id_utilisateur =?";
            db.query(sql, [now, id], (err, result) => {
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
}