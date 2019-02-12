const pug = require('pug');
const path = require('path');
const nodemailer = require('nodemailer');
const config = require('../config');

let smtpTransport = nodemailer.createTransport(config.mailOptions);

module.exports = {
    emailConfirm(email, id) {
        let mailOptions = {
            from: config.mailOptions.auth.user,
            to: email,
            subject: '[PCC] Подтверждение email',
            html: pug.renderFile(path.join(path.resolve(__dirname), '..', 'template', 'welcomeMail.pug'), { confirmLink: `${config.site}/registration/confirm/${id}` })
        };

        smtpTransport.sendMail(mailOptions, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Message sent: ${email}`);
            }
        });
    },
    forgotPassword(email, hash) {
        let mailOptions = {
            from: config.mailOptions.auth.user,
            to: email,
            subject: '[PCC] Обновление пароля',
            html: pug.renderFile(path.join(path.resolve(__dirname), '..', 'template', 'forgotPassword.pug'), { renewLink: `${config.site}/registration/renew/${hash}` })
        };

        smtpTransport.sendMail(mailOptions, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Message sent: ${email}`);
            }
        });
    }
};
