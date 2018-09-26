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


// Delete comment
const deleteComment = (req, res, next) => {
    const { comment_id } = req.params;
    Comment.deleteOne({ _id: comment_id })
        .then(() => res.status(204).send())
        .catch(next);
}

module.exports = { getComments, deleteComment };