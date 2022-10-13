const WhishlistModel = require('../model/whishlistSchema')
const CartData = require('../model/cartSchenma')
const CartModel = require('../model/cartSchenma');
const ProductsModel = require('../model/productsSchema');
const AddressModel = require('../model/addressSchema')
const utils = require('../util/utils'); 
const { findById } = require('../model/categorySchema');
const { compareSync } = require('bcryptjs');
const UsersModel = require('../model/usersSchema');
const { findOne } = require('../model/usersSchema');
const mongooseUniqueValidator = require('mongoose-unique-validator');


//=========-V I E W   C O N T R O L L E R-==============

exports.myAccoutRoute = async(req,res,next)=>{
    const logged = await utils.partialCheck(req);
    const user = await utils.getUser(req);

     res.render('users/myProfile',{
        userLoggedIn:logged,user,
        layout:'tempLayout'
        
    });
    
}

exports.getCurrentAddressRoute = async (req,res,next) => {
    const user = await utils.getUser(req);
    const addressId = req.body.currentAddress
    console.log(req.body)
    const curretntAddress = await AddressModel.findById(addressId);
    res.status(200).json({
        status:'success',
        data:curretntAddress
    })

    
}
