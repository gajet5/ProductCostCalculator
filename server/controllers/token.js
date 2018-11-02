module.exports = async (req, res) => {
    // GET: /token/status
    res.send({
        status: 200,
        data: {
            message: 'Ключ корректен.'
        }
    });
};
