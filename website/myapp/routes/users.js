var express = require('express');
var userModel = require('../model/utilisateur')
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  });

router.get('/admin_visu_acc', function (req, res, next) {
  result=userModel.readall(function(result){
  res.render('admin_visu_acc', { title: 'List des utilisateurs', users: result });
  });
  });

  module.exports = router;