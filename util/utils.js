const jwt = require('jsonwebtoken')
const UsersModel = require("../model/usersSchema");
const ProductsModel = require('../model/productsSchema');
const CartModel = require('../model/cartSchenma');
const WhishlistModel = require('../model/whishlistSchema');

utils = {
    getUser: async function (req) {
      try {
      token = await req.headers.cookie.split("=")[1];
      const payLoad = await jwt.verify(token, process.env.JWT_SECRET);
      userId = await UsersModel.findById(payLoad.id)
      console.log('userId',userId)
      return userId;

        
      } catch (error) {
        console.log('USER NOT LOGGED IN',error)
      }
        
    },
  getProduct: async function(req){
    productId = req.params.id
  },

  partialCheck: async (req)=>{
    let logged;
    const products = await ProductsModel.find().lean();
    partialCheck = req.headers.cookie 
    if(partialCheck){
     logged = true
    }else if (!partialCheck) {
      logged = false
    }
    return logged
  },

  cartDetails: async (userId)=>{
    const cartData = await CartModel.findOne({userId}).populate('products.product').lean()
    return cartData
  },
  getWhislistData:async (userId)=>{
    const whishlistData = await WhishlistModel.findOne({userId}).populate('products.product').lean()
    return whishlistData
  },

  getProductsGrandTotal: async (userId) =>{
    
    const cartData = await CartModel.findOne({userId}).populate('products.product').lean()
    let products = cartData.products;
    //console.log('total---------------:',products[0].total)
    let total = products[0].total
    total = total*2
    total = products.reduce((acc,curr)=>{
      return acc += curr.total;
    },0)
    return total
  },
  getCartDataNotify: async (userId)=>{
    const cartData = await CartModel.findOne({userId}).populate('products.product').lean()
    const dataNotifyCount = cartData.products.length; 
    console.log('hai',dataNotifyCount)
    return dataNotifyCount;
  },
  getUserAddress: async(userId) => {
    const userAddressData = await UsersModel.findOne({_id:userId}).populate('addresses.address').lean()
     console.log('populatedAddress',userAddressData)
    return userAddressData;
  } 


}
//HOW TO USE >> getResult = utils.getGrandTotal(userId) 
module.exports = utils;
