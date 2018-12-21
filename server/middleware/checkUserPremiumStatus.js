const userModel = require('../models/user');

module.exports = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
    let user = await userModel.findById(userId);
    if ((Date.now() > new Date(user.premiumDateEnd)) && user.premium) {
        await user.updateOne({
            premium: false
        });
    }

    next();
};
