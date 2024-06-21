const DB = require ("../model/db.js");
const ficheModel = require ("../model/fiche_poste.js");
const typeMetierModel = require ("../model/type_metier.js");
const statutPosteModel = require ("../model/statut_poste.js");
const adresseModel = require ("../model/adresse.js");
const organisationModel = require("../model/organisation.js");
const recruteurModel = require("../model/recruteur.js");
const typeOrgaModel = require("../model/type_organisation.js")
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
    const newType = "traducteur";
    const newStatut = "directeur test";
    const newAdresse = [
        42,
        "rue de la flemme",
        "Saint-Valery sur Somme",
        80100,
    ];
    const newTypeOrga = "Orga de traduction";
    const newOrga = [
        85642,
        "Test orga fiche",
        "logo_test.pdf"
    ];
    const newRecr = [
        "testRecrFiche@test.com",
        "Test",
        "Jean-Fiche",
        "06-66-99-66-96",
        "c'estletestRecrFiche",
    ];

    const newFiche = [
        "traducteur japonais vers français",
        "Patrick Patrick",
        35.00,
        0,
        1500,
        3000,
        "traduction de livres japonais"
    ];
    
    test("create fiche", async () => {
        const typeMetier = await typeMetierModel.create(newType);
        const statutPoste = await statutPosteModel.create(newStatut);
        const adresse = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        const typeOrga = await typeOrgaModel.create(newTypeOrga);
        const orga = await organisationModel.create(newOrga[0], newOrga[1], adresse, typeOrga, newOrga[2]);
        const user = await userModel.create(newRecr[0], newRecr[1], newRecr[2], newRecr[3], newRecr[4]);
        await userModel.updateRecruteur(user);
        const recruteur = await recruteurModel.createRecr(user, orga);
        const fiche = await ficheModel.create(newFiche[0], newFiche[1], newFiche[2], newFiche[3], newFiche[4], newFiche[5], newFiche[6], typeMetier, statutPoste, adresse, orga);
        
        const result = await ficheModel.read(fiche);
        expect(result.intitule).toBe("traducteur japonais vers français");
        await ficheModel.delete(fiche);
        await recruteurModel.fired(user);
        await userModel.fullDelete(newRecr[0]);
        await organisationModel.delete(orga);
        await typeOrgaModel.delete(typeOrga);
        await adresseModel.delete(adresse);
        await statutPosteModel.delete(statutPoste);
        await typeMetierModel.delete(typeMetier);

    });

    test("delete fiche", async () => {
        const typeMetier = await typeMetierModel.create(newType);
        const statutPoste = await statutPosteModel.create(newStatut);
        const adresse = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        const typeOrga = await typeOrgaModel.create(newTypeOrga);
        const orga = await organisationModel.create(newOrga[0], newOrga[1], adresse, typeOrga, newOrga[2]);
        const user = await userModel.create(newRecr[0], newRecr[1], newRecr[2], newRecr[3], newRecr[4]);
        await userModel.updateRecruteur(user);
        const recruteur = await recruteurModel.createRecr(user, orga);
        const fiche = await ficheModel.create(newFiche[0], newFiche[1], newFiche[2], newFiche[3], newFiche[4], newFiche[5], newFiche[6], typeMetier, statutPoste, adresse, orga);
        const result = await ficheModel.delete(fiche);

        expect(result).toBeTruthy();
        await recruteurModel.fired(user);
        await userModel.fullDelete(newRecr[0]);
        await organisationModel.delete(orga);
        await typeOrgaModel.delete(typeOrga);
        await adresseModel.delete(adresse);
        await statutPosteModel.delete(statutPoste);
        await typeMetierModel.delete(typeMetier);

    })

})
