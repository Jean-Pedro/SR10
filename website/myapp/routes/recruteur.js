var express = require('express');
var userModel = require('../model/utilisateur')
var offreModel = require('../model/offre_emploi')
var candidatureModel = require('../model/candidature')
const recruteurModel = require('../model/recruteur')
const adresseModel = require('../model/adresse')
const orgaModel = require('../model/organisation')
const typeMetierModel = require('../model/type_metier')
const statutModel = require('../model/statut_poste')
const ficheModel = require('../model/fiche_poste')
var router = express.Router();

function assureTableau(variable) {
  if (!Array.isArray(variable)) {
    // Si la variable n'est pas un tableau, on la convertit en tableau
    return [variable];
  }
  // Sinon, on retourne la variable telle quelle car elle est déjà un tableau
  return variable;
}

  router.get('/recruteur_main', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const result = await offreModel.allinfo();
      res.render('recruteur/recruteur_main', { title: 'List des offres', offres: result });
    } else {
      res.redirect('/auth/login')
    }
  });

  router.get('/recruteur_account', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      res.render('recruteur/recruteur_account');
    } else {
      res.redirect('/auth/login')
    }
    
  });

  router.get('/recruteur_modif_mail', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      res.render('recruteur/recruteur_modif_mail', {title: "Modif mail", email: req.session.usermail});
    } else {
      res.redirect('/auth/login')
    }
    
  });

  router.get('/recruteur_modif_mdp', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      res.render('recruteur/recruteur_modif_mdp');
    } else {
      res.redirect('/auth/login')
    }
      
  });

  router.get('/confirmation', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      res.render('recruteur/confirmation_recruteur');
    } else {
      res.redirect('/auth/login')
    }
    
  });

  router.get('/verif_suppr', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      res.render('recruteur/verif_suppr');
    } else {
      res.redirect('/auth/login')
    }
    
  });

  router.get('/voir-offre/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const id = req.params.id;
      console.log(id);
      const result = await offreModel.allinfoID(id);
      console.log(result)
      res.render('recruteur/recruteur_desc_offre', { title: 'Recruteur - description offre', offre: result[0] });
    } else {
      res.redirect('/auth/login')
    }
    
  });

  router.get('/search/:text', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const text =req.params.text;
      const result = await offreModel.allinfosearch(text);
      console.log(result);
      res.render('recruteur/recruteur_main', { title: 'Recruteur - search', offres: result})
    } else {
      res.redirect('/auth/login')
    }
    
  })

  router.get('/salaire_min/:text', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const text = req.params.text;
      const result = await offreModel.allinfoSalaire(text);
      console.log(result);
      res.render('recruteur/recruteur_main', { title: 'Recruteur - search', offres: result})
    } else {
      res.redirect('/auth/login')
    }
    
  })

  router.get('/localisation/:text', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const text =req.params.text;
      const result = await offreModel.allinfoLocate(text);
      console.log(result);
      res.render('recruteur/recruteur_main', { title: 'Recruteur - search', offres: result})
    } else {
      res.redirect('/auth/login')
    }
    
  })

  router.get('/candidater/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const id = req.params.id;
      console.log(id)
      const result = await candidatureModel.readPiecesByFiche(id);
      console.log(result)
      res.render('recruteur/recruteur_candidate', { title: 'Recruteur - Candidater', pieces: result});
    } else {
      res.redirect('/auth/login')
    }

  });

  router.get('/mes_candidatures', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const result = await candidatureModel.readCandidatureByCandidat(session.user);
      console.log(result);
      res.render('recruteur/candidature_r', {title : 'Recruteur - Candidatures', offres: result})
    } else {
      res.redirect('/auth/login')
    }

  });

  router.get('/recruteur_recr', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const id = session.user
      const result = await offreModel.allinfoByRecruteur(id);
      console.log(result);
      res.render('recruteur/recruteur_recr', { title: 'List des offres', offres: result });
    } else {
      res.redirect('/auth/login')
    }

  });


  router.get('/voir-candidatures/:num', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const num = req.params.num;
      const result = await offreModel.candidatByOffre(num);
      console.log(result);
      res.render('recruteur/recruteur_cand_offre', { title: 'Liste des candidatures', users: result, num: num });
    } else {
      res.redirect('/auth/login')
    }

  });

  router.get('/modif-cand/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const id = req.params.id;
      console.log(id)
      const result = await candidatureModel.readPieces(id);
      console.log(result)
      res.render('recruteur/recruteur_modif_cand', { title: 'Recruteur - Modification candidature', pieces: result});
    } else {
      res.redirect('/auth/login')
    }

  });

  router.get('/modif-offre/:offre', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const offre = req.params.offre;
      console.log(offre)
      const result = await offreModel.read(offre);
      console.log(result)
      res.render('recruteur/recruteur_modif_offre', { title: 'Recruteur - Modification offre', offre: result, num:offre});
    } else {
      res.redirect('/auth/login')
    }

  });
  
  router.post('/confirm_modif_cand', (req, res) => {
    // db.query('SELECT * FROM Organisation WHERE siren = ?', [siren], (err, results) => {
    //     if (results.length > 0) {
    //         res.render('candidat/confirmation_candidat');
    //     } else {
    //         res.render('candidat/new_recr');
    //     }
    // });
    res.render('recruteur/confirmation_recruteur');
  });


  router.post('/confirm_fiche', async (req, res) => {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const adresse = await adresseModel.create(req.body.num, req.body.rue, req.body.ville, req.body.code_postal);
      const type_metier = await typeMetierModel.create(req.body.type);
      const statut = await statutModel.create(req.body.statut);
      const result = await ficheModel.create(req.body.intitule, req.body.resp, req.body.rythme, req.body.teletravail, req.body.sal_min, req.body.sal_max, req.body.desc, type_metier, statut, adresse, req.body.orga, session.user);
      res.render('user/redirect');
    }
    else {
      res.redirect("/auth/login");
    }
  });


  router.post('/confirm_modif_offre/:offre', async (req, res) => {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const date = req.body.date;
      const indications = req.body.indications;
      const offre = req.params.offre;
      await offreModel.updateDate_validite(offre, date);
      await offreModel.updateIndications(offre, indications);
      res.render('user/redirect');
    }
    else {
      res.redirect("/auth/login");
    }
  });

  router.post('/update_mail', async (req, res) => {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
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
    if(session.usermail && session.type_user === "recruteur") {
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

  router.post('/valide_cand', (req, res) => {
    // db.query('SELECT * FROM Organisation WHERE siren = ?', [siren], (err, results) => {
    //     if (results.length > 0) {
    //         res.render('candidat/confirmation_candidat');
    //     } else {
    //         res.render('candidat/new_recr');
    //     }
    // });
    res.render('recruteur/confirmation_recruteur');
  });

  router.get('/recruteur_menu_offres', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      res.render('recruteur/recruteur_menu_offres')
    } else {
      res.redirect('/auth/login')
    }
    
  });

  router.get('/create_fiche', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      let orga = await recruteurModel.read(session.usermail)
      orga = orga.organisation
      console.log(orga)
      res.render('recruteur/create_fiche', { title: 'Recruteur - Création fiche', orga: orga});
    } else {
      res.redirect('/auth/login')
    }

  })

  router.get('/create_offre', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      let fiches = await ficheModel.readByRecr(session.user);
      fiches = assureTableau(fiches);
      res.render('recruteur/create_offre', {fiches: fiches});
    } else {
      res.redirect('/auth/login')
    }

  })

  router.get('/details_candidature_user/:num/:email', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const num = req.params.num
      const email = req.params.email
      const user = await userModel.read(email);
      const candidature = await candidatureModel.readByIdCandidatOffre(user.id_utilisateur, num)
      const pieces = await candidatureModel.readPieces(candidature.id_c)
      console.log(pieces)
      res.render('recruteur/details_candidature_user', { title: 'Recruteur - Détails candidature', pieces: pieces, user: user, candidature: candidature, offre: num})
    } else {
      res.redirect('/auth/login')
    }

  })

  router.get('/validation_candidature/:id_offre/:id_c', async (req, res, next) => {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const id_candidature = req.params.id_c;
      const offre = req.params.id_offre;
      let id_candidat = await candidatureModel.read(id_candidature);
      id_candidat = id_candidat.candidat;
      await candidatureModel.delete(id_candidature)

      // faire une fonction pour envoyer un mail d'acceptation


      res.render('user/redirect');
    } else {
      res.redirect('/auth/login')
    }
  })

  router.get('/refus_candidature/:id_offre/:id_c', async (req, res, next) => {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const id_candidature = req.params.id_c;
      const offre = req.params.id_offre;
      let id_candidat = await candidatureModel.read(id_candidature);
      id_candidat = id_candidat.candidat;
      await candidatureModel.delete(id_candidature)

      // faire une fonction pour envoyer un mail de refus


      res.render('user/redirect');
    } else {
      res.redirect('/auth/login')
    }
  })

  module.exports = router;