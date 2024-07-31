const {
  isAuth,
  isAdmin,
  isTheUserorAdmin,
  isAdminUpdateRole
} = require('../../middlewares/auth')
const {
  register,
  getUsers,
  login,
  deleteUser,
  getUserById,
  updateUser
} = require('../controllers/user')

const usersRouter = require('express').Router()

usersRouter.post('/register', register)
usersRouter.post('/login', login)
usersRouter.put('/:id', [isAdminUpdateRole], updateUser)
usersRouter.delete('/:id', [isTheUserorAdmin], deleteUser)
usersRouter.get('/', [isAuth], getUsers)
usersRouter.get('/:id', [isAdmin], getUserById)

module.exports = usersRouter
