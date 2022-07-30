import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import { logout } from "../actions/sellerAction";
import CancelIcon from "@mui/icons-material/Cancel";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import { listOrder } from "../actions/sellerAction";
import { Button } from "@material-ui/core";
import { Link, Route, Redirect, BrowserRouter } from "react-router-dom";
import SellerDash from "./SellerDash";
import SellerOrderInfo__table from "./SellerOrderInfo__table";
import SellerProduct from "./SellerProduct";
import SellerEditProduct from "./SellerEditProduct";

const SellerLayout = ({ history, location }) => {
  const sellerLog = useSelector((state) => state.sellerLog);
  const { sellerInfo } = sellerLog;
  const dispatch = useDispatch();
  const [comp, setComp] = useState(false);

  const orderList = useSelector((state) => state.orderList);
  const { loading: orderListLoading, error, orderReq } = orderList;

  console.log("orderReq", orderReq);

  const redirect = location.search ? location.search.split("=")[1] : "./seller";

  const logoutHandler = () => {
    dispatch(logout());
    history.push(redirect);
  };

  useEffect(() => {
    if (!sellerInfo) {
      history.push("/seller");
    }
  }, [sellerInfo]);

  $(document).ready(function () {
    $(".seller__sidebar__cancel__icon , .btns").click(function () {
      $(".seller__sidebar ").hide();
    });

    $(".fa-bars").click(function () {
      $(".seller__sidebar").show();
    });
  });

  return (
    <div className="">
      <div className="seller__layout__grid">
        <div className="seller__sidebar">
          <div className="  seller__sidebar__hide ">
            <div className=" seller__sidebar__cancel__icon">
              <CancelIcon />
            </div>

            <div className=" seller__sidebar__user__options d-flex flex-wrap ">
              <Link to="/sellerdashboard/dashboard">
                <Button className=" d-flex flex-wrap justify-content-between align-items-center btns">
                  <DashboardOutlinedIcon className="" />
                  <h5>Dashboard</h5>
                </Button>
              </Link>

              <Link to="/sellerdashboard/products">
                <Button className=" d-flex flex-wrap justify-content-between align-items-center btns">
                  <Inventory2OutlinedIcon className="" />
                  <h5>Products</h5>
                </Button>
              </Link>

              <Link to="/sellerdashboard/orders">
                <Button className=" d-flex flex-wrap justify-content-between align-items-center btns">
                  <ShoppingCartOutlinedIcon className="" />
                  <h5>Orders</h5>
                </Button>
              </Link>

              <a className="">
                <Button className=" d-flex flex-wrap justify-content-between align-items-center btns">
                  <EqualizerOutlinedIcon className="" />
                  <h5>Analytics</h5>
                </Button>
              </a>

              <Link to="#" className="">
                <Button className=" d-flex flex-wrap justify-content-between align-items-center btns">
                  <SavingsOutlinedIcon className="" />
                  <h5>Finance</h5>
                </Button>
              </Link>

              <Link to="#" className="">
                <Button className="  d-flex flex-wrap justify-content-between align-items-center btns">
                  <AccountCircleOutlinedIcon className="" />
                  <h5>Profile</h5>
                </Button>
              </Link>

              <a className="">
                <Button
                  onClick={logoutHandler}
                  className=" d-flex flex-wrap justify-content-between align-items-center btns"
                >
                  <PowerSettingsNewOutlinedIcon className="" />
                  <h5>Logout</h5>
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="seller__main__div">
          <div className="seller__main__nav">
            <div className="seller__main__nav__left__block__flex">
              <div className="seller__main__nav__sidebar">
                <i class="fas fa-bars"></i>
              </div>
            </div>
            <div className="seller__main__nav__right__corner__menu">
              <div className="seller__main__nav__notification">
                <i class="far fa-bell"></i>
              </div>
              <div className="seller__main__nav__notification">
                <i class="far fa-user"></i>
              </div>
            </div>
          </div>

          <div className="seller__layout__components">
            <Route path="/sellerdashboard">
              <Redirect to="/sellerdashboard/dashboard" />
            </Route>
            <Route
              exact
              path="/sellerdashboard/dashboard"
              component={SellerDash}
            />
            <Route
              exact
              path="/sellerdashboard/orders"
              component={SellerOrderInfo__table}
            />
            <Route
              exact
              path="/sellerdashboard/products"
              component={SellerProduct}
            />
            <Route
              exact
              path="/sellerdashboard/products/edit/:productId"
              component={SellerEditProduct}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
