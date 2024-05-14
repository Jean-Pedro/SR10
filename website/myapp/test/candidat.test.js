const DB = require ("../model/db.js");
const model = require ("../model/candidat.js");

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
    test ("read cand",()=>{
        nom=null;
        function cbRead(resultat){
            nom = resultat[0].nom;
            expect(nom).toBe("René");
        }
        model.read("francoisrene@yahoo.fr", cbRead);
    });
    test ("read all cand",()=>{
        nom1=null;
        function cbRead(resultat){
            nom1 = resultat[0].nom;
            expect(nom1).toBe("René");
        }
        model.readall(cbRead);
    });
    test ("valid candidate's passwd",()=>{
        valide=null;
        function cbRead(resultat){
            valide = resultat;
            expect(vailde).toBeTruthy();
        }
        model.areValid(cbRead);
    });
})
