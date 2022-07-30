const express = require("express");
const {updateOrderToDeliverd, addOrderItem , getOrderById , updateOrderToPaid , getMyOrders , sendConfirmationMail} = require('../controller/orderController')
const {protect} = require('../middleware/authMiddleware')

const router = express.Router();

// getUserOrder
router.route('/myorders').get(protect, getMyOrders)



// CREATE NEW ORDER
router.route('/').post(protect, addOrderItem);

//SEND CONFIRMATION MAIL
router.route('/sendConfirmationMail').post(protect, sendConfirmationMail);

// GET ORDER BY ID

router.route('/:id').get(protect, getOrderById);

// UPDATE ORDER

router.route('/:id/pay').put(protect, updateOrderToPaid)

router.route('/:id/:productID/delivered').put( updateOrderToDeliverd)

module.exports = router ;