const express = require("express");
const router = express.Router();
const {getOrderList, authSellerController} = require("../controller/sellerController")



// POST LOGIN
router.route('/login').post(authSellerController);

// GET ROUTE FOR ALL ORDERS
router.route('/list').get(getOrderList)

module.exports = router ;