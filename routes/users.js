var express = require("express");
const userController = require("./../controllers/usersController");
const authController = require("./../controllers/authController");
const cartController = require('../controllers/cartController');
const checkoutController = require('../controllers/checkoutController');
const whishlistController = require('../controllers/whishlistController');
const myAccountController = require('../controllers/myAccoutController');
const couponController = require('../controllers/admin/couponController')
const { route } = require("./admin");
const CouponModel = require("../model/couponSchema");
// const { ordersRoute } = require("../controllers/admin/adminController");
const orderController = require('../controllers/orderContoller')
var router = express.Router();


/* GET home page. */
//=========-U S E R   V I E W S   C O N T R O L L E R S-==============

router.get("/", userController.indexRoute);
router.get("/login", userController.loginRoute);
router.get("/logout", authController.loggedOut);
router.get("/register", userController.registerRoute);
router.get("/productDetail",authController.protect, userController.productDetailRoute);
router.get("/cart",authController.protect, cartController.cartRoute);
router.get("/checkout",authController.protect,checkoutController.checkoutRoute);
router.get("/product_detail/:id",authController.protect,userController.productDetailRoute)
router.get("/otp",authController.otpRoute)
router.get("/whishlist",whishlistController.whishlistRoute)
router.get("/myProfile",myAccountController.myAccoutRoute)
router.get('/manage-address',myAccountController.manageAddressRoute)
router.get('/render-cod',orderController.renderCodRoute)
router.get('/render-stripe',orderController.renderStripeRoute)
router.get('/test',userController.testRoute)

//========== U S E R   A U T H   C O N T R O L L E R S ===================

router.post("/regsubmit", authController.SubmitRoute);
router.post("/loginSubmit", authController.loginSubmit);
router.delete("/deleteUser/:id", userController.deleteUserRouter);
router.post('/otp_verify',authController.otpVerify)

//============- A C T I O N   C O N T R O L L E R S ====================

router.post('/addToCart/:id',cartController.uploadCartRoute)
router.post('/increment',cartController.updateQty)
router.post('/remove-product',cartController.deleteCart)
router.post('/getProductGrandTotal',cartController.getProductGrandTotal)
router.post('/data-notify',userController.cartDataNotifyRoute)
router.post('/add-to-whishlist',whishlistController.addWishlistRoute)
router.post('/remove-whishlist',whishlistController.removeWishlistRoute)
router.post('/push-to-cart',whishlistController.pushCartRoute)
router.post('/uploadAddress',checkoutController.uploadAddress)
router.post('/current-address',myAccountController.getCurrentAddressRoute)
router.post('/delete-address',myAccountController.deleteAddressRoute)
router.post('/edit-address',myAccountController.editAddressRoute)
router.post('/checked-address',myAccountController.findCheckedAddressRoute)
router.post('/redeem-coupon',couponController.redeemCouponRoute)
router.post('/payment',orderController.confirmOrderRoute)

router.post('/intiate_razorpay',checkoutController.intiatePay)






module.exports = router;
