const Joi = require('joi');

module.exports = (req, res, next) => {
    const schema = {
        email: Joi.string().email(),
        password: Joi.string().regex(
            new RegExp('^[a-zA-Z0-9]{4,}$')
        )
    };

    const { error } = Joi.validate(req.body, schema);

    if (error) {
        switch (error.details[0].context.key) {
            case 'email':
                res.status(400).json({
                    message: 'Неверный формат email'
                });
                break;

            case 'password':
                res.status(400).json({
                    message: 'Пароль должен сожержит неверные символы или меньше 4 знаков'
                });
                break;

            default:
                res.status(500).json({
                    message: 'Что-то пошло не так'
                });
        }
    } else {
        next();
    }
};
