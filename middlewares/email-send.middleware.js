const nodeMailer = require('nodemailer');

//nodemailer
const transporter = nodeMailer.createTransport({
    secureConnection: false,
    host: process.env.EMAIL_HOST,
    port: 587,
    tls: {
        ciphers: "SSLv3"
    },
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = transporter;