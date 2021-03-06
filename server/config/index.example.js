module.exports = {
    port: 4040,
    site: 'http://localhost:8080',
    mongodbUrl: 'mongodb://localhost:27017/ProductCostCalculator',
    sendMail: false,
    mailOptions: {
        service: 'Yandex',
        auth: {
            user: '',
            pass: ''
        }
    },
    auth: {
        jwtSecret: '',
        expTime: '7d'
    },
    codeGenerator: {
        user: '',
        password: ''
    }
};
