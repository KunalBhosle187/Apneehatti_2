import React, { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../actions/cartAction";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, withRouter } from "react-router";
import { Button, FormControl, MenuItem, Select } from "@material-ui/core";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import Signin from "../../components/Signin";
import { Link } from "react-router-dom";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  ChevronLeftIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  XIcon,
} from "@heroicons/react/solid";

const Cart = ({ match, location, history, showCart }) => {
  // handling multiple stores by there name in url
  const locationPath = useLocation();
  const store = locationPath.pathname.split("/").slice(1)[0];

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // console.log(cartItems);

  const [loginStatus, setLoginStatus] = useState(false);
  const [openCart, setOpenCart] = useState(showCart);

  // useEffect(() => {
  //   if (productId) {
  //     dispatch(addToCart(productId, qty));
  //   }
  // }, [dispatch, productId, qty]);

  const removeFromCartHandler = (number) => {
    dispatch(removeFromCart(number));
  };
  console.log("localstorage");

  const checkOut = () => {
    if (!userInfo) {
      setLoginStatus(true);
    } else {
      history.push("shipping/placeorder");
    }
  };

  // $(document).ready(function(){

  //   $("#hide").click(function(){
  //     $(".cart__div").addClass("cart__div__hide");
  //   });

  // });

  const showAndHideCart = () => {
    if (
      localStorage.getItem("isChecked") != null &&
      localStorage.getItem("isChecked") == "true"
    ) {
      localStorage.setItem("isChecked", "false");
      $(document).ready(function () {
        $(".cart__div").addClass("right-[-150%] ").removeClass("right-0");
      });
    } else {
      localStorage.setItem("isChecked", "true");
      $(document).ready(function () {
        $(".cart__div").removeClass("right-[-150%]").addClass("right-0");
      });
    }
  };
  return (
    <>
      {!userInfo ? (
        loginStatus ? (
          <div className="loginBlockOuter col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="loginBlockMain col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="loginBlock col-lg-9  col-md-11 col-sm-10 col-10 d-flex flex-wrap ">
                <Signin />
                <XIcon
                  className="z-20 fixed h-8 m-5 right-0 top-0"
                  onClick={() => setLoginStatus(false)}
                />
              </div>
            </div>
          </div>
        ) : null
      ) : null}
      <div
        className={`cart__div fixed top-0 bottom-0 z-40  bg-white  duration-500 w-full right-[-150%]   `}
      >
        <div className="flex justify-evenly h-12 px-4  hidden">
          <ChevronLeftIcon className="h-10" />
          <img
            className="object-contain "
            alt=""
            onClick={(event) => (window.location.href = `/`)}
            src="/pictures/apneehatti_logo.svg"
            width="100%"
            height="100%"
          />
          <ShoppingCartIcon className="h-10" />
        </div>
        <div className=" border-b-2 shadow-xl flex items-center justify-between p-4">
          <h5 className="text-xl font-bold">Shopping Cart </h5>
          <XIcon className="h-7" onClick={() => showAndHideCart()} />
        </div>
        {cartItems.length === 0 ? (
          <div className="flex flex-col mt-10 items-center  ">
            <ShoppingBagIcon className=" text-gray-200" />
            <h6 className="capitalize text-gray-400">
              Oops! Your cart is empty !
            </h6>
            <h6 className="capitalize text-gray-400">
              check our bestsellers and find something for you
            </h6>
            <Link to="/store/Beauty" className="mt-5">
              <Button>Check bestsellers</Button>
            </Link>
          </div>
        ) : (
          <div className="">
            <div className="fixed top-16 overflow-y-auto bottom-28 w-full p-3 bg-gray-50 border-b-2">
              {cartItems.map((item, index) => (
                <div className=" flex bg-white justify-between  mb-1 py-4 px-2 border rounded-lg items-center h-32">
                  <div className="w-1/5 ">
                    <img
                      className="object-contain rounded max-h-20 "
                      alt=""
                      src={item.image[0]}
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <div className="w-2/5">
                    <h6 className="text-sm font-semibold">{item.title}</h6>
                    <h6 className="text-sm font-semibold text-gray-600 mt-2">
                      &#8377;{item.qty * item.price}
                    </h6>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-2 col-2 formSelect">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                      class="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div
                    className="col-lg-1 col-md-1 col-sm-1 col-1"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <DeleteOutlineOutlinedIcon className="bin" />
                  </div>
                </div>
              ))}
            </div>

            <div className="fixed  bottom-0 w-full  px-4 py-8 bg-white border-t-2">
              <div className="flex justify-between text-xl font-semibold text-gray-500">
                <h6 align="center" className="col-lg-3 col-md-3 col-sm-3 col-3">
                  Total :
                </h6>
                <h6 align="center" className="">
                  &#8377;{" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </h6>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => checkOut()}
                  disabled={cartItems.length === 0}
                  class="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2"
                >
                  Check out
                  <svg
                    aria-hidden="true"
                    class="ml-2 -mr-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <button
                  className="hidden"
                  onClick={() => {
                    checkOut();
                    showAndHideCart();
                  }}
                  disabled={cartItems.length === 0}
                >
                  <span>Checkout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default withRouter(Cart);
