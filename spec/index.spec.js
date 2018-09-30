process.env.NODE_ENV = 'test';
const data = require('../seed/testData');
const seedDB = require('../seed/seed.js');
const { expect } = require('chai');
const app = require('../app.js');
const request = require('supertest')(app);
const mongoose = require('mongoose');

describe('/api', function () {
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

    // Disconnect after tests
    after(() => mongoose.disconnect());

    // Main page
    describe('/', () => {
        it('GET returns a status 200 and an ejs page', () => {
            return request.get('/')
                .expect(200)
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
                    expect(res.body.user[0].username).to.equal(users[0].username);
                })
        })
        // 404
        it('GET returns an error message and 404 status code when user not found', () => {
            return request.get(`/api/users/${users[2]}`)
                .expect(404)
                .then(res => {
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

    // UPDATE comment vote
    describe('/comments/:comment_id', () => {
        // Increase vote
        it('PATCH increments the vote and returns a 200 status code', () => {
            return request.patch(`/api/comments/${comments[0]._id}?vote=up`)
                .expect(200)
                .then(res => {
                    expect(res.body._id).to.equal(`${comments[0]._id}`)
                    expect(res.body.votes).to.equal(comments[0].votes + 1)
                });
        })
        // Decrease vote
        it('PATCH decrements the vote and returns a 200 status code', () => {
            return request.patch(`/api/comments/${comments[1]._id}?vote=down`)
                .expect(200)
                .then(res => {
                    expect(res.body._id).to.equal(`${comments[1]._id}`)
                    expect(res.body.votes).to.equal(comments[1].votes - 1)
                });
        })

        // DELETE a comment
        it('DELETE removes a comment and returns a 204 status code', () => {
            return request.delete('/api/comments/5b9ba40c8ed29146542ab7c9')
                .expect(204)
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

    // GET all articles for a topic
    describe('/topics/:topic_slug/articles', () => {
        it('GET returns all the articles related to a single topic and 200 status code', () => {
            return request.get('/api/topics/cats/articles')
                .expect(200)
                .then(res => {
                    expect(res.body.articles).to.be.an('array')
                    expect(res.body.articles[0].belongs_to).to.equal('cats')
                })
        })
        // POST a new article to a topic
        it('POST returns a 201 status code and adds a new article to a topic', () => {
            return request.post('/api/topics/cats/articles')
                .send({
                    "title": "New title",
                    "body": "New article",
                    "belongs_to": "cats",
                    "created_by": users[0]._id
                })
                .expect(201)
                .then(({ body }) => {
                    expect(body.body).to.equal("New article")
                    expect(body).to.include.keys("belongs_to", "created_by")
                }).then()
        })
        // 400 - missing field test
        it('POST returns a 400 status and error message when a required field is missing', () => {
            return request.post(`/api/topics/cats/articles`)
                .send({
                    "title": "New title",
                    "body": "New article",
                    "belongs_to": "cats"
                })
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.equal('articles validation failed: created_by: Path `created_by` is required.');
                })
        })
        // 400 - invalid value test
        it('POST returns a 400 status and error message when an invalid value is passed to a field', () => {
            return request.post(`/api/topics/cats/articles`)
                .send({
                    "title": "New title",
                    "body": "New article",
                    "belongs_to": "cats",
                    "created_by": "words"
                })
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.equal('articles validation failed: created_by: Cast to ObjectID failed for value "words" at path "created_by"');
                })
        })
    })

    /* ARTICLES */

    // GET all articles
    describe('/articles', () => {
        it('GET returns an array of articles and 200 status code', () => {
            return request.get('/api/articles')
                .expect(200)
                .then(({ body: { articles } }) => {
                    expect(articles).to.be.an('array')
                    expect(articles[0]._id).to.equal(`${articles[0]._id}`)
                    expect(articles).to.have.length(articles.length)
                    expect(articles[0]).to.contain.keys(["votes", "_id", "body", "title", "created_by", "created_at", "belongs_to", "__v"])
                })
        })
    })

    // GET article by article_id
    describe('/articles/:article_id', () => {
        it('GET returns the requested article and 200 status code', () => {
            return request.get(`/api/articles/${articles[0]._id}`)
                .expect(200)
                .then(res => {
                    expect(res.body.article.title).to.equal(articles[0].title)
                    expect(res.body.article.body).to.equal(articles[0].body)
                    expect(res.body.article.votes).to.equal(articles[0].votes)
                    expect(res.body.article.created_by).to.equal(`${users[0]._id}`)
                    expect(res.body.article.belongs_to).to.equal(`${topics[0].slug}`)
                    expect(res.body.article._id).to.equal(`${articles[0]._id}`)
                })
        })
        // 400 - invalid id test
        it('GET returns 400 status code when id is invalid', () => {
            return request
                .get(`/api/articles/words`)
                .expect(400)
                .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Cast to ObjectId failed for value "words" at path "_id" for model "articles"')
                })
        })
        // 404 - id doesn't exist test
        it('GET returns 404 for valid id that does not exist', () => {
            return request
                .get(`/api/articles/5b9ba40c8ed29146542ab7a3`)
                .expect(404)
                .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Article not found')
                })
        })
    })

    // UPDATE article vote
    describe('/articles/:article_id', () => {
        // Increase vote
        it('PATCH increments the vote and returns a 200 status code', () => {
            return request.patch(`/api/articles/${articles[0]._id}?vote=up`)
                .expect(200)
                .then(res => {
                    expect(res.body._id).to.equal(`${articles[0]._id}`)
                    expect(res.body.votes).to.equal(articles[0].votes + 1)
                });
        })
        // Decrease vote
        it('PATCH decrements the vote and returns a 200 status code', () => {
            return request.patch(`/api/articles/${articles[1]._id}?vote=down`)
                .expect(200)
                .then(res => {
                    expect(res.body._id).to.equal(`${articles[1]._id}`)
                    expect(res.body.votes).to.equal(articles[1].votes - 1)
                });
        })
    })

    // GET all comments for an article
    describe('/:article_id/comments', () => {
        it('GET returns all the comments for an article and 200 status code', () => {
            return request.get(`/api/articles/${articles[0]._id}/comments`)
                .expect(200)
                .then(res => {
                    expect(res.body.comments.length).to.equal(2)
                })
        })

        // POST a new comment to an article
        it('POST returns a 201 status code and adds a new comment to an article', () => {
            return request.post(`/api/articles/${articles[0]._id}/comments`)
                .send({
                    "body": "New comment",
                    "created_by": users[0]._id
                })
                .expect(201)
                .then(res => {
                    expect(res.body.body).to.equal("New comment")
                })
        })
        // 400 - missing field test
        it('POST returns a 400 status and error message when a required field is missing', () => {
            return request.post(`/api/articles/${articles[0]._id}/comments`)
                .send({
                    "body": "New comment"
                })
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.equal('comments validation failed: created_by: Path `created_by` is required.');
                })
        })
        // 400 - invalid value in field test
        it('POST returns a 400 status and error message when an invalid value is passed to a field', () => {
            return request.post(`/api/articles/${articles[0]._id}/comments`)
                .send({
                    "body": "New article",
                    "created_by": "String"
                })
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.equal('comments validation failed: created_by: Cast to ObjectID failed for value "String" at path "created_by"');
                })
        })
    })

    // Main Describe block closing bracket
});