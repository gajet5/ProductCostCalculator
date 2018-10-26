module.exports = async (req, res) => {
    res.status(200).send({
        status: 200,
        data: {
            message: 'Welcome to PCC server.'
        }
    });
};
