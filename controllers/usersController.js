const UsersModel = require("./../model/usersSchema");
const ProductsModel = require("../model/productsSchema")
const jwt = require("jsonwebtoken");
const utils = require('../util/utils');
const CartModel = require("../model/cartSchenma");

exports.indexRoute =  async (req, res, next) => {
  const user = UsersModel.find().lean()
  const logged = await utils.partialCheck(req)
  const products = await ProductsModel.find().lean();
  res.render("users/index", { 
    userLoggedIn:logged,
    products,
    
  });
  
    // res.render('admin/dashboard/products',{admin:true, layout: 'adminLayout',products})
};
exports.loginRoute = function (req, res, next) {

  res.render("users/login");
};
exports.productDetailRoute = async function(req,res,next){
  const logged = await utils.partialCheck(req)
  res.render('users/productDetail',{
    userLoggedIn:logged,
  }),
  next()
}
exports.registerRoute = function (req, res, next) {
  res.render("users/register");
};
exports.checkoutRoute = function (req, res, next) {
  res.render("users/checkout");
};
exports.regSubmitRoute = async (req, res) => {
  console.log(req.body);

  try {
    const newUserModel = await UsersModel.create(req.body);
    res.status(201).json({
      staus: "success",
      data: {
        newUserModel,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
    console.log(err);
  }
};

//deleteuser
exports.deleteUserRouter = async (req, res, next) => {
  try {
    await UsersModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      dara: null,
    });
    await UsersModel.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
  console.log(req.params);
};

//get all users
// exports.getAllUsers = async (req,res,next)=>{
//   const allUsers = await UsersModel.find(UsersModel)
// }

//product detail
exports.productDetailRoute =async (req,res,next) => {
  const logged = await utils.partialCheck(req)
  let productId = req.params.id;
  const byId = await ProductsModel.findById(productId).lean()
  const product = await ProductsModel.find().lean()
  token = await req.headers.cookie.split("=")[1];
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  user = await UsersModel.findById(decoded.id);
  
  res.render('users/products_detail',{
    product,byId,user,userLoggedIn:logged,
    layout: 'tempLayout'
  })
} 