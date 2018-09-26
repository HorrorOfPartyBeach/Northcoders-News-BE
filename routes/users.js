const usersRouter = require('express').Router();
const { getUsers, getUsername } = require('../controllers/users')

usersRouter.route('/')
  .get(getUsers)

// GET /api/users/:username - # Returns a JSON object with the profile data for the specified user e.g: `/api/users/mitch123`
usersRouter.route('/:username')
  .get(getUsername)

module.exports = usersRouter;