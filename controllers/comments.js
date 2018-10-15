const { Comment } = require('../models');

// GET all comments
const getComments = (req, res, next) => {
    Comment.find()
        .then(comments => {
            res.send({ comments })
        })
        .catch(next)
}

// PATCH comment vote up or down
const changeCommentVote = (req, res, next) => {
    const { comment_id } = req.params;
    const vote = req.query.vote;
    if (vote) {
        if (vote === 'up') value = 1;
        else if (vote === 'down') value = -1;
        else value = 0;
        Comment.findByIdAndUpdate(
            comment_id,
            { $inc: { votes: value } },
            { new: true })
            .populate('created_by', 'username')
            .populate('belongs_to', 'title')
            .then(comment => res.send(comment))
            .catch(next);
    }
}

// Delete comment
const deleteComment = (req, res, next) => {
    const { comment_id } = req.params;
    Comment.deleteOne({ _id: comment_id })
        .then(() => res.status(204).send())
        .catch(next);
}

// GET comment count
const getCommentCount = (article, Comment) => {
    return Comment.count({ belongs_to: article._id })
      .then(commentCount => {
        article.comment_count = commentCount;
        return article;
      })
    };

module.exports = { getComments, deleteComment, changeCommentVote, getCommentCount };