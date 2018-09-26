const topicsRouter = require('express').Router();
const { getTopics, getTopicsByTopic } = require('../controllers/topics')

// GET /api/topics - # Get all the topics
topicsRouter.route('/')
  .get(getTopics)

// GET /api/topics/:topic_slug/articles - # Return all the articles for a certain topic e.g: `/api/topics/football/articles`
topicsRouter.route('/:topic_slug/articles')
  .get(getTopicsByTopic)

// POST /api/topics/:topic_slug/articles - # Add a new article to topic. Route requires JSON body with title and body key value pairs e.g: `{ "title": "new article", "body": "This is my new article content", "created_by": "user_id goes here"}`

module.exports = topicsRouter;