exports.formatArticleData = (articleData, userDocs) => {
  return articleData.map(articleDatum => {
    return {
      ...articleDatum,
      belongs_to: articleDatum.topic,
      created_by: userDocs.find(user => articleDatum.created_by === user.username)._id
    }
  })
}

exports.formatCommentData = (commentData, userDocs, articleDocs) => {
  return commentData.map(commentDatum => {
    return {
      ...commentDatum,
      created_by: userDocs.find(user => commentDatum.created_by === user.username)._id,
      belongs_to: articleDocs.find(article => commentDatum.belongs_to === article.title)._id
    }
  })
}