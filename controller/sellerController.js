const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Product = require("../models/ProductModel");
const User = require("../models/userSchema");
const io = require("../server");
const generateToken = require("../utils/generateToken");

//Seller login
const authSellerController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, isAdmin: true });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      store: user.store,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Invalid Email or Password");
    res.status(401);
  }
});

const getOrderList = asyncHandler(async (req, res) => {
  const orderReq = await Order.find({}).populate("Order");

  if (orderReq) {
    io.ioObject.sockets.emit("get-updatedOrders", orderReq);

    res.json(orderReq);
  } else {
    res.status(404).json({ message: "Orders Not Found" });
  }
});

module.exports = { getOrderList, authSellerController };
