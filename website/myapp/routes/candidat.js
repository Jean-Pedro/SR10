var db = require('../model/db')
var express = require('express');
var userModel = require('../model/utilisateur')
var offreModel = require('../model/offre_emploi')
var candModel = require('../model/candidat')
var candidatureModel = require('../model/candidature')
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  });

router.get('/candidat_main', async function (req, res, next) {
  const result = await offreModel.allinfo();
  //console.log(result
  res.render('candidat/candidat_main', { title: 'List des offres', offres: result });
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

  router.get('/confirmation', function (req, res, next) {
    res.render('candidat/confirmation_candidat');
  });

  router.get('/verif_suppr', function (req, res, next) {
    res.render('candidat/verif_suppr');
  });

  router.get('/new_recr', async function (req, res, next) {
    const result = await offreModel.allinfo();
      //console.log(result)
    res.render('candidat/new_recr', { title: 'List des offres', offres: result });
    });

  
  router.get('/create_orga', function (req, res, next) {
    res.render('candidat/candidat_create_orga');
  });


  router.get('/search/:text', async function (req, res, next) {
    const text =req.params.text;
    const result = await offreModel.allinfosearch(text);
      console.log(result);
      res.render('candidat/candidat_main', { title: 'Candidat - search', offres: result})
  })

  router.get('/localisation/:text', async function (req, res, next) {
    const text =req.params.text;
    const result = await offreModel.allinfoLocate(text)
      console.log(result);
      res.render('candidat/candidat_main', { title: 'Candidat - search', offres: result})
  })

  router.get('/salaire_min/:text', async function (req, res, next) {
    const text =req.params.text;
    const result = await offreModel.allinfoSalaire(text);
      console.log(result);
      res.render('candidat/candidat_main', { title: 'Candidat - search', offres: result})
  })


router.get('/voir-offre/:id', async function (req, res, next) {
    const id = req.params.id;
    const result = await offreModel.allinfoID(id);
    console.log(result)
      res.render('candidat/candidat_desc_offre', { title: 'Candidat - description offre', offre: result[0] });
  });


  // router.get('/rejoindre_orga/:siren', function (req, res, next) {
  //   const siren = req.params.siren;
  //   result = offreModel.allinfoSiren(siren, function (error, result) {
  //   console.log(result)
  //     res.render('candidat/rejoindre_orga', { title: 'Candidat - rejoindre organisation', offre: result[0] });
  //   });
  // });
  
  router.get('/mes_candidatures/:id', async function (req, res, next) {
    const id = req.params.id;
    const result = await candidatureModel.readByIdCandidat(id);
      console.log(result);
      res.render('candidat/candidature_c', {title : 'Candidat - Candidatures', offre: result[0]})
  });

  router.get('/mes_candidatures', async function (req, res, next) {
    const result = await candidatureModel.readTest();
      console.log(result);
      res.render('candidat/candidature_c', {title : 'Candidat - Candidatures', offres: result})
  });

  router.get('/modif-offre/:id', async function (req, res, next) {
    const id = req.params.id;
    console.log(id)
    const result = await candidatureModel.readPieces(id);
    console.log(result)
      res.render('candidat/candidat_modif_cand', { title: 'Candidat - Modification candidature', pieces: result});
  });


  router.get('/candidater/:id', async function (req, res, next) {
    const id = req.params.id;
    console.log(id)
    const result = await candidatureModel.readPiecesByFiche(id);
    console.log(result)
      res.render('candidat/candidat_candidate', { title: 'Candidat - Candidater', pieces: result});
  });

  router.post('/verif_siren', (req, res) => {
    const siren = req.body.siren;
    db.query('SELECT * FROM Organisation WHERE siren = ?', [siren], (err, results) => {
        if (results.length > 0) {
            res.render('candidat/confirmation_candidat');
        } else {
            res.render('candidat/new_recr');
        }
    });
  });

  router.post('/confirm_orga', (req, res) => {
    // db.query('SELECT * FROM Organisation WHERE siren = ?', [siren], (err, results) => {
    //     if (results.length > 0) {
    //         res.render('candidat/confirmation_candidat');
    //     } else {
    //         res.render('candidat/new_recr');
    //     }
    // });
    res.render('candidat/confirmation_candidat');
  });

  router.post('/confirm_modif_cand', (req, res) => {
    // db.query('SELECT * FROM Organisation WHERE siren = ?', [siren], (err, results) => {
    //     if (results.length > 0) {
    //         res.render('candidat/confirmation_candidat');
    //     } else {
    //         res.render('candidat/new_recr');
    //     }
    // });
    res.render('candidat/confirmation_candidat');
  });

  router.post('/update_mail', (req, res) => {
    // db.query('SELECT * FROM Organisation WHERE siren = ?', [siren], (err, results) => {
    //     if (results.length > 0) {
    //         res.render('candidat/confirmation_candidat');
    //     } else {
    //         res.render('candidat/new_recr');
    //     }
    // });
    res.render('candidat/confirmation_candidat');
  });

  router.post('/update_mdp', (req, res) => {
    // db.query('SELECT * FROM Organisation WHERE siren = ?', [siren], (err, results) => {
    //     if (results.length > 0) {
    //         res.render('candidat/confirmation_candidat');
    //     } else {
    //         res.render('candidat/new_recr');
    //     }
    // });
    res.render('candidat/confirmation_candidat');
  });

  router.post('/valide_cand', (req, res) => {
    // db.query('SELECT * FROM Organisation WHERE siren = ?', [siren], (err, results) => {
    //     if (results.length > 0) {
    //         res.render('candidat/confirmation_candidat');
    //     } else {
    //         res.render('candidat/new_recr');
    //     }
    // });
    res.render('candidat/confirmation_candidat');
  });

module.exports = router;