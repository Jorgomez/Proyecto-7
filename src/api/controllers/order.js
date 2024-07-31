const Order = require('../models/order')
const Product = require('../models/product')

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('userId')
      .populate('products.productId')
    return res.status(200).json(orders)
  } catch (error) {
    return res.status(400).json('error GET order Function')
  }
}

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params
    orderFound = await Order.findById(id)
      .populate('userId')
      .populate('products.productId')
    return res.status(200).json(orderFound)
  } catch (error) {
    return res
      .status(404)
      .json('something wrong with the getOrderById function')
  }
}

const postOrder = async (req, res, next) => {
  try {
    const { userId, products = [], status = 'pending' } = req.body

    const filteredProductsMap = new Map()
    for (const product of products) {
      const productIdStr = product.productId.toString()
      if (!filteredProductsMap.has(productIdStr)) {
        filteredProductsMap.set(productIdStr, product)
      }
    }

    const filteredProducts = Array.from(filteredProductsMap.values())
    let totalPrice = 0
    for (const product of filteredProducts) {
      const productData = await Product.findById(product.productId).exec()

      if (productData) {
        totalPrice += product.quantity * productData.price
      } else {
        return res
          .status(400)
          .json({ message: `Product with ID ${product.productId} not found` })
      }
    }

    const newOrder = new Order({
      userId,
      products: filteredProducts,
      totalPrice
    })

    const orderSaved = await newOrder.save()
    return res.status(201).json(orderSaved)
  } catch (error) {
    return res.status(400).json('error register Function')
  }
}

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params
    const { products = [], status } = req.body

    const order = await Order.findById(id)
    if (!order) {
      return res.status(404).json('Order not found')
    }

    const updatedProductsMap = new Map()

    for (const product of products) {
      const { productId, quantity } = product

      if (!productId) {
        return res
          .status(400)
          .json({ message: 'Each product must have a productId' })
      }

      const productIdStr = productId.toString()
      updatedProductsMap.set(productIdStr, { productId, quantity })
    }

    const combinedProducts = []

    const existingProductsMap = new Map()
    for (const product of order.products) {
      existingProductsMap.set(product.productId.toString(), product)
    }

    for (const [productIdStr, updatedProduct] of updatedProductsMap.entries()) {
      if (existingProductsMap.has(productIdStr)) {
        const existingProduct = existingProductsMap.get(productIdStr)
        existingProduct.quantity = updatedProduct.quantity
        combinedProducts.push(existingProduct)
      } else {
        combinedProducts.push(updatedProduct)
      }
    }

    for (const product of order.products) {
      if (!updatedProductsMap.has(product.productId.toString())) {
        combinedProducts.push(product)
      }
    }

    let totalPrice = 0
    for (const product of combinedProducts) {
      const productData = await Product.findById(product.productId).exec()
      if (productData) {
        totalPrice += product.quantity * productData.price
      } else {
        return res
          .status(400)
          .json({ message: `Product with ID ${product.productId} not found` })
      }
    }

    const updateData = {
      products: combinedProducts,
      totalPrice,
      status
    }
    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true
    })

    if (!updatedOrder) {
      return res.status(404).json('Order not found')
    }

    return res.status(200).json(updatedOrder)
  } catch (error) {
    console.error(error)
    return res.status(400).json('Error updating order')
  }
}

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params
    const orderDeleted = await Order.findByIdAndDelete(id)
    return res.status(200).json({ mensaje: 'Deleted Order', orderDeleted })
  } catch (error) {
    return res.status(400).json('error delete Function')
  }
}

module.exports = {
  getOrders,
  postOrder,
  deleteOrder,
  getOrderById,
  updateOrder
}
