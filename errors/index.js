// 400 block
exports.handle400s = (err, req, res, next) => {
  // console.log(err)
  if (err.name === 'CastError' || err.name === 'ValidationError') res.status(400).send({ msg: err.message || 'Bad request' })
  else next(err)
}

// 404 block
exports.handle404s = (err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ msg: err.msg || 'Page not found' })
  else next(err)
}

// 500 block
exports.handle500s = (err, req, res, next) => {
  console.log(err)
  res.status(500).send({ msg: 'Internal server error' });
}