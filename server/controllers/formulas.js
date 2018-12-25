const formulasModel = require('../models/formulas');
const usetModel = require('../models/user');

module.exports = {
    // GET /formulas/formula?id=${payload}
    async formula(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
        let formulaId = req.query.id;

        if (!formulaId) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о формуле не переданны'
                }
            });
        }

        try {
            let formula = await formulasModel.findOne({
                _id: formulaId,
                owner: userId
            });

            return res.json({
                status: 200,
                data: {
                    message: 'Список формул пользователя',
                    formula
                }
            });
        } catch (e) {
            console.log(e);
            return res.json({
                status: 500,
                data: {
                    message: e.message
                }
            });
        }
    },

    // GET /formulas/list?sortBy=${sortBy}&descending=${descending}&page=${page}&rowsPerPage=${rowsPerPage}&search=${search}
    async list(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
        let sortBy = req.query.sortBy;
        let descending = req.query.descending === 'true';
        let page = parseInt(req.query.page);
        let rowsPerPage = parseInt(req.query.rowsPerPage);
        let search = req.query.search.toString('utf8');

        try {
            let formulas = await formulasModel.find({
                owner: userId,
                name: new RegExp(search, 'i')
            }, null, {
                skip: rowsPerPage * (page - 1) || 0,
                sort: {
                    [sortBy]: descending ? 1 : -1
                },
                limit: rowsPerPage || 10
            });

            return res.json({
                status: 200,
                data: {
                    message: 'Список формул пользователя',
                    formulas,
                    totalItems: await formulasModel.find({ owner: userId }).countDocuments()
                }
            });
        } catch (e) {
            console.log(e);
            return res.json({
                status: 500,
                data: {
                    message: e.message
                }
            });
        }
    },

    // GET /formulas/names-list
    async namesList(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));

        try {
            let names = await formulasModel.find({
                owner: userId
            }).select('name');

            return res.json({
                status: 200,
                data: {
                    message: 'Список формул пользователя',
                    names
                }
            });
        } catch (e) {
            console.log(e);
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
            let user = await usetModel.findById(userId);
            let formulaTotal = await formulasModel.find({
                owner: userId
            }).countDocuments();

            if (!user.isActiveted) {
                return res.json({
                    status: 204,
                    data: {
                        message: 'Акаунт пользователя не активирован'
                    }
                });
            }

            if (!user.premium && formulaTotal >= 1) {
                return res.json({
                    status: 204,
                    data: {
                        message: 'Акаунт пользователя находится в демо режиме'
                    }
                });
            }

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

    // PATCH /formulas/edit
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
