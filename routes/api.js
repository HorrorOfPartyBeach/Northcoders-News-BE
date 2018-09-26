const apiRouter = require('express').Router()
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const topicsRouter = require('./topics');
const commentsRouter = require('./comments');

apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;