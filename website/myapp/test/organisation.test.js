const DB = require ("../model/db.js");
const model = require ("../model/organisation.js");

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
    test ("read orga",()=>{
        nom=null;
        function cbRead(resultat){
            nom = resultat[0].nom;
            expect(nom).toBe("Plastic Omnium");
        }
        model.read(7656, cbRead);
    });
    test ("read all orga",()=>{
        nom1=null;
        function cbRead(resultat){
            nom1 = resultat[1].nom;
            expect(nom1).toBe("Restaurant le Palais");
        }
        model.readall(cbRead);
    });
    test ("get orga by statut",()=>{
        nom=null;
        function cbRead(resultat){
            nom = resultat[0].nom;
            expect(nom).toBe("Plastic Omnium");
        }
        model.readByStatut("acceptée", cbRead);
    });
})