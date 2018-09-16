const { Topic } = require('../models');

const getTopics = (req, res, next) => {
  Topic.find()
    // .populate('-__v')
    .then(topics => {
      res.send({ topics })
    })
}

const getTopicsByTopic = (req, res, next) => {
  Topic.findOne(err, res)
    .then(topics => {
      res.send({ topics })
      // $lookup, $match?
    })
}

module.exports = { getTopics, getTopicsByTopic };