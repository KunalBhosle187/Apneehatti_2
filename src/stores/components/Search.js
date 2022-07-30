import React, { useEffect, useState } from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { useLocation, useParams } from "react-router";
import { listProducts } from "../actions/productActions";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const Search = () => {
  const params = useParams();
  const categoryFromUrl = params.category;
  const dispatch = useDispatch();
  const search = useLocation().search;
  const searchQuery = new URLSearchParams(search).get("q").toLowerCase();
  // const store = location.pathname.split("/").slice(1)[0];
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const [searchData, setSearchData] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortProduct, setSortProduct] = useState([]);

  const categoryFound =
    products &&
    products.filter((proinfo) => proinfo.category == categoryFromUrl);

  const category = products.map((item) => item.category);

  /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
  function myFunction(id) {
    document.getElementById(id).classList.toggle("show");
  }

  const catFilter = (q) => {
    setCategoryFilter(q);
    console.log("catFilterr", q);
  };

  useEffect(() => {
    dispatch(listProducts());
    const searchResult = products.filter((each) => {
      return each.title.toLowerCase().includes(searchQuery);
    });
    setSearchData(searchResult);
    setSortProduct(searchResult);
  }, [searchQuery]);

  const sorting = (strRange, endRange) => {
    const priceSort = searchData.map((x) => x);
    setSortProduct(
      priceSort
        .filter((a) => a.price > strRange && a.price < endRange)
        .sort((a, b) => a.price - b.price)
    );
  };

  const highToLowSort = () => {
    const priceSort = searchData.map((x) => x);
    setSortProduct(priceSort.sort((a, b) => b.price - a.price));
  };

  const lowToHighSort = () => {
    const priceSort = searchData.map((x) => x);
    setSortProduct(priceSort.sort((a, b) => a.price - b.price));
  };

  return (
    <div className="storepage">
      <div>
        <img
          src="/pictures/apneehattiBanner.jpg"
          className="d-block w-100"
          alt="banner image"
          width="100%"
          height="100%"
        />
      </div>
      <h4 align="center">Search Result</h4>
      <div className="storepage__grid">
        <div className="storepage__sidebar">
          <div className="storepage__sidebar__dropdown__container">
            <div className="storepage__sidebar__dropdown">
              <div
                onClick={() => myFunction("myDropdown_1")}
                className="storepage__sidebar__dropdown__header"
              >
                <button className="dropbtn">category</button>
                <ArrowDropDownIcon />
              </div>
              <div id="myDropdown_1" className="dropdown-content">
                <li>All</li>
                <li>Men</li>
                <li>Women</li>
                <li>Bag & Footwear</li>
                <li>Home & kitchen</li>
                <li>Kids</li>
                <li>Electronics</li>
                <li>Beauty</li>
              </div>
            </div>
            <div className="dropdown">
              <div
                onClick={() => myFunction("myDropdown_2")}
                className="storepage__sidebar__dropdown__header"
              >
                <button className="dropbtn">color</button>
                <ArrowDropDownIcon />
              </div>
              <div id="myDropdown_2" className="dropdown-content">
                <li>Black</li>
                <li>Blue</li>
                <li>White</li>
                <li>Orange</li>
              </div>
            </div>
            <div className="dropdown">
              <div
                onClick={() => myFunction("myDropdown_3")}
                className="storepage__sidebar__dropdown__header"
              >
                <button className="dropbtn">price</button>
                <ArrowDropDownIcon />
              </div>
              <div id="myDropdown_3" className="dropdown-content">
                <li onClick={lowToHighSort}>Low to High</li>
                <li onClick={highToLowSort}>High to Low</li>
                <li onClick={() => sorting(0, 300)}>Less than 300</li>
                <li onClick={() => sorting(300, 600)}>300 - 600</li>
                <li onClick={() => sorting(600, 900)}>600 - 900</li>
              </div>
            </div>
          </div>
        </div>

        <div>
          {loading ? (
            <h2>
              {" "}
              <CircularProgress />
            </h2>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : categoryFilter.length == 0 ? (
            <div className="notInStore">
              <div className="notInStore__container">
                <RemoveShoppingCartIcon />
                <h3>Products are not available right now .</h3>
              </div>
            </div>
          ) : categoryFilter.length == 0 ? (
            <div className="storepage__products">
              {searchData
                // .filter((proinfo) => proinfo.title == categoryFilter)
                .map((proinfo) => (
                  <Product key={proinfo._id} proinfo={proinfo} />
                ))}
            </div>
          ) : (
            <div className="storepage__products">
              {sortProduct.map((proinfo) => (
                <Product key={proinfo._id} proinfo={proinfo} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* <div className="container-fluid ">
          <div className=" py-4">
          <div className=" col-lg-12 row ">
          
          <div className="col-12 gridContainer px-1">
    {loading ? (
      <h2>
        <CircularProgress />
      </h2>
    ) : error ? (
      <Alert severity="error">{error}</Alert>
      ) : categoryFilter != "all" || categoryFilter.length == 0 ? (
        searchData
          .filter((proinfo) => proinfo.category == categoryFilter)
          .map((proinfo) => (
            <Product key={proinfo._id} proinfo={proinfo} />
          ))
      ) : (
        searchData.map((proinfo) => (
          <Product key={proinfo._id} proinfo={proinfo} />
        ))
    )}
  </div>
            </div>
          </div>
        </div> */}
    </div>
  );
};

export default Search;
