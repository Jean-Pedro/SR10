const DB = require ("../model/db.js");
const model = require ("../model/admin.js");

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
    test ("read admin",()=>{
        nom=null;
        function cbRead(resultat){
            nom = resultat[0].nom;
            expect(nom).toBe("Simon");
        }
        model.read("admin@administration.fr", cbRead);
    });
    test ("read all admin",()=>{
        nom1=null;
        function cbRead(resultat){
            nom1 = resultat[0].nom;
            expect(nom1).toBe("Simon");
        }
        model.readall(cbRead);
    });
    test ("valid admin's passwd",()=>{
        valide=null;
        function cbRead(resultat){
            valide = resultat;
            expect(vailde).toBeTruthy();
        }
        model.areValid(cbRead);
    });
})
