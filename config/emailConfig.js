const nodemailer = require("nodemailer");


const transport = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ADDR,
        pass: process.env.EMAIL_PASS
    }
});

module.exports = transport;