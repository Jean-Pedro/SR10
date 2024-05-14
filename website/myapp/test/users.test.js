const DB = require ("../model/db.js");
const model = require ("../model/utilisateur.js");
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
    test("read user", async () => {
        const result = await model.read("johnny@gmail.com");
        expect(result.nom).toBe("kiuytfg");
    });
    test ("read all user",()=>{
        nom1=null;
        function cbRead(resultat){
            nom1 = resultat[0].nom;
            expect(nom1).toBe("René");
        }
        model.readall(cbRead);
    });
    test ("valid passwd",()=>{
        valide=null;
        function cbRead(resultat){
            valide = resultat;
            expect(vailde).toBeTruthy();
        }
        model.areValid(cbRead);
    });
    test ("get user by id",()=>{
        nom=null;
        function cbRead(resultat){
            nom = resultat[0].nom;
            expect(nom).toBe("René");
        }
        model.readall(1, cbRead);
    });
    test ("get user's info",()=>{
        nom=null;
        function cbRead(resultat){
            nom = resultat[0].nom;
            expect(nom).toBe("René");
        }
        model.readall("francoisrene@yahoo.fr", cbRead);
    });
})