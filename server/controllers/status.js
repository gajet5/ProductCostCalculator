module.exports = async (req, res) => {
    // GET: /
    res.send({
        status: 200,
        data: {
            message: 'PCC REST API'
        }
    });
};
