const articlesRouter = require('express').Router();
const { getArticles, getArticleById, getCommentsForArticle, addComment } = require('../controllers/articles')

// GET /api/articles - # Returns all the articles - return comment count
articlesRouter.route('/')
  .get(getArticles)

// GET /api/articles/:article_id - # Get an individual article - return a comment count
articlesRouter.route('/:article_id')
  .get(getArticleById)
// PATCH /api/articles/:article_id - # Increment/Decrement votes of article by 1. Route requires vote query of 'up' or 'down' e.g: `/api/articles/:article_id?vote=up`
// .patch()

// GET /api/articles/:article_id/comments - # Get all the comments for a individual article
articlesRouter.route('/:article_id/comments')
  .get(getCommentsForArticle)

// POST /api/articles/:article_id/comments - # Add new comment to article. Requires JSON body with body and created_by key value pairs e.g: `{"body": "This is my new comment", "created_by": "user_id goes here"}` - Return new comment with created_by prop populated with corresponding user object
  .post(addComment)

module.exports = articlesRouter;