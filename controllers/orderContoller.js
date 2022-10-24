const stripe = require('stripe')
const session = require('express-session')
const ProductsModel = require('../model/productsSchema');
const CartModel = require('../model/cartSchenma');
const UsersModel = require('../model/usersSchema');
const CouponModel = require('../model/couponSchema')
const OrderModel = require('../model/orderSchema')
 

//put code here for cod and payment.
exports.confirmOrderRoute = async (req,res,next) => {
      const user = await utils.getUser(req)
      const userId = user._id
      const paymentMethod = req.body.payment

      const  addressData = await utils.getUserAddress(userId)
      console.log("addressData",addressData)
      const cartData = await utils.cartDetails(userId);
          //have
          const grandTotal = cartData.grandTotal;
          const couponDiscount = cartData.couponDiscount;
          const totalPayed = cartData.totalPayed;
          const subTotal = cartData.subTotal;
          // console.log('@discount',couponDiscount)
        
          req.body = addressData,grandTotal,totalPayed,subTotal,couponDiscount
          // quantity,price,discount;

          req.body.products = cartData.products
          const productId = await CartModel.findOne({userId:userId},{_id:0,"products.product":1})
          let id = productId.products
          
          await OrderModel.create(req.body)
        
        const orderData = await OrderModel.findOne({userId:userId}).sort({_id:-1}).limit(1).lean()
        const orderId = orderData._id
        console.log("@orderId:",orderData,orderId)
        await OrderModel.findOneAndUpdate({_id:orderData._id},{grandTotal:grandTotal})
        console.log('sonic',req.body)
        const populatedOrderData = await utils.getPopulatedOrder(userId)

        await OrderModel.updateOne({userId:userId,_id:orderId},
        {
           couponDiscount:couponDiscount,
           subTotal:subTotal,
           totalPayed:totalPayed,
           orderStatus:"confirmed",
           paymentType:paymentMethod
        //     'products.$.subTotal':subTotal,
        //   'products.$.couponDiscount':couponDiscount,
        //   'products.$.totalPayed':totalPayed
          })

        console.log('777',populatedOrderData)
            res.status(200).json({
                status:'success',
                data:{
                    payment:paymentMethod,orderData,cartData,
                    populatedOrderData

                }
            })      
            
        }

    //==================================== C O D  P A G E  R E N D E R  R O U T E ====================================
    exports.renderCodRoute = async (req,res,next) => {
        const logged = await utils.partialCheck(req)
    const user = await utils.getUser(req)
    const userId = user._id
    const orderData = await OrderModel.findOne({userId:userId}).sort({_id:-1}).limit(1).lean()
    const orderId = orderData._id
    const populatedOrderData = await OrderModel.findOne({userId:userId,_id:orderId}).populate("products.product").lean()
    console.log("lastelement@",orderData,populatedOrderData,orderId)
    
    res.render('users/codDelivery',{
        layout:'tempLayout',
        userLoggedIn:logged,orderData,populatedOrderData
    })
}
//==================================== S T R I P E  P A G E  R E N D E R  R O U T E ====================================

exports.renderStripeRoute = async (req,res,next) => {
    user = await utils.getUser(req)
    userId = user._id
    const orderData = await OrderModel.findOne({userId}).sort({_id:-1}).limit(1).lean()
    const orderId = orderData._id
    const amount = orderData.totalPayed


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        // success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
        //   req.params.tourId
        // }&user=${req.user.id}&price=${tour.price}`,
        success_url: 'http://localhost:3001/',
        cancel_url:'http://localhost:3001/checkout',
        customer_email: req.user.email,
        client_reference_id: req.params.tourId,
        line_items: [
          {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
              `${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`
            ],
            amount: tour.price * 100,
            currency: 'INR',
            quantity: 1
          }
        ]
      });

    //Create session as response

    res.status(200).json({
        status:'success',
        session
    })
    
}