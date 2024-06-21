var db = require('../model/db')
var express = require('express');
var userModel = require('../model/utilisateur')
var offreModel = require('../model/offre_emploi')
var candModel = require('../model/candidat')
var candidatureModel = require('../model/candidature');
const orgaModel = require('../model/organisation');
const recrModel = require('../model/recruteur');
const piecesModel = require('../model/piece_dossier');
const adresseModel = require('../model/adresse')
const typeOrgaModel = require('../model/type_organisation')
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
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/', async function (req, res, next) {
  res.redirect('/auth/login')
});


router.get('/devenir_recruteur', async function (req, res, next) {
  const session = req.session;
  if(session.usermail && session.type_user === "candidat") {
    const error_siren = session.error_siren || '';
    session.error_siren = null;
    res.render('candidat/new_recr', {error_siren});
  }
  else {
    res.redirect("/auth/login");
  }
  
  });

  
router.get('/create_orga', function (req, res, next) {
  const session = req.session;
  if(session.usermail && session.type_user === "candidat") {
    const error_siren = session.error_siren || '';
    const error_already_recr = session.error_already_recr || '';
    session.error_siren = null;
    session.error_already_recr = null;
    res.render('candidat/candidat_create_orga', {error_siren, error_already_recr});
  }
  else {
    res.redirect("/auth/login");
  }
  
});


router.post('/verif_siren', async function (req, res) {
  const session = req.session;
  if(session.usermail && session.type_user === "candidat") {
    const siren = req.body.siren;
    const results = await orgaModel.read(siren);
    console.log(results)
    if (results) {
      const user = await candModel.readByEmail(session.usermail)
      const id = user.id_candidat
      await recrModel.createRecr(id, siren)
      res.render('user/redirect');
    } else {
      session.error_siren = "L'organisation entrée n'existe pas !";
      res.redirect('devenir_recruteur');
    }
  }
  else {
    res.redirect("/auth/login");
  }
  
  
});


router.post('/confirm_orga', upload.single('logo'), async (req, res) => {
  const session = req.session;
  if(session.usermail && session.type_user === "candidat") {
    const user_verif = await recrModel.readByID(session.user)
    if(!user_verif){
      const verif = await orgaModel.read(req.body.siren)
      console.log(verif)
      if(!verif){
        const file = req.file;
        const adresse = await adresseModel.create(req.body.num, req.body.rue, req.body.ville, req.body.code_postal);
        const type_orga = await typeOrgaModel.create(req.body.type);
        const orga = await orgaModel.create(req.body.siren, req.body.nom, adresse, type_orga, file.originalname);
        const recruteur = await recrModel.createRecr(session.user, orga)
        res.render('user/redirect');
      } else {
        req.session.error_siren = "L'organisation existe déjà !";
        res.redirect('create_orga')
      }
    } else{
      req.session.error_already_recr = "Vous avez déjà demandé à rejoindre une organisation !"
      res.redirect('create_orga');
    }

  }
  else {
    res.redirect("/auth/login");
  }
});


module.exports = router;