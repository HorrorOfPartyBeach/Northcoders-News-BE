const mongoose = require('mongoose');
const express = require('express');
const app = express();
const apiRouter = require('./routes/apiRouter')
const DB_URL = require('./config/config.js');

mongoose
  .connect(DB_URL)
  .then(() => console.log(`${DB_URL}`))
  .catch(console.log);

app.use('/api', apiRouter)

module.exports = app;