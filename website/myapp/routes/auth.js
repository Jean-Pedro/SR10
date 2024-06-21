var express = require('express');
var router = express.Router();
var userModel = require('../model/utilisateur')
var candidatModel = require('../model/candidat')
const session = require('../utils/session');
const path = require('path');
const { sendAccountCreatedEmail } = require('../utils/mailer');
const axios = require('axios')
const SECRET_KEY = "6LdVUPopAAAAACbzAtrZsbbR1QrjrETmCPpUuwr3"
const rateLimit = require('express-rate-limit')

const loginLimit = rateLimit({
    windowMs: 15*60*1000,
    max: 5,
    delayMs: 0,
    handler: (req, res, next) => {
        res.status(429).send("Trop de tentatives de connexion. Veuillez réessayer après 15 minutes.")
    }
});


router.get('/', function (req, res, next) {
    if (req.session.usermail) {
        if(req.session.type_user === "candidat" || req.session.type_user === "recruteur") {
            res.redirect("/users/main");
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
        if(session.type_user === "candidat" || session.type_user === "recruteur") {
            res.redirect("/users/main");
        } else {
            res.redirect('/admin/admin_main');
        }
    } else {
        const error_mail = session.error_mail || '';
        const error_password = session.error_password || '';
        const error_login = session.error_login || '';
        const error_not_active = session.error_not_active || '';
        const captcha = session.captcha || '';
        session.error_mail = null;
        session.error_password = null;
        session.error_login = null;
        session.error_not_active = null;
        session.captcha = null;
        res.render('auth/login', { error_mail, error_password, error_login, error_not_active, captcha });
    }
});


router.post('/login', loginLimit, async function(req, res, next) {
// router.post('/login', async function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    const token = req.body['g-recaptcha-response'];
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`;

    const isTestEnv = typeof global.it === 'function' && req.body.test === 'bv-dskjbgùvludsgh!vkuhsdkv$hdkxbgvk52425xv*cxkbvdvd5vd58vfd587b578b';
    if (isTestEnv) {
        if (email == null || email == "") {
            req.session.error_mail = "Email invalide.";
            return res.redirect('login');
        } else if (password == null || password == "") {
            req.session.error_password = "Mot de passe invalide.";
            return res.redirect('login');
        }
    
        const result = await userModel.arevalid(email, password);
        if (result == true) {
            const valid = await userModel.isActive(email);
            if(valid){
                const user = await userModel.read(email);
                const type = await userModel.checkRole(user.id_utilisateur);
                session.createSession(req.session, email, type.role.toLowerCase(), user.id_utilisateur);
                console.log(req.session)
                await userModel.updateLastLogin(req.session.user);
                return res.redirect("/auth");
            } else{
                req.session.error_not_active = "Votre compte a été désactivé ! Veuillez contacter un administrateur."
                return res.redirect('login');
            }
            
        } else {
            req.session.error_login = "Email ou mot de passe incorrect.";
            return res.redirect('login');
        }
    } else{
        try{
            const reponse = await axios.post(verificationURL);
            if(reponse.data.success){
                if (email == null || email == "") {
                    req.session.error_mail = "Email invalide.";
                    return res.redirect('login');
                } else if (password == null || password == "") {
                    req.session.error_password = "Mot de passe invalide.";
                    return res.redirect('login');
                }
            
                const result = await userModel.arevalid(email, password);
                if (result == true) {
                    const valid = await userModel.isActive(email);
                    if(valid){
                        const user = await userModel.read(email);
                        const type = await userModel.checkRole(user.id_utilisateur);
                        session.createSession(req.session, email, type.role.toLowerCase(), user.id_utilisateur);
                        await userModel.updateLastLogin(req.session.user);
                        res.redirect("/auth");
                    } else{
                        req.session.error_not_active = "Votre compte a été désactivé ! Veuillez contacter un administrateur."
                        return res.redirect('login');
                    }
                    
                } else {
                    req.session.error_login = "Email ou mot de passe incorrect.";
                    return res.redirect('login');
                }
            } else{
                req.session.captcha = "CAPTCHA non valide";
                return res.redirect('login');
            }
        } catch(error){
            res.send("Erreur de vérification CAPTCHA. Veuillez réessayer.")
        }
    }
});


router.post('/inscription', async function (req, res, next) {
    const user = await userModel.read(req.body.email);
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
        await sendAccountCreatedEmail(req.body.email, req.body.prenom, req.body.nom); // Envoyer l'email
        res.redirect("/auth/login")
    }
});


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