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
                    formulas,
                    totalCount: await formulasModel.find({ owner: userId }).countDocuments()
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
    },

    // PATCH /formulas/add
    async edit(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));

        let id = req.body.id;
        let name = req.body.name;
        let formula = req.body.formula;

        if (!id || !formula || !name) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о формуле не переданны'
                }
            });
        }

        try {
            await formulasModel.findOneAndUpdate({
                _id: id,
                owner: userId
            },
            {
                name,
                formula
            });

            return res.json({
                status: 200,
                data: {
                    message: 'Формула успешно изменена'
                }
            });
        } catch (e) {
            console.log(e);
            return res.json({
                status: 500,
                data: {
                    message: 'Ошибка при обновлении формулы'
                }
            });
        }
    },

    // DELETE /formulas/remove
    async remove(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));

        let id = req.body.id;

        if (!id) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о формуле не переданны'
                }
            });
        }

        try {
            let result = await formulasModel.deleteOne({
                _id: id,
                owner: userId
            });

            if (!result.n) {
                return res.json({
                    status: 400,
                    data: {
                        message: 'Ниодна формула при удалении не пострадала'
                    }
                });
            }

            return res.json({
                status: 200,
                data: {
                    message: 'Формула успешно удалена'
                }
            });
        } catch (e) {
            console.log(e);
            return res.json({
                status: 500,
                data: {
                    message: 'Ошибка при удалении формулы'
                }
            });
        }
    }
};
