const { isAdmin } = require('../../middlewares/auth')
const {
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct,
  postProduct
} = require('../controllers/product')

const productsRouter = require('express').Router()

productsRouter.get('/', getProducts)
productsRouter.get('/:id', getProductById)
productsRouter.post('/', [isAdmin], postProduct)
productsRouter.put('/:id', [isAdmin], updateProduct)
productsRouter.delete('/:id', [isAdmin], deleteProduct)

module.exports = productsRouter
