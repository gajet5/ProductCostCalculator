const userModel = require('../models/user');
const codeActivationModel = require('../models/codeActivation');
const mailer = require('../services/mailer');
const limits = require('../policy/limits');

module.exports = {
    // GET /user/info
    async info(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));

        try {
            let user = await userModel.findById(userId);

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
                    message: 'Пользователь найден',
                    user: {
                        email: user.email,
                        isActiveted: user.isActiveted,
                        premium: user.premium,
                        premiumDateEnd: user.premiumDateEnd
                    }
                }
            });
        } catch (e) {
            console.log(e);
            return res.json({
                status: 500,
                data: {
                    message: 'Ошибка при поиске пользователя.'
                }
            });
        }
    },

    // GET /user/re-confirm-email?email=${email}
    async reConfirmEmail(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
        let email = req.query.email;

        if (!email) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о пользователе не переданны'
                }
            });
        }

        if (limits.string(email, 100)) {
            return res.json({
                status: 204,
                data: {
                    message: 'Лимит строки email не корректен.'
                }
            });
        }

        try {
            let user = await userModel.findById(userId);

            if (!user) {
                return res.json({
                    status: 204,
                    data: {
                        message: 'Пользователь не найден'
                    }
                });
            }

            if (new Date(user.lastConfirmEmail).getTime() > Date.now()) {
                return res.json({
                    status: 204,
                    data: {
                        message: 'Не прошло достаточно времени для нового письма'
                    }
                });
            }

            await user.updateOne({
                lastConfirmEmail: Date.now() + 1000 * 60 * 10
            });

            mailer.emailConfirm(email, userId);

            return res.json({
                status: 200,
                data: {
                    message: 'Письмо отправлено'
                }
            });
        } catch (e) {
            console.log(e);
            return res.json({
                status: 500,
                data: {
                    message: 'Ошибка при поиске пользователя.'
                }
            });
        }
    },

    // PATCH user/change-password
    async changePassword(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
        let newPassword = req.body.newPassword;

        if (!newPassword) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о формуле не переданны'
                }
            });
        }

        if (limits.string(newPassword, 100)) {
            return res.json({
                status: 204,
                data: {
                    message: 'Лимит строки newPassword не корректен.'
                }
            });
        }

        try {
            let user = await userModel.findById(userId);

            if (!user) {
                return res.json({
                    status: 204,
                    data: {
                        message: 'Пользователь не найден'
                    }
                });
            }

            await user.updateOne({
                password: newPassword
            });

            return res.json({
                status: 200,
                data: {
                    message: 'Пароль успешно изменён'
                }
            });
        } catch (e) {
            console.log(e);
            return res.json({
                status: 500,
                data: {
                    message: 'Ошибка при поиске пользователя'
                }
            });
        }
    },

    // POST /user/enable-premium
    async enablePremium(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
        let code = req.body.code;

        if (!code) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о коде не переданы'
                }
            });
        }

        if (limits.string(code, 64)) {
            return res.json({
                status: 204,
                data: {
                    message: 'Лимит строки code не корректен.'
                }
            });
        }

        try {
            let codeActivation = await codeActivationModel.findOne({
                code
            });
            let user = await userModel.findById(userId);

            if (!codeActivation || codeActivation.isActivated) {
                return res.json({
                    status: 204,
                    data: {
                        message: 'Код не корректен'
                    }
                });
            }

            if (codeActivation && !codeActivation.isActiveted) {
                await user.updateOne({
                    premium: true,
                    premiumDateEnd: Date.now() + 1000 * 60 * 60 * 24 * 30 * 12
                });
                await codeActivation.updateOne({
                    owner: user._id,
                    isActivated: true
                });

                return res.json({
                    status: 200,
                    data: {
                        message: 'Аккаунт успешно активирован',
                        user: {
                            premium: user.premium,
                            premiumDateEnd: user.premiumDateEnd
                        }
                    }
                });
            }
        } catch (e) {
            console.log(e);
            return res.json({
                status: 500,
                data: {
                    message: 'Ошибка при активации аккаунта'
                }
            });
        }
    }
};
