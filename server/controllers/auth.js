const User = require('../models/user');
const mailer = require('../services/mailer');

module.exports = {
    //POST /auth/registration
    registration(req, res) {
        User.create(req.body)
            .then(user => {
                mailer.welcome(user.email, user._id);
                res.status(200).json({
                    message: 'Регистрация прошла успешно'
                });
            })
            .catch(e => {
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
            });
    },

    //PATCH /auth/confirm/
    confirm(req, res) {
        User.findById(req.body.params.id)
            .then((user) => {
                // if (user !== null) {
                    if (!user.isActiveted) {
                        user.update({
                            isActiveted: true
                        })
                            .then(() => {
                                res.status(200).json({
                                    message: 'Пользователь успешно подтвердил регистрацию'
                                });
                            })
                            .catch(e => {
                                console.log(e);
                                res.status(500).json({
                                    message: 'Ошибка на сервере'
                                });
                            });
                    } else {
                        res.status(208).json({
                            message: 'Пользователь уже подтвержил свой email'
                        });
                    }
                // } else {
                //     res.status(400).json({
                //         message: 'Пользователь не найден'
                //     });
                // }

            })
            .catch(e => {
                res.status(400).json({
                    message: 'Пользователь не найден'
                });
            });
    },

    //GET /auth/emailExist?email=some@mail.ru
    emailExist(req, res) {
        User.findOne({email: req.query.email})
            .then((user) => {

                if (user !== null) {
                    res.status(200).json({
                        message: 'Пользователь найден'
                    });
                } else {
                    res.status(204).json({
                        message: 'Пользователь не найден'
                    });
                }
            })
            .catch(e => {
                console.log(e);
                res.status(500).json({
                    message: 'Ошибка на сервере'
                });
            })
    }

};