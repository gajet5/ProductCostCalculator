const documentsModel = require('../models/documents');
const catalogsModel = require('../models/catalogs');
const limits = require('../policy/limits');

module.exports = {
    // GET /catalogs/list?sortBy=${sortBy}&descending=${descending}&page=${page}&rowsPerPage=${rowsPerPage}&search=${search}
    async list(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
        let sortBy = req.query.sortBy;
        let descending = req.query.descending === 'true';
        let page = parseInt(req.query.page);
        let rowsPerPage = parseInt(req.query.rowsPerPage);
        let search = req.query.search.toString('utf8');

        if (limits.string(search, 100)) {
            return res.json({
                status: 204,
                data: {
                    message: 'Лимит строки search не корректен.'
                }
            });
        }

        try {
            let catalogs = await catalogsModel.find({
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
                    message: 'Список каталогов пользователя',
                    catalogs,
                    totalItems: await catalogsModel.find({ owner: userId }).countDocuments()
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

    // POST /catalogs/add
    async add(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));

        let name = req.body.name;

        if (!name) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о названии категории не переданны'
                }
            });
        }

        if (limits.string(name, 100)) {
            return res.json({
                status: 204,
                data: {
                    message: 'Лимит строки name не корректен.'
                }
            });
        }

        try {
            await catalogsModel.create({
                owner: userId,
                name
            });

            return res.json({
                status: 200,
                data: {
                    message: 'Каталог успешно создан'
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

    // PATCH /catalogs/edit
    async edit(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
        let catalogId = req.body.id;
        let newName = req.body.name;

        if (!catalogId && !newName) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о catalogId или newName категории не переданны'
                }
            });
        }

        if (limits.string(catalogId, 100) && limits.string(newName, 100)) {
            return res.json({
                status: 204,
                data: {
                    message: 'Лимит строки catalogId и newName не корректен.'
                }
            });
        }

        try {
            await catalogsModel.findOneAndUpdate({
                _id: catalogId,
                owner: userId
            }, {
                name: newName
            });
            return res.json({
                status: 200,
                data: {
                    message: 'Каталог успешно переименован'
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

    // DELETE /catalogs/remove
    async remove(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
        let catalogId = req.body.id;

        if (!catalogId) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о catalogId категории не переданны'
                }
            });
        }

        if (limits.string(catalogId, 50)) {
            return res.json({
                status: 204,
                data: {
                    message: 'Лимит строки catalogId не корректен.'
                }
            });
        }

        try {
            await documentsModel.deleteMany({
                catalogId: catalogId,
                owner: userId
            });

            await catalogsModel.findOneAndRemove({
                _id: catalogId,
                owner: userId
            });

            return res.json({
                status: 200,
                data: {
                    message: 'Каталог успешно удалён'
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
    }
};
