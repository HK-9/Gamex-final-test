const AdminModel = require("../../model/adminsSchema");
const UsersModel = require("../../model/usersSchema");
const ProductsModel = require("../../model/productsSchema");


//--------------------VIEW ROUTES------------------------------------------
exports.loginRoute = (req, res) => {
  res.render("admin/login", { layout: "adminLayout" });
};
exports.indexRoute = (req, res, next) => {
  res.render("admin/index", { admin: true, layout: "adminLayout" });
};

exports.allUsersRoute = async (req, res, next) => {
  const users = await UsersModel.find().lean();
  console.log(users);
  res.render("admin/dashboard/users", {
    admin: true,
    layout: "adminLayout",
    users,
  });
};

exports.ordersRoute = (req, res, next) => {
  res.render("admin/dashboard/orders", { admin: true, layout: "adminLayout" });
};

// exports.couponsRoute = (req, res, next) => {
//   res.render("admin/dashboard/coupons", {
//     admin: true,
//     layout: "adminLayout",
//   });
// };
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

//----------------------DELETE PRODUCT---------------------------------------
exports.deleteProduct