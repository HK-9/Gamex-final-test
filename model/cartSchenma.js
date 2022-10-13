const mongoose = require('mongoose')
const ProductsModel = require('../model/productsSchema')
const cartSchema = new mongoose.Schema({
     userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    grandTotal: {
      type: Number
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products"
        },
        quantity: {
          type: Number,
        },
        total: {
          type: Number,
        },
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now(),
      // select: false,
    },
    ModifiedAt: {
      type: Date,
      default: Date.now(),
      // select: false,
    },
    },
    { timestamps: true }

)
const CartModel = mongoose.model('cart',cartSchema);
module.exports = CartModel