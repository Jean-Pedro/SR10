var db = require('../model/db')
var express = require('express');
var userModel = require('../model/utilisateur')
var offreModel = require('../model/offre_emploi')
var candModel = require('../model/candidat')
var candidatureModel = require('../model/candidature');
const orgaModel = require('../model/organisation');
const recrModel = require('../model/recruteur');
const piecesModel = require('../model/piece_dossier')
var router = express.Router();

// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
//   });

router.get('/candidat_main', async function (req, res, next) {
  const session = req.session;
  if(session.usermail && session.type_user === "candidat") {
    const result = await offreModel.allinfo();
    res.render('candidat/candidat_main', { title: 'List des offres', offres: result });
  }
  else {
    res.redirect("/auth/login");
  }
});


  router.get('/candidat_account', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      res.render('candidat/candidat_account');
    }
    else {
      res.redirect("/auth/login");
    }
    
  });

  router.get('/candidat_modif_mail', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      res.render('candidat/candidat_modif_mail', {title: "Modif mail", email: req.session.usermail});
    }
    else {
      res.redirect("/auth/login");
    }
    
  });

  router.get('/candidat_modif_mdp', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      res.render('candidat/candidat_modif_mdp');
    }
    else {
      res.redirect("/auth/login");
    }
      
  });

  router.get('/confirmation', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      res.render('candidat/confirmation_candidat');
    }
    else {
      res.redirect("/auth/login");
    }
    
  });

  router.get('/verif_suppr/:id', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      const id = req.params.id
      res.render('candidat/verif_suppr', {title: 'Verif suppr', id:id});
    }
    else {
      res.redirect("/auth/login");
    }
    
  });

  router.get('/new_recr', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
        //const sirens = await orgaModel.readAllSiren();
        res.render('candidat/new_recr');
        // res.render('candidat/new_recr', { title: 'List des sirens', sirens: sirens });
    }
    else {
      res.redirect("/auth/login");
    }
    
    });

  
  router.get('/create_orga', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      res.render('candidat/candidat_create_orga');
    }
    else {
      res.redirect("/auth/login");
    }
    
  });


  router.get('/search/:text', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      const text =req.params.text;
      const result = await offreModel.allinfosearch(text);
      console.log(result);
      res.render('candidat/candidat_main', { title: 'Candidat - search', offres: result})
    }
    else {
      res.redirect("/auth/login");
    }
    
  })

  router.get('/localisation/:text', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      const text =req.params.text;
      const result = await offreModel.allinfoLocate(text)
      console.log(result);
      res.render('candidat/candidat_main', { title: 'Candidat - search', offres: result})
    }
    else {
      res.redirect("/auth/login");
    }
    
  })

  router.get('/salaire_min/:text', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      const text =req.params.text;
      const result = await offreModel.allinfoSalaire(text);
      console.log(result);
      res.render('candidat/candidat_main', { title: 'Candidat - search', offres: result})
    }
    else {
      res.redirect("/auth/login");
    }
    
  })


router.get('/voir-offre/:id', async function (req, res, next) {
  const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      const id = req.params.id;
      const result = await offreModel.allinfoID(id);
      console.log(result)
      res.render('candidat/candidat_desc_offre', { title: 'Candidat - description offre', offre: result[0] });
    }
    else {
      res.redirect("/auth/login");
    }
    
  });


  // router.get('/rejoindre_orga/:siren', function (req, res, next) {
  //   const siren = req.params.siren;
  //   result = offreModel.allinfoSiren(siren, function (error, result) {
  //   console.log(result)
  //     res.render('candidat/rejoindre_orga', { title: 'Candidat - rejoindre organisation', offre: result[0] });
  //   });
  // });
  
  // router.get('/mes_candidatures/:id', async function (req, res, next) {
  //   const id = req.params.id;
  //   const result = await candidatureModel.readByIdCandidat(id);
  //     console.log(result);
  //     res.render('candidat/candidature_c', {title : 'Candidat - Candidatures', offre: result[0]})
  // });

  router.get('/mes_candidatures', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      const cand = await candModel.readByEmail(session.usermail);
      const id = cand.id_candidat;
      const result = await candidatureModel.readCandidatureByCandidat(id);
      res.render('candidat/candidature_c', {title : 'Candidat - Candidatures', offres: result})
      console.log(result);
    }
    else {
      res.redirect("/auth/login");
    }
    // const result = await candidatureModel.readTest();
    //   console.log(result);
    //   res.render('candidat/candidature_c', {title : 'Candidat - Candidatures', offres: result})
  });

  router.get('/modif-cand/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      const id = req.params.id;
      console.log(id)
      const result = await candidatureModel.readPieces(id);
      console.log(result)
      res.render('candidat/candidat_modif_cand', { title: 'Candidat - Modification candidature', pieces: result});
    }
    else {
      res.redirect("/auth/login");
    }
    
  });


  router.get('/candidater/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      const id = req.params.id;
      console.log(id)
      const result = await candidatureModel.readPiecesByFiche(id);
      console.log(result)
      res.render('candidat/candidat_candidate', { title: 'Candidat - Candidater', pieces: result});
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
        res.render('candidat/confirmation_candidat');
      } else {
        res.render('candidat/new_recr');
      }
    }
    else {
      res.redirect("/auth/login");
    }
    
    
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

  router.get('/suppression_candidature/:id', async function (req, res) {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      const id = req.params.id;
      console.log(`id = ${id}`)
      let pieces = await candidatureModel.readPieces(id);
      console.log(pieces)
      for(let ele in pieces){
        console.log(pieces[ele].id_piece)
        await piecesModel.delete(pieces[ele].id_piece)
      }
      await candidatureModel.delete(id);
      res.redirect('/candidat/confirmation')
    }
    else {
      res.redirect("/auth/login");
    }
  })

module.exports = router;