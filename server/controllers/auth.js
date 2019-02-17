const crypto = require('crypto');
const userModel = require('../models/user');
const formulasModel = require('../models/formulas');
const positionsModel = require('../models/positions');
const mailer = require('../services/mailer');
const jwt = require('jsonwebtoken');
const config = require('../config');
const defaultFormulas = require('../config/defaultFormulas');
const defaultPositions = require('../config/defaultPositions');
const limits = require('../policy/limits');

function jwtSingUser(data) {
    return jwt.sign(data, config.auth.jwtSecret, {
        expiresIn: config.auth.expTime
    });
}

module.exports = {
    // GET /auth/emailExist?email={string}
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

        if (limits.string(email, 50)) {
            return res.json({
                status: 204,
                data: {
                    message: 'Лимит email не корректен.'
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

    // GET /auth/forgotPassword
    async forgotPassword(req, res) {
        let email = req.query.email;

        if (!email) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о email не переданны.'
                }
            });
        }

        try {
            let user = await userModel.findOne({ email });
            let hash;

            if (!user) {
                return res.json({
                    status: 204,
                    data: {
                        message: 'Пользователь не найден'
                    }
                });
            }

            if (user.lastForgotEmail > Date.now()) {
                return res.json({
                    status: 204,
                    data: {
                        message: 'Время повторного сброса пароля не подошло.'
                    }
                });
            }

            while (true) {
                hash = crypto.randomBytes(64).toString('hex');
                if (!await userModel.findOne({ forgotPasswordHash: hash })) {
                    break;
                }
            }

            await user.updateOne({
                forgotPasswordHash: hash,
                lastForgotEmail: Date.now() + 1000 * 60 * 5
            });

            if (config.sendMail) {
                mailer.forgotPassword(email, hash);
            }

            return res.json({
                status: 200,
                data: {
                    message: 'На почту отправлено сообщение'
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

        if (limits.string(email, 50) && limits.string(password, 50)) {
            return res.json({
                status: 204,
                data: {
                    message: 'Лимиты строк не корректны.'
                }
            });
        }

        try {
            let user = await userModel.create({
                email,
                password
            });

            for (let item of defaultFormulas) {
                await formulasModel.create({
                    owner: user._id,
                    name: item.name,
                    formula: item.formula
                });
            }

            for (let item of defaultPositions) {
                await positionsModel.create({
                    owner: user._id,
                    name: item
                });
            }

            if (config.sendMail) {
                mailer.emailConfirm(user.email, user._id);
            }

            return res.json({
                status: 200,
                data: {
                    message: 'Регистрация прошла успешно',
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

    // POST /auth/change-password
    async changePassword(req, res) {
        let id = req.body.id;
        let password = req.body.password;

        if (!id || !password) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о пользователе не переданны.'
                }
            });
        }

        if (limits.string(id, 128) && limits.string(password, 50)) {
            return res.json({
                status: 204,
                data: {
                    message: 'Лимиты строк не корректны.'
                }
            });
        }

        try {
            let user = await userModel.findOne({
                forgotPasswordHash: id
            });

            if (!user) {
                return res.json({
                    status: 404,
                    data: {
                        message: 'Пользователь не найден.'
                    }
                });
            }

            await user.updateOne({
                password,
                forgotPasswordHash: ''
            });

            return res.json({
                status: 200,
                data: {
                    message: 'Изменение пароля прошло успешно.'
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

        if (limits.string(userId, 50)) {
            return res.json({
                status: 204,
                data: {
                    message: 'Лимит userId не корректен.'
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
                user = await user.updateOne({
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

        if (limits.string(email, 50) && limits.string(password, 50)) {
            return res.json({
                status: 204,
                data: {
                    message: 'Лимиты строк не корректны.'
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
