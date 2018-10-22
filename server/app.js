const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const {port} = require('./config');
const cors = require('cors');

const server = express();
const logger = morgan('tiny');

const {connection} = require('./services/db');

server.use(helmet());
server.use(cors());
server.use(logger);
server.use(express.json());

const authRouter = require('./routers/auth');

server.use('/auth',authRouter);

connection.once('open', () => {
    console.log('Connected to MongoDB');
    server.listen(port, () => {
        console.log(`PCC server online on ${port} port.`);
    });
});

