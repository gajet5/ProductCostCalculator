const codeActivationModel = require('../models/codeActivation');
const config = require('../config');
const crypto = require('crypto');
const fs = require('fs-extra');

// GET /code-generator?user${string}&password=${string}&limit=${number}
module.exports = async (req, res) => {
    let user = req.query.user;
    let password = req.query.password;
    let limit = req.query.limit || 10;

    if (user !== config.codeGenerator.user && password !== config.codeGenerator.password) {
        return res.json({
            status: 206,
            data: {
                message: 'Переданы некоректные данные'
            }
        });
    }

    try {
        for (let i = 0; i < limit; i += 1) {
            let code;

            do {
                code = crypto.randomBytes(32).toString('hex');

                let value = await codeActivationModel.findOne({
                    code
                });

                if (value) {
                    code = undefined;
                }
            } while (!code);

            // todo: Дописать сбор ключей в один файл
            await fs.appendFile(`${Date.now()}.log`, code, 'utf8');

            await codeActivationModel.create({
                code
            });
        }

        return res.json({
            status: 200,
            data: {
                message: 'Ключи сгенерированы'
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
};
