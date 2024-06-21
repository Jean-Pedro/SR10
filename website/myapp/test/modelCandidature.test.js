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
const candidatureModel = require ("../model/candidature.js");
const candidatModel = require("../model/candidat.js")

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

    const newType = "traducteur3";
    const newStatut = "directeur test3";
    const newAdresse = [
        49,
        "rue de la flemme",
        "Saint-Valery sur Somme",
        80102,
    ];
    const newTypeOrga = "Orga de traduction3";
    const newOrga = [
        8564,
        "Test orga fiche3",
        "logo_test3.pdf"
    ];
    const newRecr = [
        "testRecrFiche3@test.com",
        "Test3",
        "Jean-Fiche3",
        "06-66-99-66-81",
        "c'estletestRecrFiche3",
    ];

    const newFiche = [
        "traducteur japonais vers français3",
        "Patrick Patrick",
        35.00,
        0,
        1500,
        3000,
        "traduction de livres japonais3"
    ];

    const newOffre = [
        "2024-12-01 00:00:00",
        "CV",
        "non publiée"
    ];

    const newCandidat = [
        "testCandFiche3@test.com",
        "Test3",
        "Jean3",
        "06-66-99-25-45",
        "c'estletestCandFiche3",
    ];

    test("create candidature", async () => {
        const typeMetier = await typeMetierModel.create(newType);
        const statutPoste = await statutPosteModel.create(newStatut);
        const adresse = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        const typeOrga = await typeOrgaModel.create(newTypeOrga);
        const orga = await organisationModel.create(newOrga[0], newOrga[1], adresse, typeOrga, newOrga[2]);
        const user = await userModel.create(newRecr[0], newRecr[1], newRecr[2], newRecr[3], newRecr[4]);
        await userModel.updateRecruteur(user);
        const recruteur = await recruteurModel.createRecr(user, orga);
        const fiche = await ficheModel.create(newFiche[0], newFiche[1], newFiche[2], newFiche[3], newFiche[4], newFiche[5], newFiche[6], typeMetier, statutPoste, adresse, orga);
        const offre = await offreModel.create(newOffre[0], newOffre[1], fiche, newOffre[2]);
        const userCand = await userModel.create(newCandidat[0], newCandidat[1], newCandidat[2], newCandidat[3], newCandidat[4]);
        const candidat = await candidatModel.create(userCand);
        const candidature = await candidatureModel.create(offre, candidat);

        const result = await candidatureModel.read(candidature);
        expect(result.id_c).not.toBe(undefined);
        await candidatureModel.delete(candidature);
        await candidatModel.delete(candidat);
        await userModel.fullDelete(newCandidat[0]);
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

    test("delete candidature", async () => {
        const typeMetier = await typeMetierModel.create(newType);
        const statutPoste = await statutPosteModel.create(newStatut);
        const adresse = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        const typeOrga = await typeOrgaModel.create(newTypeOrga);
        const orga = await organisationModel.create(newOrga[0], newOrga[1], adresse, typeOrga, newOrga[2]);
        const user = await userModel.create(newRecr[0], newRecr[1], newRecr[2], newRecr[3], newRecr[4]);
        await userModel.updateRecruteur(user);
        const recruteur = await recruteurModel.createRecr(user, orga);
        const fiche = await ficheModel.create(newFiche[0], newFiche[1], newFiche[2], newFiche[3], newFiche[4], newFiche[5], newFiche[6], typeMetier, statutPoste, adresse, orga);
        const offre = await offreModel.create(newOffre[0], newOffre[1], fiche, newOffre[2]);
        const userCand = await userModel.create(newCandidat[0], newCandidat[1], newCandidat[2], newCandidat[3], newCandidat[4]);
        const candidat = await candidatModel.create(userCand);
        const candidature = await candidatureModel.create(offre, candidat);
        const result = await candidatureModel.delete(candidature);
        expect(result).toBeTruthy();
        
        await candidatModel.delete(candidat);
        await userModel.fullDelete(newCandidat[0]);
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

    test("read pieces by fiche", async () => {
        const typeMetier = await typeMetierModel.create(newType);
        const statutPoste = await statutPosteModel.create(newStatut);
        const adresse = await adresseModel.create(newAdresse[0], newAdresse[1], newAdresse[2], newAdresse[3]);
        const typeOrga = await typeOrgaModel.create(newTypeOrga);
        const orga = await organisationModel.create(newOrga[0], newOrga[1], adresse, typeOrga, newOrga[2]);
        const user = await userModel.create(newRecr[0], newRecr[1], newRecr[2], newRecr[3], newRecr[4]);
        await userModel.updateRecruteur(user);
        const recruteur = await recruteurModel.createRecr(user, orga);
        const fiche = await ficheModel.create(newFiche[0], newFiche[1], newFiche[2], newFiche[3], newFiche[4], newFiche[5], newFiche[6], typeMetier, statutPoste, adresse, orga);
        const offre = await offreModel.create(newOffre[0], newOffre[1], fiche, newOffre[2]);
        const userCand = await userModel.create(newCandidat[0], newCandidat[1], newCandidat[2], newCandidat[3], newCandidat[4]);
        const candidat = await candidatModel.create(userCand);
        const candidature = await candidatureModel.create(offre, candidat);
        const result = await candidatureModel.readPiecesByFiche(fiche);
        expect(result[0]).toBe("CV");
        await candidatureModel.delete(candidature);
        await candidatModel.delete(candidat);
        await userModel.fullDelete(newCandidat[0]);
        await offreModel.delete(offre);
        await ficheModel.delete(fiche);
        await recruteurModel.fired(user);
        await userModel.fullDelete(newRecr[0]);
        await organisationModel.delete(orga);
        await typeOrgaModel.delete(typeOrga);
        await adresseModel.delete(adresse);
        await statutPosteModel.delete(statutPoste);
        await typeMetierModel.delete(typeMetier);
    })



})
