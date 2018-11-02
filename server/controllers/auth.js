const userModel = require('../models/user');
const mailer = require('../services/mailer');
const jwt = require('jsonwebtoken');
const config = require('../config');

function jwtSingUser(data) {
    return jwt.sign(data, config.auth.jwtSecret, {
        expiresIn: config.auth.expTime
    });
}

module.exports = {
    // POST /auth/registration
    async registration(req, res) {
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
            let user = await userModel.create({
                email,
                password
            });

            if (config.sendMail) {
                mailer.welcome(user.email, user._id);
            }

            return res.json({
                status: 200,
                data: {
                    message: 'Авторизация прошла успешно',
                    token: jwtSingUser({ userId: user.id })
                }
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
    },

    // PATCH /auth/confirm/
    async confirm(req, res) {
        let userId = req.body.id;

        if (!userId) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о пользователе не переданны.'
                }
            });
        }

        try {
            let user = userModel.findById(userId);

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

                return res.json({
                    status: 200,
                    data: {
                        message: 'Пользователь успешно подтвердил регистрацию'
                    }
                });
            } catch (e) {
                return res.json({
                    status: 500,
                    data: {
                        message: 'Ошибка на сервере'
                    }
                });
            }
        } catch (e) {
            res.json({
                status: 400,
                data: {
                    message: 'Пользователь не найден'
                }
            });
        }
    },

    // GET /auth/emailExist?email=some@mail.ru
    async emailExist(req, res) {
        let email = req.query.email;

        if (!email) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о пользователе не переданны.'
                }
            });
        }

        try {
            let user = await userModel.findOne({ email });

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
        } catch (e) {
            return res.json({
                status: 500,
                data: {
                    message: 'Ошибка на сервере'
                }
            });
        }
    },

    // POST /auth/login
    async login(req, res) {
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
            let user = await userModel.findOne({
                email
            });

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

            return res.json({
                status: 200,
                data: {
                    message: 'Авторизация прошла успешно',
                    token: jwtSingUser({ userId: user.id })
                }
            });
        } catch (e) {
            return res.json({
                status: 500,
                data: {
                    message: e.message
                }
            });
        }
    }
};
