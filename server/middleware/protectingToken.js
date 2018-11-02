const jwt = require('jsonwebtoken');
const config = require('../config');
const util = require('util');

module.exports = async (req, res, next) => {
    const jwtVerify = util.promisify(jwt.verify);
    const token = req.headers['x-access-token'];

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
