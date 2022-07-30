require("dotenv").config();
const express = require("express")
const router = express.Router()
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { v4: uuidv4 } = require("uuid");
const PaymentDetails = require("../models/paymentOrder")
const asyncHandler = require("express-async-handler");



router.post('/orders',asyncHandler(async (req, res,) => {
    try {
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID, // YOUR RAZORPAY KEY
        key_secret: process.env.RAZORPAY_SECRET, // YOUR RAZORPAY SECRET
      });
      const totalAmount = res.itemPrice
      console.log("amount is",totalAmount)
      const {
       amount
      } = req.body;
 
        const response = await instance.orders.create({amount:req.body.amount, currency:"INR" , receipt:uuidv4()});
        console.log(response);
        res.json({
          id: response.id,
          currency: response.currency,
          amount: response.amount,
        });

      } catch (error) {
        console.log(error);
      }
    }));
  

  router.post('/success', async (req, res) => {
// getting the details back from our font-end
    try {
      const {
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
      } = req.body;
  
      const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
      shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
      const digest = shasum.digest('hex');
  
      if (digest !== razorpaySignature)
        return res.status(400).json({ msg: 'Transaction not legit!' });
  

      const newPayment = new PaymentDetails({
        razorpayDetails: {
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
          signature: razorpaySignature,
        },
        success: true,
      });
  
      const razorPayDetails = await newPayment.save();
      console.log("RazorPayDetails....",razorPayDetails)
  
      res.json({
        msg: 'success',
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
module.exports = router;
