process.env.NODE_ENV = 'test';
const data = require('../seed/testData');
const seedDB = require('../seed/seed.js');
const { expect } = require('chai');
const app = require('../app.js');
const request = require('supertest')(app);
const mongoose = require('mongoose');

describe('/api', function() {
    // Set timeout so tests run
    this.timeout(60000);
    let users, topics, articles, comments;

    // Reseed database before each test
    beforeEach(() => {
        return seedDB(data)
            .then((docs) => {
                [users, topics, articles, comments] = docs;
            })
    });

    // Disconnect from Mongoose after tests
    after(() => mongoose.disconnect());

    // Main page
    describe('/', () => {
        it('GET returns a status 200 and a welcome message', () => {
            return request.get('/')
                .expect(200)
                .then(res => {
                    expect(res.body).to.eql({ msg: 'Welcome to NC News!' })
                })
        })
    })

    /* USERS */

    // GET all users
    describe('/users', () => {
        it('GET returns an array of users and 200 status code', () => {
            return request.get('/api/users')
                .expect(200)
                .then(res => {
                    expect(res.body.users).to.have.length(users.length);
                })
        })
    })

    // GET by username
    describe('/users/:username', () => {
        it('GET returns a single user object by username and 200 status code', () => {
            return request.get(`/api/users/${users[0].username}`)
                .expect(200)
                .then(res => {
                    // console.log(users[0].username, '<<<<')
                    // console.log(res.body.user[0].username)
                    expect(res.body.user[0].username).to.equal(users[0].username);
                    // console.log(res.body.users.username)
                    console.log(users[0].username)
                })
        })
        it('GET returns an error message and 404 status code when user not found', () => {
            return request.get(`/api/users/${users[2]}`)
            console.log(`${users}[2]`)
                // test only passes when the console.log is on line 63??
                .expect(404)
                .then(res => {
                    expect(res.body.length).to.equal(0)
                    expect(res.body.msg).to.equal('User not found');
                })
        })
    })

    /* COMMENTS */

    // GET all comments
    describe('/comments', () => {
        it('GET returns an array of comments and 200 status code', () => {
            return request.get('/api/comments')
                .expect(200)
                .then(res => {
                    expect(res.body.comments).to.have.length(comments.length);
                })
        })
    })

    // DELETE a comment - NOT WORKING
    it('DELETE removes a comment and returns a 204 status code', () => {
        return request.get('/api/comments')
            .expect(204)
            .then(res => {
                expect(res.body.comments).to.not.have.length(comments.length);
            })
    })

    /* TOPICS */

    // GET all topics
    describe('/topics', () => {
        it('GET returns an array of topics and 200 status code', () => {
            return request.get('/api/topics')
                .expect(200)
                .then(res => {
                    expect(res.body.topics).to.have.length(topics.length);
                })
        })
    })

    // GET all articles for a topic - NOT WORKING
    describe('/topics/:topic_slug/articles', () => {
        it('GET returns all the articles related to a single topic and 200 status code', () => {
            return request.get('/api/topics/:topic_slug/articles')
                .expect(200)
                .then(res => {
                    expect(res.body.topics).to.have.length(topics.length);
                })
        })
    })

    /* ARTICLES */

    // GET all articles
    describe('/articles', () => {
        it('GET returns an array of articles and 200 status code', () => {
            return request.get('/api/articles')
                .expect(200)
                .then(res => {
                    expect(res.body.articles).to.have.length(articles.length);
                })
        })
    })

    // GET article by article_id
    describe('/articles', () => {
        it('GET returns the requested article and 200 status code', () => {
            return request.get(`/api/articles/${articles[0]._id}`)
                .expect(200)
                .then(res => {
                    console.log(`${articles[0]}`)
                    expect(res.body.article.title).to.equal(articles[0].title)
                    expect(res.body.article.body).to.equal(articles[0].body)
                    expect(res.body.article.votes).to.equal(articles[0].votes)
                    expect(res.body.article.created_by).to.equal(`${users[0]._id}`)
                    expect(res.body.article.belongs_to).to.equal(`${topics[0].slug}`)
                    // console.log(res.body.article.title)
                    // console.log(res.body.article.body)
                    // console.log(res.body.article.votes)
                    // console.log(res.body.article.created_by)
                    // console.log(`${topics[0].slug}`)
                })
        })
    })

    // GET all comments for an article
    describe('/:article_id/comments', () => {
        it('GET returns all the comments for an article and 200 status code', () => {
            return request.get(`/api/articles/${articles[0]._id}/comments`)
                .expect(200)
                .then(res => {
                    console.log(res.body.comments.length)
                    expect(res.body.comments.length).to.equal(2)
                })
        })
    })

    // Main Describe block closing bracket
});