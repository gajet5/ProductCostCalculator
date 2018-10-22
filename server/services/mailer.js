const pug = require('pug');
const path = require('path');
const nodemailer = require('nodemailer');
const config = require('../config');

let smtpTransport = nodemailer.createTransport({
    service: 'Yandex',
    auth: {
        user: "info@mary-z.ru",
        pass: "rhikgedlhukajumt"
    }
});

module.exports = {
    welcome(email, id) {

        let mailOptions = {
            from: 'info@mary-z.ru',
            to: email,
            subject: "[PCC] Успешная регистрация",
            html: pug.renderFile(path.join(path.resolve(__dirname), '..', 'template', 'welcomeMail.pug'), {confirmLink: `${config.site}/registration/confirm/${id}`})
        };

        smtpTransport.sendMail(mailOptions, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Message sent: ${email}`);
            }
        });
    }
};