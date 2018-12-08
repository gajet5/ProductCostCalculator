const formulasModel = require('../models/formulas');

module.exports = {
    // GET /formulas/list?limit={number}&skip={number}
    async list(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
        let limit = req.query.limit;
        let skip = req.query.skip;

        try {
            let formulas = await formulasModel.find({
                owner: userId
            }, null, {
                skip: skip || 0
            }).limit(limit || 20);

            return res.json({
                status: 200,
                data: {
                    message: 'Список формул пользователя',
                    formulas
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
    },

    // POST /formulas/add
    async add(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));

        let name = req.body.name;
        let formula = req.body.formula;

        console.log(req.body);

        if (!formula || !name) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о формуле не переданны'
                }
            });
        }

        try {
            await formulasModel.create({
                name,
                owner: userId,
                formula
            });

            return res.json({
                status: 200,
                data: {
                    message: 'Формула добавлена в коллекцию'
                }
            });
        } catch (e) {
            console.log(e);
            return res.json({
                status: 500,
                data: {
                    message: 'Ошибка при добавлении формулы'
                }
            });
        }
    }
};
