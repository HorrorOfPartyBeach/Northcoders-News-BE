const seedDB = require('./seed');
const mongoose = require('mongoose');
const {DB_URL} = require('../config/config.js');
const data = require('./testData');

mongoose.connect(DB_URL)
  .then(() => {
    console.log('connected')
    return seedDB(data)
  })
  .then(() => {
    console.log('Database successfully seeded!')
    mongoose.disconnect();
  })
  .catch(console.log);