import React, { useEffect, useState } from "react";
import Product from "./Product";
import { useDispatch, useSelector, useStore } from "react-redux";
import { listProducts, listSearchProducts } from "../actions/productActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { useParams } from "react-router";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Button } from "@mui/material";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import LayersIcon from "@mui/icons-material/Layers";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import CheckoutStep from "./shared/CheckoutStep";
import ProductSkeleton from "./ProductSkeleton";
import { AdjustmentsIcon } from "@heroicons/react/solid";
function Homescreen(props) {
  const dispatch = useDispatch();
  const params = useParams();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productSearchList = useSelector((state) => state.productSearchList);
  const { searchProducts } = productSearchList;
  const [sorted, setSorted] = useState(false);
  const [filterVisible, setFilterVisible] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortingOption, setSortingOption] = useState();
  var mainCategoryFromUrl = "";
  var subCategoryFromUrl = "";
  mainCategoryFromUrl = params.main_category;
  subCategoryFromUrl = params.sub_category;
  const categoryFound = products.filter(
    (proinfo) => proinfo.mainCategory == mainCategoryFromUrl
  );
  const [sortProduct, setSortProduct] = useState(categoryFound);

  useEffect(() => {
    dispatch(listProducts());
  }, [mainCategoryFromUrl]);

  const sortingProduct = (a, sortOption) => {
    setSortingOption(sortOption);
    setSorted(true);
    setSortOpen(!sortOpen);

    if (a == 1) {
      const sortItem1 = categoryFound.sort((a, b) => a.price - b.price);
      setSortProduct(sortItem1);
    } else if (a == 2) {
      const sortItem2 = categoryFound.sort((a, b) => b.price - a.price);
      setSortProduct(sortItem2);
    } else if (a == 3) {
      const sortItem3 = categoryFound
        .filter((a) => a.price > 0 && a.price < 300)
        .sort((a, b) => a.price - b.price);
      setSortProduct(sortItem3);
    } else if (a == 4) {
      const sortItem4 = categoryFound
        .filter((a) => a.price > 300 && a.price < 600)
        .sort((a, b) => a.price - b.price);
      setSortProduct(sortItem4);
    } else if (a == 5) {
      const sortItem5 = categoryFound
        .filter((a) => a.price > 600 && a.price < 900)
        .sort((a, b) => a.price - b.price);
      setSortProduct(sortItem5);
    } else if (a == 0) {
      setSorted(false);
    }
  };

  return (
    <>
      <div className="w-full p-2 py-3">
        {loading ? (
          <div className="grid grid-cols-2 gap-2 h-100 animate-pulse">
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </div>
        ) : (
          <div>
            <div className="px-4 mb-3">
              <CheckoutStep
                mainCategory={mainCategoryFromUrl ? mainCategoryFromUrl : "All"}
                subCategory={subCategoryFromUrl ? subCategoryFromUrl : null}
              />
            </div>
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                class=" bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 border font-medium rounded text-sm px-4 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <AdjustmentsIcon className="h-5 rotate-90 mr-3" />
                Filters
              </button>

              <div className="flex  items-baseline">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  id="dropdownDefault"
                  data-dropdown-toggle="dropdown"
                  class=" text-sm capitalize flex items-center justify-between font-semibold text-gray-500"
                  type="button"
                >
                  Sort by
                  <span className="text-black">
                    &nbsp;{sortingOption && ": " + sortingOption}
                  </span>
                  <svg
                    class="ml-2 w-4 h-4"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {sortOpen ? (
                  <div
                    id="dropdown"
                    class="absolute border mt-10 right-2 z-20 w-44  bg-white shadow-xl rounded divide-y divide-gray-100  dark:bg-gray-700 block"
                    data-popper-reference-hidden=""
                    data-popper-escaped=""
                    data-popper-placement="bottom"
                    // style={{
                    //   position: "absolute",
                    //   inset: "0px auto auto 0px",
                    //   margin: "0px",
                    //   transform: "translate(128px, 70px)",
                    // }}
                  >
                    <ul
                      class="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDefault"
                    >
                      <li>
                        <a
                          href="#"
                          class=" capitalize border-b-2 block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          id={1}
                          onClick={(e) => {
                            sortingProduct(e.target.id, e.target.innerText);
                          }}
                        >
                          low to high
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class=" capitalize border-b-2  block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          id={2}
                          onClick={(e) => {
                            sortingProduct(e.target.id, e.target.innerText);
                          }}
                        >
                          high to low
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class=" capitalize border-b-2  block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          id={3}
                          onClick={(e) => {
                            sortingProduct(e.target.id, e.target.innerText);
                          }}
                        >
                          less than 300
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class=" capitalize border-b-2  block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          id={4}
                          onClick={(e) => {
                            sortingProduct(e.target.id, e.target.innerText);
                          }}
                        >
                          between 300 - 600
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class=" capitalize  block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          id={5}
                          onClick={(e) => {
                            sortingProduct(e.target.id, e.target.innerText);
                          }}
                        >
                          between 600 - 900
                        </a>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="hidden">
              <h2>Beauty</h2>

              <div>
                <h3>Filters</h3>
                <div className="sidebar__filter">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4>category</h4>
                    <i class="fas fa-plus"></i>
                  </div>
                  <div className="">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4>Price</h4>
                      <i class="fas fa-minus"></i>
                    </div>
                    <ul className="d-flex flex-column justify-content-center align-items-center">
                      <li>$100 --- $300</li>
                      <li>$300 --- $600</li>
                      <li>$600 --- $1000</li>
                    </ul>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h4>Discount</h4>
                    <i class="fas fa-plus"></i>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <h4>Color</h4>
                    <i class="fas fa-plus"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="hidden">
                {/* <div className="easy__filter">
                    <h5>Bestsellers</h5>
                    <img
                      src="/pictures/icons/fire.png"
                      width="100%"
                      height="100%"
                    />
                  </div>

                  <div className="easy__filter">
                    <h5>New Arrival</h5>
                    <img
                      src="/pictures/icons/star.png"
                      width="100%"
                      height="100%"
                    />
                  </div>

                  <div className="easy__filter">
                    <h5>Top Deals</h5>
                    <img
                      src="/pictures/icons/discount.png"
                      width="100%"
                      height="100%"
                    />
                  </div>

                  <div className="easy__filter">
                    <h5>Limited Period Offer</h5>
                    <img
                      src="/pictures/icons/package.png"
                      width="100%"
                      height="100%"
                    />
                  </div> */}
                <div className="">
                  <h5 className="font-weight-bold mt-2 px-2">Filter</h5>
                </div>
                <ul>
                  <li className="mt-2">
                    <Button className="col-lg-12">
                      <select
                        className="col-4 product__sorting__selector py-2"
                        onChange={(e) => sortingProduct(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option selected value="0">
                          Price
                        </option>
                        <option value="1">low to high</option>
                        <option value="2">high to low</option>
                        <option value="3">less than 300</option>
                        <option value="4">between 300 - 600</option>
                        <option value="5">between 600 - 900</option>
                      </select>
                    </Button>
                  </li>
                  <li className="mt-2">
                    <Button className="col-lg-12">
                      {" "}
                      <select
                        className="col-4 product__sorting__selector py-2"
                        onChange={(e) => sortingProduct(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option selected value="0">
                          Price
                        </option>
                        <option value="1">low to high</option>
                        <option value="2">high to low</option>
                        <option value="3">less than 300</option>
                        <option value="4">between 300 - 600</option>
                        <option value="5">between 600 - 900</option>
                      </select>
                    </Button>
                  </li>
                  <li className="mt-2">
                    <Button className="col-lg-12">
                      {" "}
                      <select
                        className="col-4 product__sorting__selector py-2"
                        onChange={(e) => sortingProduct(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option selected value="0">
                          Price
                        </option>
                        <option value="1">low to high</option>
                        <option value="2">high to low</option>
                        <option value="3">less than 300</option>
                        <option value="4">between 300 - 600</option>
                        <option value="5">between 600 - 900</option>
                      </select>
                    </Button>
                  </li>
                  <li className="mt-2">
                    <Button className="col-lg-12">
                      {" "}
                      <select
                        className="col-4 product__sorting__selector py-2"
                        onChange={(e) => sortingProduct(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option selected value="0">
                          Price
                        </option>
                        <option value="1">low to high</option>
                        <option value="2">high to low</option>
                        <option value="3">less than 300</option>
                        <option value="4">between 300 - 600</option>
                        <option value="5">between 600 - 900</option>
                      </select>
                    </Button>
                  </li>
                </ul>

                {products.filter(
                  (item, idx) => item.mainCategory == mainCategoryFromUrl
                ).length > 0 ? (
                  <article>
                    <div className="d-block bg-light ">
                      <h5 className="font-weight-bold mt-2 p-2">Category</h5>
                    </div>
                    <ul>
                      {products
                        .filter(
                          (item, idx) =>
                            item.mainCategory == mainCategoryFromUrl
                        )
                        .map((subItem, subItemIndex) => (
                          <li className=" mt-2 py-2">
                            <a
                              href={`/${mainCategoryFromUrl}/${subItem.subCategory}`}
                              key={subItemIndex}
                            >
                              {subItem.subCategory}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </article>
                ) : null}
              </div>
              <div className="">
                <div className="hidden">
                  <ul className="product__sorting">
                    <li style={{ fontSize: "var(--productTitleSize)" }}>
                      <CheckoutStep
                        fullWidth
                        Home={"Home"}
                        mainCategory={
                          mainCategoryFromUrl ? mainCategoryFromUrl : "all"
                        }
                        subCategory={
                          subCategoryFromUrl ? subCategoryFromUrl : null
                        }
                      />
                      Item Found
                      {
                        products.filter(
                          (a) =>
                            a.mainCategory === mainCategoryFromUrl ||
                            a.subCategory === subCategoryFromUrl
                        ).length
                      }
                    </li>
                    <li>
                      <Button>
                        <span>Sort</span>{" "}
                        <img
                          src="/pictures/icons/sort.png"
                          width="100%"
                          height="100%"
                        />
                      </Button>
                    </li>
                  </ul>
                </div>

                {error ? (
                  <Alert severity="error">{error}</Alert>
                ) : mainCategoryFromUrl !== "all" &&
                  categoryFound.length == 0 ? (
                  <div className="notInStore">
                    <div className="notInStore__container">
                      <RemoveShoppingCartIcon />
                      <h3>Products are not available right now .</h3>
                    </div>
                  </div>
                ) : categoryFound.length > 0 ? (
                  <div className="">
                    <div className="grid grid-cols-2 gap-2 h-100">
                      {sorted
                        ? sortProduct.map((proinfo) => (
                            <div className="h-full">
                              <Product key={proinfo._id} proinfo={proinfo} />
                            </div>
                          ))
                        : searchProducts && searchProducts.length > 0
                        ? searchProducts.map((proinfo) => (
                            <div className="h-full">
                              <Product key={proinfo._id} proinfo={proinfo} />
                            </div>
                          ))
                        : products
                            .filter(
                              (a) =>
                                a.mainCategory == mainCategoryFromUrl ||
                                a.subCategory == subCategoryFromUrl
                            )
                            .map((proinfo) => (
                              <div className="h-full">
                                <Product key={proinfo._id} proinfo={proinfo} />
                              </div>
                            ))}
                    </div>
                  </div>
                ) : mainCategoryFromUrl == "all" ? (
                  <div className="">
                    <div className="grid grid-cols-2 gap-2 h-100">
                      {sorted
                        ? sortProduct.map((proinfo) => (
                            <div className="h-full">
                              <Product key={proinfo._id} proinfo={proinfo} />
                            </div>
                          ))
                        : searchProducts && searchProducts.length > 0
                        ? searchProducts.map((proinfo) => (
                            <div className="h-full">
                              <Product key={proinfo._id} proinfo={proinfo} />
                            </div>
                          ))
                        : products.map((proinfo) => (
                            <div className="h-full">
                              <Product key={proinfo._id} proinfo={proinfo} />
                            </div>
                          ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Homescreen;
