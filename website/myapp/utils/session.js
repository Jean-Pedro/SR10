const session = require("express-session");

module.exports = {
    init: () => {
        return session({
            secret: "idsvhdsovbodsubv",
            saveUninitialized: true,
            cookie: {maxAge: 3600 * 1000}, // 1heure
            resave: false,
        });
    },
    createSession: function (session, mail, type, user) {
        session.user = user;
        session.usermail = mail;
        session.type_user = type
        

        
        session.save(function (err) {
            // console.log(err);
        });
        return session;
    },

    isConnected: (session, role) => {
        if (!session.usermail) return false;
        return !(type && session.type_user !== type);
    },

    deleteSession: function (session) {
        session.destroy();
    },
};
