const apiRouter = require('express').Router()

apiRouter.get('/', (req, res, next) => {
  res.send({ msg: 'Welcome to NC News!' });
});

module.exports = apiRouter;