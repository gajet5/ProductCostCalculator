module.exports = async (req, res) => {
    // GET: /

    console.log(req.headers.authorization);

    res.send({
        status: 200,
        data: {
            message: 'PCC REST API'
        }
    });
};
