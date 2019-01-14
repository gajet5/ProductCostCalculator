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

const protectingTokenMiddleware = require('./middleware/protectingToken');
const checkUserPremiumStatusMiddleware = require('./middleware/checkUserPremiumStatus');

const authRouter = require('./routers/auth');
const statusRouter = require('./routers/status');
const userRouter = require('./routers/user');
const tokenRouter = require('./routers/token');
const catalogsRouter = require('./routers/catalogs');
const documentsRouter = require('./routers/documents');
const formulasRouter = require('./routers/formulas');
const codeGeneratorRouter = require('./routers/codeGenerator');

app.use('/code-generator', codeGeneratorRouter);
app.use('/', statusRouter);
app.use('/auth', authRouter);
app.use(protectingTokenMiddleware);
app.use('/token', tokenRouter);
app.use(checkUserPremiumStatusMiddleware);
app.use('/user', userRouter);
app.use('/catalogs', catalogsRouter);
app.use('/documents', documentsRouter);
app.use('/formulas', formulasRouter);

connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`PCC server online on ${port} port.`);
    });
});
