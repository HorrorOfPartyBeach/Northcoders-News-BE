process.env.NODE_ENV = 'test';
const data = require('../seed/testData');
const { seedDB } = require('../seed/seed.js');
const { expect } = require('chai');
const app = require('../app.js');
const request = require('supertest')(app);
const mongoose = require('mongoose');

describe('/api', () => {

  let users, topics, articles, comments;

  beforeEach(function () {
    return seedDB(data)
      .then((docs) => {
        [users, topics, articles, comments] = docs
      })
  });

  after(() => mongoose.disconnect());

  describe('/users', () => {
    it('GET returns an array of users and 200 status code', () => {
      return request.get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body.users).to.have.length(users.length);
        })
    })
  })

});