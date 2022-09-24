const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({

     userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UsersModel",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductsModel",
        },
        Qty: {
          type: Number,
          default: 1,
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