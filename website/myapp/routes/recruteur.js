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


  module.exports = router;