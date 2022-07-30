const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const compression = require("compression");

const userRoute = require("./routes/userRoute");
// seller route

const storeRoute = require("./routes/storeRoute");
const adminRoute = require("./routes/adminRoute");
const path = require("path");
const paymentRazorRoute = require("./routes/paymentRazorRoute");
const cors = require("cors");

const orderRoute = require("./routes/orderRoute");
const productsRoute = require("./routes/productRoute");

const amazonSellerRoute = require("./routes/sellerRoute");

// feedback Route
const userFeedback = require("./routes/feedbackRoute");

const Order = require("./models/orderModel");

app.use(
  compression({
    level: 6,
    threshold: 10 * 1000,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);
app.use(cors());

// implement socket.io
const http = require("http");
const server = http.createServer(app);

const socketIO = require("socket.io");

const io = socketIO(server, {
  transports: ["websocket", "polling"],
  cors: {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PATCH"],
    },
  },
});

io.on("connection", (socket) => {
  console.log("A user is connected");
  socket.on("message", (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  });

  socket.on("disconnect", () => {
    console.log(`socket ${socket.id} disconnected`);
  });
});

const socketIoObject = io;
module.exports.ioObject = socketIoObject;

// implementing razorpay gateway

const Razorpay = require("razorpay");

//dotenv config
dotenv.config({ path: "./.env" });
require("./db/conn");

//auth middlerware
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// app.get("/", (req, res)=>{
//     res.send("<h1>Welcome to node server</h1>")
// })

// payment gateway implementation
app.use("/payment", paymentRazorRoute);
app.use("/api/orders", orderRoute);
app.use("/api", productsRoute);
app.use("/api/store", storeRoute);
app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);

//User feedback
app.use("/api/feedback", userFeedback);

/////////////////////////////

app.use("/api/amazon/seller", amazonSellerRoute);
////////////////////////////
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use(errorHandler);

// setup heroku
const port = process.env.PORT || 5000;

app.use(express.static("client/build"));
app.use(express.static(__dirname + "client/public/uploads"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

server.listen(port, () => {
  console.log("server is running on port 8080");
});
