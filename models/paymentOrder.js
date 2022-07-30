const express = require('express');
const mongoose = require('mongoose');


const PaymentDetailsSchema = mongoose.Schema({
    razorpayDetails: {
      orderId: String,
      paymentId: String,
      signature: String,
    },
    success: Boolean,
  });
  
  const PaymentDetails = mongoose.model('PatmentDetail', PaymentDetailsSchema);
  module.exports = PaymentDetails ;