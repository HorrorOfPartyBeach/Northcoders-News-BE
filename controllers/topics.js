const { Topic } = require('../models');

const getTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.send({ topics })
    })
    .catch(next)
}

const getTopicsByTopic = (req, res, next) => {
  Topic.find({ title: req.params.title })
    .then(topic => {
      if (topic.length === 0) {
        return res.status(404).send({ msg: 'No articles found' });
      } else {
        let title = topic[0].title.toLowerCase
        return articles.find({ belongs_to: title });
      }
    })
    .then(articles => {
      res.send({ articles });
    })
    .catch(next)
}

module.exports = { getTopics, getTopicsByTopic };