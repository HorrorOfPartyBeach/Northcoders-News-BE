const { User, Article, Topic } = require('../models');

const getTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.status(200).send({ topics })
    })
    .catch(next)
}

const getArticlesByTopic = (req, res, next) => {
  let searchTopic = req.params.topic_slug.toLowerCase();
  // console.log(req.params)
  Topic.find({ slug: searchTopic })
    .then(() => {
      return Article.find({ belongs_to: searchTopic })
        .then(articles => {
          res.status(200).send({ articles });
        })
    })
    .catch(next)
}

// POST a new article - NOT WORKING
const addNewArticle = (req, res, next) => {
  Topic.findById(req.params.topic_id)
  User.findOne(req.params.user.body)
  const newArticle = new Article({
    ...req.body,
    belongs_to: req.params.topic_id,
    created_by: req.params.user.body
  });
  newArticle
    .save()
    .then(article => {
      res.status(201).send({ article, msg: `New article added` });
    })
}

module.exports = { getTopics, getArticlesByTopic, addNewArticle };