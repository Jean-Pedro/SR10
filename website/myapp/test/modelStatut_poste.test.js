const DB = require ("../model/db.js");
const model = require ("../model/statut_poste.js");

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

    test("read all types", async () => {
        const result = await model.readall();
        expect(result).not.toBe(undefined);
    });

    test("insert type success", async () => {
        const newType = "opérateur"

        const result = await model.create(newType);
        expect(result).toBe(newType);
        await model.delete(newType)
    });

    test("insert type already in", async () => {
        const newType = "opérateur"

        const result = await model.create(newType);
        const result2 = await model.create(newType);
        expect(result2).toBe(newType);
        await model.delete(newType)
    });

});