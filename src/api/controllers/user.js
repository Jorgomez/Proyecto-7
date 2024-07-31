const { generateSign } = require('../../config/jwt')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate('orders')
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json('error GET USERS Function')
  }
}

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    userFound = await User.findById(id).populate('orders')
    return res.status(200).json(userFound)
  } catch (error) {
    return res.status(404).json('something wrong with the getUserById function')
  }
}

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      orders: []
    })
    const userDuplicated = await User.findOne({ email: req.body.email })
    if (userDuplicated) {
      return res.status(400).json('User duplicated')
    }

    const { orders: neworders = [] } = req.body
    const uniqueOrders = Array.from(
      new Set(neworders.map((orderId) => orderId.toString()))
    )

    newUser.orders = uniqueOrders

    const userSaved = await newUser.save()

    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json('error register Function')
  }
}
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name })

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateSign(user._id)
        return res.status(200).json({
          user,
          token
        })
      } else {
        return res.status(400).json('User or passwword wrongggggg ')
      }
    } else {
      return res.status(400).json('User or passwword wrong ')
    }
  } catch (error) {
    return res.status(400).json('error login Function')
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const updateReq = req.body

    const { orders: newOrders = [] } = req.body
    const newOrdersSet = new Set(newOrders.map((orderId) => orderId.toString()))

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json('User not found')
    }
    const allOrders = [
      ...user.orders.map((order) => order.toString()),
      ...newOrdersSet
    ]

    const filteredOrders = Array.from(new Set(allOrders))
    updateReq.orders = filteredOrders

    const updatedUser = await User.findByIdAndUpdate(id, updateReq, {
      new: true
    })

    return res.status(200).json(updatedUser)
  } catch (error) {
    return res.status(400).json('error to update')
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userDeleted = await User.findByIdAndDelete(id)
    return res.status(200).json({ mensaje: 'Deleted User', userDeleted })
  } catch (error) {
    return res.status(400).json('error delete Function')
  }
}
module.exports = {
  register,
  getUsers,
  login,
  deleteUser,
  getUserById,
  updateUser
}
