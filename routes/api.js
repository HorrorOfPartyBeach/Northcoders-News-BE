const apiRouter = require('express').Router()
const usersRouter = require('./users');
const topicsRouter = require('./topics');

apiRouter.use('/users', usersRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/topics', topicsRouter);

module.exports = apiRouter;