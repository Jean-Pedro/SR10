var express = require('express');
var userModel = require('../model/utilisateur')
var offreModel = require('../model/offre_emploi')
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


  module.exports = router;