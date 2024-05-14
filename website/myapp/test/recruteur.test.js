const DB = require ("../model/db.js");
const model = require ("../model/recruteur.js");

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
    test ("read recruteur",()=>{
        nom=null;
        function cbRead(resultat){
            nom = resultat[0].nom;
            expect(nom).toBe("Jean");
        }
        model.read("jeanjean@gmail.com", cbRead);
    });
    test ("read all recruteur",()=>{
        nom1=null;
        function cbRead(resultat){
            nom1 = resultat[0].nom;
            expect(nom1).toBe("Jean");
        }
        model.readall(cbRead);
    });
    test ("valid recruteur's passwd",()=>{
        valide=null;
        function cbRead(resultat){
            valide = resultat;
            expect(vailde).toBeTruthy();
        }
        model.areValid(cbRead);
    });
    test ("get recruteur by statut",()=>{
        nom=null;
        function cbRead(resultat){
            nom = resultat[0].nom;
            expect(nom).toBe("recruteur");
        }
        model.readByStatut("en attente", cbRead);
    });
})
