import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { ListMyOrders } from "../actions/orderAction";
import dateFormat from "dateformat";
import Alert from "@material-ui/lab/Alert";
import { TablePagination } from "@material-ui/core";

const UserOrder = () => {
  const dispatch = useDispatch();

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, orders, error: errorOrders } = orderListMy;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(ListMyOrders());
  }, [dispatch]);
  return (
    <div className="yourOrder__container">
      <h4 className="yourOrder__text">Your Orders</h4>
      <div className="userOrder ">
        {orders && orders.length == 0 ? (
          <div className="noOrder">
            <h4 align="center">
              No orders , <br /> Order Something
            </h4>{" "}
            <a align="center" href="/store">
              Go to Store
            </a>
          </div>
        ) : loadingOrders ? (
          <CircularProgress />
        ) : errorOrders ? (
          <Alert severity="danger">{errorOrders}</Alert>
        ) : (
          <div className="userOrderList ">
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order, index) => (
                <div className="boxShadow  mb-3" key={index}>
                  <div className="d-flex justify-content-between mb-2 mx-2">
                    <h6 className="nameTag  p-2 ">
                      {order.shippingAddress.fullName}
                    </h6>
                    {order.isPaid ? (
                      <h6 className=" p-2" variant="filled" severity="success">
                        {dateFormat(order.paidAt)}
                      </h6>
                    ) : (
                      <h6 className=" p-2" variant="filled" severity="info">
                        Not Paid
                      </h6>
                    )}
                  </div>
                  <div className="row col-12">
                    <div className="col-7">
                      {order.orderItems.map((item, index) => (
                        <div className="d-flex mb-3" key={index}>
                          <div className="col">
                            <img
                              src={item.image[0]}
                              width="100px"
                              height="100px"
                              alt=""
                            />
                          </div>

                          <div className="col">
                            <Link to={`/store/products/${item.product}`}>
                              <h6>{item.title}</h6>
                            </Link>
                          </div>

                          <div className="col text-center">
                            <h6>
                              {item.isDelevered ? "Delivered" : "Pending"}
                            </h6>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="col-2 ">
                      <h6 className="ps-3">&#8377;{order.totalPrice}</h6>
                    </div>
                    <div className="col-3 d-flex flex-column justify-content-between ">
                      <Link
                        className="mb-3 "
                        to={`/shipping/placeorder/order/${order._id}`}
                      >
                        <h6>View Order Details</h6>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrder;
