const { Article, Topic } = require('../models');

// GET all articles
const getTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.status(200).send({ topics })
    })
    .catch(next)
}

// GET articles by Topic
const getArticlesByTopic = (req, res, next) => {
  let searchTopic = req.params.topic_slug.toLowerCase();
  Topic.find({ slug: searchTopic })
    .then(() => {
      return Article.find({ belongs_to: searchTopic })
        .then(articles => {
          res.status(200).send({ articles });
        })
    })
    .catch(next)
}

// POST a new article
const addNewArticle = (req, res, next) => {
  let newArticle = new Article({
    title: req.body.title,
    body: req.body.body,
    belongs_to: req.params.topic_slug,
    created_by: req.body.created_by
  });
  return newArticle.save()
    .then(article => {
      res.status(201).send(article);
    })
    .catch(next)
}

module.exports = { getTopics, getArticlesByTopic, addNewArticle };