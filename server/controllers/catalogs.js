const catalogsModel = require('../models/catalogs');

module.exports = {
    // GET /catalogs/list?limit={number}&skip={number}
    async list(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
        let limit = req.query.limit;
        let skip = req.query.skip;

        try {
            let catalogs = await catalogsModel.find({
                owner: userId
            }, null, {
                skip: skip || 0,
            }).limit(limit || 20);

            return res.json({
                status: 200,
                data: {
                    message: 'Список каталогов пользователя',
                    catalogs
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

    // POST /catalogs/create
    async create(req, res) {
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

        try {
            let catalog = await catalogsModel.create({
                owner: userId,
                name
            });

            return res.json({
                status: 200,
                data: {
                    message: 'Каталог успешно создан',
                    catalog: {
                        id: catalog.id,
                        name: catalog.name,
                        createDate: catalog.createDate
                    }
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

    // PATCH: /catalogs/rename
    async rename(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
        let catalogId = req.body.catalogId;
        let newName = req.body.newName;

        if (!catalogId || !newName) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о catalogId или newName категории не переданны'
                }
            });
        }

        try {
            let catalog = await catalogsModel.findOneAndUpdate({
                id: catalogId,
                owner: userId
            }, {
                name: newName
            });
            return res.json({
                status: 200,
                data: {
                    message: 'Каталог успешно переименован',
                    catalog: {
                        id: catalog.id,
                        name: catalog.name
                    }
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

    // DELETE: /catalogs/delete
    async delete(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
        let catalogId = req.body.catalogId;

        if (!catalogId) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о catalogId категории не переданны'
                }
            });
        }

        try {
            await catalogsModel.findOneAndDelete({
                id: catalogId,
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
