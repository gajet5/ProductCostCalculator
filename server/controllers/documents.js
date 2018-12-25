const documentsModel = require('../models/documents');

module.exports = {
    // GET /documents/list?sortBy=${sortBy}&descending=${descending}&page=${page}&rowsPerPage=${rowsPerPage}&search=${search}&catalogId=${catalogSelected}
    async list(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
        let sortBy = req.query.sortBy;
        let descending = req.query.descending === 'true';
        let page = parseInt(req.query.page);
        let rowsPerPage = parseInt(req.query.rowsPerPage);
        let search = req.query.search.toString('utf8');
        let catalogId = req.query.catalogId;

        try {
            let documents = await documentsModel.find({
                owner: userId,
                catalogId,
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
                    message: 'Список документов пользователя',
                    documents,
                    totalItems: await documentsModel.find({ owner: userId, catalogId }).countDocuments()
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

    // POST /documents/add
    async add(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));

        let name = req.body.name;
        let catalogId = req.body.catalogId;
        let totalCount = req.body.totalCount;
        let options = req.body.options;

        if (!name && !catalogId) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о названии не переданны'
                }
            });
        }

        try {
            await documentsModel.create({
                owner: userId,
                catalogId,
                name,
                totalCount,
                options
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

    // PATCH /documents/edit
    async edit(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
        let documentId = req.body.id;
        let newName = req.body.name;
        let totalCount = req.body.totalCount;
        let options = req.body.options;

        if (!documentId && !newName) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о documentId или newName или catalogId не переданны'
                }
            });
        }

        try {
            await documentsModel.findOneAndUpdate({
                _id: documentId,
                owner: userId
            }, {
                name: newName,
                totalCount,
                options
            });
            return res.json({
                status: 200,
                data: {
                    message: 'Документ успешно изменён'
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

    // DELETE /documents/remove
    async remove(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
        let documentId = req.body.id;

        if (!documentId) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о catalogId категории не переданны'
                }
            });
        }

        try {
            await documentsModel.findOneAndRemove({
                _id: documentId,
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
