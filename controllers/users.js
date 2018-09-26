const { User } = require('../models');

// GET all users
const getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      res.send({ users })
    })
}

// GET users by username
const getUsername = (req, res, next) => {
  User.find({ username: req.params.username })
    .then(user => {
      if (!user) throw { msg: 'User Not Found', status: 404 }
      // err message not sending, returns an empty user object instead
      res.send({ user });
    })
    .catch(next)
}

module.exports = { getUsers, getUsername };