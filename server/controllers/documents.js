const catalogsModel = require('../models/catalogs');
const documentsModel = require('../models/documents');
const positionsModel = require('../models/positions');
const limits = require('../policy/limits');

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

        if (limits.string(search, 100)) {
            return res.json({
                status: 204,
                data: {
                    message: 'Лимит строки search не корректен.'
                }
            });
        }

        try {
            let { name } = await catalogsModel.findById(catalogId).select('name');

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
                    catalogName: name,
                    documents,
                    totalItems: await documentsModel.find({ owner: userId, catalogId }).countDocuments()
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

    // GET /documents/positions
    async getPositions(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));

        try {
            return res.json({
                status: 200,
                data: {
                    message: 'Список позиций пользователя',
                    positions: await positionsModel.find({
                        owner: userId
                    }).select('name').sort({
                        name: 1
                    })
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

    // GET /documents/document
    async document(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
        let documentId = req.query.documentId;

        try {
            return res.json({
                status: 200,
                data: {
                    message: 'Список позиций пользователя',
                    document: await documentsModel.find({
                        _id: documentId,
                        owner: userId
                    })
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

    // POST /documents/add
    async add(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));

        let name = req.body.name;
        let catalogId = req.body.catalogId;
        let totalCount = req.body.totalCount;
        let options = req.body.options;

        if (!catalogId && !name && !totalCount && !options) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о документе не переданны'
                }
            });
        }

        if (limits.string(catalogId, 50) && limits.string(name, 100)) {
            return res.json({
                status: 204,
                data: {
                    message: 'Лимит строки name не корректен.'
                }
            });
        }

        for (let option of options) {
            for (let formula of option.formulas) {
                if (limits.string(formula.comment, 5000)) {
                    return res.json({
                        status: 204,
                        data: {
                            message: 'Лимит строки comment не корректен.'
                        }
                    });
                }
            }
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

    // POST /documents/add-positions
    async addPositions(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
        let name = req.body.name;

        if (!name) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о названии не переданны'
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
            await positionsModel.create({
                owner: userId,
                name
            });

            return res.json({
                status: 200,
                data: {
                    message: 'Позиция успешно добавлена'
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

        if (!documentId && !newName && !totalCount && !options) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о документе не переданны'
                }
            });
        }

        if (limits.string(documentId, 50) && limits.string(newName, 100)) {
            return res.json({
                status: 204,
                data: {
                    message: 'Лимит строки name не корректен.'
                }
            });
        }

        for (let option of options) {
            if (option.new) {
                for (let formula of option.formulas) {
                    if (limits.string(formula.comment, 5000)) {
                        return res.json({
                            status: 204,
                            data: {
                                message: 'Лимит строки comment не корректен.'
                            }
                        });
                    }
                }
            } else {
                if (limits.string(option.comment, 5000)) {
                    return res.json({
                        status: 204,
                        data: {
                            message: 'Лимит строки comment не корректен.'
                        }
                    });
                }
            }
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
    },

    // DELETE /documents/delete-positions
    async deletePositions(req, res) {
        const token = req.headers['x-access-token'];
        let { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
        let positionId = req.body.id;

        if (!positionId) {
            return res.json({
                status: 204,
                data: {
                    message: 'Данные о id позиции не переданны'
                }
            });
        }

        try {
            await positionsModel.findOneAndRemove({
                _id: positionId,
                owner: userId
            });

            return res.json({
                status: 200,
                data: {
                    message: 'Позиции успешно удалёна'
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
