var express = require("express");
const userController = require("./../controllers/usersController");
const authController = require("./../controllers/authController");
const cartController = require('../controllers/cartController')
const { route } = require("./admin");
var router = express.Router();

/* GET home page. */
//USER VIEWS CONTROLLERS
router.get("/", userController.indexRoute);
router.get("/login", userController.loginRoute);
router.get("/logout", authController.loggedOut);
router.get("/register", userController.registerRoute);
router.get("/productDetail",authController.protect, userController.productDetailRoute);
router.get("/cart",authController.protect, cartController.cartRoute);
router.get("/checkout",authController.protect, userController.checkoutRoute);
router.get("/product_detail/:id",authController.protect,userController.productDetailRoute)
router.get("/otp",authController.otpRoute)
//USER AUTH CONTROLLERS

router.post("/regsubmit", authController.SubmitRoute);
router.post("/loginSubmit", authController.loginSubmit);
router.delete("/deleteUser/:id", userController.deleteUserRouter);
router.post('/otp_verify',authController.otpVerify)

//ACTION CONTROLLERS

router.post('/addToCart/:id',cartController.uploadCartRoute)
router.post('/increment',cartController.updateQty)
router.post('/remove-product',cartController.deleteCart)

module.exports = router;
