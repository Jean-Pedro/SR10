const DB = require ("../model/db.js");
const organisationModel = require ("../model/organisation.js");
const typeOrgaModel = require("../model/type_organisation.js")
const adresseModel = require("../model/adresse.js")

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
        154,
        "rue du cimetière",
        "Évry",
        91250
    ];

    const newType = "humanitaire"

    const newOrga = [
        1234,
        "Test orga",
        "logo_test.pdf"
    ]

    test("read orga", async () => {
        const id_lieu = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        const type_orga = await typeOrgaModel.create(newType);
        const siren = await organisationModel.create(newOrga[0], newOrga[1], id_lieu, type_orga, newOrga[2]);
        const result = await organisationModel.read(siren);
        expect(result.siren).toBe(siren);
        await organisationModel.delete(result.siren);
        await adresseModel.delete(id_lieu);
        await typeOrgaModel.delete(type_orga);
    });

    test("read all orga", async () => {
        const result = await organisationModel.readall();
        expect(result).not.toBe(undefined)
    });

    test("read by statut", async () => {
        const result = await organisationModel.readByStatut('en attente');
        expect(result[0].etat_demande).toBe("en attente")
    })

    test("create orga", async () => {
        const id_lieu = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        const type_orga = await typeOrgaModel.create(newType);
        const result = await organisationModel.create(newOrga[0], newOrga[1], id_lieu, type_orga, newOrga[2]);
        expect(result).not.toBe(undefined);
        await organisationModel.delete(result);
        await adresseModel.delete(id_lieu);
        await typeOrgaModel.delete(type_orga);
    });

    test("delete orga", async () => {
        const id_lieu = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        const type_orga = await typeOrgaModel.create(newType);
        const siren = await organisationModel.create(newOrga[0], newOrga[1], id_lieu, type_orga, newOrga[2]);
        const result = await organisationModel.delete(siren);
        expect(result).toBeTruthy();
        await adresseModel.delete(id_lieu);
        await typeOrgaModel.delete(type_orga);
    });

    test("update nom orga", async () => {
        const id_lieu = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        const type_orga = await typeOrgaModel.create(newType);
        const siren = await organisationModel.create(newOrga[0], newOrga[1], id_lieu, type_orga, newOrga[2]);
        await organisationModel.updateNom(siren, "testUpdate");
        const result = await organisationModel.read(siren);
        expect(result.nom).toBe("testUpdate");
        await organisationModel.delete(siren);
        await adresseModel.delete(id_lieu);
        await typeOrgaModel.delete(type_orga);
    });

    test("update statut orga", async () => {
        const id_lieu = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        const type_orga = await typeOrgaModel.create(newType);
        const siren = await organisationModel.create(newOrga[0], newOrga[1], id_lieu, type_orga, newOrga[2]);
        await organisationModel.updateEtatDemande(siren, "acceptée");
        const result = await organisationModel.read(siren);
        expect(result.etat_demande).toBe("acceptée");
        await organisationModel.delete(siren);
        await adresseModel.delete(id_lieu);
        await typeOrgaModel.delete(type_orga);
    });

})