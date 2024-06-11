var express = require('express');
var router = express.Router();
var userModel = require('../model/utilisateur')
var candidatModel = require('../model/candidat')
var recrModel = require('../model/recruteur');
const session = require('../utils/session');
const {body, validationResult} = require('express-validator');


router.get('/', function (req, res, next) {
    if (req.session.usermail) {
        if(req.session.type_user === "candidat") {
            res.redirect('candidat/candidat_main')
        } else if (req.session.type_user === "recruteur") {
            res.redirect('recruteur/recruteur_main')
        } else {
            res.redirect('admin/admin_main')
        }
    } else{
        res.redirect('/auth/login')
    }

});


router.get('/login', function(req, res, next) {
    const session = req.session;
    if (session.usermail) {
        if(session.type_user === "candidat") {
            res.redirect("/candidat/candidat_main");
        } else if(session.type_user === "recruteur") {
            res.redirect('/recruteur/recruteur_main');
        } else {
            res.redirect('/admin/admin_main');
        }
    } else {
        const error_mail = session.error_mail || '';
        const error_password = session.error_password || '';
        const error_login = session.error_login || '';
        session.error_mail = null;
        session.error_password = null;
        session.error_login = null;
        res.render('auth/login', { error_mail, error_password, error_login });
    }
});


router.post('/login', async function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    if (email == null || email == "") {
        req.session.error_mail = "Email invalide.";
        return res.redirect('login');
    } else if (password == null || password == "") {
        req.session.error_password = "Mot de passe invalide.";
        return res.redirect('login');
    }

    const result = await userModel.arevalid(email, password);
    if (result == true) {
        const user = await userModel.read(email);
        const type = await userModel.checkType(email);
        session.createSession(req.session, email, type, user.id_utilisateur);
        await userModel.updateLastLogin(req.session.user);
        res.redirect("/auth");
    } else {
        req.session.error_login = "Email ou mot de passe incorrect.";
        return res.redirect('login');
    }
});


const registerValidate = [
    // Validate first name
    body('prenom')
        .isAlpha().withMessage('Le prénom ne doit contenir que des lettres')
        .notEmpty().withMessage('Le prénom est requis'),

    // Validate last name
    body('nom')
        .isAlpha().withMessage('Le nom ne doit contenir que des lettres')
        .notEmpty().withMessage('Le nom est requis'),

    // Validate email
    body('email')
        .isEmail().withMessage('L\'email doit être valide')
        .notEmpty().withMessage('L\'email est requis'),

    // Validate telephone
    body('tel')
        .notEmpty().withMessage('Le numéro de téléphone est requis')
        .matches(/^\d{2}-\d{2}-\d{2}-\d{2}-\d{2}$/).withMessage('Le numéro de téléphone doit contenir exactement 10 chiffres'),

    // Validate password
    body('password')
        .isLength({min: 12})
        .withMessage('Le mot de passe doit contenir au moins 12 caractères')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{12,}$/)
        .withMessage('Le mot de passe doit contenir des majuscules, des minuscules, des chiffres et des caractères spéciaux et de taille >= 12'),

    // Validate confirmed password
    body('password2')
        .custom((value, {req}) => value === req.body.password2)
        .withMessage('Les mots de passe ne correspondent pas'),

];

router.post('/inscription', registerValidate, async function (req, res, next) {
    // const errors = validationResult(req)
    // console.log(errors)
    // if (!errors.isEmpty()) {
    //     return res.render('auth/inscription', {
    //         title: 'Inscription',
    //         error: "Veuillez corriger les erreurs suivantes:",
    //         errors: errors.array().reduce((obj, err) => {
    //             obj[err.path] = err;
    //             return obj;
    //         }, {}),
    //         prenom: req.body.prenom,
    //         nom: req.body.nom,
    //         email: req.body.email,
    //         tel: req.body.tel,
    //         password: req.body.password,
    //         password2: req.body.password2
    //     });
    // } else {
        const user = await userModel.read(req.body.email);
        console.log(user)
        if(!user) {
            const id = await userModel.create(
                req.body.email,
                req.body.nom,
                req.body.prenom,
                req.body.tel,
                req.body.password
            );
            const cand = await candidatModel.create(id)
            await userModel.updateCandidat(req.body.email)
            res.redirect("/auth/login")
        }
    // }

})

// router.post('/inscription', async function (req, res, next) {
//     const user_nom = req.body.nom
//     const user_prenom = req.body.prenom 
//     const user_num = req.body.tel 
//     const user_email = req.body.email 
//     const user_password = req.body.password
    
//     await userModel.create(user_email, user_nom, user_prenom, user_num, user_password)
//     res.render('candidat/candidat_main')
// })


router.get('/logout', (req, res) => {
    session.deleteSession(req.session);
    res.redirect('/auth/login');
});


router.get('/inscription', async function (req, res, next) {
    if (req.session.usermail) {
        if(req.session.type_user === "candidat") {
            res.redirect('/candidat/candidat_main')
        } else if (req.session.type_user === "recruteur") {
            res.redirect('/recruteur/recruteur_main')
        } else {
            res.redirect('/admin/admin_main')
        }
    } else{
        res.render('auth/inscription');
    }
});

module.exports = router;