const UsersModel = require("./../model/usersSchema");
const ProductsModel = require("../model/productsSchema")

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
exports.product_detail = (req,res,next){
  res.render('users/products_detail')
}