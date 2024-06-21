const nodemailer = require('nodemailer');

// Configurer votre transporteur de mail (utilisez vos propres informations)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Vous pouvez utiliser un autre service de votre choix
    auth: {
        user: 'sr10p001notification@gmail.com',
        pass: "ruwy keci yhrt gzyf"
    }
});

async function sendAccountCreatedEmail(email, firstName, lastName) {
    const mailOptions = {
        from: 'sr10p001notification@gmail.com',
        to: email,
        subject: 'Votre compte a été créé',
        text: `Bonjour ${firstName} ${lastName},\n\nVotre compte a été créé avec succès.\n\nCordialement,\nLa direction`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email envoyé.');
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
    }
}

async function sendAccountJoinedOrga(email, firstName, lastName, orga) {
    const mailOptions = {
        from: 'sr10p001notification@gmail.com',
        to: email,
        subject: `Vous avez rejoint ${orga}`,
        text: `Bonjour ${firstName} ${lastName},\n\nVotre demande pour rejoindre ${orga} a été acceptée.\n\nCordialement,\nLa direction`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email envoyé.');
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
    }
}

async function sendAccountCreateOrga(email, firstName, lastName, orga) {
    const mailOptions = {
        from: 'sr10p001notification@gmail.com',
        to: email,
        subject: `Création de ${orga}`,
        text: `Bonjour ${firstName} ${lastName},\n\nVotre demande pour créer l'organisation ${orga} a été acceptée.\n\nCordialement,\nLa direction`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email envoyé.');
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
    }
}

async function sendAccountUpgradeAdmin(email, firstName, lastName, admin_fname, admin_lname) {
    const mailOptions = {
        from: 'sr10p001notification@gmail.com',
        to: email,
        subject: `Passage en Administrateur`,
        text: `Bonjour ${firstName} ${lastName},\n\nL'administrateur ${admin_fname} ${admin_lname} vous a fait rejoindre l'équipe d'administration du site.\n\nCordialement,\nLa direction`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email envoyé.');
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
    }
}

module.exports = {
    sendAccountCreatedEmail,
    sendAccountJoinedOrga,
    sendAccountCreateOrga,
    sendAccountUpgradeAdmin
};