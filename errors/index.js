// 400 block
exports.handle400s = (err, req, res, next) => {
  if (err.code)
    err.status === 400;
  if (err.status)
    res.status(err.status).send({ msg: err.message || 'Bad request' });
  else
    next(err);
}

// 404 block
exports.handle404s = (err, req, res, next) => {
  if (err.status === 404 || err.code === 0 || err.name === 'ValidatorError' || err.name === 'ValidationError') {
    res.status(400).send({ msg: err.message || 'Page not found' });
  }
  else next(err);
}

// 500 block
exports.handle500s = (err, req, res, next) => {
  console.log(err)
  res.status(500).send({ msg: 'Internal server error' });
}