const mongoose = require('mongoose');
const { User, Topic, Article, Comment } = require('../models');
const { formatArticleData, formatCommentData } = require('./utils.js');

const seedDB = ({ userData, topicData, articleData, commentData }) => {
  return mongoose.connection.dropDatabase()
    .then(() => {
      console.log('database dropped')
      return Promise.all([
        User.insertMany(userData),
        Topic.insertMany(topicData)
      ])
    })
    .then(([userDocs, topicDocs]) => {
      return Promise.all([
        userDocs,
        topicDocs,
        Article.insertMany(formatArticleData(articleData, userDocs))
      ])
    })
    .then(([userDocs, topicDocs, articleDocs]) => {
      return Promise.all([
        userDocs,
        topicDocs,
        articleDocs,
        Comment.insertMany(formatCommentData(commentData, userDocs, articleDocs))
      ])
    })
};

module.exports = seedDB;