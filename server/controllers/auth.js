const userModel = require('../models/user');
const mailer = require('../services/mailer');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
const config = require('../config');

function jwtSingUser(user) {
    return jwt.sign(user, config.auth.jwtSecret, {
        expiresIn: 60 * 60 * 24 * 7
    });
}

module.exports = {
    // POST /auth/registration
    async registration(req, res) {
        let user;
        let email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
            res.json({
                status: 204,
                data: {
                    message: 'Данные о пользователе не переданны.'
                }
            });
            return;
        }

        let salt = await bcrypt.genSaltAsync(8);
        let passwordHash = await bcrypt.hashAsync(password, salt, null);

        try {
            user = await userModel.create({
                email,
                password: passwordHash
            });
        } catch (e) {
            switch (e.code) {
                case 11000:
                    res.json({
                        status: 400,
                        data: {
                            message: 'Email уже зарегистрирован в системе'
                        }
                    });
                    break;
                default:
                    res.json({
                        status: 500,
                        data: {
                            message: e.message
                        }
                    });
            }
            return;
        }

        mailer.welcome(user.email, user._id);

        let userSendObj = {
            id: user.id,
            isActiveted: user.isActiveted,
            premium: user.premium,
            premiumDateEnd: user.premiumDateEnd
        };

        res.json({
            status: 200,
            data: {
                message: 'Авторизация прошла успешно',
                user: userSendObj,
                token: jwtSingUser(userSendObj)
            }
        });
    },

    // PATCH /auth/confirm/
    async confirm(req, res) {
        let user;
        let userId = req.body.params.id;

        if (!userId) {
            res.json({
                status: 204,
                data: {
                    message: 'Данные о пользователе не переданны.'
                }
            });
            return;
        }

        try {
            user = userModel.findById(userId);
        } catch (e) {
            res.json({
                status: 400,
                data: {
                    message: 'Пользователь не найден'
                }
            });
        }

        if (user.isActiveted) {
            res.json({
                status: 208,
                data: {
                    message: 'Пользователь уже подтвержил свой email'
                }
            });
            return;
        }

        try {
            user = await user.update({
                isActiveted: true
            });
        } catch (e) {
            res.json({
                status: 500,
                data: {
                    message: 'Ошибка на сервере'
                }
            });
        }

        res.json({
            status: 200,
            data: {
                message: 'Пользователь успешно подтвердил регистрацию'
            }
        });
    },

    // GET /auth/emailExist?email=some@mail.ru
    async emailExist(req, res) {
        let email = req.query.email;
        let user;

        if (!email) {
            res.json({
                status: 204,
                data: {
                    message: 'Данные о пользователе не переданны.'
                }
            });
            return;
        }

        try {
            user = await userModel.findOne({ email });
        } catch (e) {
            res.json({
                status: 500,
                data: {
                    message: 'Ошибка на сервере'
                }
            });
        }

        if (!user) {
            res.json({
                status: 204,
                data: {
                    message: 'Пользователь не найден'
                }
            });
            return;
        }

        res.json({
            status: 200,
            data: {
                message: 'Пользователь найден'
            }
        });
    },

    // POST /auth/login
    async login(req, res) {
        let user;
        let email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
            res.json({
                status: 204,
                data: {
                    message: 'Данные о пользователе не переданны.'
                }
            });
            return;
        }

        try {
            user = await userModel.findOne({
                email
            });
        } catch (e) {
            res.json({
                status: 500,
                data: {
                    message: e.message
                }
            });
        }

        if (!user) {
            res.json({
                status: 403,
                data: {
                    message: 'Пользователь не найден.'
                }
            });
            return;
        }

        if (!await bcrypt.compareAsync(password, user.password)) {
            res.json({
                status: 403,
                data: {
                    message: 'Пароль не корректен.'
                }
            });
            return;
        }

        let userSendObj = {
            id: user.id,
            isActiveted: user.isActiveted,
            premium: user.premium,
            premiumDateEnd: user.premiumDateEnd
        };

        res.json({
            status: 200,
            data: {
                message: 'Авторизация прошла успешно',
                user: userSendObj,
                token: jwtSingUser(userSendObj)
            }
        });
    }
};
