const DB = require ("../model/db.js");
const pieceModel = require ("../model/piece_dossier.js");
const candidatureModel = require("../model/candidature.js")

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

    test("create piece", async () => {
        newCandidature = [
            "2024-03-19 00:00:00",
            28200,
            2
        ];
        newPiece = [
            "CV",
            "CV_v42.pdf"
        ]
        const id_cand = await candidatureModel.create(newCandidature[0], newCandidature[1], newCandidature[2]);
        const result = await pieceModel.create(newPiece[0], id_cand, newPiece[1]);
        expect(result).not.toBe(undefined);
        await pieceModel.delete(result);
        await candidatureModel.delete(id_cand);
    });

    

});