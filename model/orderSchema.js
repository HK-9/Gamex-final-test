const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')
const couponSchema = new mongoose.Schema({
    shippingMethod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    customer:{
        type:String
    },
    orderData:{
        type:String,
        unique:true
    },
    quantity:{
        type:Number
    },
    unitPrice:{
        type:Number
    },
    discount:{
        type:Number
    },
    unitPrice:{
        type:Boolean,
        default:false
    }
})
couponSchema.plugin(uniqueValidator);
const CouponModel = mongoose.model('coupon',couponSchema);
module.exports = CouponModel