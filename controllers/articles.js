const { User, Article, Comment } = require('../models');

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

// POST a new comment to an article - NOT WORKING
const addComment = (req, res, next) => {
  let comment = new Comment({
    body: req.body.comment,
    belongs_to: req.params.id,
    created_by: req.params.user_id
  });
  comment.save()
    .then(() => {
      return Comment.find();
    })
    .then(comments => {
      res.status(201);
      res.send(comments);
    })
    .catch(next)
}

// User.findById(req.user.id)
// console.log(req.article.id)
// const newComment = {
//   body: req.body.comment,

// }
// newComment.then((req.body.comment) => {
// Article.findOne({ comment: { $elemMatch: { $eq: user_id } } })
//   .populate('created_by', 'user')
//   .then(comment => {
//     res.send({ comment });
// })

module.exports = { getArticles, getArticleById, getCommentsForArticle, addComment };