var express = require('express');
var userModel = require('../model/utilisateur')
const candidatureModel = require('../model/candidature')
const piecesModel = require('../model/piece_dossier')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var router = express.Router();


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



/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  });


// router.get('/admin_visu_acc', async function (req, res, next) {
//   const result = await userModel.readall();
//   res.render('admin_visu_acc', { title: 'List des utilisateurs', users: result });
// });


router.get('/mes_candidatures', async (req, res, next) => {
  const session = req.session;
    if(session.usermail && (session.type_user === "candidat" || session.type_user == "recruteur")) {
      const result = await candidatureModel.readCandidatureByCandidat(session.user);
      res.render('user/mes_candidatures', {offres: result})
      console.log(result);
    }
    else {
      res.redirect("/auth/login");
    }
})


router.get('/modif-cand/:id/:offre', async function (req, res, next) {
  const session = req.session;
  if(session.usermail && (session.type_user === "candidat" || session.type_user == "recruteur")) {
    const id = req.params.id;
    const offre = req.params.offre;
    console.log(id)
    console.log(offre);
    const result = await candidatureModel.readPieces(id);
    console.log(result)
    res.render('user/modifier_candidature', {pieces: result, offre: offre});
  }
  else {
    res.redirect("/auth/login");
  }
  
});


router.post('/confirm_modif_cand', upload.array('piece'), async (req, res) => {
  const session = req.session;
  if(session.usermail && (session.type_user === "candidat" || session.type_user == "recruteur")) {
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


router.get('/verif_suppr/:id', function (req, res, next) {
  const session = req.session;
  if(session.usermail && (session.type_user === "candidat" || session.type_user == "recruteur")) {
    const id = req.params.id
    res.render('user/verif_suppression', {id:id});
  }
  else {
    res.redirect("/auth/login");
  }
});

router.get('/redirect', function (req, res, next) {
  const session = req.session;
  if(session.usermail) {
    res.render('user/redirect');
  }
  else {
    res.redirect("/auth/login");
  }
});


router.get('/suppression_candidature/:id', async function (req, res) {
  const session = req.session;
  if(session.usermail && (session.type_user === "candidat" || session.type_user == "recruteur")) {
    const id = req.params.id;
    console.log(`id = ${id}`)
    let pieces = await candidatureModel.readPieces(id);
    console.log(pieces)
    for(let ele in pieces){
      console.log(pieces[ele].id_piece)
      await piecesModel.delete(pieces[ele].id_piece)
    }
    await candidatureModel.delete(id);
    res.render('user/redirect')
  }
  else {
    res.redirect("/auth/login");
  }
})

router.get('/mon_compte', function (req, res, next) {
  const session = req.session;
  if(session.usermail) {
    res.render('user/mon_compte', {type_user: session.type_user});
  }
  else {
    res.redirect("/auth/login");
  }
});


router.get('/modif_mail', function (req, res, next) {
  const session = req.session;
  if(session.usermail) {
    const error_mdp = session.error_mdp || '';
    const error_new_mail = session.error_new_mail || '';
    const error_old_mail = session.error_old_mail || '';
    session.error_mdp = '';
    session.error_new_mail = '';
    session.error_old_mail = '';
    res.render('user/modifier_mail', {error_mdp, error_new_mail, error_old_mail});
  }
  else {
    res.redirect("/auth/login");
  }
  
});

router.get('/modif_mdp', function (req, res, next) {
  const session = req.session;
  if(session.usermail) {
    const error_new_pwd = session.error_new_pwd || '';
    const error_old_pwd = session.error_old_pwd || '';
    session.error_new_pwd = '';
    session.error_old_pwd = '';
    res.render('user/modifier_mdp', {error_new_pwd, error_old_pwd});
  }
  else {
    res.redirect("/auth/login");
  }
    
});

router.post('/update_mail', async (req, res) => {
  const session = req.session;
  if(session.usermail) {
    const old_mail = session.usermail;
    const old_mail_form = req.body.old_mail
    if(old_mail === old_mail_form){
      const result = await userModel.arevalid(old_mail, req.body.password);
      const verif = await userModel.read(req.body.new_mail);
      if(result) {
        if(!verif){
          await userModel.updateMail(old_mail, req.body.new_mail)
          req.session.usermail = req.body.new_mail;
          res.render('user/redirect');
        } else {
          session.error_new_mail = "Cette adresse mail est déjà utilisée par un compte !";
          res.redirect('modif_mail');
        }
        
      } else {
        session.error_mdp = "Mot de passe invalide !";
        res.redirect('modif_mail');
      }
    }
    else {
      session.error_old_mail = "Ancien mail invalide !";
      res.redirect('modif_mail');
    }
  }
  else {
    res.redirect("/auth/login");
  }
});

router.post('/update_mdp', async (req, res) => {
  const session = req.session;
  if(session.usermail) {
    const mail = session.usermail;
    const old_pwd = req.body.old_password;
    const new_pwd = req.body.new_password
    const new_pwd2 = req.body.new_password2
    const result = await userModel.arevalid(mail, old_pwd);
    if(result) {
      if(new_pwd == new_pwd2) {
        await userModel.updatePassword(mail, new_pwd)
        res.render('user/redirect');
      } else {
        session.error_new_pwd = "Les mots de passe ne sont pas identiques !";
        res.redirect('modif_mdp');
      }
    } else {
      session.error_old_pwd = "Mot de passe non valide !";
      res.redirect('modif_mdp');
    }
  }
  else {
    res.redirect("/auth/login");
  }
});

module.exports = router;