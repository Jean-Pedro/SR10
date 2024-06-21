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
const piecesModel = require('../model/piece_dossier');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var router = express.Router();

function assureTableau(variable) {
  if (!Array.isArray(variable)) {
    return [variable];
  }
  return variable;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/', async function (req, res, next) {
  res.redirect('/auth/login')
});


router.get('/recruteur_recr', async function (req, res, next) {
  const session = req.session;
  if(session.usermail && session.type_user === "recruteur") {
    const id = session.user
    const recr = await recruteurModel.readByID(id)
    console.log(recr.organisation)
    const result = await offreModel.allinfoSiren(recr.organisation);
    const fiches = await ficheModel.readByOrga(recr.organisation);
    console.log(result);
    res.render('recruteur/recruteur_recr', {offres: result, fiches: fiches});
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

router.get('/suppr-offre/:offre', async function (req, res, next) {
  const session = req.session;
  if(session.usermail && session.type_user === "recruteur") {
    const offre = req.params.offre;
    const result = await offreModel.read(offre);

    let candidatures = await candidatureModel.readByOffre(offre);
    for(let ele in candidatures) {
      let candidature = candidatures[ele];
      let pieces = await candidatureModel.readPieces(candidature.id_c)
      for(let ele2 in pieces){
        await piecesModel.delete(pieces[ele2].id_piece)
      }
      await candidatureModel.delete(candidature.id_c)
    }
    await offreModel.delete(offre);

    res.render('user/redirect');
  } else {
    res.redirect('/auth/login')
  }

});


router.get('/suppr-fiche/:fiche', async function (req, res, next) {
  const session = req.session;
  if(session.usermail && session.type_user === "recruteur") {
    const fiche = req.params.fiche;
    console.log(fiche)

    let offres = await offreModel.readByFiche(fiche)
    for(let cpt in offres) {
      let offre = offres[cpt]
      let candidatures = await candidatureModel.readByOffre(offre.num);
      for(let ele in candidatures) {
        let candidature = candidatures[ele];
        let pieces = await candidatureModel.readPieces(candidature.id_c)
        for(let ele2 in pieces){
          await piecesModel.delete(pieces[ele2].id_piece)
        }
        await candidatureModel.delete(candidature.id_c)
      }
      await offreModel.delete(offre.num);
    }
    await ficheModel.delete(fiche);
    res.render('user/redirect');
  } else {
    res.redirect('/auth/login')
  }

});


router.get('/modif-fiche/:id_fiche', async function (req, res, next) {
  const session = req.session;
  if(session.usermail && session.type_user === "recruteur") {
    const id_fiche = req.params.id_fiche;
    const result = await ficheModel.read(id_fiche)
    const adresse = await adresseModel.read(result.lieu)
    console.log(result)
    console.log(adresse)
    res.render('recruteur/recruteur_modif_fiche', {fiche: result, id_fiche: id_fiche, adresse: adresse});
  } else {
    res.redirect('/auth/login')
  }

});
  

  router.post('/confirm_fiche', async (req, res) => {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const adresse = await adresseModel.create(req.body.num, req.body.rue, req.body.ville, req.body.code_postal);
      const type_metier = await typeMetierModel.create(req.body.type);
      const statut = await statutModel.create(req.body.statut);
      const result = await ficheModel.create(req.body.intitule, req.body.resp, req.body.rythme, req.body.teletravail, req.body.sal_min, req.body.sal_max, req.body.desc, type_metier, statut, adresse, req.body.orga);
      res.render('user/redirect');
    }
    else {
      res.redirect("/auth/login");
    }
  });

  router.post('/confirm_offre', async (req, res) => {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const fiche = req.body.fiche;
      const indications = req.body.indications;
      const date_validite = req.body.date;
      await offreModel.create(date_validite, indications, fiche, "publiée")
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

  router.post('/confirm_modif_fiche/:fiche', async (req, res) => {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const fiche = req.params.fiche;
      const id_adresse = req.body.adresse;
      await adresseModel.updateNum(id_adresse, req.body.num);
      await adresseModel.updateRue(id_adresse, req.body.rue);
      await adresseModel.updateVille(id_adresse, req.body.ville);
      await adresseModel.updateCodePostal(id_adresse, req.body.code_postal);
      await ficheModel.updateIntitule(fiche, req.body.intitule);
      await ficheModel.updateResp(fiche, req.body.resp);
      await ficheModel.updateRythme(fiche, req.body.rythme);
      await ficheModel.updateTeletravail(fiche, req.body.teletravail);
      await ficheModel.updateSalaire_min(fiche, req.body.sal_min);
      await ficheModel.updateSalaire_max(fiche, req.body.sal_max);
      await ficheModel.updateDescription(fiche, req.body.desc);
      const type = await typeMetierModel.create(req.body.type);
      await ficheModel.updateType(fiche, type);
      const statut = await statutModel.create(req.body.statut);
      await ficheModel.updateStatut(fiche, statut);
      res.render('user/redirect');
    }
    else {
      res.redirect("/auth/login");
    }
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
      const recr = await recruteurModel.readByID(session.user)
      let fiches = await ficheModel.readByOrga(recr.organisation);
      fiches = assureTableau(fiches);
      res.render('recruteur/create_offre', {fiches: fiches});
    } else {
      res.redirect('/auth/login')
    }

  })

  router.get('/details_candidature_user/:num/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const num = req.params.num
      const id = req.params.id
      const user = await userModel.readByID(id)
      const candidature = await candidatureModel.readByIdCandidatOffre(id, num)
      let pieces = await candidatureModel.readPieces(candidature.id_c)
      pieces = assureTableau(pieces)
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

      let pieces = await candidatureModel.readPieces(id_candidature);
      for(let ele in pieces){
        await piecesModel.delete(pieces[ele].id_piece)
      }
      await candidatureModel.delete(id_candidature)
      let candidat = await userModel.readByID(id_candidat)

      const to = candidat.email
      const subject = 'Candidature acceptée';
      const body = 
      `Bonjour,
Je vous informe que nous avons accepté votre candidature à notre offre. Nous vous recontacterons dans les plus brefs délais.
Cordialement,
La direction`;

      const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;


      res.render('user/send_mail', { mailtoLink });

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

      let pieces = await candidatureModel.readPieces(id_candidature);
      for(let ele in pieces){
        await piecesModel.delete(pieces[ele].id_piece)
      }
      await candidatureModel.delete(id_candidature)

      res.render('user/redirect');
    } else {
      res.redirect('/auth/login')
    }
  })

  router.get('/suppression_candidature/:id', async function (req, res) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const id = req.params.id;
      console.log(`id = ${id}`)
      let pieces = await candidatureModel.readPieces(id);
      console.log(pieces)
      for(let ele in pieces){
        console.log(pieces[ele].id_piece)
        await piecesModel.delete(pieces[ele].id_piece)
      }
      await candidatureModel.delete(id);
      res.render('user/redirect');
    }
    else {
      res.redirect("/auth/login");
    }
  })

  module.exports = router;