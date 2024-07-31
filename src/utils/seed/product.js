const Product = require('../../api/models/product')
const mongoose = require('mongoose')
const PRODUCTS = require('../../data/products')

const bombProducts = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://jorgomez:root@cluster0.5mxtwul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    )

    await Product.collection.drop()
    console.log('Products deleted')

    await Product.insertMany(PRODUCTS)
    console.log('Products introduced')

    await mongoose.disconnect()
    console.log('server desconected')
  } catch (error) {
    console.log('error connecting')
  }
}

bombProducts()
