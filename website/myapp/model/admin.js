var db = require('./db.js');
module.exports = {
    readall: function (callback) {
        db.query("select * from Utilisateur where id_administrateur == id_utilisateur", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },


}