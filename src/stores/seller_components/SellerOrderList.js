import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrder , listShippedOrder , listPendingOrder } from "../actions/sellerAction";
import { Link } from "react-router-dom";
import { deliverdOrder } from "../actions/orderAction";
import { createDeliveryOrder } from "../actions/deliveryAction";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
import { withRouter } from "react-router";
import { Button } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import ReactPaginate from "react-paginate";
import moment from "moment";
import SellerOrderInfo__table from "./SellerOrderInfo__table";
import SellerFeaturedBlock from "./SellerFeaturedBlock";
import { Line , Bar, Pie, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import MaterialTable from 'material-table'
import {getSumOfArray , getUniqueValues} from "./logic"


const SellerOrderList = ({ history }) => {


  // sellerInfo
  const sellerLog = useSelector((state) => state.sellerLog);
  const { sellerInfo } = sellerLog;
  console.log(sellerInfo);
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading: orderListLoading, error, orderReq } = orderList;

   
  const shippedOrderList = useSelector((state) => state.shippedOrderList);
  const {  shippedOrders  } = shippedOrderList;

 
 const pendingOrderList = useSelector((state) => state.pendingOrderList);
 const {  pendingOrders  } = pendingOrderList;














 



 
 
 
 
 
 
//  yearly month






   









  // Chart Data Logic end





















  // statistic information & filtered data //































 
 
 
 
 

  // Chart




// material ui table




  return (
    <div className="">
      <div className="seller__orderlist__container">
        <div className="seller__orderlist__heading__block">
          <h3>Orders</h3>
          <div className="seller__orderlist__filter">
            <h5>Daily</h5>
            <h5>Monthly</h5>
          </div>
        </div>

        <div className="seller__grid">
        <SellerOrderInfo__table/>
        </div>
     </div>
       
    </div>
  );
};

export default withRouter(SellerOrderList);
