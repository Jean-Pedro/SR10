var express = require('express');
var router = express.Router();
var userModel = require('../model/utilisateur')
const session = require('../utils/session')


router.get('/', function (req, res, next) {
    if (req.session/loggedin) {
        res.redirect('candidat/candidat_main')
    }

});


router.get('/login', function (req, res, next) {
    const session = req.session;
    if (session.userid) {
        res.redirect("/candidat/candidat_main")
    }
    else {
        res.render('auth/login')
    }
});


router.post('/login', async function(req, res, next) {
    var email = req.body.email
    var password = req.body.password
    if (email == null || email == "") {
        req.session.msg = "Email Invalide";
        return res.redirect('/login');
    } else if (password == null || password == "") {
        req.session.msg = "Mot de passe Invalide";
        return res.redirect('auth');
    }
    const result = await userModel.arevalid(email, password);
    if (result == true) {
        const user = await userModel.read(email)
        const type = userModel.checkType(email)
        session.createSession(req.session, email, type, user);
        res.redirect("/candidat/candidat_main")
        // req.session.loggedin = true;
        // req.session.username = email;
        // req.session.type_user = type;
    } else {
        return res.redirect('/auth/login')
    }
})


router.post('/inscription', async function (req, res, next) {
    const user_nom = req.body.nom
    const user_prenom = req.body.prenom 
    const user_num = req.body.tel 
    const user_email = req.body.email 
    const user_password = req.body.password
    
    await userModel.create(user_email, user_nom, user_prenom, user_num, user_password)
    res.render('candidat/candidat_main')
})




router.get('/inscription', function (req, res, next) {
    res.render('auth/inscription');
});

module.exports = router;