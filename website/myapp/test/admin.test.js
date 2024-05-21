const DB = require ("../model/db.js");
const adminModel = require ("../model/admin.js");
const userModel = require("../model/utilisateur.js")

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

    newAdmin = [
        "testAdmin@gmail.com",
        "Admin",
        "Jean",
        "07-85-45-96-32",
        "c'estletestadmin"
    ]

    test("create admin", async () => {
        const user = await userModel.create(newAdmin[0], newAdmin[1], newAdmin[2], newAdmin[3], newAdmin[4]);
        const admin = await adminModel.create(user);
        const result = await adminModel.read(admin);
        expect(result.id_administrateur).toBe(user);
        await adminModel.delete(admin);
        await userModel.fullDelete(newAdmin[0]);
    });

    test("read by email", async () => {
        const user = await userModel.create(newAdmin[0], newAdmin[1], newAdmin[2], newAdmin[3], newAdmin[4]);
        const admin = await adminModel.create(user);
        const result = await adminModel.readByEmail(newAdmin[0]);
        expect(result.id_administrateur).toBe(user);
        await adminModel.delete(admin);
        await userModel.fullDelete(newAdmin[0]);
    })

})
