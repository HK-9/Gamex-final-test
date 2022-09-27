const { token } = require('morgan');
const { rawListeners } = require('../model/cartSchenma');
const CartModel = require('../model/cartSchenma');
const ProductsModel = require('../model/productsSchema');
const productDetailRoute = require('../controllers/usersController')
const utils = require('../util/utils'); 


    //============================VIEW CART===============================
  exports.cartRoute = async function (req, res, next) {
  const logged = await utils.partialCheck(req)
   const user = await utils.getUser(req)
    const cartData = await utils.cartDetails(user._id)
    // console.log('caaaaaaaaaaaaart',cartData)
    const cart = CartModel.find().lean()
   
    res.render("users/cart",{
        cart,
        cartData,
        userLoggedIn:logged,
        layout:'tempLayout'
    });
  };


  //============================UPLOAD CART===============================
exports.uploadCartRoute = async (req,res,next)=>{
//   try{
  
  const user = await utils.getUser(req)


  const productId = req.params.id
  const userId = user.id;
  const value = JSON.parse(JSON.stringify(req.body.numProduct));
  console.log('Product ID:',productId);
  const cart = await CartModel.findOne({ userId: userId }).lean()

  if (cart) {
    const productExist = await CartModel.findOne({ userId: user,"products.product": productId })


    if (productExist) {
        console.log('if products exists');
        await CartModel.updateOne({ userId: user, "products.product": productId }, { $inc: { "products.$.quantity": value} })
    }

    else {
        console.log("first else if condition-If products not exists");
        await CartModel.findOneAndUpdate({ userId: user }, {
            $push: {
                products: {
                    product: productId, quantity: value
                },
            }
        })
    }



} else {
  console.log('else condition')

    await CartModel.create({
        userId: user,
        products: { product: productId, quantity: value },
        quantity:value
    })
}

// cartData = await CartModel.find().populate('products.product').lean()

res.status(200).json({ message: "Hurray! Product Added"}).redirect

// } catch (error) {

// res.status(401).json({ message: "Oops! Process failed", error: `error is : ${error}` })

// }

}

//===============================INCREMENT CART PRODUCT QUANTITY====================================


exports.updateQty = async (req,res,next) => {
 try {
  const userId = await utils.getUser(req)
  console.log('haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaii');
  let productId = req.body.product
  let count = req.body.quantity

  console.log('count:',count);
  console.log('eretujyhtgggggggrrrrrrrrrrrrrrrrrrrrr',productId);
  const updateQty = await CartModel.updateOne({userId:userId,'products.product':productId},{'products.$.quantity':count})
  let cart = await CartModel.findOne({userId:userId}).lean()

  // console.log('Updated quantity in DB',userId, cart)
  res.json({msg: 'ethi',cart:cart,})
  const productData = await CartModel.findOne().populate('products.product').lean()
  console.log('productData:',productData.products);


 } catch (error) {
  console.log(error)
 }


}

//===============================DELETE CART====================================

exports.deleteCart = async (req,res,next) => {

  // try {
    const user = await utils.getUser(req)
    const userId = user.id
    console.log('userIDiiiiiiiiiiiiiiii',userId)
    const productId = req.body.product
    console.log(req.body);
    console.log("productID",req.body);


    await CartModel.updateOne({
        userId: userId
    }, {
        $pull: {
            products: {
                product: productId
            }
        }
    })



    return res.status(200).json({ message: 'server success' })

// } catch (error) {
//     console.log(error);
//     return res.status(401).json({ message: 'server failure' })


// }





}















  // const cart = await CartModel.findOne({userId}).lean()
  // if (cart) {
  //   let productIndex = cart.products.findIndex((i) => i.product == productId);
  //   if (productIndex !== -1) {
  //     await CartModel.updateOne(
  //       { userId: userId, "products.product": productId },
  //       {
  //         $inc: { "products.$.quantity": 1 },
  //       }
  //     );
  //     }
  
  // //add to cart
  // const cart = await CartModel.create({
  // userId: userId,
  // products: { product: productId },
  // })

  // return res.status(200).json({
  // status:'sucess',
  // data: CartModel
  // })
     

// }