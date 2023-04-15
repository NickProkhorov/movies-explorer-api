require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { crashTestErrMsg } = require('./utils/constants');
const { limiter } = require('./middlewares/ratelimit');

const routes = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');

const {
  PORT = 3000,
  DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;
const app = express();

app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(crashTestErrMsg);
  }, 0);
});
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect(DB_ADDRESS);

app.listen(PORT);
