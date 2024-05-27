var express = require('express');
const request = require('supertest')
const app = require('../app');
const { route } = require('../routes');
const agent = request.agent(app);
var router = express.Router();


// describe("test routes (?)", () => {
//     test("réponse méthode GET", done => {
//         request(app)
//         .get("/")
//         .then(response => {
//             expect(response.statusCode).toBe(200);
//             done();
//         });
//     });
// });

beforeAll((done) => {
    agent
        .post('/auth/login')
        .send({ email: 'johnny@gmail.com', password: 'JohnnyJeTAime' })
        .expect(302)
        .end(function (err, res) {
            if (err) return done(err);

            agent.get('/').expect(200, done);
        });
});


afterAll((done) => {

    agent.get('/auth/logout').expect(302, done);

});

describe("test routes auth", () => {
    test("réponse méthode GET", async () => {
        const reponse = await request(app).get("/auth/login");
        expect(reponse.statusCode).toBe(200);
        expect(reponse.text).toContain('form');
    });

    // test("GET /auth/logout supprime la session et redirige vers /auth/login", async () => {
    //     const response = await request(app).get('/auth/logout');
    //     expect(response.statusCode).toBe(302);
    //     expect(response.headers.location).toBe('/auth/login');
    // });

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

    test("GET /verif_suppr redirects to login if not authenticated", async () => {
        const response = await request(app).get('/candidat/verif_suppr');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /verif_suppr when authenticated", async () => {
        const response = await agent.get('/candidat/verif_suppr');
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
        const response = await request(app).get('/candidat/voir-offre/1');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /voir-offre/:id when authenticated", async () => {
        const response = await agent.get('/candidat/voir-offre/1');
        expect(response.statusCode).toBe(200);
    });

    test("GET /modif-offre/:id redirects to login if not authenticated", async () => {
        const response = await request(app).get('/candidat/modif-offre/1');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /modif-offre/:id when authenticated", async () => {
        const response = await agent.get('/candidat/modif-offre/1');
        expect(response.statusCode).toBe(200);
    });

    test("GET /candidater/:id redirects to login if not authenticated", async () => {
        const response = await request(app).get('/candidat/candidater/1');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /candidater/:id when authenticated", async () => {
        const response = await agent.get('/candidat/candidater/1');
        expect(response.statusCode).toBe(200);
    });

    // test("GET /candidat_main retourne les offres si connecté", () => {
    //     agent
    //     .post("/auth/login")
    //     .send({email: "johnny@gmail.com", password: "JohnnyJeTAime"})
    //     .end((loginErr, loginRes) => {
    //         if(loginErr) {
    //             document(loginErr)
    //         } else {
    //             agent.get("/candidat/candidat_main")
    //             .then(response => {
    //                 expect(response.statusCode).toBe(200);
    //                 agent.get("/auth/logout")
    //                 .then(response2 => {
    //                     expect(response2.statusCode).toBe(302);
    //                     document();
    //                 })
    //                 .catch(logoutErr => {
    //                     document(logoutErr);
    //                 })
    //             })
    //             .catch(routeErr => {
    //                 document(routeErr)
    //             })
    //         }
    //     })


    // });
})