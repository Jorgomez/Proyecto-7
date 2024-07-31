const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: 'products',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending'
    },
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    collection: 'orders'
  }
)

const Order = mongoose.model('orders', orderSchema, 'orders')
module.exports = Order
