const request = require('supertest')
const app = require('../app');
const agentRecr = request.agent(app);

beforeAll((done) => {
    agentRecr.post('/auth/login')
        .send({ email: 'xxx', password: 'xxx', test: "bv-dskjbgùvludsgh!vkuhsdkv$hdkxbgvk52425xv*cxkbvdvd5vd58vfd587b578b" })
        .expect(302)
        .end(function (err, res) {
            if (err) return done(err);

            agentRecr.get('/').expect(302, done);
        });
    
});


afterAll((done) => {
    agentRecr.get('/auth/logout').expect(302, done);  
});


describe("test des routes recruteur", () => {
    test("GET /main when not authenticated", async () => {
        const response = await request(app).get('/users/main');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /main when authenticated", async () => {
        const response = await agentRecr.get('/users/main');
        expect(response.statusCode).toBe(200);
    });

    test("GET /mon_compte when not authenticated", async () => {
        const response = await request(app).get('/users/mon_compte');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /mon_compte when authenticated", async () => {
        const response = await agentRecr.get('/users/mon_compte');
        expect(response.statusCode).toBe(200);
    });

    test("GET /modif_mail when not authenticated", async () => {
        const response = await request(app).get('/users/modif_mail');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /modif_mail when authenticated", async () => {
        const response = await agentRecr.get('/users/modif_mail');
        expect(response.statusCode).toBe(200);
    });

    test("GET /modif_mdp when not authenticated", async () => {
        const response = await request(app).get('/users/modif_mdp');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /modif_mdp when authenticated", async () => {
        const response = await agentRecr.get('/users/modif_mdp');
        expect(response.statusCode).toBe(200);
    });

    test("GET /mes_candidatures when not authenticated", async () => {
        const response = await request(app).get('/users/mes_candidatures');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /mes_candidatures when authenticated", async () => {
        const response = await agentRecr.get('/users/mes_candidatures');
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