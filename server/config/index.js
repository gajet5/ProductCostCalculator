module.exports = {
    site: 'http://localhost:8080',
    port: 4040,
    mongodbUrl: 'mongodb://localhost:27017/ProductCostCalculator',
    mailOptions: {
        service: 'Yandex',
        auth: {
            user: 'no-replay@s-evil.ru',
            pass: ''
        }
    },
    auth: {
        jwtSecret: 'RZpEhnLhIoNjqLsfG58peE0xKVNsqxvP'
    }
};
