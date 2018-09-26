process.env.NODE_ENV = 'test';
const data = require('../seed/testData');
const seedDB = require('../seed/seed.js');
const { expect } = require('chai');
const app = require('../app.js');
const request = require('supertest')(app);
const mongoose = require('mongoose');

describe('/api', function () {
  this.timeout(60000);
  let users, topics, articles, comments;

  beforeEach(() => {
    return seedDB(data)
      .then((docs) => {
        [users, topics, articles, comments] = docs;
      })
  });

  after(() => mongoose.disconnect());

  describe('/', () => {
    it('GET returns a status 200 and a welcome message', () => {
      return request.get('/')
        .expect(200)
        .then(res => {
          expect(res.body).to.eql({ msg: 'Welcome to NC News!' })
        })
    })
  })
  describe('/users', () => {
    it('GET returns an array of users and 200 status code', () => {
      return request.get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body.users).to.have.length(users.length);
        })
    })
  })
  describe.only('/users/:username', () => {
    it('GET returns a single user object by username and 200 status code', () => {
      return request.get(`/api/users/${users[0].username}`)
        .expect(200)
        .then(res => {
          // console.log(users[0])
          console.log(res.body)
          expect(res.body.users.username).to.equal(users[0].username);
          // console.log(res.body.users.username)
          console.log(users[0].username)
        })
    })
  })
  describe('/topics/:topic_slug/articles', () => {
    it('GET returns all the articles related to a single topic and 200 status code', () => {
      return request.get('/api/topics/:topic_slug/articles')
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.have.length(topics.length);
        })
    })
  })
});