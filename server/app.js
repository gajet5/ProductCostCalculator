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

const protectingTikenMiddleware = require('./middleware/protectingToken');

const authRouter = require('./routers/auth');
const statusRouter = require('./routers/status');
const userRouter = require('./routers/user');
const tokenRouter = require('./routers/token');
const catalogsRouter = require('./routers/catalogs');

app.use('/', statusRouter);
app.use('/auth', authRouter);
app.use(protectingTikenMiddleware);
app.use('/token', tokenRouter);
app.use('/user', userRouter);
app.use('/catalogs', catalogsRouter);

connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`PCC server online on ${port} port.`);
    });
});
