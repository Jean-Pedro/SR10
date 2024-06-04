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
    agentRecr.post('/auth/login')
        .send({ email: 'Pak2BiaireJean@gmail.com', password: 'P@ssw0rd123!#' })
        .expect(302)
        .end(function (err, res) {
            if (err) return done(err);

            agentRecr.get('/').expect(200, done);
        });
    
});


afterAll((done) => {
    agentRecr.get('/auth/logout').expect(302, done);  
});


describe("test des routes recruteur", () => {
    test("GET /recruteur_main when not authenticated", async () => {
        const response = await request(app).get('/recruteur/recruteur_main');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /recruteur_main when authenticated", async () => {
        const response = await agentRecr.get('/recruteur/recruteur_main');
        expect(response.statusCode).toBe(200);
    });

    test("GET /recruteur_account when not authenticated", async () => {
        const response = await request(app).get('/recruteur/recruteur_account');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /recruteur_account when authenticated", async () => {
        const response = await agentRecr.get('/recruteur/recruteur_account');
        expect(response.statusCode).toBe(200);
    });

    test("GET /recruteur_modif_mail when not authenticated", async () => {
        const response = await request(app).get('/recruteur/recruteur_modif_mail');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /recruteur_modif_mail when authenticated", async () => {
        const response = await agentRecr.get('/recruteur/recruteur_modif_mail');
        expect(response.statusCode).toBe(200);
    });

    test("GET /recruteur_modif_mdp when not authenticated", async () => {
        const response = await request(app).get('/recruteur/recruteur_modif_mdp');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /recruteur_modif_mdp when authenticated", async () => {
        const response = await agentRecr.get('/recruteur/recruteur_modif_mdp');
        expect(response.statusCode).toBe(200);
    });

    test("GET /confirmation when not authenticated", async () => {
        const response = await request(app).get('/recruteur/confirmation');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /confirmation when authenticated", async () => {
        const response = await agentRecr.get('/recruteur/confirmation');
        expect(response.statusCode).toBe(200);
    });

    test("GET /voir-offre/:id when not authenticated", async () => {
        const response = await request(app).get('/recruteur/voir-offre/4');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /voir-offre/:id when authenticated", async () => {
        const response = await agentRecr.get('/recruteur/voir-offre/4');
        expect(response.statusCode).toBe(200);
    });

    test("GET /search/:text when not authenticated", async () => {
        const response = await request(app).get('/recruteur/search/sample-text');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /search/:text when authenticated", async () => {
        const response = await agentRecr.get('/recruteur/search/sample-text');
        expect(response.statusCode).toBe(200);
    });

    test("GET /salaire_min/:text when not authenticated", async () => {
        const response = await request(app).get('/recruteur/salaire_min/sample-text');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /salaire_min/:text when authenticated", async () => {
        const response = await agentRecr.get('/recruteur/salaire_min/sample-text');
        expect(response.statusCode).toBe(200);
    });

    test("GET /localisation/:text when not authenticated", async () => {
        const response = await request(app).get('/recruteur/localisation/sample-text');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /localisation/:text when authenticated", async () => {
        const response = await agentRecr.get('/recruteur/localisation/sample-text');
        expect(response.statusCode).toBe(200);
    });

    test("GET /candidater/:id/:num when not authenticated", async () => {
        const response = await request(app).get('/recruteur/candidater/4/1100');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /candidater/:id/:num when authenticated", async () => {
        const response = await agentRecr.get('/recruteur/candidater/4/1100');
        expect(response.statusCode).toBe(200);
    });

    test("GET /mes_candidatures when not authenticated", async () => {
        const response = await request(app).get('/recruteur/mes_candidatures');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /mes_candidatures when authenticated", async () => {
        const response = await agentRecr.get('/recruteur/mes_candidatures');
        expect(response.statusCode).toBe(200);
    });

    test("GET /recruteur_recr when not authenticated", async () => {
        const response = await request(app).get(`/recruteur/recruteur_recr`);
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /recruteur_recr when authenticated", async () => {
        const response = await agentRecr.get(`/recruteur/recruteur_recr`);
        expect(response.statusCode).toBe(200);
    });

    test("GET /voir-candidatures/:num when not authenticated", async () => {
        const response = await request(app).get('/recruteur/voir-candidatures/1100');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /voir-candidatures/:num when authenticated", async () => {
        const response = await agentRecr.get('/recruteur/voir-candidatures/1100');
        expect(response.statusCode).toBe(200);
    });

    test("GET /modif-cand/:id/:offre when not authenticated", async () => {
        const response = await request(app).get('/recruteur/modif-cand/917/842596');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /modif-cand/:id when authenticated", async () => {
        const response = await agentRecr.get('/recruteur/modif-cand/917/842596');
        expect(response.statusCode).toBe(200);
    });

    test("GET /modif-offre/:offre when not authenticated", async () => {
        const response = await request(app).get('/recruteur/modif-offre/1100');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /modif-offre/:offre when authenticated", async () => {
        const response = await agentRecr.get('/recruteur/modif-offre/1100');
        expect(response.statusCode).toBe(200);
    });

    test("GET /recruteur_menu_offres when not authenticated", async () => {
        const response = await request(app).get('/recruteur/recruteur_menu_offres');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /recruteur_menu_offres when authenticated", async () => {
        const response = await agentRecr.get('/recruteur/recruteur_menu_offres');
        expect(response.statusCode).toBe(200);
    });

    test("GET /create_fiche when not authenticated", async () => {
        const response = await request(app).get('/recruteur/create_fiche');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /create_fiche when authenticated", async () => {
        const response = await agentRecr.get('/recruteur/create_fiche');
        expect(response.statusCode).toBe(200);
    });

    test("GET /create_offre when not authenticated", async () => {
        const response = await request(app).get('/recruteur/create_offre');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /create_offre when authenticated", async () => {
        const response = await agentRecr.get('/recruteur/create_offre');
        expect(response.statusCode).toBe(200);
    });

});