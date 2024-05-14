const DB = require ("../model/db.js");
const model = require ("../model/candidature.js");

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
    test ("read candidature",()=>{
        offre=null;
        function cbRead(resultat){
            offre = resultat[0].offre;
            expect(offre).toBe(842596);
        }
        model.read(1, cbRead);
    });
    test ("read all candidature",()=>{
        candidat=null;
        function cbRead(resultat){
            candidat = resultat[0].candidat;
            expect(candidat).toBe(1);
        }
        model.readall(cbRead);
    });
    test ("read candidature by id candidat",()=>{
        id=null;
        function cbRead(resultat){
            id = resultat[0].id_c;
            expect(id).toBe(1);
        }
        model.readByIdCandidat(1, cbRead);
    });
    test ("read all candidate's candidatures",()=>{
        offre=null;
        function cbRead(resultat){
            offre = resultat[0].offre;
            expect(offre).toBe(1);
        }
        model.readTest(cbRead);
    });
    test ("read piece by id fiche",()=>{
        pieces=null;
        function cbRead(resultat){
            pieces = resultat[0].indications;
            expect(pieces).toBe("CV");
        }
        model.readPiecesByFiche(1, cbRead);
    });
    test ("read all candidature's pièces",()=>{
        fichier=null;
        function cbRead(resultat){
            fichier = resultat[0].fichier;
            expect(fichier).toBe(1);
        }
        model.readPieces(1, cbRead);
    });
})
