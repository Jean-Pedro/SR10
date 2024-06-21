const request = require('supertest')
const app = require('../app');
const agent = request.agent(app);



beforeAll((done) => {
    agent.post('/auth/login')
        .send({ email: 'xxx', password: "xxx", test: "bv-dskjbgùvludsgh!vkuhsdkv$hdkxbgvk52425xv*cxkbvdvd5vd58vfd587b578b" })
        .expect(302)
        .end(function (err, res) {
            if (err) return done(err);

            agent.get('/').expect(302, done);
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

    test("GET /auth sans user", async () => {
        const reponse = await request(app).get("/auth");
        expect(reponse.statusCode).toBe(302);
        expect(reponse.headers.location).toBe('/auth/login');
    });

    test("GET /auth avec user", async () => {
        const reponse = await agent.get("/auth");
        expect(reponse.statusCode).toBe(302);
        expect(reponse.headers.location).toBe('/users/main');
    });


});



describe("test routes candidat", () => {
    test("GET /main redirige vers login si non connecté", async () => {
        const response = await request(app).get('/users/main');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /main en étant connecté", async () => {
        const response = await agent.get('/users/main');
        expect(response.statusCode).toBe(200);
    });

    test("GET /mon_compte redirige vers login si non connecté", async () => {
        const response = await request(app).get('/users/mon_compte');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /mon_compte en étant connecté", async () => {
        const response = await agent.get('/users/mon_compte');
        expect(response.statusCode).toBe(200);
    });

    test("GET /mes_candidatures redirige vers login si non connecté", async () => {
        const response = await request(app).get('/users/mes_candidatures');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /mes_candidatures en étant connecté", async () => {
        const response = await agent.get('/users/mes_candidatures');
        expect(response.statusCode).toBe(200);
    });

    test("GET /modif_mail redirige vers login si non connecté", async () => {
        const response = await request(app).get('/users/modif_mail');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /modif_mail en étant connecté", async () => {
        const response = await agent.get('/users/modif_mail');
        expect(response.statusCode).toBe(200);
    });

    test("GET /modif_mdp redirige vers login si non connecté", async () => {
        const response = await request(app).get('/users/modif_mdp');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /modif_mdp en étant connecté", async () => {
        const response = await agent.get('/users/modif_mdp');
        expect(response.statusCode).toBe(200);
    });

    test("GET /new_recr redirige vers login si non connecté", async () => {
        const response = await request(app).get('/candidat/devenir_recruteur');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /new_recr en étant connecté", async () => {
        const response = await agent.get('/candidat/devenir_recruteur');
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



});

