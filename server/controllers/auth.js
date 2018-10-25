const userModel = require('../models/user');
const mailer = require('../services/mailer');

module.exports = {
    //POST /auth/registration
    async registration(req, res) {
        let user;
        let email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
            res.status(204).json({
                status: 204,
                message: "Данные о пользователе не переданны."
            });
            return;
        }

        try {
            user = await userModel.create({
                email,
                password
            });
        } catch (e) {
            switch (e.code) {
                case 11000:
                    res.status(400).json({
                        message: "Email уже зарегистрирован в системе"
                    });
                    break;
                default:
                    res.status(500).json({
                        message: e.message
                    });
            }
            return;
        }

        mailer.welcome(user.email, user._id);

        res.status(200).json({
            message: 'Регистрация прошла успешно'
        });
    },

    //PATCH /auth/confirm/
    async confirm(req, res) {
        let user;
        let userId = req.body.id;

        if (!userId) {
            res.status(204).json({
                status: 204,
                message: "Данные о пользователе не переданны."
            });
            return;
        }

        try {
            user = userModel.findById(userId);
        } catch (e) {
            res.status(400).json({
                message: 'Пользователь не найден'
            });
        }

        if (user.isActiveted) {
            res.status(208).json({
                message: 'Пользователь уже подтвержил свой email'
            });
            return;
        }

        try {
            user = await user.update({
                isActiveted: true
            });
        } catch(e) {
            res.status(500).json({
                message: 'Ошибка на сервере'
            });
        }

        res.status(200).json({
            message: 'Пользователь успешно подтвердил регистрацию'
        });
    },

    //GET /auth/emailExist?email=some@mail.ru
    async emailExist(req, res) {
        let email = req.query.email;
        let user;

        if (!email) {
            res.status(204).json({
                status: 204,
                message: "Данные о пользователе не переданны."
            });
            return;
        }

        try {
            user = await userModel.findOne({email});
        } catch (e) {
            res.status(500).json({
                message: 'Ошибка на сервере'
            });
        }


        if (!user) {
            res.status(204).json({
                message: 'Пользователь не найден'
            });
            return;
        }

        res.status(200).json({
            message: 'Пользователь найден'
        });

    }

};