var express = require('express');
var userModel = require('../model/utilisateur')
var offreModel = require('../model/offre_emploi')
var candidatureModel = require('../model/candidature')
var router = express.Router();

  router.get('/recruteur_main', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const result = await offreModel.allinfo();
      res.render('recruteur/recruteur_main', { title: 'List des offres', offres: result });
    } else {
      res.redirect('/auth/login')
    }
  });

  router.get('/recruteur_account', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      res.render('recruteur/recruteur_account');
    } else {
      res.redirect('/auth/login')
    }
    
  });

  router.get('/recruteur_modif_mail', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      res.render('recruteur/recruteur_modif_mail');
    } else {
      res.redirect('/auth/login')
    }
    
  });

  router.get('/recruteur_modif_mdp', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      res.render('recruteur/recruteur_modif_mdp');
    } else {
      res.redirect('/auth/login')
    }
      
  });

  router.get('/confirmation', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      res.render('recruteur/confirmation_recruteur');
    } else {
      res.redirect('/auth/login')
    }
    
  });

  router.get('/verif_suppr', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      res.render('recruteur/verif_suppr');
    } else {
      res.redirect('/auth/login')
    }
    
  });

  router.get('/voir-offre/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const id = req.params.id;
      console.log(id);
      const result = await offreModel.allinfoID(id);
      console.log(result)
      res.render('recruteur/recruteur_desc_offre', { title: 'Recruteur - description offre', offre: result[0] });
    } else {
      res.redirect('/auth/login')
    }
    
  });

  router.get('/search/:text', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const text =req.params.text;
      const result = await offreModel.allinfosearch(text);
      console.log(result);
      res.render('recruteur/recruteur_main', { title: 'Recruteur - search', offres: result})
    } else {
      res.redirect('/auth/login')
    }
    
  })

  router.get('/salaire_min/:text', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const text = req.params.text;
      const result = await offreModel.allinfoSalaire(text);
      console.log(result);
      res.render('recruteur/recruteur_main', { title: 'Recruteur - search', offres: result})
    } else {
      res.redirect('/auth/login')
    }
    
  })

  router.get('/localisation/:text', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const text =req.params.text;
      const result = await offreModel.allinfoLocate(text);
      console.log(result);
      res.render('recruteur/recruteur_main', { title: 'Recruteur - search', offres: result})
    } else {
      res.redirect('/auth/login')
    }
    
  })

  router.get('/candidater/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const id = req.params.id;
      console.log(id)
      const result = await candidatureModel.readPiecesByFiche(id);
      console.log(result)
      res.render('recruteur/recruteur_candidate', { title: 'Recruteur - Candidater', pieces: result});
    } else {
      res.redirect('/auth/login')
    }

  });

  router.get('/mes_candidatures', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const result = await candidatureModel.readTest();
      console.log(result);
      res.render('recruteur/candidature_r', {title : 'Recruteur - Candidatures', offres: result})
    } else {
      res.redirect('/auth/login')
    }

  });

  router.get('/recruteur_recr/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const id = req.params.id;
      const result = await offreModel.allinfoByRecruteur(id);
      console.log(result);
      res.render('recruteur/recruteur_recr', { title: 'List des offres', offres: result });
    } else {
      res.redirect('/auth/login')
    }

  });


  router.get('/voir-candidatures/:num', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const num = req.params.num;
      const result = await offreModel.candidatByOffre(num);
      console.log(result);
      res.render('recruteur/recruteur_cand_offre', { title: 'Liste des candidatures', users: result, num: num });
    } else {
      res.redirect('/auth/login')
    }

  });

  router.get('/modif-cand/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const id = req.params.id;
      console.log(id)
      const result = await candidatureModel.readPieces(id);
      console.log(result)
      res.render('recruteur/recruteur_modif_cand', { title: 'Recruteur - Modification candidature', pieces: result});
    } else {
      res.redirect('/auth/login')
    }

  });

  router.get('/modif-offre/:offre', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const offre = req.params.offre;
      console.log(offre)
      const result = await offreModel.read(offre);
      console.log(result)
      res.render('recruteur/recruteur_modif_offre', { title: 'Recruteur - Modification offre', offre: result});
    } else {
      res.redirect('/auth/login')
    }

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

  router.post('/confirm_modif_offre', (req, res) => {
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

  router.get('/recruteur_menu_offres', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      res.render('recruteur/recruteur_menu_offres')
    } else {
      res.redirect('/auth/login')
    }
    
  });

  router.get('/create_fiche', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      res.render('recruteur/create_fiche');
    } else {
      res.redirect('/auth/login')
    }

  })

  router.get('/create_offre', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      res.render('recruteur/create_offre');
    } else {
      res.redirect('/auth/login')
    }

  })

  router.get('/details_candidature_user/:num/:email', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "recruteur") {
      const num = req.params.num
      const email = req.params.email
      const user = await userModel.read(email);
      const candidature = await candidatureModel.readByIdCandidatOffre(user.id_utilisateur, num)
      const pieces = await candidatureModel.readPieces(candidature.id_c)
      console.log(pieces)
      res.render('recruteur/details_candidature_user', { title: 'Recruteur - Détails candidature', pieces: pieces, user: user, candidature: candidature})
    } else {
      res.redirect('/auth/login')
    }

  })

  module.exports = router;