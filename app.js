require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(morgan('[:date[web]] :method :url :status :response-time ms - :res[content-length]'));

app.use(
  express.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 1000000,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

process.on('uncaughtException', function (err) {
  morgan.error(err);
});

// eslint-disable-next-line no-unused-vars
process.on('unhandledRejection', function (reason, p) {
  morgan.error(reason);
});

module.exports = app;
