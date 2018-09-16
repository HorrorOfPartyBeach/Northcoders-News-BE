const { User } = require('../models');

const getUsers = (req, res, next) => {
  User.find()
    // .populate('-__v')
    .then(users => {
      res.send({ users })
    })
}

const getUsername = (req, res, next) => {
  User.findOne()
    .then(user => user.username === req.params.username)
  if (!user) res.status(404).send('User not valid')
  res.status(200).send('User found!')
}

module.exports = { getUsers, getUsername };