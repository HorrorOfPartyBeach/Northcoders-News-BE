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
  const { username } = req.params;
  // console.log(req.params.username)
  User.find({ username: username })
    .then(user => {
      if (!user.length) throw { msg: 'User not found', status: 404 }
      //console.log(user)
      res.send({ user });
    })
    .catch(next)
}

module.exports = { getUsers, getUsername };