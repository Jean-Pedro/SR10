var express = require('express');
var userModel = require('../model/utilisateur')
var adminModel = require('../model/admin')
var recruteurModel = require('../model/recruteur')
var router = express.Router();


router.get('/connexion', function (req, res, next) {
    res.render('login/connexion');
});

router.get('/inscription', function (req, res, next) {
    res.render('login/inscription');
});


module.exports = router;