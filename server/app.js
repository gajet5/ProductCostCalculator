const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const { port } = require('./config');
const cors = require('cors');

const app = express();
const logger = morgan('tiny');

const { connection } = require('./services/db');

app.use(helmet());
app.use(cors());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authRouter = require('./routers/auth');
const statusRouter = require('./routers/status');

app.use('/', statusRouter);
app.use('/auth', authRouter);
// Auth middleware
// app.use('/catalogs', catalogsRouter);

connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`PCC server online on ${port} port.`);
    });
});
