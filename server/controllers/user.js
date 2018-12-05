const userModel = require('../models/user');

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
    }
};
