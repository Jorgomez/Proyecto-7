const {
  isTheUserorAdminOrder,
  isTheUserOrder
} = require('../../middlewares/auth')
const {
  deleteOrder,
  getOrderById,
  updateOrder,
  postOrder,
  getOrders
} = require('../controllers/order')

const ordersRouter = require('express').Router()

ordersRouter.get('/', getOrders)
ordersRouter.get('/:id', getOrderById)
ordersRouter.post('/', [isTheUserOrder], postOrder)
ordersRouter.put('/:id', [isTheUserorAdminOrder], updateOrder)
ordersRouter.delete('/:id', [isTheUserorAdminOrder], deleteOrder)

module.exports = ordersRouter
