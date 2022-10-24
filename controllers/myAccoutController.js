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
    // console.log(req.body)
    const curretntAddress = await AddressModel.findById(addressId);
    res.status(200).json({
        status:'success',
        data:curretntAddress
    })

    
}

exports.manageAddressRoute = async(req,res,next) => {
    const logged = await utils.partialCheck(req);
    const user = await utils.getUser(req);
    const userId = user._id

    const address = await AddressModel.find({userId:userId}).lean()

    res.render('users/mangeAddress',{
        tittle:'Manage address',
        layout:'tempLayout',
        userLoggedIn:logged,
        user,
        address
    })
}

exports.deleteAddressRoute = async(req,res,next) => {

        const addressId = req.body.addressId
        await AddressModel.findByIdAndDelete(addressId)
        const user = await utils.getUser(req);
        const userId = user._id
        res.status(200).json({
            status:'status',
            message:"haimonu"
          
        })
    // const addressId = req.body.addressId

}

exports.editAddressRoute = async(req,res,next) => {
    const user = await utils.getUser(req);
    const userID = user._id
    const addressId = req.body.payload.addressId

    const userId = userID
    const fname = req.body.payload.fname
    const lname = req.body.payload.lname
    const email = req.body.payload.email
    const phone = req.body.payload.phone
    const address = req.body.payload.address
    const city = req.body.payload.city
    const state = req.body.payload.state
    const zip = req.body.payload.zip
    const landmark = req.body.payload.landmark

    const newAddress = {
        userId:userId,
        fname:fname,
        lname:lname,
        email:email,
        fname:fname,
        fname:fname,
        phone:phone,
        fname:fname,
        address:address,
        city:city,
        state:state,
        landmark:landmark
    }
     await AddressModel.findByIdAndUpdate(addressId,newAddress)
    console.log(newAddress);

    res.status(200).json({
        status:'status',
        message:"haimonu"
      
    })
// const addressId = req.body.addressId

}

exports.findCheckedAddressRoute = async (req,res,next) => {
    const user = await utils.getUser(req);
    const userId = user._id

    const addressId =req.body.payload;
    console.log('UserID:',userId)
    await AddressModel.updateMany({userId:userId}, {isActive:false})
    await AddressModel.findOneAndUpdate({_id:addressId}, { isActive:true})

    const activeAddressData = await AddressModel.findOne({userId:userId ,isActive:true}).lean()
    console.log("activeAddressData::",activeAddressData)

    res.status(200).json({
        status:'success',
        data:activeAddressData
    })
}
