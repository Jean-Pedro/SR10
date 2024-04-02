const candidat = require('./candidat.js');

candidat.create("johnny@gmail.com", "Johnny", "John", "08-84-38-39-39", "JohnnyJeTAime", function(err, results) {
    if (err) {
        console.error("Erreur :", err);
    } else {
        console.log("Résultat :", results);
    }
});
