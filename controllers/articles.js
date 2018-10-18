const { Article, Comment } = require('../models');
const { getCommentCount } = require('./comments');

// GET all articles
const getArticles = (req, res, next) => {
    Article.find()
    .populate('created_by')
    .lean()
    .then(articles => {Promise.all(articles.map(article => getCommentCount(article, Comment)))
    .then(articles => res.send({articles}))
    })
    .catch(next)
}

// GET articles by ID
const getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    Article.findById(article_id)
    .populate('created_by')
      .lean()
      .then(article => (getCommentCount(article, Comment)))
        .then(article => {
            if (article === null) throw { msg: 'Article not found', status: 404 }
            if (!article) throw { msg: 'Article ID not valid', status: 400 }
            res.send({ article })
        })
        .catch(next)
}

// PATCH article vote up or down
const changeArticleVote = (req, res, next) => {
    const { article_id } = req.params;
    const vote = req.query.vote;
    let value;
    if (vote) {
        if (vote === 'up') value = 1;
        else if (vote === 'down') value = -1;
        else value = 0;
        Article.findByIdAndUpdate(
            article_id,
            { $inc: { votes: value } },
            { new: true }
        )
            .populate('created_by', 'username')
            .then(article => res.send(article))
            .catch(next);
    }
}

// GET all comments for an article
const getCommentsForArticle = (req, res, next) => {
    Comment.find({ belongs_to: req.params.article_id })
    .populate('created_by')
    .lean()
        .then(comments => {
            res.send({ comments });
        })
        .catch(next);
}

// POST a new comment to an article
const addComment = (req, res, next) => {
    let newComment = new Comment({
        body: req.body.body,
        belongs_to: req.params.article_id,
        // .populate('created_by')
        // .lean()
        created_by: req.body.created_by
    });
    return newComment.save()
        .then(comment => {
            res.status(201).send(comment);
        })
        .catch(next)
}

module.exports = { getArticles, getArticleById, changeArticleVote, getCommentsForArticle, addComment };