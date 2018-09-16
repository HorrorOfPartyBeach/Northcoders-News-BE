const mongoose = require('mongoose');
const express = require('express');
const app = express();
const apiRouter = require('./routes/api')
const DB_URL = require('./config/config.js');
const bodyParser = require('body-parser');

mongoose
  .connect(DB_URL)
  .then(() => console.log(`${DB_URL}`))
  .catch(console.log);

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send({ msg: 'Welcome to NC News!' });
});

app.use('/api', apiRouter)

module.exports = app;