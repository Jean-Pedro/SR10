var express = require('express');
var userModel = require('../model/utilisateur')
var offreModel = require('../model/offre_emploi')
var candModel = require('../model/candidat')
var candidatureModel = require('../model/candidature')
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  });
  router.get('/candidat_main', function (req, res, next) {
  result=offreModel.allinfo(function(result){
    //console.log(result)
  res.render('candidat/candidat_main', { title: 'List des offres', offres: result });
  });
  });


  router.get('/candidat_account', function (req, res, next) {
    res.render('candidat/candidat_account');
  });

  router.get('/candidat_modif_mail', function (req, res, next) {
    res.render('candidat/candidat_modif_mail');
  });

  router.get('/candidat_modif_mdp', function (req, res, next) {
      res.render('candidat/candidat_modif_mdp');
  });


  router.get('/new_recr', function (req, res, next) {
    result=offreModel.allinfo(function(result){
      //console.log(result)
    res.render('candidat/new_recr', { title: 'List des offres', offres: result });
    });
    });

  
  router.get('/create_orga', function (req, res, next) {
    res.render('candidat/candidat_create_orga');
  });


  router.get('/search/:text', function (req, res, next) {
    const text =req.params.text;
    result = offreModel.allinfosearch(text, function (error, result) {
      console.log(result);
      res.render('candidat/candidat_main', { title: 'Candidat - search', offres: result})
    })
  })

  router.get('/localisation/:text', function (req, res, next) {
    const text =req.params.text;
    result = offreModel.allinfoLocate(text, function (error, result) {
      console.log(result);
      res.render('candidat/candidat_main', { title: 'Candidat - search', offres: result})
    })
  })

  router.get('/salaire_min/:text', function (req, res, next) {
    const text =req.params.text;
    result = offreModel.allinfoSalaire(text, function (error, result) {
      console.log(result);
      res.render('candidat/candidat_main', { title: 'Candidat - search', offres: result})
    })
  })


router.get('/voir-offre/:id', function (req, res, next) {
    const id = req.params.id;
    result = offreModel.allinfoID(id, function (error, result) {
    console.log(result)
      res.render('candidat/candidat_desc_offre', { title: 'Candidat - description offre', offre: result[0] });
    });
  });


  // router.get('/rejoindre_orga/:siren', function (req, res, next) {
  //   const siren = req.params.siren;
  //   result = offreModel.allinfoSiren(siren, function (error, result) {
  //   console.log(result)
  //     res.render('candidat/rejoindre_orga', { title: 'Candidat - rejoindre organisation', offre: result[0] });
  //   });
  // });
  
  router.get('/mes_candidatures/:id', function (req, res, next) {
    const id = req.params.id;
    result = candidatureModel.readByIdCandidat(id, function (error, result) {
      console.log(result);
      res.render('candidat/candidature_c', {title : 'Candidat - Candidatures', offre: result[0]})
    })
  });

  router.get('/mes_candidatures', function (req, res, next) {
    result = candidatureModel.readTest(function (error, result) {
      console.log(result);
      res.render('candidat/candidature_c', {title : 'Candidat - Candidatures', offres: result})
    })
  });

  router.get('/modif-offre/:id', function (req, res, next) {
    const id = req.params.id;
    console.log(id)
    result = candidatureModel.readPieces(id, function (error, result) {
    console.log(result)
      res.render('candidat/candidat_modif_cand', { title: 'Candidat - Modification candidature', pieces: result});
    });
  });


  router.get('/candidater/:id', function (req, res, next) {
    const id = req.params.id;
    console.log(id)
    result = candidatureModel.readPiecesByFiche(id, function (error, result) {
    console.log(result)
      res.render('candidat/candidat_candidate', { title: 'Candidat - Candidater', pieces: result});
    });
  });

module.exports = router;