const codeActivationModel = require('../models/codeActivation');
const config = require('../config');
const crypto = require('crypto');
const fs = require('fs-extra');
const path = require('path');

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
        let codes = [];

        for (let i = 0; i < limit; i += 1) {
            let code;

            do {
                code = crypto.randomBytes(32).toString('hex');
                codes.push(code);

                let value = await codeActivationModel.findOne({
                    code
                });

                if (value) {
                    code = undefined;
                }
            } while (!code);

            await codeActivationModel.create({
                code
            });
        }

        let date = Date.now();
        let codesPath = path.join(path.resolve(__dirname), '..', 'codes', `${date}.csv`);
        await fs.ensureDir(path.join(path.resolve(__dirname), '..', 'codes'));
        codes.forEach(async value => {
            try {
                await fs.appendFile(codesPath, `${value}\n`, 'utf8');
            } catch (e) {
                console.log(e);
            }
        });

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
