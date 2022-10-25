var express = require("express");
const adminController = require("./../controllers/admin/adminController");
const authController = require("./../controllers/admin/authController")
const productsController = require("./../controllers/admin/productsController")
const categoryController = require('./../controllers/admin/categoryController')
const cartController = require('../controllers/cartController')
const couponsController = require('../controllers/admin/couponController')

var router = express.Router();

const upload = require('./../controllers/admin/multer/multer')


/* GET users listing. */
//ADMIN VIEW ROUTES
router.get("/", adminController.loginRoute);
;
router.get("/dashboard",authController.adminProtect, adminController.indexRoute);
router.get('/allUsers',adminController.allUsersRoute);
router.post('/allUsers',adminController.allUsersRoute);
router.get('/products',productsController.productsRoute);
router.get('/addProducts',productsController.addProductsRoute);
router.get('/editProduct/:id',productsController.editProductsRoute)
router.get('/orders',adminController.ordersRoute);  
// router.get('/coupons',adminController.couponsRoute);
router.get('/category',categoryController.categoryRoute);
router.get('/add_category',categoryController.addCategoryRoute)
router.get('/edit_category/:id',categoryController.editCategoryRoute);
router.get('/coupons', couponsController.viewCouponRoute)
router.get('/sales-report',adminController.salesReportRoute)


//AUTH-ROUTES
router.post('/register', authController.registerRoute)
router.post('/login', authController.loginRoute);
router.get('/blockUser/:id',adminController.blockUserRoute);
router.get('/unblockUser/:id',adminController.unblockUserRoute);


//ACTION ROUTES
router.post('/uploadProduct',upload.array('image',4),productsController.uploadProductRoute);
router.get("/", adminController.loginRoute);
router.get('/deleteProduct/:id',upload.array('image',4),productsController.deleteProduct);
router.post('/edit_category/:id',categoryController.editedCategoryRoute);
router.post('/editStatusButton/:id',adminController.editStatusButton);
// router.post('/edited_category',categoryController.editedCategoryRoute);
router.get('/delete_category/:id',categoryController.delete_category);
router.get('/add_category',categoryController.addCategoryRoute);
router.post('/upload_category',categoryController.uploadCategoryRoute);
router.post('/editProduct/:id',upload.array('image',4),productsController.editProduct)
router.post('/submit-coupon',couponsController.submitCouponRoute)
router.get('/editOrderStatus/:id',adminController.ordersEditRoute)
router.post('/editStatusButton/:id',adminController.editStatusButton);

module.exports = router;
