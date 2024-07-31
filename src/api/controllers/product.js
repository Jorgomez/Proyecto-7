const Product = require('../models/product')

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
    return res.status(200).json(products)
  } catch (error) {
    return res.status(400).json('error GET PRODUCTS Function')
  }
}

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params
    productFound = await Product.findById(id)
    return res.status(200).json(productFound)
  } catch (error) {
    return res
      .status(404)
      .json('something wrong with the getProductById function')
  }
}

const postProduct = async (req, res, next) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock
    })
    const productDuplicated = await Product.findOne({ name: req.body.name })
    if (productDuplicated) {
      return res.status(400).json('Product duplicated')
    }

    const productSaved = await newProduct.save()
    return res.status(201).json(productSaved)
  } catch (error) {
    return res.status(400).json('error register Function')
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const changeReq = req.body

    const updatedProduct = await Product.findByIdAndUpdate(id, changeReq, {
      new: true
    })

    return res.status(200).json(updatedProduct)
  } catch (error) {
    return res.status(400).json('error to update')
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const productDeleted = await Product.findByIdAndDelete(id)
    return res.status(200).json({ mensaje: 'Deleted Product', productDeleted })
  } catch (error) {
    return res.status(400).json('error delete Function')
  }
}

module.exports = {
  getProducts,
  postProduct,
  deleteProduct,
  getProductById,
  updateProduct
}
