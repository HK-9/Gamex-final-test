const ProductsModel = require('../model/productsSchema');
const CartModel = require('../model/cartSchenma');
const utils = require('../util/utils'); 


//============================-V I E W   C H E C K O U T-===============================

exports.checkoutRoute = async (req, res, next) => {

    const logged = await utils.partialCheck(req)
    const user = await utils.getUser(req)

    res.render("users/checkout",{
        userLoggedIn:logged,
        layout:'tempLayout'
    });
  };