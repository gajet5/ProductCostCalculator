const userModel = require('../models/user');
const mailer = require('../services/mailer');
const jwt = require('jsonwebtoken');
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
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о пользователе не переданны.'
                }
            });
        }

        try {
            user = await userModel.create({
                email,
                password
            });
        } catch (e) {
            switch (e.code) {
                case 11000:
                    return res.json({
                        status: 400,
                        data: {
                            message: 'Email уже зарегистрирован в системе'
                        }
                    });
                default:
                    return res.json({
                        status: 500,
                        data: {
                            message: e.message
                        }
                    });
            }
        }

        if (config.sendMail) {
            mailer.welcome(user.email, user._id);
        }

        let userSendObj = {
            id: user.id,
            isActiveted: user.isActiveted,
            premium: user.premium,
            premiumDateEnd: user.premiumDateEnd
        };

        return res.json({
            status: 200,
            data: {
                message: 'Авторизация прошла успешно',
                token: jwtSingUser(userSendObj)
            }
        });
    },

    // PATCH /auth/confirm/
    async confirm(req, res) {
        let user;
        let userId = req.body.params.id;

        if (!userId) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о пользователе не переданны.'
                }
            });
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
            return res.json({
                status: 208,
                data: {
                    message: 'Пользователь уже подтвержил свой email'
                }
            });
        }

        try {
            user = await user.update({
                isActiveted: true
            });
        } catch (e) {
            return res.json({
                status: 500,
                data: {
                    message: 'Ошибка на сервере'
                }
            });
        }

        return res.json({
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
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о пользователе не переданны.'
                }
            });
        }

        try {
            user = await userModel.findOne({ email });
        } catch (e) {
            return res.json({
                status: 500,
                data: {
                    message: 'Ошибка на сервере'
                }
            });
        }

        if (!user) {
            return res.json({
                status: 204,
                data: {
                    message: 'Пользователь не найден'
                }
            });
        }

        return res.json({
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
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о пользователе не переданны.'
                }
            });
        }

        try {
            user = await userModel.findOne({
                email
            });
        } catch (e) {
            return res.json({
                status: 500,
                data: {
                    message: e.message
                }
            });
        }

        if (!user) {
            return res.json({
                status: 403,
                data: {
                    message: 'Пользователь не найден.'
                }
            });
        }

        if (!await user.comparePassword(password)) {
            return res.json({
                status: 403,
                data: {
                    message: 'Пароль не корректен.'
                }
            });
        }

        let userSendObj = {
            id: user.id,
            isActiveted: user.isActiveted,
            premium: user.premium,
            premiumDateEnd: user.premiumDateEnd
        };

        return res.json({
            status: 200,
            data: {
                message: 'Авторизация прошла успешно',
                token: jwtSingUser(userSendObj)
            }
        });
    }
};
