const Order = require('../api/models/order')
const User = require('../api/models/user')
const { verifyJwt } = require('../config/jwt')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(400).json('no estas autorizado')
    }

    const parsedToken = token.replace('Bearer ', '')

    const { id } = verifyJwt(parsedToken)

    const user = await User.findById(id)
    user.password = null
    req.user = user
    next()
  } catch (error) {
    return res.status(400).json('no estas autorizado')
  }
}

const isTheUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const { id: idUserReq } = req.params
    if (!token) {
      return res.status(400).json('no estas autorizado')
    }
    const parsedToken = token.replace('Bearer ', '')
    const { id: tokenId } = verifyJwt(parsedToken)

    const user = await User.findById(tokenId)

    if (user.id === idUserReq) {
      user.password = null
      console.log(user)
      req.user = user
      next()
    } else {
      return res.status(400).json('You are not the user')
    }
  } catch (error) {
    return res.status(400).json('no estas autorizado')
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(400).json('no estas autorizado')
    }

    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyJwt(parsedToken)

    const user = await User.findById(id)
    if (user.role === 'admin') {
      user.password = null
      console.log(req.user)
      req.user = user
      next()
    } else {
      return res.status(400).json('You role is not Admin')
    }
  } catch (error) {
    return res.status(400).json('no estas autorizado')
  }
}

const isTheUserorAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const { id: idToDelete } = req.params
    if (!token) {
      return res.status(400).json('no estas autorizado')
    }
    const parsedToken = token.replace('Bearer ', '')
    const { id: tokenId } = verifyJwt(parsedToken)

    const user = await User.findById(tokenId)

    if (user.id === idToDelete || user.role === 'admin') {
      user.password = null
      console.log(user)
      req.user = user
      next()
    } else {
      return res.status(400).json('You can not  delete another user')
    }
  } catch (error) {
    return res.status(400).json('no estas autorizado')
  }
}

const isAdminUpdateRole = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const { role } = req.body
    if (!token) {
      return res.status(400).json('no estas autorizado')
    }
    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyJwt(parsedToken)
    const user = await User.findById(id)
    if (role) {
      if (user.role === 'admin') {
        user.password = null
        req.user = user
        next()
      } else {
        return res.status(400).json('You are not Admin')
      }
    } else {
      next()
    }
  } catch (error) {
    return res.status(400).json('no estas autorizado')
  }
}
const isTheUserOrder = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const { userId } = req.body
    if (!token) {
      return res.status(400).json('no estas autorizado')
    }
    const parsedToken = token.replace('Bearer ', '')
    const { id: tokenId } = verifyJwt(parsedToken)

    const user = await User.findById(tokenId)

    if (user.id === userId) {
      user.password = null
      req.user = user
      next()
    } else {
      return res
        .status(400)
        .json('You can not  create an order to another user')
    }
  } catch (error) {
    return res.status(400).json('no estas autorizado')
  }
}

const isTheUserorAdminOrder = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const { id } = req.params
    const order = await Order.findById(id)

    if (!token) {
      return res.status(400).json('no estas autorizado')
    }

    const parsedToken = token.replace('Bearer ', '')
    const { id: tokenId } = verifyJwt(parsedToken)

    const user = await User.findById(tokenId)

    if (user.id === order.userId.toString() || user.role === 'admin') {
      user.password = null
      req.user = user
      next()
    } else {
      return res
        .status(400)
        .json('You can not  update an order of another user')
    }
  } catch (error) {
    return res.status(400).json('no estas autorizado')
  }
}
module.exports = {
  isAuth,
  isTheUser,
  isAdmin,
  isTheUserorAdmin,
  isAdminUpdateRole,
  isTheUserorAdminOrder,
  isTheUserOrder
}
