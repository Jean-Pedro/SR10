var express = require('express');
const request = require('supertest')
const app = require('../app');
const { route } = require('../routes');
const agent = request.agent(app);
const agentRecr = request.agent(app);
const agentAdmin = request.agent(app);
const candidatRouter = require('../model/candidat')
const recruteurRouter = require('../model/recruteur')
const adminRouter = require('../model/admin')
var router = express.Router();


beforeAll((done) => {
    agent.post('/auth/login')
        .send({ email: 'jeandelatesterie@gmail.com', password: "J'adoreLesTests42" })
        .expect(302)
        .end(function (err, res) {
            if (err) return done(err);

            agent.get('/').expect(200, done);
        });

    // agentRecr.post('/auth/login')
    //     .send({ email: 'Pak2BiaireJean@gmail.com', password: 'P@ssw0rd123!#' })
    //     .expect(302)
    //     .end(function (err, res) {
    //         if (err) return done(err);

    //         agentRecr.get('/').expect(200, done);
    //     });

    // agentAdmin.post('/auth/login')
    //     .send({ email: 'admintest@gmail.com', password: 'Jesuis1superadmin!' })
    //     .expect(302)
    //     .end(function (err, res) {
    //         if (err) return done(err);

    //         agentAdmin.get('/').expect(200, done);
    //     });

    
});


afterAll((done) => {

    agent.get('/auth/logout').expect(302, done);
    // agentRecr.get('/auth/logout').expect(302, done);
    // agentAdmin.get('/auth/logout').expect(302, done);    

});

// const idAgentRecr = recruteurRouter.read('Pak2BiaireJean@gmail.com').id_recruteur
// console.log(idAgentRecr)

// const idAgentAdmin = adminRouter.readByEmail('admintest@gmail.com').id_administrateur

describe("test routes auth", () => {
    test("réponse méthode GET", async () => {
        const reponse = await request(app).get("/auth/login");
        expect(reponse.statusCode).toBe(200);
        expect(reponse.text).toContain('form');
    });

    test("GET /auth sans user", async () => {
        const reponse = await request(app).get("/auth");
        expect(reponse.statusCode).toBe(302);
        expect(reponse.headers.location).toBe('/auth/login');
    });

    test("GET /auth avec user", async () => {
        const reponse = await agent.get("/auth");
        expect(reponse.statusCode).toBe(302);
        expect(reponse.headers.location).toBe('candidat/candidat_main');
    });


});



describe("test routes candidat", () => {
    test("GET /candidat_main redirige vers login si non connecté", async () => {
        const response = await request(app).get('/candidat/candidat_main');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /candidat_main en étant connecté", async () => {
        const response = await agent.get('/candidat/candidat_main');
        expect(response.statusCode).toBe(200);
    });

    test("GET /candidat_account redirige vers login si non connecté", async () => {
        const response = await request(app).get('/candidat/candidat_account');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /candidat_account en étant connecté", async () => {
        const response = await agent.get('/candidat/candidat_account');
        expect(response.statusCode).toBe(200);
    });

    test("GET /mes_candidatures redirige vers login si non connecté", async () => {
        const response = await request(app).get('/candidat/mes_candidatures');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /mes_candidatures en étant connecté", async () => {
        const response = await agent.get('/candidat/mes_candidatures');
        expect(response.statusCode).toBe(200);
    });

    test("GET /candidat_modif_mail redirige vers login si non connecté", async () => {
        const response = await request(app).get('/candidat/candidat_modif_mail');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /candidat_modif_mail en étant connecté", async () => {
        const response = await agent.get('/candidat/candidat_modif_mail');
        expect(response.statusCode).toBe(200);
    });

    test("GET /candidat_modif_mdp redirige vers login si non connecté", async () => {
        const response = await request(app).get('/candidat/candidat_modif_mdp');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /candidat_modif_mdp en étant connecté", async () => {
        const response = await agent.get('/candidat/candidat_modif_mdp');
        expect(response.statusCode).toBe(200);
    });

    test("GET /new_recr redirige vers login si non connecté", async () => {
        const response = await request(app).get('/candidat/new_recr');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /new_recr en étant connecté", async () => {
        const response = await agent.get('/candidat/new_recr');
        expect(response.statusCode).toBe(200);
    });

    test("GET /create_orga redirects to login if not authenticated", async () => {
        const response = await request(app).get('/candidat/create_orga');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /create_orga when authenticated", async () => {
        const response = await agent.get('/candidat/create_orga');
        expect(response.statusCode).toBe(200);
    });

    test("GET /confirmation redirects to login if not authenticated", async () => {
        const response = await request(app).get('/candidat/confirmation');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /confirmation when authenticated", async () => {
        const response = await agent.get('/candidat/confirmation');
        expect(response.statusCode).toBe(200);
    });

    test("GET /search/:text redirects to login if not authenticated", async () => {
        const response = await request(app).get('/candidat/search/some_text');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /search/:text when authenticated", async () => {
        const response = await agent.get('/candidat/search/some_text');
        expect(response.statusCode).toBe(200);
    });

    test("GET /localisation/:text redirects to login if not authenticated", async () => {
        const response = await request(app).get('/candidat/localisation/some_text');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /localisation/:text when authenticated", async () => {
        const response = await agent.get('/candidat/localisation/some_text');
        expect(response.statusCode).toBe(200);
    });

    test("GET /salaire_min/:text redirects to login if not authenticated", async () => {
        const response = await request(app).get('/candidat/salaire_min/some_text');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /salaire_min/:text when authenticated", async () => {
        const response = await agent.get('/candidat/salaire_min/some_text');
        expect(response.statusCode).toBe(200);
    });

    test("GET /voir-offre/:id redirects to login if not authenticated", async () => {
        const response = await request(app).get('/candidat/voir-offre/4');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /voir-offre/:id when authenticated", async () => {
        const response = await agent.get('/candidat/voir-offre/4');
        expect(response.statusCode).toBe(200);
    });

    test("GET /modif-cand/:id/:offre redirects to login if not authenticated", async () => {
        const response = await request(app).get(`/candidat/modif-cand/10/1100`);
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /modif-cand/:id/:offre when authenticated", async () => {
        const response = await agent.get('/candidat/modif-cand/10/1100');
        expect(response.statusCode).toBe(200);
    });


});

// describe("test des routes recruteur", () => {
//     test("GET /recruteur_main when not authenticated", async () => {
//         const response = await request(app).get('/recruteur/recruteur_main');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /recruteur_main when authenticated", async () => {
//         const response = await agentRecr.get('/recruteur/recruteur_main');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /recruteur_account when not authenticated", async () => {
//         const response = await request(app).get('/recruteur/recruteur_account');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /recruteur_account when authenticated", async () => {
//         const response = await agentRecr.get('/recruteur/recruteur_account');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /recruteur_modif_mail when not authenticated", async () => {
//         const response = await request(app).get('/recruteur/recruteur_modif_mail');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /recruteur_modif_mail when authenticated", async () => {
//         const response = await agentRecr.get('/recruteur/recruteur_modif_mail');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /recruteur_modif_mdp when not authenticated", async () => {
//         const response = await request(app).get('/recruteur/recruteur_modif_mdp');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /recruteur_modif_mdp when authenticated", async () => {
//         const response = await agentRecr.get('/recruteur/recruteur_modif_mdp');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /confirmation when not authenticated", async () => {
//         const response = await request(app).get('/recruteur/confirmation');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /confirmation when authenticated", async () => {
//         const response = await agentRecr.get('/recruteur/confirmation');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /voir-offre/:id when not authenticated", async () => {
//         const response = await request(app).get('/recruteur/voir-offre/4');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /voir-offre/:id when authenticated", async () => {
//         const response = await agentRecr.get('/recruteur/voir-offre/4');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /search/:text when not authenticated", async () => {
//         const response = await request(app).get('/recruteur/search/sample-text');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /search/:text when authenticated", async () => {
//         const response = await agentRecr.get('/recruteur/search/sample-text');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /salaire_min/:text when not authenticated", async () => {
//         const response = await request(app).get('/recruteur/salaire_min/sample-text');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /salaire_min/:text when authenticated", async () => {
//         const response = await agentRecr.get('/recruteur/salaire_min/sample-text');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /localisation/:text when not authenticated", async () => {
//         const response = await request(app).get('/recruteur/localisation/sample-text');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /localisation/:text when authenticated", async () => {
//         const response = await agentRecr.get('/recruteur/localisation/sample-text');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /candidater/:id/:num when not authenticated", async () => {
//         const response = await request(app).get('/recruteur/candidater/4/1100');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /candidater/:id/:num when authenticated", async () => {
//         const response = await agentRecr.get('/recruteur/candidater/4/1100');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /mes_candidatures when not authenticated", async () => {
//         const response = await request(app).get('/recruteur/mes_candidatures');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /mes_candidatures when authenticated", async () => {
//         const response = await agentRecr.get('/recruteur/mes_candidatures');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /recruteur_recr when not authenticated", async () => {
//         const response = await request(app).get(`/recruteur/recruteur_recr`);
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /recruteur_recr when authenticated", async () => {
//         const response = await agentRecr.get(`/recruteur/recruteur_recr`);
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /voir-candidatures/:num when not authenticated", async () => {
//         const response = await request(app).get('/recruteur/voir-candidatures/1100');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /voir-candidatures/:num when authenticated", async () => {
//         const response = await agentRecr.get('/recruteur/voir-candidatures/1100');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /modif-cand/:id/:offre when not authenticated", async () => {
//         const response = await request(app).get('/recruteur/modif-cand/917/842596');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /modif-cand/:id when authenticated", async () => {
//         const response = await agentRecr.get('/recruteur/modif-cand/917/842596');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /modif-offre/:offre when not authenticated", async () => {
//         const response = await request(app).get('/recruteur/modif-offre/1100');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /modif-offre/:offre when authenticated", async () => {
//         const response = await agentRecr.get('/recruteur/modif-offre/1100');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /recruteur_menu_offres when not authenticated", async () => {
//         const response = await request(app).get('/recruteur/recruteur_menu_offres');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /recruteur_menu_offres when authenticated", async () => {
//         const response = await agentRecr.get('/recruteur/recruteur_menu_offres');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /create_fiche when not authenticated", async () => {
//         const response = await request(app).get('/recruteur/create_fiche');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /create_fiche when authenticated", async () => {
//         const response = await agentRecr.get('/recruteur/create_fiche');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /create_offre when not authenticated", async () => {
//         const response = await request(app).get('/recruteur/create_offre');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /create_offre when authenticated", async () => {
//         const response = await agentRecr.get('/recruteur/create_offre');
//         expect(response.statusCode).toBe(200);
//     });

// });


// describe("Admin Routes", () => {
//     test("GET /admin_visu_acc when not authenticated", async () => {
//         const response = await request(app).get('/admin/admin_visu_acc');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /admin_visu_acc when authenticated", async () => {
//         const response = await agentAdmin.get('/admin/admin_visu_acc');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /admin_account when not authenticated", async () => {
//         const response = await request(app).get('/admin/admin_account');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /admin_account when authenticated", async () => {
//         const response = await agentAdmin.get('/admin/admin_account');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /admin_modif_mail when not authenticated", async () => {
//         const response = await request(app).get('/admin/admin_modif_mail');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /admin_modif_mail when authenticated", async () => {
//         const response = await agentAdmin.get('/admin/admin_modif_mail');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /admin_modif_mdp when not authenticated", async () => {
//         const response = await request(app).get('/admin/admin_modif_mdp');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /admin_modif_mdp when authenticated", async () => {
//         const response = await agentAdmin.get('/admin/admin_modif_mdp');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /admin_main when not authenticated", async () => {
//         const response = await request(app).get('/admin/admin_main');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /admin_main when authenticated", async () => {
//         const response = await agentAdmin.get('/admin/admin_main');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /confirmation_admin when not authenticated", async () => {
//         const response = await request(app).get('/admin/confirmation_admin');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /confirmation_admin when authenticated", async () => {
//         const response = await agentAdmin.get('/admin/confirmation_admin');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /admin_enr_orga when not authenticated", async () => {
//         const response = await request(app).get('/admin/admin_enr_orga');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /admin_enr_orga when authenticated", async () => {
//         const response = await agentAdmin.get('/admin/admin_enr_orga');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /valide_orga/:siren when not authenticated", async () => {
//         const response = await request(app).get('/admin/valide_orga/8765');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /valide_orga/:siren when authenticated", async () => {
//         const response = await agentAdmin.get('/admin/valide_orga/8765');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /user_recr_details/:email when not authenticated", async () => {
//         const response = await request(app).get('/admin/user_recr_details/recruteur2@gmail.com');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /user_recr_details/:email when authenticated", async () => {
//         const response = await agentAdmin.get('/admin/user_recr_details/recruteur2@gmail.com');
//         expect(response.statusCode).toBe(200);
//     });

//     test("GET /user_details/:email when not authenticated", async () => {
//         const response = await request(app).get('/admin/user_details/francoisrene@yahoo.fr');
//         expect(response.statusCode).toBe(302);
//         expect(response.headers.location).toBe('/auth/login');
//     });

//     test("GET /user_details/:email when authenticated", async () => {
//         const response = await agentAdmin.get('/admin/user_details/francoisrene@yahoo.fr');
//         expect(response.statusCode).toBe(200);
//     });

// });