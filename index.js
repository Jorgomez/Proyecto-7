require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const usersRouter = require('./src/api/routes/user')
const productsRouter = require('./src/api/routes/product')
const ordersRouter = require('./src/api/routes/order')

const app = express()

connectDB()

app.use(express.json())
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/products', productsRouter)
app.use('/api/v1/orders', ordersRouter)
app.use('*', (req, res, next) => {
  return res.status(404).json('route not found')
})

app.listen(3000, () => {
  console.log('Server deployed at http://localhost:3000')
})
