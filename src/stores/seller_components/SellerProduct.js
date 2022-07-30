import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Select, TableFooter, Typography } from "@mui/material";
import { TablePagination } from "@material-ui/core";
import { listProducts, listSearchProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import SellerAddProduct from "./SellerAddProduct";
import {
  updateManyProduct,
  deleteManyProduct,
} from "../actions/productActions";
import Checkbox from "@mui/material/Checkbox";
import { socketContext } from "../../context/socket";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const SellerProduct = () => {
  const socket = useContext(socketContext);
  const [search, setSearch] = useState("");
  const [logic, setLogic] = useState(true);
  const [select, setSelect] = useState({ id: [], updaterFields: [] });
  const [selectedInputData, setSelectedInputData] = useState({});

  const [updateManyInput, setUpdateManyInput] = useState(false);
  const [updatedProducts, setUpdatedProducts] = useState();
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const sellerLog = useSelector((state) => state.sellerLog);
  const { sellerInfo } = sellerLog;

  const productList = useSelector((state) => state.productList);
  const { products, loading } = productList;

  const productSearchList = useSelector((state) => state.productSearchList);
  const { searchProducts } = productSearchList;

  const sellerProducts = products.filter((x) => x.store == sellerInfo.store);

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
    root: {
      width: 10,
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
      margin: "3px 3px",
      display: "block",
      textAlign: "center",
    },
    checkbox: {
      Width: 1000,
      backgroundColor: "green",
    },
  }));
  const classes = useStyles();

  //selected checkbox
  const { id, updaterFields } = select;

  const selected = (event) => {
    id.length > 0 ? setUpdateManyInput(true) : setUpdateManyInput(false);
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelect({
        id: [...id, event.target.value],
      });
    } else {
      setSelect({ id: id.filter((x) => x !== event.target.value) });
    }
  };

  //Update Many Field On Single Click

  const updateMany = (e) => {
    const { name, value } = e.target;
    // setSelectedInputData({ ...selectedInputData, [name]: value });
    setSelect({
      ...select,
      updaterFields: { ...updaterFields, [name]: value },
    });
  };

  useEffect(() => {
    console.log("select", select);
  }, [select]);

  const updateManyHandler = () => {
    dispatch(updateManyProduct(select));
  };

  const deleteManyHandler = () => {
    dispatch(deleteManyProduct(select));
  };

  // table styled end

  useEffect(() => {
    socket.on("connnection", () => {
      console.log("connected to server");
    });

    socket.on("get-updatedProducts", (newOrders) => {
      setUpdatedProducts(newOrders);
    });

    socket.on("message", (message) => {
      console.log(message);
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnecting");
    });
    dispatch(listProducts());
  }, [listProducts]);

  return (
    <>
      <div>
        <h4 className="routeTitle">#Products</h4>

        <TableContainer component={Paper} className={classes.tableContainer}>
          <div className="seller__table__header">
            <div className="seller__table__filter__options">
              {visible ? (
                <Button
                  className="sellerPanelBtn"
                  onClick={() => setVisible(false)}
                >
                  SHOW PRODUCTS
                </Button>
              ) : (
                <Button
                  className="sellerPanelBtn"
                  onClick={() => setVisible(true)}
                >
                  ADD PRODUCT
                </Button>
              )}
              {updateManyInput && (
                <div>
                  <Button
                    className="sellerPanelBtn"
                    onClick={updateManyHandler}
                  >
                    Update Product
                  </Button>
                  <Button
                    className="sellerPanelBtn"
                    onClick={deleteManyHandler}
                  >
                    Delete Product
                  </Button>
                </div>
              )}
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
                  setLogic(false);
                  dispatch(listSearchProducts(search));
                }}
              ></i>
            </div>
          </div>
          {visible ? (
            <div>
              <SellerAddProduct />
            </div>
          ) : loading ? (
            <div className="loader">
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </div>
          ) : (
            <div>
              <Table
                fixedHeader={false}
                style={{ width: "100%", tableLayout: "auto" }}
              >
                {" "}
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.typography} size="small">
                      #
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      Product Id
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      Product Name
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      Product Price
                      <br />
                      {updateManyInput && (
                        <input
                          name="price"
                          placeholder="Price"
                          className="updateManyInputFields"
                          onChange={updateMany}
                        />
                      )}
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      Product off
                      <br />
                      {updateManyInput && (
                        <input
                          name="off"
                          placeholder="Off"
                          className="updateManyInputFields"
                          onChange={updateMany}
                        />
                      )}
                    </TableCell>

                    <TableCell className={classes.tableHeaderCell}>
                      Product Quantity
                      <br />
                      {updateManyInput && (
                        <input
                          name="countInStock"
                          placeholder="Qty"
                          className="updateManyInputFields"
                          onChange={updateMany}
                        />
                      )}
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      Product Status
                      <br />
                      {updateManyInput && (
                        <input
                          name="status"
                          placeholder="Status"
                          className="updateManyInputFields"
                          onChange={updateMany}
                        />
                      )}
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      Edit
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(logic == true
                    ? updatedProducts || sellerProducts
                    : searchProducts
                  )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row._id}>
                        <TableCell>
                          <Checkbox
                            onChange={selected}
                            name="id"
                            value={row._id}
                          />
                        </TableCell>

                        <TableCell
                          className={classes.typography}
                          component="th"
                          scope="row"
                        >
                          {row._id}
                        </TableCell>
                        <TableCell className={classes.typography}>
                          {row.title}
                        </TableCell>
                        <TableCell className={classes.typography}>
                          &#8377;{row.price}
                        </TableCell>
                        <TableCell className={classes.typography}>
                          {row.off || 0}%
                        </TableCell>

                        <TableCell className={classes.typography}>
                          {row.countInStock}
                        </TableCell>
                        <TableCell className={classes.typography}>
                          <Typography
                            className={classes.status}
                            style={{ backgroundColor: "green" }}
                          >
                            {" "}
                            IN STOCK{" "}
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.typography}>
                          <Link to={`products/edit/${row._id}`}>Edit</Link>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TableFooter className="table_footer_pagination">
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={
                    sellerProducts.length ||
                    (searchProducts && searchProducts.length)
                  }
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableFooter>
            </div>
          )}
        </TableContainer>
      </div>
    </>
  );
};

export default SellerProduct;
