const DB = require ("../model/db.js");
const ficheModel = require ("../model/fiche_poste.js");
const typeMetierModel = require ("../model/type_metier.js");
const statutPosteModel = require ("../model/statut_poste.js");
const adresseModel = require ("../model/adresse.js");
const organisationModel = require("../model/organisation.js");
const recruteurModel = require("../model/recruteur.js");
const typeOrgaModel = require("../model/type_organisation.js")
const userModel = require("../model/utilisateur.js")
const offreModel = require("../model/offre_emploi.js");

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

    const newType = "traducteur2";
    const newStatut = "directeur test2";
    const newAdresse = [
        45,
        "rue de la flemme",
        "Saint-Valery sur Somme",
        80101,
    ];
    const newTypeOrga = "Orga de traduction2";
    const newOrga = [
        85640,
        "Test orga fiche2",
        "logo_test2.pdf"
    ];
    const newRecr = [
        "testRecrFiche2@test.com",
        "Test2",
        "Jean-Fiche2",
        "06-66-99-66-22",
        "c'estletestRecrFiche2",
    ];

    const newFiche = [
        "traducteur japonais vers français2",
        "Patrick Patrick",
        35.00,
        0,
        1500,
        3000,
        "traduction de livres japonais2"
    ];

    const newOffre = [
        "2024-12-25 00:00:00",
        "CV",
        "non publiée"
    ];


    test("create offre", async () => {
        const typeMetier = await typeMetierModel.create(newType);
        const statutPoste = await statutPosteModel.create(newStatut);
        const adresse = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        const typeOrga = await typeOrgaModel.create(newTypeOrga);
        const orga = await organisationModel.create(newOrga[0], newOrga[1], adresse, typeOrga, newOrga[2]);
        const user = await userModel.create(newRecr[0], newRecr[1], newRecr[2], newRecr[3], newRecr[4]);
        const recruteur = await recruteurModel.createRecr(user, orga);
        const fiche = await ficheModel.create(newFiche[0], newFiche[1], newFiche[2], newFiche[3], newFiche[4], newFiche[5], newFiche[6], typeMetier, statutPoste, adresse, orga, recruteur);
        const offre = await offreModel.create(newOffre[0], newOffre[1], fiche, newOffre[2]);
        console.log(offre)
        const result = await offreModel.read(offre)
        expect(result.num).toBe(offre);
        await offreModel.delete(offre);
        await ficheModel.delete(fiche);
        await recruteurModel.fired(user);
        await userModel.fullDelete(newRecr[0]);
        await organisationModel.delete(orga);
        await typeOrgaModel.delete(typeOrga);
        await adresseModel.delete(adresse);
        await statutPosteModel.delete(statutPoste);
        await typeMetierModel.delete(typeMetier);

    });

    test("delete offre", async () => {
        const typeMetier = await typeMetierModel.create(newType);
        const statutPoste = await statutPosteModel.create(newStatut);
        const adresse = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        const typeOrga = await typeOrgaModel.create(newTypeOrga);
        const orga = await organisationModel.create(newOrga[0], newOrga[1], adresse, typeOrga, newOrga[2]);
        const user = await userModel.create(newRecr[0], newRecr[1], newRecr[2], newRecr[3], newRecr[4]);
        const recruteur = await recruteurModel.createRecr(user, orga);
        const fiche = await ficheModel.create(newFiche[0], newFiche[1], newFiche[2], newFiche[3], newFiche[4], newFiche[5], newFiche[6], typeMetier, statutPoste, adresse, orga, recruteur);
        const offre = await offreModel.create(newOffre[0], newOffre[1], fiche, newOffre[2]);
        const result = await offreModel.delete(offre);

        expect(result).toBeTruthy();
        
        await ficheModel.delete(fiche);
        await recruteurModel.fired(user);
        await userModel.fullDelete(newRecr[0]);
        await organisationModel.delete(orga);
        await typeOrgaModel.delete(typeOrga);
        await adresseModel.delete(adresse);
        await statutPosteModel.delete(statutPoste);
        await typeMetierModel.delete(typeMetier);

    });

})