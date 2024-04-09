var express = require('express');
var userModel = require('../model/utilisateur')
var offreModel = require('../model/offre_emploi')
var candModel = require('../model/candidat')
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


router.get('/voir-offre/:id', function (req, res, next) {
    const id = req.params.id;
    result = offreModel.allinfoID(id, function (error, result) {
    console.log(result)
      res.render('candidat/candidat_desc_offre', { title: 'Candidat - description offre', offre: result[0] });
    });
  });
  



module.exports = router;