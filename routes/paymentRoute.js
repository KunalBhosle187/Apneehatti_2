require("dotenv").config();

const formidable = require("formidable");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const https = require("https");
const PaytmChecksum = require("../PaytmChecksum");

router.post("/callback", (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, file) => {
     console.log(fields)
  });

});

router.post("/payment", (req, res) => {
  const { amount, email } = req.body;
  const totalAmount = JSON.stringify(amount);

  /* import checksum generation utility */
  var params = {};

  /* initialize an array */ 
  params["MID"] = process.env.TEST_MERCHANT_ID,
  params["WEBSITE"] = process.env.WEBSITE,
  params["CHANNEL_ID"] = process.env.CHANNEL_ID,
  params["ORDER_ID"] = uuidv4(),
  params["CUST_ID"] = uuidv4(),
  params["TXN_AMOUNT"] = totalAmount,
  params["CALLBACK_URL"] = "http://localhost:5000/api/callback",
  params["EMAIL"] = email,
  params["MOBILE_NO"] = "8459009103",
  params['INDUSTRY_TYPE_ID'] = process.env.INDUSTRY_TYPE;


  /**
   * Generate checksum by parameters we have
   * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
   */
  var paytmChecksum = PaytmChecksum.generateSignature(
    params,
    process.env.TEST_MERCHANT_KEY
  );
  paytmChecksum
    .then(function (checksum) {
      let paytmParams = {
        ...params,
        "CHECKSUMHASH": checksum,
      };
      res.json(paytmParams);
    }).catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
