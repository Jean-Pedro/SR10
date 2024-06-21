var express = require('express');
var userModel = require('../model/utilisateur')
const candidatModel = require('../model/candidat')
var adminModel = require('../model/admin')
var recruteurModel = require('../model/recruteur')
var organisationModel = require('../model/organisation')
const piecesModel = require('../model/piece_dossier')
const candidatureModel = require('../model/candidature')
const adresseModel = require('../model/adresse')
var router = express.Router();
const mail = require('../utils/mailer');


router.get('/', async function (req, res, next) {
    res.redirect('/auth/login')
    });

router.get('/admin_visu_acc', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        const result = await userModel.readall();
        res.render('admin/admin_visu_acc', { title: 'List des utilisateurs', users: result });
    } else {
        res.redirect("/auth/login");
    }

});


router.get('/admin_main', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        res.render('admin/admin_main');
    }else {
      res.redirect("/auth/login");
    }
});



router.get('/confirmation_passage_admin/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        const id = req.params.id;
        const role = await userModel.checkRole(id)
        console.log(role.role)
        if(role.role === "recruteur"){
            await recruteurModel.fired(id);
        }
        const candidature = await candidatureModel.readByIdCandidat(id)
        for(let ele in candidature){
            const pieces = await candidatureModel.readPieces(candidature[ele].id_c)
            for(let ele2 in pieces){
                await piecesModel.delete(pieces[ele2].id_piece);
            }
            await candidatureModel.delete(candidature[ele].id_c)
        }
        await candidatModel.delete(id);
        await userModel.updateAdministrateur(id);
        await adminModel.create(id)
        const user = await userModel.readByID(id)
        const admin = await userModel.readByID(session.user)
        await mail.sendAccountUpgradeAdmin(user.email, user.prenom, user.nom, admin.prenom, admin.nom)
        res.render('user/redirect');
    } else {
        res.redirect("/auth/login");
    }
});




router.get('/admin_enr_orga', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        const result = await organisationModel.readall();
        res.render('admin/admin_enr_orga', { title: 'Admin - Validation Organisation', orgas: result});
    } else {
        res.redirect("/auth/login");
    }

});

router.get('/valide_orga/:siren', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        const siren = req.params.siren;
        const result = await organisationModel.read(siren);
        const adresse = await adresseModel.read(result.siege_social)
        const recruteurs = await recruteurModel.readByOrga(siren)
        res.render('admin/admin_valide_orga', {orga: result, adresse: adresse, recruteurs});
    } else {
        res.redirect("/auth/login");
    }

});

router.get('/user_recr_details/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        var id = req.params.id;
        const result = await userModel.readByID(id);
        let orga = await recruteurModel.readByID(id);
        orga = orga.organisation;
        res.render('admin/user_recr_details', {user: result, orga: orga})
    } else {
        res.redirect("/auth/login");
    }

});

router.get('/user_details/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        var id = req.params.id;
        const result = await userModel.readByID(id);
        res.render('admin/user_details', {title: 'Admin - Visu Account', user: result})
    } else {
        res.redirect("/auth/login");
    }

});


router.get('/admin_enr_recr', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        const result = await recruteurModel.readDemRecrOrgaT();
        res.render('admin/admin_enr_recr', {users: result});
    } else {
        res.redirect("/auth/login");
    }

});


router.get('/passage_recr/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        const id = req.params.id
        await recruteurModel.validationDemande(id);
        await userModel.updateRecruteur(id);
        const user = await userModel.readByID(id)
        const recr = await recruteurModel.readByID(id);
        await mail.sendAccountJoinedOrga(user.email, user.prenom, user.nom, recr.organisation);
        res.render('user/redirect');
    } else {
        res.redirect("/auth/login");
    }
});

router.get('/refus_recr/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        const id = req.params.id
        await recruteurModel.refusDemande(id);
        res.render('user/redirect');
    } else {
        res.redirect("/auth/login");
    }
});

router.get('/validation_orga/:siren', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        const siren = req.params.siren;
        await organisationModel.updateEtatDemande(siren, 'acceptée');
        const recruteurs = await recruteurModel.readByOrga(siren);
        for(let ele in recruteurs){
            const recruteur = recruteurs[ele].id_recruteur;
            await recruteurModel.validationDemande(recruteur);
            await userModel.updateRecruteur(recruteur);
            const mail_recr = await userModel.readByID(recruteur)
            console.log(mail_recr.email, mail_recr.prenom, mail_recr.nom, siren)
            await mail.sendAccountCreateOrga(mail_recr.email, mail_recr.prenom, mail_recr.nom, siren)
        }
        res.render('user/redirect');
    } else {
        res.redirect("/auth/login");
    }
});

router.get('/refus_orga/:siren', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        const siren = req.params.siren;
        await organisationModel.updateEtatDemande(siren, 'refusée');
        res.render('user/redirect');
    } else {
        res.redirect("/auth/login");
    }
});


module.exports = router;