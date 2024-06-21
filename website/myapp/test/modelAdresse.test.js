const DB = require ("../model/db.js");
const adresseModel = require ("../model/adresse.js");

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
    
    const newAdresse = [
        12,
        "rue de la foufourche",
        "Tourcoing",
        59599
    ];

    test("read adress", async () => {
        const id_lieu = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        const result = await adresseModel.read(id_lieu);
        expect(result.num).toBe(newAdresse[0]);
        await adresseModel.delete(id_lieu);
    });

    test("read all adresses", async () => {
        const result = await adresseModel.readall();
        expect(result).not.toBe(undefined);
    })

    test("create adresse", async () => {
        const result = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        expect(result).not.toBe(undefined);
        await adresseModel.delete(result);
    });

    test("create adresse doublon", async () => {
        const result = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        const result_doublon = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        expect(result_doublon).toBe(result);
        await adresseModel.delete(result);
    });

    test("delete adress", async () => {
        const id_lieu = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        const result = await adresseModel.delete(id_lieu);
        expect(result).toBeTruthy();
    });

    test("update num", async () => {
        const id_lieu = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        await adresseModel.updateNum(id_lieu, 549);
        const result = await adresseModel.read(id_lieu);
        expect(result.num).toBe(549);
        await adresseModel.delete(id_lieu);
    });

    test("update rue", async () => {
        const id_lieu = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        await adresseModel.updateRue(id_lieu, "rue de la sainte paquerette");
        const result = await adresseModel.read(id_lieu);
        expect(result.rue).toBe("rue de la sainte paquerette");
        await adresseModel.delete(id_lieu);
    });

    test("update ville", async () => {
        const id_lieu = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        await adresseModel.updateVille(id_lieu, "Le Crotoy");
        const result = await adresseModel.read(id_lieu);
        expect(result.ville).toBe("Le Crotoy");
        await adresseModel.delete(id_lieu);
    });

    test("update code postal", async () => {
        const id_lieu = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        await adresseModel.updateCodePostal(id_lieu, "80100");
        const result = await adresseModel.read(id_lieu);
        expect(result.code_postal).toBe("80100");
        await adresseModel.delete(id_lieu);
    });

})
