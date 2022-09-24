const { token } = require('morgan');
const { rawListeners } = require('../model/cartSchenma');
const CartModel = require('../model/cartSchenma');
const ProductsModel = require('../model/productsSchema');
const productDetailRoute = require('../controllers/usersController')
const utils = require('../util/utils'); 
  user =productDetailRoute
exports.cartRoute = async (req,res,next)=>{
  console.log(req.headers.cookie);
  
  const user = await utils.getUser(req)
  const productId = await utils.getProduct(req)
  
        const userId = user.id;
        
        console.log('userID ===== ',userId,'productId======',productId)
        // const cart = await userController.addToCart(userId, productId);
  
    
        // const products = await ProductModel.find().lean();
         res.send('done')
          // loggedIn: req.session.loggedIn,
          // products,
     

}