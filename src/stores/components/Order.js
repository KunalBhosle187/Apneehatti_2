import { Button, CircularProgress } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router";
import { getOrderDetails, payOrder } from "../actions/orderAction";
import { ORDER_PAY_RESET } from "../../constants/orderConstant";
import Alert from "@material-ui/lab/Alert";
import dateFormat from "dateformat";
import date from "dateformat";
import Feedback from "./Feedback";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/solid";

const Order = ({ match }) => {
  const history = useHistory();
  const todayDate = new Date();
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successpay } = orderPay;
  const { order, loading, error } = orderDetails;

  order && console.log(order.paymentMethod);

  if (!loading) {
    //calculate  price
    const addDecimal = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemPrice = addDecimal(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    localStorage.removeItem("cartItems");
    const script = document.createElement("script");
    script.src = `https://checkout.razorpay.com/v1/checkout.js`;
    script.onload = () => {
      setSdkReady(true);
    };
    script.async = true;
    document.body.appendChild(script);

    if (!order || successpay) {
      dispatch(getOrderDetails(orderId));
      dispatch({ type: ORDER_PAY_RESET });
    }

    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successpay]);

  async function displayRazorpay() {
    const result = await axios.post("/payment/orders", {
      amount: order.totalPrice.toString() * 100,
    });
    const { id } = result.data;
    console.log("response from order api", result.data);

    const options = {
      key: "rzp_test_9d7xWt1UVvVKRc", // Enter the Key ID generated from the Dashboard
      amount: order.totalPrice.toString() * 100,
      currency: "INR",
      name: "Apneehatti Pvt.Ltd.",
      description: "Test Transaction",
      image: "",
      order_id: id,

      handler: async function (paymentResults) {
        if (paymentResults.razorpay_order_id) {
          console.log("payment result ", paymentResults);
          dispatch(payOrder(orderId, paymentResults));
          //  history.push("/store/feedback")
        }
      },

      prefill: {
        name: order.shippingAddress.fullName,
        email: order.user.email,
        contact: order.shippingAddress.shippingMobile,
      },
      notes: {
        address: order.shippingAddress.address,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    });
  }

  console.log("order", order);

  const printInvoice = (para) => {
    var backup = document.body.innerHTML;
    var divcontent = document.getElementById(para).innerHTML;
    document.body.innerHTML = divcontent;
    window.print();
    document.body.innerHTML = backup;
  };

  return loading ? (
    <div className="AlertBox">
      <div className="loader">
        <div className="box">
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <h2 align="center">Loading...</h2>
      </div>
    </div>
  ) : error ? (
    <Alert severity="error">{error}</Alert>
  ) : (
    <div className="m-4">
      <div className="bg-gray-50 flex items-center p-5 rounded">
        <CheckCircleIcon className="h-10 text-green-400 mr-3 p-2 bg-green-200 rounded-full" />{" "}
        <h1 className="text-gray-500">
          Thank you. Your order has beed received.
        </h1>
      </div>

      <div className="bg-gray-50 rounded mt-4 ">
        <div className="p-5 border-b-2 w-full border-gray-100">
          <h1 className="text-gray-500 uppercase text-sm">Order Number</h1>
          <h2 className="font-bold  mt-1 uppercase">{order._id}</h2>
        </div>
        <div className="p-5 border-b-2 w-full border-gray-100">
          <h1 className="text-gray-500 uppercase text-sm">Name</h1>
          <h2 className="font-bold  mt-1 capitalize">
            {order.shippingAddress.fullName}
          </h2>
        </div>
        <div className="p-5 border-b-2 w-full border-gray-100">
          <h1 className="text-gray-500 uppercase text-sm">Date</h1>
          <h2 className="font-bold  mt-1">{order.createdAt}</h2>
        </div>
        <div className="p-5 border-b-2 w-full border-gray-100">
          <h1 className="text-gray-500 uppercase text-sm">Shipping Address</h1>
          <h2 className="font-bold  mt-1 capitalize">
            {order.shippingAddress.address +
              "," +
              order.shippingAddress.city +
              "," +
              order.shippingAddress.postalcode +
              ", India"}
          </h2>
        </div>

        <div className="p-5 border-b-2 w-full border-gray-100">
          <h1 className="text-gray-500 uppercase text-sm">Total</h1>
          <h2 className="font-bold  mt-1"> &#8377;&nbsp;{order.totalPrice}</h2>
        </div>
        <div className="p-5 border-b-2 w-full border-gray-100">
          <h1 className="text-gray-500 uppercase text-sm">Payment method</h1>
          <h2 className="font-bold  mt-1 capitalize">
            {order.paymentMethod === "COD"
              ? "cash on delivery"
              : "netbanking or credit card"}
          </h2>
        </div>
      </div>

      <h1 className="capitalize text-xl font-semibold my-6">order Details :</h1>

      <div className="bg-gray-50 p-5 rounded mt-4">
        <div className="cart__seperate">
          <div className="p-3 bg-gray-50 border-b-2 max-h-screen overflow-y-scroll">
            {order.orderItems.map((item, index) => (
              <div className="flex gap-5 bg-white justify-evenly mb-1 py-4 px-2 border rounded items-center">
                <div className="w-24 ">
                  <img
                    className="object-contain rounded"
                    alt=""
                    src={item.image[0]}
                    width="100%"
                    height="100%"
                  />
                </div>
                <div className=" myCart__product__div__title">
                  <h6 className="text-gray-500 font-medium">{item.title}</h6>
                  <h6 className="font-bold">&#8377;{item.qty * item.price}</h6>
                </div>
                <h6 className="font-bold">{item.qty}</h6>
              </div>
            ))}
          </div>
        </div>
        <div className=" p-10">
          <div className="grid grid-cols-2 gap-y-6 ">
            <h5 className="font-semibold italic">Subtotal&nbsp;:</h5>
            <h5 className="font-semibold" align="right">
              &#8377; {order.totalPrice - 50}
            </h5>
            <h5 className="font-semibold italic">Shipping Charges&nbsp;:</h5>
            <h5 className="font-semibold" align="right">
              &#8377; 50
            </h5>
            <h4 className="font-bold italic">Total&nbsp;:</h4>
            <h4 className="font-bold" align="right">
              &#8377; {order.totalPrice}
            </h4>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <div className="order__grid">
    //     <div className="orderplace__info container__shadow">
    //       <div className="orderplace__left">
    //       <div className="orderImgContainer">
    //         <img src="/pictures/orderPlace-modified.png" width="100%" height="100%" />
    //       </div>
    //       <div className="orderplace__info__text">
    //         <h3>Order placed for &#8377;{order.totalPrice}</h3>
    //         <h5>Your order will be deliver soon</h5>
    //       </div>
    //       </div>

    //       <div className="orderplace__myOrders__right">
    //         <div className="orderplace__myOrders">
    //           <h5>Easily Track all your orders!</h5>
    //           <Link to="/user/myorders">
    //           <button className="btn w-75"><span>Go to My Orders</span></button>
    //           </Link>
    //         </div>
    //         <div className="orderImgContainer">
    //           <img src="/pictures/myOrders-modified.png" width="100%" height="100%" />
    //         </div>
    //       </div>

    //     </div>

    //     <div className="orderUserInfo container__shadow">
    //       <div className="orderUserInfo__left">
    //          <h3>Delivery Address</h3>
    //          <div className="orderUserInfo__div">
    //            <h4>{order.shippingAddress.fullName}</h4>
    //            <h5>{order.shippingAddress.address}, India ,{order.shippingAddress.postalcode}</h5>
    //          </div>
    //          <div className="orderUserInfo__div">
    //            <h4 >Phone number</h4>
    //            <h5>{order.shippingAddress.shippingMobile}</h5>
    //          </div>
    //       </div>
    //       <div className="orderUserInfo__right">
    //         <h3>More action</h3>
    //         <div>
    //                 {!order.paymentMethod == "COD" ? (
    //                   <button
    //                     fullWidth
    //                     variant="contained"
    //                     className="btn"
    //                     onClick={() => printInvoice("invoice")}
    //                   >
    //                    <span>Thank You , Comeback Again</span>
    //                   </button>
    //                 ) : !order.isPaid ? (
    //                     <button

    //                       variant="contained"
    //                       className="btn w-50"
    //                       onClick={displayRazorpay}
    //                     >
    //                      <span> Pay Now</span>
    //                     </button>
    //                 ) : (
    //                   <button

    //                     variant="contained"
    //                     className="btn"
    //                     onClick={() => printInvoice("invoice")}
    //                   >
    //                     <span>Print Invoice</span>
    //                   </button>
    //                 )}
    //               </div>
    //       </div>
    //     </div>

    //     <div className="orderProduct  container__shadow">
    //     {order.orderItems.map((item, index) => (
    //     <div className="orderProduct__Block">
    //          <div>
    //            <img alt="..."  src={item.image[0]}  width="100%" height="100%"/>
    //          </div>
    //         <div className="orderProduct__Block__mobile__grid">
    //          <div className="orderProduct__title">
    //          <Link to={`/product/${item.product}`}> {item.title}</Link>
    //          <h3>Item {item.qty}</h3>
    //          </div>

    //          <div className="orderProduct__delivery">
    //          {order.isDelevered ? (
    //                     <h5><LocalShippingRoundedIcon/> Deivered on
    //                       {dateFormat(order.DeleveredAt, "fullDate")}
    //                     </h5>
    //                   ) : (
    //                     <h5>
    //                       <LocalShippingRoundedIcon/> Deliver soon
    //                     </h5>
    //                   )}
    //         </div>

    //         <div>
    //           <h5 className="orderProduct__price">&#8377;{item.qty * item.price}</h5>
    //           </div>
    //           </div>
    //     </div>
    //     ))}
    //     <div className="orderProduct__total">
    //       <h5>Total  &#8377;{order.totalPrice}</h5>
    //     </div>
    //     </div>
    //   </div>
    //   <div
    //     style={{ visibility: "hidden", display: "none", position: "absolute" }}
    //   >
    //     <div id="invoice" className="border">
    //       <div className="col-12 row border-bottom">
    //         <div className="col-4">
    //           <img
    //             src="/pictures/apneehatti_logo.svg"
    //             width="80px"
    //             height="100%"
    //           />
    //         </div>
    //         <div className="col-4">
    //           <li>
    //             Contact us : <span>1800 000 0000</span>
    //           </li>
    //           <li>
    //             Email : <span>apneehatti@gmail.com</span>
    //           </li>
    //           <li>Apneehatti Service Pvt. Ltd</li>
    //         </div>
    //         <div className="col-4">
    //           <li>
    //             Tax Invoice <span>#123456789</span>
    //           </li>
    //         </div>
    //       </div>
    //       <div className="d-flex justify-content-between px-4 py-4">
    //         <div className="">
    //           <li>
    //             Order ID : <span>#{order._id}</span>
    //           </li>
    //           <li>
    //             Order Date : <span>{date(order.createdAt, "fullDate")}</span>
    //           </li>
    //           <li>
    //             Invoice Date : <span>{date(todayDate, "fullDate")}</span>
    //           </li>
    //         </div>
    //         <div className=" d-flex flex-column float-end ">
    //           <li>Billing Address / Shipping Address</li>
    //           <li>{order.shippingAddress.fullName}</li>
    //           <li>{order.shippingAddress.address}</li>
    //           <li>{order.shippingAddress.city}</li>
    //           <li>India , {order.shippingAddress.postalcode}</li>
    //           <li>Mobile No : {order.shippingAddress.shippingMobile}</li>
    //         </div>
    //       </div>
    //       <div className="invoiceTable">
    //         <table className="table border">
    //           <thead>
    //             <tr>
    //               <th scope="col">#</th>
    //               <th scope="col">Product ID</th>
    //               <th scope="col">Title</th>
    //               <th scope="col">Qty</th>
    //               <th scope="col">Price(&#8377;)</th>
    //               <th scope="col">Shipping Charges(&#8377;)</th>
    //               <th scope="col">Total(&#8377;)</th>
    //             </tr>
    //           </thead>

    //           <tbody>
    //             {order.orderItems.map((item, index) => (
    //               <tr key={index}>
    //                 <th scope="row">{index + 1}</th>
    //                 <td>{item._id}</td>
    //                 <td>{item.title}</td>
    //                 <td>{item.qty}</td>
    //                 <td>{item.price}</td>
    //                 <td>50</td>
    //                 <td>{order.totalPrice}</td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    //       <div className="d-flex flex-column float-end ">
    //         <div className="float-end">
    //           <li className="mx-2">
    //             Grand Total : <span>&#8377;{order.totalPrice}</span>
    //           </li>
    //         </div>
    //         <div className="float-end">
    //           <li className="mx-2">Thank You For Shopping</li>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default withRouter(Order);
