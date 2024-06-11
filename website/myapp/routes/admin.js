var express = require('express');
var userModel = require('../model/utilisateur')
const candidatModel = require('../model/candidat')
var adminModel = require('../model/admin')
var recruteurModel = require('../model/recruteur')
var organisationModel = require('../model/organisation')
const piecesModel = require('../model/piece_dossier')
const candidatureModel = require('../model/candidature')
const ficheModel = require('../model/fiche_poste')
const offreModel = require('../model/offre_emploi')
const adresseModel = require('../model/adresse')
var router = express.Router();


// router.get('/account', function (req, res, next) {
    
//  console.log( req.session.successMessage );
//         userModel.getByStatusAndType("inactif", "candidat", function (error, result) {
//             res.render('AdminHomePageNewM', { title: 'Homepage - admin', users: result});
//         });
//         delete req.session.successMessage;

//     }
// );

    // router.get('/admin_visu_acc', function (req, res, next) {
    // result=userModel.readall(function(result){
    // res.render('admin/admin_visu_acc', { title: 'List des utilisateurs', users: result });
    // });
    // });

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


router.get('/admin_account', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        res.render('admin/admin_account');
    } else {
        res.redirect("/auth/login");
    }

})

router.get('/admin_modif_mail', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        res.render('admin/admin_modif_mail', {title: "Modif mail", email: req.session.usermail});
    } else {
        res.redirect("/auth/login");
    }

});

router.get('/admin_modif_mdp', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        res.render('admin/admin_modif_mdp');
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

router.get('/confirmation_admin', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        res.render('admin/confirmation_admin');
    } else {
        res.redirect("/auth/login");
    }

});

router.get('/confirmation_passage_admin/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        const id = req.params.id;
        const role = await userModel.checkRole(id)
        console.log(role.role)
        if(role.role === "Recruteur"){
            const fiches = await ficheModel.readByRecr(id);
            for(let ite1 in fiches){
                const fiche = fiches[ite1];
                const offres = await offreModel.readByFiche(fiche.id_fiche)
                for(let ite2 in offres){
                    const offre = offres[ite2];
                    const candidatures = await candidatureModel.readByOffre(offre.num);
                    for(let ite3 in candidatures){
                        const candidature = candidatures[ite3];
                        const pieces = await candidatureModel.readPieces(candidature.id_c);
                        for(let ite4 in pieces){
                            const piece = pieces[ite4];
                            await piecesModel.delete(piece.id_piece);
                        }
                        await candidatureModel.delete(candidature.id_c)
                    }
                    await offreModel.delete(offre.num);
                }
                await ficheModel.delete(fiche.id_fiche);
            }
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
        res.render('user/redirect');
    } else {
        res.redirect("/auth/login");
    }
});

router.get('/admin_enr_orga', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        const result = await organisationModel.readByStatut('en attente');
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
        res.render('admin/admin_valide_orga', {orga: result, adresse: adresse});
    } else {
        res.redirect("/auth/login");
    }

});

router.get('/user_recr_details/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        var id = req.params.id;
        const result = await userModel.readByID(id);
        console.log(result)
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
        console.log(result)
        res.render('admin/user_details', {title: 'Admin - Visu Account', user: result})
    } else {
        res.redirect("/auth/login");
    }

})

// router.get('/admin_enr_recr', function (req, res, next) {
//     console.log("test")
//     result = recruteurModel.readByStatut('en attente', function(error, result) {
//         console.log(result)
//         res.render('admin/admin_enr_recr', { title: 'Admin - Validation Recruteur', users: result});
//     })
// })

router.get('/admin_enr_recr', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        const result = await recruteurModel.readByStatut('en attente');
        res.render('admin/admin_enr_recr', {users: result});
    } else {
        res.redirect("/auth/login");
    }

});

router.post('/update_mail', async (req, res) => {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
      const old_mail = session.usermail;
      const result = await userModel.arevalid(old_mail, req.body.password);
      const verif = await userModel.read(req.body.mail);
      if(result && !verif) {
        await userModel.updateMail(old_mail, req.body.mail)
        req.session.usermail = req.body.mail;
        res.render('user/redirect');
      }
    }
    else {
      res.redirect("/auth/login");
    }
  });

  router.post('/update_mdp', async (req, res) => {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
      const mail = session.usermail;
      const old_pwd = req.body.old_password;
      const new_pwd = req.body.new_password
      const new_pwd2 = req.body.new_password2
      const result = await userModel.arevalid(mail, old_pwd);
      if(result && (new_pwd == new_pwd2)) {
        await userModel.updatePassword(mail, new_pwd)
        res.render('user/redirect');
      }
    }
    else {
      res.redirect("/auth/login");
    }
  });


  router.get('/passage_recr/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        const id = req.params.id
        await recruteurModel.validationDemande(id);
        await userModel.updateRecruteur(id);
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