var express = require('express');
const request = require('supertest')
const app = require('../app');
const { route } = require('../routes');
const agentAdmin = request.agent(app);
const candidatRouter = require('../model/candidat')
const recruteurRouter = require('../model/recruteur')
const adminRouter = require('../model/admin')
var router = express.Router();


beforeAll((done) => {
    agentAdmin.post('/auth/login')
        .send({ email: 'admintest@gmail.com', password: 'Jesuis1superadmin!' })
        .expect(302)
        .end(function (err, res) {
            if (err) return done(err);

            agentAdmin.get('/').expect(200, done);
        });

    
});


afterAll((done) => {
    agentAdmin.get('/auth/logout').expect(302, done);    

});

describe("Admin Routes", () => {
    test("GET /admin_visu_acc when not authenticated", async () => {
        const response = await request(app).get('/admin/admin_visu_acc');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /admin_visu_acc when authenticated", async () => {
        const response = await agentAdmin.get('/admin/admin_visu_acc');
        expect(response.statusCode).toBe(200);
    });

    test("GET /admin_account when not authenticated", async () => {
        const response = await request(app).get('/admin/admin_account');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /admin_account when authenticated", async () => {
        const response = await agentAdmin.get('/admin/admin_account');
        expect(response.statusCode).toBe(200);
    });

    test("GET /admin_modif_mail when not authenticated", async () => {
        const response = await request(app).get('/admin/admin_modif_mail');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /admin_modif_mail when authenticated", async () => {
        const response = await agentAdmin.get('/admin/admin_modif_mail');
        expect(response.statusCode).toBe(200);
    });

    test("GET /admin_modif_mdp when not authenticated", async () => {
        const response = await request(app).get('/admin/admin_modif_mdp');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /admin_modif_mdp when authenticated", async () => {
        const response = await agentAdmin.get('/admin/admin_modif_mdp');
        expect(response.statusCode).toBe(200);
    });

    test("GET /admin_main when not authenticated", async () => {
        const response = await request(app).get('/admin/admin_main');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /admin_main when authenticated", async () => {
        const response = await agentAdmin.get('/admin/admin_main');
        expect(response.statusCode).toBe(200);
    });

    test("GET /confirmation_admin when not authenticated", async () => {
        const response = await request(app).get('/admin/confirmation_admin');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /confirmation_admin when authenticated", async () => {
        const response = await agentAdmin.get('/admin/confirmation_admin');
        expect(response.statusCode).toBe(200);
    });

    test("GET /admin_enr_orga when not authenticated", async () => {
        const response = await request(app).get('/admin/admin_enr_orga');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /admin_enr_orga when authenticated", async () => {
        const response = await agentAdmin.get('/admin/admin_enr_orga');
        expect(response.statusCode).toBe(200);
    });

    test("GET /valide_orga/:siren when not authenticated", async () => {
        const response = await request(app).get('/admin/valide_orga/8765');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /valide_orga/:siren when authenticated", async () => {
        const response = await agentAdmin.get('/admin/valide_orga/8765');
        expect(response.statusCode).toBe(200);
    });

    test("GET /user_recr_details/:email when not authenticated", async () => {
        const response = await request(app).get('/admin/user_recr_details/recruteur2@gmail.com');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /user_recr_details/:email when authenticated", async () => {
        const response = await agentAdmin.get('/admin/user_recr_details/recruteur2@gmail.com');
        expect(response.statusCode).toBe(200);
    });

    test("GET /user_details/:email when not authenticated", async () => {
        const response = await request(app).get('/admin/user_details/francoisrene@yahoo.fr');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /user_details/:email when authenticated", async () => {
        const response = await agentAdmin.get('/admin/user_details/francoisrene@yahoo.fr');
        expect(response.statusCode).toBe(200);
    });

});