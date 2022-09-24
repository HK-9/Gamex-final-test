const UsersModel = require("./../model/usersSchema");
const ProductsModel = require("../model/productsSchema")
const jwt = require("jsonwebtoken");
const utils = require('../util/utils')

exports.indexRoute =  async (req, res, next) => {
  let logged;
  const products = await ProductsModel.find().lean();
  partialCheck = req.headers.cookie 
  if(partialCheck){
   logged = true
  }else if (!partialCheck) {
    logged = false
  }
  res.render("users/index", { userLoggedIn:logged,products});
  
    // res.render('admin/dashboard/products',{admin:true, layout: 'adminLayout',products})
};
exports.loginRoute = function (req, res, next) {

  res.render("users/login");
};
exports.productDetailRoute = function(req,res,next){
  res.render('users/productDetail') 
  next()
}
exports.registerRoute = function (req, res, next) {
  res.render("users/register");
};

exports.cartRoute = function (req, res, next) {
  res.render("users/cart");
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
  const productId = await utils.getProduct(req)
  let id = req.params.id;
  const byId = await ProductsModel.findById(id).lean()
  const product = await ProductsModel.find().lean()
  // const params =  jwt.sign({ params: req.params.id}, process.env.JWT_SECRET, {
  //   expiresIn: 90000,
  // });



  console.log( 'params ==',params);

  token = await req.headers.cookie.split("=")[1];
  console.log(token, 'header');
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  user = await UsersModel.findById(decoded.id);
  console.log('after Split',user);
  res.render('users/products_detail',{
    product,byId,user,
    layout: 'tempLayout'
  })
} 