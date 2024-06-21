const request = require('supertest')
const app = require('../app');
const agentAdmin = request.agent(app);


beforeAll((done) => {
    agentAdmin.post('/auth/login')
        .send({ email: 'xxx', password: 'xxx', test: 'bv-dskjbgùvludsgh!vkuhsdkv$hdkxbgvk52425xv*cxkbvdvd5vd58vfd587b578b'})
        .expect(302)
        .end(function (err, res) {
            if (err) return done(err);

            agentAdmin.get('/').expect(302, done);
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

    test("GET /mon_compte when not authenticated", async () => {
        const response = await request(app).get('/users/mon_compte');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /mon_compte when authenticated", async () => {
        const response = await agentAdmin.get('/users/mon_compte');
        expect(response.statusCode).toBe(200);
    });

    test("GET /modif_mail when not authenticated", async () => {
        const response = await request(app).get('/users/modif_mail');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /modif_mail when authenticated", async () => {
        const response = await agentAdmin.get('/users/modif_mail');
        expect(response.statusCode).toBe(200);
    });

    test("GET /modif_mdp when not authenticated", async () => {
        const response = await request(app).get('/users/modif_mdp');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/auth/login');
    });

    test("GET /admin_modif_mdp when authenticated", async () => {
        const response = await agentAdmin.get('/users/modif_mdp');
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



});