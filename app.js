const mongoose = require('mongoose');
const express = require('express');
const apiRouter = require('./routes/api')
const DB_URL = require('./config/config.js');
const bodyParser = require('body-parser');
const { handle404s, handle400s, handle500s } = require('./errors');
const app = express();

// Connect to database
mongoose
  .connect(DB_URL)
  .then(() => console.log(`${DB_URL}`))
  .catch(console.log);

// Use ejs
app.set('view engine', 'ejs')

// Body-Parser
app.use(bodyParser.json(), express.static('public'));

// GET /api - # Serves an HTML page with documentation for all the available endpoints
app.get('/', (req, res, next) => {
  res.render('pages/index');
});

// Use the API Router
app.use('/api', apiRouter)

// Error Handling
// General 404 block
app.use('/*', (req, res) => {
  res.status(404).send('Page not found');
})

app.use(handle400s);
app.use(handle404s);
app.use(handle500s);

module.exports = app;