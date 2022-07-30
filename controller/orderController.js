const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const io = require("../server");

// const changeStream = Order.watch();
// set up a listener when change events are emitted
// changeStream.on("change", async (next) => {
//   // process any change event
//   const test = await Order.find();
//   console.log("received a change to the collection: \t", next);
//   io.ioObject.sockets.compress(true).emit("get-updatedOrders", test);
//   io.ioObject.sockets.on("get-updatedOrders", (data) => console.log(data));
// });

const addOrderItem = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    userEmail,
    orderId,
  } = req.body;
  if (orderItems && orderItems.length == 0) {
    res.status(400);
    throw new Error("No order Found");
    return;
  } else {
    const order = new Order({
      _id: orderId,
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      userEmail,
    });
    const createOrder = await order.save();
    const allOrders = await Order.find({});
    io.ioObject.sockets.emit("get-updatedOrders", allOrders);
    // let testAccount = await nodemailer.createTestAccount();

    const emailTemplateSource = fs.readFileSync(
      __dirname + "/Template/orderEmail.hbs",
      "utf8"
    );
    const template = handlebars.compile(emailTemplateSource);
    const htmlToSend = template({
      order_id: createOrder._id,
      fullName: shippingAddress.fullName,
      address: shippingAddress.address,
      city: shippingAddress.city,
      postalCode: shippingAddress.postalCode,
      mobile: shippingAddress.shippingMobile,
      tPrice: createOrder.totalPrice,
      order: createOrder,
      title: createOrder.orderItems.title,
      iPrice: createOrder.orderItems.price,
      qty: orderItems.qty,
    });

    //Twilio

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);

    client.messages
      .create({
        body: `Your Apneehatti order has shipped and should be delivered soon. Details:http://apneehatti.herokuapp.com/shipping/placeorder/order/${createOrder._id}`,
        from: "whatsapp:+14155238886",
        to: `whatsapp:+91${shippingAddress.shippingMobile}`,
      })
      .then((message) => console.log(message.sid))
      .done();

    client.messages
      .create({
        body: `Your Apneehatti order has shipped and should be delivered soon. Details:http://apneehatti.herokuapp.com/shipping/placeorder/order/${createOrder._id}`,
        messagingServiceSid: "MG0cebb55ca0ecbf35814d30253cbf8649",
        to: `+91${shippingAddress.shippingMobile}`,
      })
      .then((message) => console.log(message.sid))
      .done();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.email",
      port: 465,
      service: "gmail",
      //   secure: false, // true for 465, false for other ports
      auth: {
        user: "kunalbhosle555@gmail.com ", // generated ethereal user
        pass: "lyusrmbhxnmvqiwk", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Apneehatti 👻" <apneehatti@gmail.com>', // sender address
      to: userEmail, // list of receivers
      subject: "Invoice From Apneehatti ✔", // Subject line
      html: htmlToSend, // html body
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    // //////////////////////////
    if (info.messageId) {
      console.log("email send");
    } else {
      console.log("email not");
    }
    res.status(201).json(createOrder);
  }
});

//send order confirmation mail
const sendConfirmationMail = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, userEmail } = req.body;
  if (orderItems && orderItems.length == 0) {
    res.status(400);
    throw new Error("No order Found");
    return;
  } else {
    // let testAccount = await nodemailer.createTestAccount();

    const emailTemplateSource = fs.readFileSync(
      __dirname + "/Template/orderEmail.hbs",
      "utf8"
    );
    const template = handlebars.compile(emailTemplateSource);
    const htmlToSend = template({
      order_id: createOrder._id,
      fullName: shippingAddress.fullName,
      address: shippingAddress.address,
      city: shippingAddress.city,
      postalCode: shippingAddress.postalCode,
      mobile: shippingAddress.shippingMobile,
      tPrice: createOrder.totalPrice,
      order: createOrder,
      title: createOrder.orderItems.title,
      iPrice: createOrder.orderItems.price,
      qty: orderItems.qty,
    });

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.email",
      port: 465,
      service: "gmail",
      //   secure: false, // true for 465, false for other ports
      auth: {
        user: "kunalbhosle555@gmail.com ", // generated ethereal user
        pass: "Kunalshree@96k", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Apneehatti 👻" <apneehatti@gmail.com>', // sender address
      to: userEmail, // list of receivers
      subject: "Invoice From Apneehatti ✔", // Subject line
      html: htmlToSend, // html body
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    // //////////////////////////
    if (info.messageId) {
      console.log("email send");
    } else {
      console.log("email not");
    }
    res.status(201).console.log("Email Send Successfully");
  }
});

//getorderbyid

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

//paidendpoint
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    (order.isPaid = true), (order.paidAt = Date.now());

    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    shasum.update(
      `${req.body.razorpay_order_id}|${req.body.razorpay_payment_id}`
    );
    const digest = shasum.digest("hex");

    if (digest !== req.body.razorpay_signature) {
      res.status(400);
    }

    order.paymentResults = {
      orderId: req.body.razorpay_order_id,
      paymentId: req.body.razorpay_payment_id,
      signature: req.body.razorpay_signature,
      success: true,
    };

    res.json({
      msg: "success",
      orderId: req.body.razorpay_order_id,
      paymentId: req.body.razorpay_payment_id,
    });

    const updateOrder = await order.save();
    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
  console.log(orders);
});

const updateOrderToDeliverd = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.orderItems
      .filter((i) => i._id == req.params.productID)
      .map((i) => (i.isDelevered = true)),
      order.orderItems
        .filter((i) => i._id == req.params.productID)
        .map((i) => (i.DeleveredAt = Date.now()));
    const updateOrderDeliveryStatus = await order.save();
    res.json(updateOrderDeliveryStatus);
    console.log(updateOrderDeliveryStatus);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

const OrderInvoiceSendToUser = asyncHandler(async (req, res) => {});

module.exports = {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  updateOrderToDeliverd,
  sendConfirmationMail,
};
