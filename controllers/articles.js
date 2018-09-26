const { Article, Comment } = require('../models');

// GET all articles
const getArticles = (req, res, next) => {
  Article.find()
    .then(articles => {
      res.send({ articles })
    })
    .catch(next)
}

// GET articles by ID
const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  Article.findById(article_id)
    .then(article => {
      if (!article) throw { msg: 'Not Found', status: 404 }
      res.send({ article });
    })
    .catch(next)
}

// GET all comments for an article
const getCommentsForArticle = (req, res, next) => {
  Comment.find({ belongs_to: req.params.article_id })
    .then(comments => {
      res.send({ comments });
    })
    .catch(next);
}

// POST a new comment to an article
const addComment = (req, res, next) => {
  const { comment } = res.body;
  Comment.create(comment)
  Article.findOne({ comment: { $elemMatch: { $eq: user_id } } })
    .populate('created_by', 'username')
    .then(comment => {
      res.send({ comment });
    })
    .catch(next)
}

module.exports = { getArticles, getArticleById, getCommentsForArticle, addComment };