const DB = require ("../model/db.js");
const model = require ("../model/adresse.js");

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
    test ("read adresse",()=>{
        rue=null;
        function cbRead(resultat){
            rue = resultat[0].rue;
            expect(nom).toBe("rue de la papaye");
        }
        model.read(1, cbRead);
    });
    test ("read all adresse",()=>{
        num=null;
        function cbRead(resultat){
            num = resultat[0].num;
            expect(nom1).toBe(1);
        }
        model.readall(cbRead);
    });
})
