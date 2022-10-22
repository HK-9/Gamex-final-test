const AdminModel = require("../../model/adminsSchema");
const UsersModel = require("../../model/usersSchema");
const ProductsModel = require("../../model/productsSchema");
const OrderModel = require("../../model/orderSchema");
const utils = require('../../util/utils')

//--------------------VIEW ROUTES------------------------------------------
exports.loginRoute = (req, res) => {
  res.render("admin/login", { 
    layout: "adminLayout",
    title: 'title' 
  });
};
exports.indexRoute = async (req, res, next) => {
  const orderData = await OrderModel.findOne().lean()
  

  res.render("admin/index", { admin: true,
     layout: "adminLayout",
     title:"Admin | Login"
     });
};

exports.allUsersRoute = async (req, res, next) => {
  const users = await UsersModel.find().lean();
  console.log(users);
  res.render("admin/dashboard/users", {
    admin: true,
    layout: "adminLayout",
    users
  });                                                                                                                                                                                                                   
};

exports.ordersRoute = async (req, res, next) => {
  const orderData = await OrderModel.find().lean()
  let placed,shipped,delivered,cancelled;
  let UorderData = await OrderModel.find().lean()
  if(UorderData.orderStatus == 'confirmed') {placed=true}
  else if(UorderData.orderStatus=='shipped') {shipped = true;}
  else if(UorderData.orderStatus=='delivered') {delivered = true}
  else if(UorderData.orderStatus=='cancelled') {cancelled = true}
  
  // const userData = await OrderModel.find().populate("users").lean()
  res.render("admin/dashboard/orders",
  { 
    admin: true, layout: "adminLayout",
    orderData,
    placed,shipped,delivered,cancelled,orderData
  });
};

exports.ordersEditRoute = async (req, res, next) => {
  
  let placed,shipped,delivered,cancelled;
  let orderId = req.params.id
  let orderData = await OrderModel.findOne({_id:orderId}).lean()

  if(orderData.orderStatus == 'confirmed') {placed=true}
  else if(orderData.orderStatus=='shipped') {shipped = true;}
  else if(orderData.orderStatus=='delivered') {delivered = true}
  else if(orderData.orderStatus=='cancelled') {cancelled = true}
  
  
  res.render('admin/dashboard/editOrderStatus',{
    admin: true, layout: "adminLayout",
    placed,shipped,delivered,cancelled,orderData
  })
}


    //-------------------------ACTION ROUTES------------------------------------------
    
    exports.editStatusButton=async(req,res)=>{
      let orderId = req.params.id
      // console.log("params id:",orderId)
      // console.log("req.body",req.body)
      await OrderModel.findOneAndUpdate({_id:orderId},{$set:{orderStatus:req.body.status}})
      res.redirect('/admin/orders');
    }

    //----------------------USER BLOCK/UNBLOCK--------------------------------
exports.blockUserRoute = async (req, res, next) => {
  try {
    const userId = req.params.id;

    await UsersModel.updateOne({ _id: userId }, { $set: { status: false } });

    res.redirect("/admin/allUsers");
  } catch (err) {
    res.send(err);
  }
};

exports.unblockUserRoute = async (req, res, next) => {
  try {
    const userId = req.params.id;

    await UsersModel.updateOne({ _id: userId }, { $set: { status: true } });

    res.redirect("/admin/allUsers");
  } catch (err) {
    res.send(err);
  }
};

//---------------------- P A Y M E N T ---------------------------------------

