import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { createDeliveryOrder } from "../actions/deliveryAction";
import { deliverdOrder } from "../actions/orderAction";

import {
  listOrder,
  listShippedOrder,
  listPendingOrder,
  listSearchOrder,
} from "../actions/sellerAction";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Button, TableFooter, Typography } from "@mui/material";
import { TablePagination } from "@material-ui/core";
import { SHIPPED_ORDERS_SUCCESS } from "../../constants/sellerOrderConstant";
import { getSumOfArray } from "./logic";

const SellerOrderInfo__table = () => {
  const [showStatusChange, setShowStatusChange] = useState({});
  const [orderIdForDeliveryInfo, setOrderIdForDeliveryInfo] = useState();
  const [logic, setlogic] = useState("all");
  const [search, setSearch] = useState(" ");
  const [rows, setRows] = useState(" ");
  const [visible, setVisible] = useState(false);

  const showStatusChangeHandle = (id) => {
    setShowStatusChange((beforeHide) => ({
      ...beforeHide,
      [id]: !beforeHide[id],
    }));
  };

  const dispatch = useDispatch();
  const sellerLog = useSelector((state) => state.sellerLog);
  const { sellerInfo } = sellerLog;
  const orderList = useSelector((state) => state.orderList);
  const { loading: orderListLoading, error, orderReq } = orderList;

  const shippedOrderList = useSelector((state) => state.shippedOrderList);
  const { shippedOrders } = shippedOrderList;

  const pendingOrderList = useSelector((state) => state.pendingOrderList);
  const { pendingOrders } = pendingOrderList;

  const searchOrderList = useSelector((state) => state.searchOrderList);
  const { searchOrders } = searchOrderList;

  //   pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // pagination end

  // table styled
  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
      borderRadius: 15,
      margin: "10px 10px",
    },
    tableHeaderCell: {
      fontWeight: "bold",
    },
    typography: {
      fontSize: 14,
      fontWeight: "500",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      textAlign: "center",
    },
    orderAt: {
      fontWeight: "500",
      width: 120,
    },
    orderid: {
      maxWidth: 24,
    },
    status: {
      fontWeight: "bold",
      fontSize: "0.75rem",
      color: "white",
      borderRadius: 8,
      padding: "3px 10px",
      margin: "3px 0px",
      display: "block",
      textAlign: "center",
    },
  }));
  const classes = useStyles();

  // table styled end

  // console.log("newtry", orderReq.map(ord => ord.orderItems.map((sub, subIndex) => Object.assign({}, { "sts" : (sub.isDelevered  ? "pending" : "shipped" )}))))
  // search Input

  const requestSearch = (searchVal) => {
    const filteredData = orderReq?.filter((row) => {
      return moment(row.createdAt)
        .format("DD-MM-YYYY")
        ?.toLowerCase()
        .includes(searchVal.toLowerCase());
    });
    setRows(filteredData);
  };
  const cancelSearch = () => {
    setSearch(" ");
    requestSearch(search);
  };

  console.log("search", searchOrders);
  // search Input End

  // DELIVERY API INTEGRATE
  const deliveryOrderCreate = useSelector((state) => state.orderCreate);
  const {
    deliveryOrdCreate,
    success,
    loading: deliveryLoading,
  } = deliveryOrderCreate;

  const orderDeliverd = useSelector((state) => state.orderDeliverd);
  const { loading: loadingDelivered } = orderDeliverd;

  const productTitle = orderReq.map((ord) =>
    ord.orderItems
      .filter((sub) => sub.store === sellerInfo.store)
      .map((sub) => sub.title)
  );
  const proTitle = productTitle.map((i) => i.length);

  const addDeliveryStatus = (number, productNumber) => {
    try {
      const name = orderReq.filter((i) => i._id == number).map((i) => i);
      console.log(name);

      alert("Order status successfully change to deliverd");

      const fullName = orderReq
        .filter((i) => i._id == number)
        .map((i) => i.shippingAddress.fullName);
      const address = orderReq
        .filter((i) => i._id == number)
        .map((i) => i.shippingAddress.address);
      const city = orderReq
        .filter((i) => i._id == number)
        .map((i) => i.shippingAddress.city);
      const postalcode = orderReq
        .filter((i) => i._id == number)
        .map((i) => i.shippingAddress.postalcode);
      const shippingMobile = orderReq
        .filter((i) => i._id == number)
        .map((i) => i.shippingAddress.shippingMobile);
      const productNameObj = orderReq
        .filter((i) => i._id == number)
        .map((i) =>
          i.orderItems.filter((x) => x._id == productNumber).map((x) => x.title)
        );
      const productName = productNameObj[0];
      const qtyObj = orderReq
        .filter((i) => i._id == number)
        .map((i) =>
          i.orderItems.filter((x) => x._id == productNumber).map((x) => x.qty)
        );
      const qty = qtyObj[0];
      const productidObj = orderReq
        .filter((i) => i._id == number)
        .map((i) =>
          i.orderItems.filter((x) => x._id == productNumber).map((x) => x._id)
        );
      const productid = productidObj[0];
      const priceObj = orderReq
        .filter((i) => i._id == number)
        .map((i) =>
          i.orderItems.filter((x) => x._id == productNumber).map((x) => x.price)
        );
      const price = priceObj[0];
      const paymentMethod = orderReq
        .filter((i) => i._id == number)
        .map((i) =>
          i.paymentMethod == "Cash On Delivery" ? "COD" : "Prepaid"
        );

      dispatch(
        createDeliveryOrder({
          order_id: productNumber,
          order_date: "2021-10-28T08:54:02.779Z",
          pickup_location: "kannad",
          billing_customer_name: fullName[0],
          billing_last_name: " ",
          billing_address: address[0],
          billing_address_2: " ",
          billing_city: city[0],
          billing_pincode: postalcode[0],
          billing_state: "Maharashtra",
          billing_country: "india",
          billing_email: "",
          billing_phone: shippingMobile[0],
          shipping_is_billing: 1,
          shipping_customer_name: " ",
          shipping_last_name: " ",
          shipping_address: " ",
          shipping_address_2: " ",
          shipping_city: " ",
          shipping_pincode: " ",
          shipping_country: " ",
          shipping_state: " ",
          shipping_email: " ",
          shipping_phone: " ",
          order_items: [
            {
              name: productName[0],
              sku: productid[0],
              units: qty[0],
              selling_price: price[0],
            },
          ],
          payment_method: paymentMethod[0],
          sub_total: price[0],
          length: "10",
          breadth: "10",
          height: "10",
          weight: "1.5",
        })
      );
      dispatch(deliverdOrder(number, productNumber));
    } catch (error) {
      console.log("shiprocket", error);
    }

    if (!deliveryLoading) {
      window.location.href = "/sellerdashboard";
    }
  };

  // DELIVERY API INTEGRATION END //

  useEffect(() => {
    // if (error) {
    //   history.push("/sellerdashboard");
    // } else {
    dispatch(listOrder());
    dispatch(listShippedOrder());
    dispatch(listPendingOrder());
    // }
  }, [listOrder, dispatch]);

  return (
    <>
      <h4 className="routeTitle">#Orders</h4>

      {!visible ? (
        <div className="Seller__order__datatable">
          <Paper className={classes.tableContainer}>
            <div className="seller__table__header">
              <div className="seller__table__filter__options">
                <Button
                  className="sellerPanelBtn"
                  onClick={(e) => setlogic(e.target.value)}
                  value="all"
                >
                  All Orders{" "}
                  {getSumOfArray(orderReq, "all", "none", sellerInfo.store)}
                </Button>
                <Button
                  className="sellerPanelBtn"
                  onClick={(e) => setlogic(e.target.value)}
                  value="shipped"
                >
                  Shipped Orders{" "}
                  {getSumOfArray(
                    shippedOrders,
                    "shipped",
                    "none",
                    sellerInfo.store
                  )}
                </Button>
                <Button
                  className="sellerPanelBtn"
                  onClick={(e) => setlogic(e.target.value)}
                  value="pending"
                >
                  Pending Orders{" "}
                  {getSumOfArray(
                    pendingOrders,
                    "pending",
                    "none",
                    sellerInfo.store
                  )}
                </Button>
              </div>
              <div className="seller__main__nav__search">
                <input
                  type="text"
                  placeholder="Search by name and id  "
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <i
                  class="fas fa-search"
                  onClick={() => {
                    setlogic("search");
                    dispatch(listSearchOrder(search));
                  }}
                ></i>
              </div>
            </div>

            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHeaderCell}>
                      <i class="fas fa-stream"></i> Order ID
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      <i class="fas fa-store"></i>Product Name
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      <i class="far fa-calendar-alt"></i> Order Date
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      <i class="fas fa-credit-card"></i> Payment Method
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      <i class="fas fa-cash-register"></i> Payment Status
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      <i class="fas fa-signal"></i> Delivery Status
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      {" "}
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(logic == "all"
                    ? orderReq
                    : logic == "shipped"
                    ? shippedOrders
                    : logic == "search"
                    ? searchOrders
                    : pendingOrders
                  )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row._id} cotainer>
                        <TableCell
                          style={{ width: "20%" }}
                          className={classes.typography}
                        >
                          {row._id}
                        </TableCell>
                        <TableCell>
                          {row.orderItems.map((x) => (
                            <Typography
                              style={{ width: 125 }}
                              className={classes.typography}
                            >
                              {x.title}
                            </Typography>
                          ))}
                        </TableCell>
                        <TableCell className={classes.orderAt}>
                          {moment(row.createdAt).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell className={classes.typography}>
                          {row.paymentMethod}
                        </TableCell>
                        <TableCell>
                          {row.isPaid ? (
                            <Typography
                              className={classes.typography}
                              style={{
                                color: "green",
                              }}
                            >
                              Paid
                            </Typography>
                          ) : (
                            <Typography
                              className={classes.typography}
                              style={{
                                color: "orange",
                              }}
                            >
                              Unpaid
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          {row.orderItems.map((s) =>
                            s.isDelevered ? (
                              <Typography
                                className={classes.status}
                                style={{
                                  backgroundColor: "green",
                                }}
                              >
                                Shipped
                              </Typography>
                            ) : (
                              <Typography
                                className={classes.status}
                                style={{
                                  backgroundColor: "orange",
                                }}
                              >
                                Pending
                              </Typography>
                            )
                          )}
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            setOrderIdForDeliveryInfo(row._id);
                            setVisible(true);
                          }}
                        >
                          <Typography className={classes.typography}>
                            {" "}
                            <i class="fas fa-edit" />
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                  <TablePagination
                    style={{ width: "220%" }}
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={
                      logic == "all"
                        ? orderReq.length
                        : logic == "shipped"
                        ? shippedOrders.length
                        : logic == "search"
                        ? searchOrders.length
                        : pendingOrders.length
                    }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      ) : (
        <section className="seller__order__info__tab myCart">
          {orderReq
            .filter((ord) => ord._id == orderIdForDeliveryInfo)
            .map((ordInfo) => (
              <div className="">
                <div className="seller__order__info__tab__header">
                  <Button
                    className="sellerPanelBtn"
                    onClick={() => setVisible(false)}
                  >
                    {" "}
                    back
                  </Button>
                  <h3>Order #{ordInfo._id}</h3>
                  <div className="seller__order__info__header__flex">
                    <h5>Product</h5>
                    <h5>Delivered</h5>
                  </div>

                  <div className="seller__order__info__flex">
                    <section className="customer__informarion__main">
                      <section className="customer__information">
                        <div className="cust__personal__info__header">
                          <h4>Customer Information</h4>
                          <div className="cust__personal__info__body">
                            <h5>{ordInfo.shippingAddress.fullName}</h5>
                            <h5>+91{ordInfo.shippingAddress.shippingMobile}</h5>
                          </div>
                        </div>

                        <div className="order__created">
                          <h4>Order Created At</h4>
                          <h5>
                            {moment(ordInfo.createdAt).format("DD-MM-YYYY")}
                          </h5>
                        </div>

                        <div className="payment__menthod">
                          <h4>Payment method</h4>
                          <h5>{ordInfo.paymentMethod}</h5>
                        </div>

                        <div className="total__purchasing">
                          <h4>Total purchasing</h4>
                          <h5>${ordInfo.totalPrice}</h5>
                        </div>

                        <div className="shipping__address">
                          <h4>Shipping Address</h4>
                          <h5>
                            {ordInfo.shippingAddress.address},
                            {ordInfo.shippingAddress.city},{" "}
                            {ordInfo.shippingAddress.postalcode}
                          </h5>
                        </div>

                        <div className="billing__address">
                          <h4>billing Address</h4>
                          <h5>
                            {ordInfo.shippingAddress.address},
                            {ordInfo.shippingAddress.city},{" "}
                            {ordInfo.shippingAddress.postalcode}
                          </h5>
                        </div>
                      </section>
                    </section>
                    <section className="seller__order__info__product__list">
                      {orderReq
                        .filter((ord) => ord._id == orderIdForDeliveryInfo)
                        .map((i, index) =>
                          i.orderItems
                            .filter((i) => i.store === sellerInfo.store)
                            .map((item) => (
                              <div className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex flex-wrap align-items-center seller__order__list__product__div relative">
                                <div className="col-lg-12 seller__order__list__flex__status ">
                                  {item.isDelevered ? (
                                    <h4 className="order__status  shipped">
                                      {" "}
                                      <i class="fas fa-shipping-fast"></i>{" "}
                                      Shipped{" "}
                                    </h4>
                                  ) : (
                                    <h4 className="order__status pending">
                                      <i class="far fa-pause-circle"></i>{" "}
                                      Pending
                                    </h4>
                                  )}
                                  <h6>
                                    <i
                                      class="fas fa-pen-square"
                                      onClick={() =>
                                        showStatusChangeHandle(item._id)
                                      }
                                    ></i>
                                  </h6>

                                  {showStatusChange[item._id] && (
                                    <div className="absolute">
                                      <div className="table__delivery__status__manage">
                                        <i
                                          class="fas fa-times"
                                          onClick={() =>
                                            showStatusChangeHandle(item._id)
                                          }
                                        ></i>
                                        <ul>
                                          <li className="complete">
                                            <i class="far fa-check-circle "></i>{" "}
                                            Complete
                                          </li>
                                          <li
                                            className="shipped"
                                            onClick={() =>
                                              addDeliveryStatus(
                                                ordInfo._id,
                                                item._id
                                              )
                                            }
                                          >
                                            <i class="fas fa-shipping-fast "></i>{" "}
                                            Shipped
                                          </li>
                                          <li className="cancelled">
                                            <i class="fas fa-ban cancelled"></i>{" "}
                                            Cancelled
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3 col-3 cart__img__thumbnail">
                                  <img
                                    src={item.image[0]}
                                    width="100%"
                                    height="100%"
                                  />
                                  {console.log("item", item)}
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-6 myCart__product__div__title">
                                  <h6>{item.title}</h6>
                                  <h6>&#8377;{item.qty * item.price}</h6>
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-2 seller__formSelect">
                                  <h5> Qty {item.qty}</h5>
                                </div>
                              </div>
                            ))
                        )}
                    </section>
                  </div>
                </div>
              </div>
            ))}
        </section>
      )}
    </>
  );
};

export default SellerOrderInfo__table;
