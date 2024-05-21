var express = require('express');
var userModel = require('../model/utilisateur')
var offreModel = require('../model/offre_emploi')
var candidatureModel = require('../model/candidature')
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  });
  router.get('/recruteur_main', function (req, res, next) {
    result=offreModel.allinfo(function(result){
      res.render('recruteur/recruteur_main', { title: 'List des offres', offres: result });
    });
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

  router.get('/voir-offre/:id', function (req, res, next) {
    const id = req.params.id;
    console.log(id);
    result = offreModel.allinfoID(id, function (error, result) {
    console.log(result)
      res.render('recruteur/recruteur_desc_offre', { title: 'Recruteur - description offre', offre: result[0] });
    });
  });

  router.get('/search/:text', function (req, res, next) {
    const text =req.params.text;
    result = offreModel.allinfosearch(text, function (error, result) {
      console.log(result);
      res.render('recruteur/recruteur_main', { title: 'Recruteur - search', offres: result})
    })
  })

  router.get('/salaire_min/:text', function (req, res, next) {
    const text =req.params.text;
    result = offreModel.allinfoSalaire(text, function (error, result) {
      console.log(result);
      res.render('recruteur/recruteur_main', { title: 'Recruteur - search', offres: result})
    })
  })

  router.get('/localisation/:text', function (req, res, next) {
    const text =req.params.text;
    result = offreModel.allinfoLocate(text, function (error, result) {
      console.log(result);
      res.render('recruteur/recruteur_main', { title: 'Recruteur - search', offres: result})
    })
  })

  router.get('/candidater/:id', function (req, res, next) {
    const id = req.params.id;
    console.log(id)
    result = candidatureModel.readPiecesByFiche(id, function (error, result) {
    console.log(result)
      res.render('recruteur/recruteur_candidate', { title: 'Recruteur - Candidater', pieces: result});
    });
  });

  router.get('/mes_candidatures', function (req, res, next) {
    result = candidatureModel.readTest(function (error, result) {
      console.log(result);
      res.render('recruteur/candidature_r', {title : 'Recruteur - Candidatures', offres: result})
    })
  });

  router.get('/recruteur_recr/:id', function (req, res, next) {
    const id = req.params.id;
    result=offreModel.allinfoByRecruteur(id, function(error, result){
      console.log(result);
      res.render('recruteur/recruteur_recr', { title: 'List des offres', offres: result });
    });
    });


  router.get('/voir-candidatures/:num', function (req, res, next) {
    const num = req.params.num;
    result=offreModel.candidatByOffre(num, function(error, result){
      console.log(result);
      res.render('recruteur/recruteur_cand_offre', { title: 'Liste des candidatures', users: result });
    });
  });

  router.get('/modif-cand/:id', function (req, res, next) {
    const id = req.params.id;
    console.log(id)
    result = candidatureModel.readPieces(id, function (error, result) {
    console.log(result)
      res.render('recruteur/recruteur_modif_cand', { title: 'Recruteur - Modification candidature', pieces: result});
    });
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