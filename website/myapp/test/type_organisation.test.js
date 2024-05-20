const DB = require ("../model/db.js");
const model = require ("../model/type_organisation.js");

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
        const newType = "SCOP"

        const result = await model.create(newType);
        expect(result).toBe(1);
    });

    test("insert type already in", async () => {
        const newType = "SCOP"

        const result = await model.create(newType);
        expect(result).toBe(0);
        await model.delete(newType)
    });

});