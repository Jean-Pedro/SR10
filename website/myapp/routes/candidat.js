var db = require('../model/db')
var express = require('express');
var userModel = require('../model/utilisateur')
var offreModel = require('../model/offre_emploi')
var candModel = require('../model/candidat')
var candidatureModel = require('../model/candidature');
const orgaModel = require('../model/organisation');
const recrModel = require('../model/recruteur');
const piecesModel = require('../model/piece_dossier');
const adresseModel = require('../model/adresse')
const typeOrgaModel = require('../model/type_organisation')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var router = express.Router();

// const uploadDir = path.join(__dirname, '../uploads');

// // Vérifiez et créez le dossier d'upload si nécessaire
// if (!fs.existsSync(uploadDir)){
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

function assureTableau(variable) {
  if (!Array.isArray(variable)) {
    // Si la variable n'est pas un tableau, on la convertit en tableau
    return [variable];
  }
  // Sinon, on retourne la variable telle quelle car elle est déjà un tableau
  return variable;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

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


router.get('/all_offres', async function (req, res, next) {
  const session = req.session;
  if(session.usermail && session.type_user === "candidat") {
    const result = await offreModel.allinfo();
    res.render('candidat/candidat_main', {offres: result });
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

  router.get('/devenir_recruteur', async function (req, res, next) {
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


router.get('/voir-offre/:num', async function (req, res, next) {
  const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      const num = req.params.num;
      const result = await offreModel.allinfoOffre(num);
      console.log(result)
      res.render('candidat/candidat_desc_offre', { title: 'Candidat - description offre', offre: result });
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

  router.get('/modif-cand/:id/:offre', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      const id = req.params.id;
      const offre = req.params.offre;
      console.log(id)
      console.log(offre);
      const result = await candidatureModel.readPieces(id);
      console.log(result)
      res.render('candidat/candidat_modif_cand', { title: 'Candidat - Modification candidature', pieces: result, offre: offre});
    }
    else {
      res.redirect("/auth/login");
    }
    
  });


  router.get('/candidater/:id/:num', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      const id = req.params.id;
      const num = req.params.num;
      console.log(id)
      const verif = await candidatureModel.readByIdCandidatOffre(session.user, num)
      console.log(verif)
      if(!verif){
        const result = await offreModel.readPieces(num);
        console.log(result)
        res.render('candidat/candidat_candidate', { title: 'Candidat - Candidater', pieces: result, offre: num});
      }
      else {
        res.redirect("/auth/login");
      }
      
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
        res.render('user/redirect');
      } else {
        res.render('candidat/new_recr');
      }
    }
    else {
      res.redirect("/auth/login");
    }
    
    
  });

  router.post('/confirm_orga', async (req, res) => {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      const verif = await orgaModel.read(req.body.siren)
      console.log(verif)
      if(!verif){
        const adresse = await adresseModel.create(req.body.num, req.body.rue, req.body.ville, req.body.code_postal);
        const type_orga = await typeOrgaModel.create(req.body.type);
        const orga = await orgaModel.create(req.body.siren, req.body.nom, adresse, type_orga, req.body.logo);
        const recruteur = await recrModel.createRecr(session.user, orga)
        res.render('user/redirect');
      } else {
        res.render('candidat/candidat_create_orga')
      }
    }
    else {
      res.redirect("/auth/login");
    }
  });

  router.post('/confirm_modif_cand', upload.array('piece'), async (req, res) => {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      const offre = req.body.offre;
      const files = req.files;
      const types = assureTableau(req.body.type);
      const candidature = assureTableau(req.body.candidature);
      const id_pieces = assureTableau(req.body.id_piece);

      for(let ele in files){
        let file = files[ele];
        let type = types[ele];
        let cand = candidature[ele];
        let id_piece = id_pieces[ele];
        let old_piece = await piecesModel.read(id_piece);
        old_piece = old_piece.fichier;
        console.log(old_piece)

        // const filePath = path.join(__dirname, 'public/uploads/', old_piece); // Ajustez le chemin selon votre structure de dossier
        // fs.unlink(filePath, err => {
        //   if(err) {
        //     console.error(`Erreur lors de la suppression du fichier ${filePath}:`, err);
        //     res.status(500).send('Erreur lors de la suppression des fichiers.');
        //   } else {
        //     console.log(`Fichier ${filePath} supprimé avec succès.`);
        //   }
        // });

        await piecesModel.updateFichier(id_piece, file.originalname);
      }
      res.render('user/redirect');
    }
    else {
      res.redirect("/auth/login");
    }
  });

  router.post('/update_mail', async (req, res) => {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      const old_mail = session.usermail;
      const result = await userModel.arevalid(old_mail, req.body.password);
      const verif = await userModel.read(req.body.mail);
      if(result && !verif) {
        await userModel.updateMail(old_mail, req.body.mail)
        req.session.usermail = req.body.mail;
        res.render('user/redirect');
      }
    }
    else {
      res.redirect("/auth/login");
    }
  });

  router.post('/update_mdp', async (req, res) => {
    const session = req.session;
    if(session.usermail && session.type_user === "candidat") {
      const mail = session.usermail;
      const old_pwd = req.body.old_password;
      const new_pwd = req.body.new_password
      const new_pwd2 = req.body.new_password2
      const result = await userModel.arevalid(mail, old_pwd);
      if(result && (new_pwd == new_pwd2)) {
        await userModel.updatePassword(mail, new_pwd)
        res.render('user/redirect');
      }
    }
    else {
      res.redirect("/auth/login");
    }
  });

  
  router.post('/valide_cand', upload.array('piece'), async (req, res) => {
    const session = req.session;
    if (session.usermail && session.type_user === "candidat") {
      const files = req.files;
      const types = req.body.type;
      const offre = req.body.offre
      console.log(files);
      const candidature = await candidatureModel.create(offre, session.user);
      for(let ele in files){
        const file = files[ele];
        const type = types[ele];
        await piecesModel.create(type, candidature, file.originalname);
      }
      res.render('user/redirect');
    } else {
      res.redirect("/auth/login");
    }
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