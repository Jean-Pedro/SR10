const DB = require ("../model/db.js");
const model = require ("../model/utilisateur.js");
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
        const result = await model.read("johnny@gmail.com");
        expect(result.nom).toBe("Johnny");
    });

    test("read all user", async () => {
        const result = await model.readall();
        expect(result).not.toBe(undefined);
    });

    test("create user", async () => {
        const newUser = [
            "test@test.com",
            "Test",
            "Jean-Test",
            "06-66-66-66-66",
            "c'estletest"
        ];
        const result = await model.create(newUser[0], newUser[1], newUser[2], newUser[3], newUser[4]);
        expect(result).not.toBe(undefined);
    });

    test("update nom user", async () => {
        const result = await model.updateNom("test@test.com", "testUpdateNom");
        expect(result).toBeTruthy();
    });

    test("update prenom user", async () => {
        const result = await model.updatePrenom("test@test.com", "testUpdatePrenom");
        expect(result).toBeTruthy();
    });

    test("update tel user", async () => {
        const result = await model.updateTel("test@test.com", "01-23-45-67-89");
        expect(result).toBeTruthy();
    });

    test("delete user", async () => {
        const newUser = [
            "testDelete@test.com",
            "TestDelete",
            "Jean-Test",
            "06-66-66-66-66",
            "c'estletest"
        ];
        await model.create(newUser[0], newUser[1], newUser[2], newUser[3], newUser[4]);
        const result = await model.delete("testDelete@test.com");
        expect(result).toBeTruthy();
    });

    

    // test("valid passwd", async () => {
    //     const result = await model.arevalid("johnny@gmail.com", "JohnnyJeTAime");
    //     expect(result).toBeTruthy();
    // });







    // test ("read all user",()=>{
    //     nom1=null;
    //     function cbRead(resultat){
    //         nom1 = resultat[0].nom;
    //         expect(nom1).toBe("René");
    //     }
    //     model.readall(cbRead);
    // });

    // test ("valid passwd",()=>{
    //     valide=null;
    //     function cbRead(resultat){
    //         valide = resultat;
    //         expect(vailde).toBeTruthy();
    //     }
    //     model.areValid(cbRead);
    // });


//     test ("get user by id",()=>{
//         nom=null;
//         function cbRead(resultat){
//             nom = resultat[0].nom;
//             expect(nom).toBe("René");
//         }
//         model.readall(1, cbRead);
//     });

//     test ("get user's info",()=>{
//         nom=null;
//         function cbRead(resultat){
//             nom = resultat[0].nom;
//             expect(nom).toBe("René");
//         }
//         model.readall("francoisrene@yahoo.fr", cbRead);
//     });
});