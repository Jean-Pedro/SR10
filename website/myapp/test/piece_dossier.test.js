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

    const newCandidature = [
        28200,
        2
    ];
    const newPiece = [
        "CV",
        "CV_v42.pdf"
    ];

    test("read piece", async () => {
        const id_cand = await candidatureModel.create(newCandidature[0], newCandidature[1]);
        const id_piece = await pieceModel.create(newPiece[0], id_cand, newPiece[1]);
        const result = await pieceModel.read(id_piece);
        expect(result["fichier"]).toBe(newPiece[1]);
        await pieceModel.delete(id_piece);
        await candidatureModel.delete(id_cand);
    });

    test("read all pieces", async () => {
        const result = await pieceModel.readall();
        expect(result).not.toBe(undefined);
    })

    test("create piece", async () => {
        const id_cand = await candidatureModel.create(newCandidature[0], newCandidature[1]);
        const result = await pieceModel.create(newPiece[0], id_cand, newPiece[1]);
        expect(result).not.toBe(undefined);
        await pieceModel.delete(result);
        await candidatureModel.delete(id_cand);
    });

    test("delete piece", async () => {
        const id_cand = await candidatureModel.create(newCandidature[0], newCandidature[1]);
        const id_piece = await pieceModel.create(newPiece[0], id_cand, newPiece[1]);
        const result = await pieceModel.delete(id_piece);
        expect(result).toBeTruthy();
        await candidatureModel.delete(id_cand);
    });

    test("update type piece", async () => {
        const id_cand = await candidatureModel.create(newCandidature[0], newCandidature[1]);
        const id_piece = await pieceModel.create(newPiece[0], id_cand, newPiece[1]);
        await pieceModel.updateType(id_piece, "Lettre de motivation");
        const result = await pieceModel.read(id_piece);
        expect(result["type"]).toBe("Lettre de motivation");
        await pieceModel.delete(id_piece);
        await candidatureModel.delete(id_cand);
    });

    test("update file piece", async () => {
        const id_cand = await candidatureModel.create(newCandidature[0], newCandidature[1]);
        const id_piece = await pieceModel.create(newPiece[0], id_cand, newPiece[1]);
        await pieceModel.updateFichier(id_piece, "CV_1234.pdf");
        const result = await pieceModel.read(id_piece);
        expect(result["fichier"]).toBe("CV_1234.pdf");
        await pieceModel.delete(id_piece);
        await candidatureModel.delete(id_cand);
    });

});