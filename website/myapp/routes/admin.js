var express = require('express');
var userModel = require('../model/utilisateur')
var adminModel = require('../model/admin')
var recruteurModel = require('../model/recruteur')
var organisationModel = require('../model/organisation')
var router = express.Router();


router.get('/account', function (req, res, next) {
    //if (req.session.user_type !== 'administrateur') {
    //    return res.redirect('/');
    //}
 console.log( req.session.successMessage );
        userModel.getByStatusAndType("inactif", "candidat", function (error, result) {
            res.render('AdminHomePageNewM', { title: 'Homepage - admin', users: result});
        });
        delete req.session.successMessage;

    }
);

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
    });

    // router.get('/admin_visu_acc', function (req, res, next) {
    // result=userModel.readall(function(result){
    // res.render('admin/admin_visu_acc', { title: 'List des utilisateurs', users: result });
    // });
    // });

    router.get('/admin_visu_acc', async function (req, res, next) {
        const result = await userModel.readall();
        res.render('admin/admin_visu_acc', { title: 'List des utilisateurs', users: result });
        });


router.get('/admin_account', function (req, res, next) {
    res.render('admin/admin_account');
})

router.get('/admin_modif_mail', function (req, res, next) {
    res.render('admin/admin_modif_mail');
});

router.get('/admin_modif_mdp', function (req, res, next) {
    res.render('admin/admin_modif_mdp');
});

router.get('/admin_main', function (req, res, next) {
    res.render('admin/admin_main');
});

router.get('/confirmation', function (req, res, next) {
    res.render('admin/confirmation_admin');
});

router.get('/admin_enr_orga', async function (req, res, next) {
    const result = await organisationModel.readByStatut('en attente');
    res.render('admin/admin_enr_orga', { title: 'Admin - Validation Organisation', orgas: result});
});

router.get('/valide_orga/:siren', async function (req, res, next) {
    const siren = req.params.siren;
    const result = await organisationModel.read(siren);
    res.render('admin/admin_valide_orga', { title: 'Admin - Validation Organisation', orga: result});
});

// router.get('/admin_enr_recr', function (req, res, next) {
//     console.log("test")
//     result = recruteurModel.readByStatut('en attente', function(error, result) {
//         console.log(result)
//         res.render('admin/admin_enr_recr', { title: 'Admin - Validation Recruteur', users: result});
//     })
// })

router.get('/admin_enr_recr', async function (req, res, next) {
    const result = await recruteurModel.readByStatut('en attente');
    res.render('admin/admin_visu_acc', { title: 'Admin - Validation Recruteur', users: result });
});

  router.post('/update_mail', (req, res) => {
    // db.query('SELECT * FROM Organisation WHERE siren = ?', [siren], (err, results) => {
    //     if (results.length > 0) {
    //         res.render('candidat/confirmation_candidat');
    //     } else {
    //         res.render('candidat/new_recr');
    //     }
    // });
    res.render('admin/confirmation_admin');
  });

  router.post('/update_mdp', (req, res) => {
    // db.query('SELECT * FROM Organisation WHERE siren = ?', [siren], (err, results) => {
    //     if (results.length > 0) {
    //         res.render('candidat/confirmation_candidat');
    //     } else {
    //         res.render('candidat/new_recr');
    //     }
    // });
    res.render('admin/confirmation_admin');
  });

module.exports = router;