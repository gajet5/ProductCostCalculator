module.exports = {
    site: 'http://localhost:8080',
    port: 4040,
    mongodbUrl: 'mongodb://localhost:27017/ProductCostCalculator',
    mailOptions: {
        service: 'Yandex',
        auth: {
            user: '',
            pass: ''
        }
    },
    auth: {
        jwtSecret: ''
    }
};