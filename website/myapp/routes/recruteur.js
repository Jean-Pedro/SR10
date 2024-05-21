var express = require('express');
var userModel = require('../model/utilisateur')
var offreModel = require('../model/offre_emploi')
var candidatureModel = require('../model/candidature')
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  });

  router.get('/recruteur_main', async function (req, res, next) {
    const result = await offreModel.allinfo();
    res.render('recruteur/recruteur_main', { title: 'List des offres', offres: result });
  });

  router.get('/recruteur_account', function (req, res, next) {
    res.render('recruteur/recruteur_account');
  });

  router.get('/recruteur_modif_mail', function (req, res, next) {
    res.render('recruteur/recruteur_modif_mail');
  });

  router.get('/recruteur_modif_mdp', function (req, res, next) {
      res.render('recruteur/recruteur_modif_mdp');
  });

  router.get('/confirmation', function (req, res, next) {
    res.render('recruteur/confirmation_recruteur');
  });

  router.get('/verif_suppr', function (req, res, next) {
    res.render('recruteur/verif_suppr');
  });

  router.get('/voir-offre/:id', async function (req, res, next) {
    const id = req.params.id;
    console.log(id);
    const result = await offreModel.allinfoID(id);
    console.log(result)
    res.render('recruteur/recruteur_desc_offre', { title: 'Recruteur - description offre', offre: result[0] });
  });

  router.get('/search/:text', async function (req, res, next) {
    const text =req.params.text;
    const result = await offreModel.allinfosearch(text);
    console.log(result);
    res.render('recruteur/recruteur_main', { title: 'Recruteur - search', offres: result})
  })

  router.get('/salaire_min/:text', async function (req, res, next) {
    const text = req.params.text;
    const result = await offreModel.allinfoSalaire(text);
    console.log(result);
    res.render('recruteur/recruteur_main', { title: 'Recruteur - search', offres: result})
  })

  router.get('/localisation/:text', async function (req, res, next) {
    const text =req.params.text;
    const result = await offreModel.allinfoLocate(text);
    console.log(result);
    res.render('recruteur/recruteur_main', { title: 'Recruteur - search', offres: result})
  })

  router.get('/candidater/:id', async function (req, res, next) {
    const id = req.params.id;
    console.log(id)
    const result = await candidatureModel.readPiecesByFiche(id);
    console.log(result)
    res.render('recruteur/recruteur_candidate', { title: 'Recruteur - Candidater', pieces: result});
  });

  router.get('/mes_candidatures', async function (req, res, next) {
    const result = await candidatureModel.readTest();
    console.log(result);
    res.render('recruteur/candidature_r', {title : 'Recruteur - Candidatures', offres: result})
  });

  router.get('/recruteur_recr/:id', async function (req, res, next) {
    const id = req.params.id;
    const result = await offreModel.allinfoByRecruteur(id);
    console.log(result);
    res.render('recruteur/recruteur_recr', { title: 'List des offres', offres: result });
  });


  router.get('/voir-candidatures/:num', async function (req, res, next) {
    const num = req.params.num;
    const result = await offreModel.candidatByOffre(num);
    console.log(result);
    res.render('recruteur/recruteur_cand_offre', { title: 'Liste des candidatures', users: result });
  });

  router.get('/modif-cand/:id', async function (req, res, next) {
    const id = req.params.id;
    console.log(id)
    const result = await candidatureModel.readPieces(id);
    console.log(result)
    res.render('recruteur/recruteur_modif_cand', { title: 'Recruteur - Modification candidature', pieces: result});
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

  router.post('/update_mail', (req, res) => {
    // db.query('SELECT * FROM Organisation WHERE siren = ?', [siren], (err, results) => {
    //     if (results.length > 0) {
    //         res.render('candidat/confirmation_candidat');
    //     } else {
    //         res.render('candidat/new_recr');
    //     }
    // });
    res.render('recruteur/confirmation_recruteur');
  });

  router.post('/update_mdp', (req, res) => {
    // db.query('SELECT * FROM Organisation WHERE siren = ?', [siren], (err, results) => {
    //     if (results.length > 0) {
    //         res.render('candidat/confirmation_candidat');
    //     } else {
    //         res.render('candidat/new_recr');
    //     }
    // });
    res.render('recruteur/confirmation_recruteur');
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

  module.exports = router;