const DB = require ("../model/db.js");
const candidatModel = require ("../model/candidat.js");
const userModel = require("../model/utilisateur.js");

describe("Model Tests", () => {
    beforeAll(() => {
        // des instructions à exécuter avant le lancement des tests
    });
    afterAll((done) => {
        function callback (err){
            if (err) done (err);
            else done();
        }
        DB.end(callback);
    });

    const newCand = [
        "testCand1@test.com",
        "LeCand",
        "Jean-Test",
        "06-66-99-25-56",
        "c'estletestCand1",
    ];
    
    test("create candidat", async () => {
        const user = await userModel.create(newCand[0], newCand[1], newCand[2], newCand[3], newCand[4]);
        const candidat = await candidatModel.create(user);
        const result = await candidatModel.read(candidat);
        expect(result.id_candidat).toBe(user);
        await candidatModel.delete(candidat);
        await userModel.fullDelete(newCand[0]);
    });

    test("delete candidat", async () => {
        const user = await userModel.create(newCand[0], newCand[1], newCand[2], newCand[3], newCand[4]);
        const candidat = await candidatModel.create(user);
        const result = await candidatModel.delete(candidat);
        expect(result).toBeTruthy();
        await userModel.fullDelete(newCand[0]);
    })

})
