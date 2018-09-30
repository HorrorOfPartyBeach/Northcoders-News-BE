const commentsRouter = require('express').Router();
const { getComments, changeCommentVote, deleteComment } = require('../controllers/comments')

// GET all comments
commentsRouter.route('/')
  .get(getComments)

// PATCH /api/comments/:comment_id - # Increment/Decrement comment votes by 1. Route requires a vote query of 'up' or 'down' e.g: `/api/comments/:comment_id?vote=down`
commentsRouter.route('/:comment_id')
  .patch(changeCommentVote)

  // DELETE /api/comments/:comment_id - # Deletes a comment
  .delete(deleteComment)

module.exports = commentsRouter;