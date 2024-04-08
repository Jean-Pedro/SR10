var express = require('express');
var userModel = require('../model/utilisateur')
var adminModel = require('../model/admin')
var router = express.Router();


router.get('/account', function (req, res, next) {
    //if (req.session.user_type !== 'administrateur') {
    //    return res.redirect('/');
    //}
 console.log( req.session.successMessage );
        userModel.getByStatusAndType("inactif", "candidat", function (error, result) {
            res.render('AdminHomePageNewM', { title: 'Homepage - admin', users: result});
        });
        delete req.session.successMessage;

    }
);

module.exports = router;