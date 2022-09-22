var express = require("express");
const userController = require("./../controllers/usersController");
const authController = require("./../controllers/authController");
const { route } = require("./admin");
var router = express.Router();

/* GET home page. */
//USER VIEWS CONTROLLERS
router.get("/", userController.indexRoute);
router.get("/login", userController.loginRoute);
router.get("/logout", authController.loggedOut);
router.get("/register", userController.registerRoute);
router.get("/productDetail", userController.productDetailRoute);
router.get("/cart", authController.protect, userController.cartRoute);
router.get("/checkout", userController.checkoutRoute);
router.get("/product_detail",userController.)

//USER AUTH CONTROLLERS

router.post("/regsubmit", authController.SubmitRoute);
router.post("/loginSubmit", authController.loginSubmit);
router.delete("/deleteUser/:id", userController.deleteUserRouter);

// router.get('getAllUsers',userController.getUsersRoute)
module.exports = router;
