const ProductsModel = require('../model/productsSchema');
const AddressModel = require('../model/addressSchema')
const CartModel = require('../model/cartSchenma');
const UsersModel = require('../model/usersSchema')
const utils = require('../util/utils'); 


//============================-V I E W   C H E C K O U T-===============================

exports.checkoutRoute = async (req, res, next) => {

    const logged = await utils.partialCheck(req)
    const user = await utils.getUser(req)
    const userId = user._id
    const addressExist = await user.addresses;
    
    if(addressExist.length === 0){
        res.render("users/checkout",{
            userLoggedIn:logged,
            layout:'tempLayout'
        });
    }else{
        address = await AddressModel.find({userId:userId}).lean()
    // const  uniqueUserAddressData = await utils.getUserAddress(user.id);
    const uniqueUserAddressData = await UsersModel.findOne({_id:userId}).populate('addresses.address').lean()
    console.log('uniqueUserAddressData',uniqueUserAddressData)
    res.render("users/checkout",{
        userLoggedIn:logged,
        layout:'tempLayout',
        uniqueUserAddressData,address
    });
    }
  };

//============================ U P L O A D  A D D R E S S ===============================

  exports.uploadAddress = async(req,res,next) => {
    user = await utils.getUser(req);

    userId = user._id
    const fname = req.body.payload.fname;
    const lname = req.body.payload.lname;
    const email = req.body.payload.email;
    const phone = req.body.payload.phone;
    const address = req.body.payload.address;
    const city = req.body.payload.city;
    const state = req.body.payload.state;
    const zip = req.body.payload.zip;
    console.log('zip:',zip)
    const landmark = req.body.payload.landmark;
//    try {

    // const addressData = await UsersModel.findOne({userId:user,"addresses:address":userId})

    // if(addressData){
        
    // }

    formData = req.body
      
    await AddressModel.create({
        userId:userId,
        fname:fname,
        lname:lname,
        email:email,
        phone:phone,
        address:address,
        city:city,
        state:state,
        zip:zip,
        landmark:landmark
    })

   const addressData = await AddressModel.find({userId:userId},{_id:1}).lean()
    const addressLen = addressData.length;
    const addressId = addressData[addressLen-1]

    id = userId

    await UsersModel.findOneAndUpdate({ _id: id }, {
        $push: {    
                addresses: {
                address: addressId,
            },
        }
    })

    //   const  uniqueUserAddressData = await utils.getUserAddress(user.id) 
      const uniqueUserAddressData = await UsersModel.findOne({userId}).populate('addresses.address').lean();
                              

    res.status(200).json({
        status:'success',
        message:'address added to database',
        data : uniqueUserAddressData
    })
//    } catch (error) {
//     res.status(500).json({
//         status:'fail',
//         message:error
//     })
//    }
    
    
}