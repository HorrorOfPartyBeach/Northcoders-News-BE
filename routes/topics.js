const topicsRouter = require('express').Router();
const { getTopics, getTopicsByTopic } = require('../controllers/topics')

topicsRouter.route('/')
  .get(getTopics)

topicsRouter.route('/:topic_slug/articles')
  .get(getTopicsByTopic)

module.exports = topicsRouter;