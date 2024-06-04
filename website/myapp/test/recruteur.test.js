const DB = require ("../model/db.js");
const recrModel = require ("../model/recruteur.js");
const userModel = require ("../model/utilisateur.js");

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

    test("read user", async () => {
        const result = await recrModel.read("jeanjean@gmail.com");
        expect(result.nom).toBe("Jean");
    });

    test("read all user", async () => {
        const result = await recrModel.readall();
        expect(result).not.toBe(undefined);
    });

    test("create recruteur", async () => {
        const newRecr = [
            "testRecr@test.com",
            "Test",
            "Jean-Test",
            "06-66-99-66-99",
            "c'estletestRecr",
            27332
        ];
        const id = await userModel.create(newRecr[0], newRecr[1], newRecr[2], newRecr[3], newRecr[4]);
        await userModel.updateRecruteur(id);
        const result = await recrModel.createRecr(id, newRecr[5]);
        expect(result).not.toBe(undefined);
        await recrModel.fired(id);
        await userModel.fullDelete(newRecr[0]);
    });


    test("get recr 'en attente'", async () => {
        const newRecr = [
            "testRecr@test.com",
            "Test",
            "Jean-Test",
            "06-66-99-66-99",
            "c'estletestRecr",
            27332
        ];
        const id = await userModel.create(newRecr[0], newRecr[1], newRecr[2], newRecr[3], newRecr[4]);
        await userModel.updateRecruteur(id);
        await recrModel.createRecr(id, newRecr[5]);
        const result = await recrModel.readByStatut("en attente")
        expect(result).not.toBe(undefined);
        await recrModel.fired(id);
        await userModel.fullDelete(newRecr[0]);
    });



    // test ("read recruteur",()=>{
    //     nom=null;
    //     function cbRead(resultat){
    //         nom = resultat[0].nom;
    //         expect(nom).toBe("Jean");
    //     }
    //     model.read("jeanjean@gmail.com", cbRead);
    // });
    // test ("read all recruteur",()=>{
    //     nom1=null;
    //     function cbRead(resultat){
    //         nom1 = resultat[0].nom;
    //         expect(nom1).toBe("Jean");
    //     }
    //     model.readall(cbRead);
    // });
    // test ("valid recruteur's passwd",()=>{
    //     valide=null;
    //     function cbRead(resultat){
    //         valide = resultat;
    //         expect(vailde).toBeTruthy();
    //     }
    //     model.areValid(cbRead);
    // });
    // test ("get recruteur by statut",()=>{
    //     nom=null;
    //     function cbRead(resultat){
    //         nom = resultat[0].nom;
    //         expect(nom).toBe("recruteur");
    //     }
    //     model.readByStatut("en attente", cbRead);
    // });
})
