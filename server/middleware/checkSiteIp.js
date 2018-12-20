const config = require('../config');

module.exports = (req, res, next) => {
    // todo: Проверить на боевом сервере, там где разрабатываю ip не отображается ::1
    // todo: Тут может случается ошибка, нужно обрабатывать.
    if (config.checkSiteIp) {
        let ip = /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/.exec(req.ip)[1];

        console.log(ip);

        if (ip !== config.siteIp) {
            res.send('Отказано в доступе');
            return false;
        }

        next();
    } else {
        next();
    }
};
