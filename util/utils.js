const jwt = require('jsonwebtoken')
const UsersModel = require("../model/usersSchema");

utils = {
    getUser: async function (req) {
        token = await req.headers.cookie.split("=")[1];
        const payLoad = await jwt.verify(token, process.env.JWT_SECRET);
        user = await UsersModel.findById(payLoad.id);
        return user;
    },
  getProduct: async function(req){
    productId = req.params.id
  }
}

module.exports = utils;
