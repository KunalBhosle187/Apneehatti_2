import React, { useEffect, useState } from "react";
import SellerFeaturedBlock from "./SellerFeaturedBlock";
import { getSumOfArray, getUniqueValues, totalSaleOfTheDay } from "./logic";
import {
  listOrder,
  listShippedOrder,
  listPendingOrder,
  listSearchOrder,
} from "../actions/sellerAction";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Button } from "@mui/material";
import Chart from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const SellerDash = () => {
  const [toggleChart, setToggleChart] = useState(true);

  const dispatch = useDispatch();

  const sellerLog = useSelector((state) => state.sellerLog);
  const { sellerInfo } = sellerLog;

  const orderList = useSelector((state) => state.orderList);
  const { loading: orderListLoading, error, orderReq } = orderList;

  const shippedOrderList = useSelector((state) => state.shippedOrderList);
  const { shippedOrders } = shippedOrderList;

  const pendingOrderList = useSelector((state) => state.pendingOrderList);
  const { pendingOrders } = pendingOrderList;

  //  Yearly Chart Setup //
  const currentYear = new Date().getFullYear();
  const letgetMonthlyOrdersForYearChart = [
    `01-${currentYear}`,
    `02-${currentYear}`,
    `03-${currentYear}`,
    `04-${currentYear}`,
    `05-${currentYear}`,
    `06-${currentYear}`,
    `07-${currentYear}`,
    `08-${currentYear}`,
    `09-${currentYear}`,
    `10-${currentYear}`,
    `11-${currentYear}`,
    `12-${currentYear}`,
  ];

  const monthsArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const arrOfMonth = letgetMonthlyOrdersForYearChart.map((y) => {
    const result =
      orderReq &&
      orderReq
        .filter(String)
        .filter((x) => moment(x.createdAt).format("MM-YYYY") == y, String)
        .map((x) =>
          x.orderItems.filter((y) => y.store == sellerInfo.store)
            ? moment(x.createdAt).format("DD-MM-YYYY")
            : null
        );
    return getUniqueValues(result);
  });

  const arrOfYearRevenue = letgetMonthlyOrdersForYearChart.map((date) => {
    return orderReq
      .filter(
        (x) =>
          moment(x.createdAt).format("MM-YYYY") == date &&
          x.orderItems.some((z) => z.store == sellerInfo.store),
        String
      )
      .map((x) =>
        parseInt(
          x.orderItems
            .filter((y) => y.store == sellerInfo.store)
            .map((y) => parseInt(y.price))
        )
      )
      .reduce((a, b) => a + b, 0);
  });

  ////////////////////////////

  ////Monthly Chart Setup ////
  const toDate = new Date();

  const currentMonthOrders =
    orderReq &&
    orderReq
      .filter(String)
      .filter(
        (x) =>
          moment(x.createdAt).format("MM-YYYY") ==
          moment(toDate).format("MM-YYYY"),
        String
      )
      .map((x) =>
        x.orderItems.filter((y) => y.store == sellerInfo.store)
          ? moment(x.createdAt).format("DD-MM-YYYY")
          : null
      );

  const currentMonthOrdersPrice = orderReq
    .filter(String)
    .filter(
      (x) =>
        moment(x.createdAt).format("MM-YYYY") ==
        moment(toDate).format("MM-YYYY"),
      String
    )
    .map((x) =>
      parseInt(
        x.orderItems
          .filter((y) => y.store == sellerInfo.store)
          .map((y) => y.price)
      )
    );

  const monthSaleArr =
    currentMonthOrders.length > 0 &&
    getUniqueValues(currentMonthOrders).map((x) =>
      totalSaleOfTheDay(x, orderReq, sellerInfo.store)
    );

  /////////////////////////////////

  useEffect(() => {
    dispatch(listOrder());
    dispatch(listShippedOrder());
    dispatch(listPendingOrder());
  }, [dispatch]);

  return (
    <>
      <section className="seller__orderlist__status__card__seperater__grid">
        {/* <h4 className="routeTitle">#Dashboard</h4> */}
        <div className="seller__orderlist__status__card__grid">
          <SellerFeaturedBlock
            heading="New Orders"
            count={getSumOfArray(orderReq, "all", "none", sellerInfo.store)}
            icon={<LocalMallOutlinedIcon />}
          />

          <SellerFeaturedBlock
            heading="Revenue"
            count={getSumOfArray(
              orderReq,
              "all",
              "totalSales",
              sellerInfo.store
            )}
            icon={<MonetizationOnOutlinedIcon />}
          />

          <SellerFeaturedBlock
            heading="Pending Orders"
            count={getSumOfArray(
              pendingOrders,
              "pending",
              "none",
              sellerInfo.store
            )}
            icon={<LocalMallOutlinedIcon />}
          />

          <SellerFeaturedBlock
            heading="Shipped Orders"
            count={getSumOfArray(
              shippedOrders,
              "shipped",
              "none",
              sellerInfo.store
            )}
            icon={<CheckCircleOutlineOutlinedIcon />}
          />
        </div>
        <div className="charts">
          <div className="monthlySalesAnalytic glassMorphismSeller">
            <section className="grid__section">
              <div className="analytic__statistics">
                <h4>Earning Revenue</h4>
              </div>
              <div className="selectorForAnalyticChart glassMorphismSeller">
                <Button
                  className="select__btns"
                  onClick={() => setToggleChart(false)}
                >
                  Monthly
                </Button>
                <Button
                  className="select__btns"
                  onClick={() => setToggleChart(true)}
                >
                  Yearly
                </Button>
              </div>
            </section>
            <Line
              fill="#8884d8"
              data={{
                // labels: getUniqueValues(currentMonthOrders),
                labels: toggleChart
                  ? monthsArr
                  : getUniqueValues(currentMonthOrders),
                datasets: [
                  {
                    // data: monthSaleArr,
                    data: toggleChart ? arrOfYearRevenue : monthSaleArr,
                    fill: true,
                    backgroundColor: "#4158D0",
                    tension: 0.3,
                    pointRadius: 2,
                    borderWidth: 2,
                  },
                ],
              }}
              height={300}
              Width={600}
              options={{
                responsive: true,
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                animations: false,
              }}
            />
          </div>

          <div className="monthlySalesAnalytic glassMorphismSeller">
            <div className="centerDiv">
              <Doughnut
                fill="#8884d8"
                data={{
                  // labels: getUniqueValues(currentMonthOrders),
                  labels: toggleChart
                    ? monthsArr
                    : getUniqueValues(currentMonthOrders),
                  datasets: [
                    {
                      label: "Monthly Sales Analytic",
                      // data: monthSaleArr,
                      data: toggleChart ? arrOfYearRevenue : monthSaleArr,
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                      ],
                      hoverOffset: 4,
                      borderColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                      ],
                    },
                  ],
                }}
                height={300}
                Width={600}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SellerDash;
