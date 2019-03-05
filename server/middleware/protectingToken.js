const jwt = require('jsonwebtoken');
const config = require('../config');
const util = require('util');
const userModel = require('../models/user');

module.exports = async (req, res, next) => {
    const jwtVerify = util.promisify(jwt.verify);
    const token = req.headers['x-access-token'];

    if (token) {
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));

        let user = await userModel.findById(userId);

        if (!user) {
            return res.send({
                status: 403,
                data: {
                    message: 'Пользователь не найден.'
                }
            });
        }
    }

    if (!token) {
        return res.send({
            status: 403,
            data: {
                message: 'Ключ не предоставлен.'
            }
        });
    }

    try {
        await jwtVerify(token, config.auth.jwtSecret);
        next();
    } catch (e) {
        console.log(e.message);
        return res.json({
            status: 401,
            data: {
                message: 'Ключ не корректен.'
            }
        });
    }
};
