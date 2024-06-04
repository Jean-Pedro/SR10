var express = require('express');
var userModel = require('../model/utilisateur')
const candidatModel = require('../model/candidat')
var adminModel = require('../model/admin')
var recruteurModel = require('../model/recruteur')
var organisationModel = require('../model/organisation')
var router = express.Router();


// router.get('/account', function (req, res, next) {
    
//  console.log( req.session.successMessage );
//         userModel.getByStatusAndType("inactif", "candidat", function (error, result) {
//             res.render('AdminHomePageNewM', { title: 'Homepage - admin', users: result});
//         });
//         delete req.session.successMessage;

//     }
// );

    // router.get('/admin_visu_acc', function (req, res, next) {
    // result=userModel.readall(function(result){
    // res.render('admin/admin_visu_acc', { title: 'List des utilisateurs', users: result });
    // });
    // });

    router.get('/admin_visu_acc', async function (req, res, next) {
        const session = req.session;
        if(session.usermail && session.type_user === "admin") {
            const result = await userModel.readall();
            res.render('admin/admin_visu_acc', { title: 'List des utilisateurs', users: result });
        } else {
            res.redirect("/auth/login");
        }

    });


router.get('/admin_account', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        res.render('admin/admin_account');
    } else {
        res.redirect("/auth/login");
    }

})

router.get('/admin_modif_mail', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        res.render('admin/admin_modif_mail');
    } else {
        res.redirect("/auth/login");
    }

});

router.get('/admin_modif_mdp', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        res.render('admin/admin_modif_mdp');
    } else {
        res.redirect("/auth/login");
    }

});

router.get('/admin_main', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        res.render('admin/admin_main');
    }else {
      res.redirect("/auth/login");
    }


});

router.get('/confirmation_admin', function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        res.render('admin/confirmation_admin');
    } else {
        res.redirect("/auth/login");
    }

});

router.get('/confirmation_passage_admin/:id', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        const id = req.params.id;
        // const role = await userModel.checkRole(id)
        // console.log(role.role)
        // if(role.role === "Candidat"){
        //     await candidatModel.delete(id);
        // } else if(role.role === "Recruteur"){
        //     await recruteurModel.fired(id);
        // }
        await userModel.updateAdministrateur(id);
        await adminModel.create(id)
        res.render('user/redirect');
    } else {
        res.redirect("/auth/login");
    }

});

router.get('/admin_enr_orga', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        const result = await organisationModel.readByStatut('en attente');
        res.render('admin/admin_enr_orga', { title: 'Admin - Validation Organisation', orgas: result});
    } else {
        res.redirect("/auth/login");
    }

});

router.get('/valide_orga/:siren', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        const siren = req.params.siren;
        const result = await organisationModel.read(siren);
        res.render('admin/admin_valide_orga', { title: 'Admin - Validation Organisation', orga: result});
    } else {
        res.redirect("/auth/login");
    }

});

router.get('/user_recr_details/:email', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        var email = req.params.email;
        email.toString()
        const result = await userModel.read(email);
        console.log(result)
        res.render('admin/user_recr_details', {title: 'Admin - Visu Account', user: result})
    } else {
        res.redirect("/auth/login");
    }

});

router.get('/user_details/:email', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        var email = req.params.email;
        email.toString()
        const result = await userModel.read(email);
        console.log(result)
        res.render('admin/user_details', {title: 'Admin - Visu Account', user: result})
    } else {
        res.redirect("/auth/login");
    }

})

// router.get('/admin_enr_recr', function (req, res, next) {
//     console.log("test")
//     result = recruteurModel.readByStatut('en attente', function(error, result) {
//         console.log(result)
//         res.render('admin/admin_enr_recr', { title: 'Admin - Validation Recruteur', users: result});
//     })
// })

router.get('/admin_enr_recr', async function (req, res, next) {
    const session = req.session;
    if(session.usermail && session.type_user === "admin") {
        const result = await recruteurModel.readByStatut('en attente');
        res.render('admin/admin_enr_recr', { title: 'Admin - Validation Recruteur', users: result });
    } else {
        res.redirect("/auth/login");
    }

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


//   router.get('/desc_account', async function (req, res, next) {
//     const type = await userModel.checkType()
//   })

module.exports = router;