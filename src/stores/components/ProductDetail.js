import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Link, useLocation, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import { Button, FormControl, MenuItem, Select } from "@material-ui/core";
import axios from "axios";
import Cart from "./Cart";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import { addToCart, removeFromCart } from "../actions/cartAction";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { convertFromRaw, EditorState, Editor } from "draft-js";
import draftToHtml from "draftjs-to-html";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import CheckoutStep from "./shared/CheckoutStep";

const ProductDetail = ({ history, match }) => {
  const productId = match.params.number;

  const location = useLocation();
  const store = location.pathname.split("/").slice(2)[0];
  console.log(store);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  let { product, loading, error } = productDetails;
  const [productData, setproductData] = useState({});
  const [productVdoData, setproductVdoData] = useState({});
  const [desc, setDesc] = useState("");

  // const withoutJson = loading ? "wait" : Object.values(product.description).map(x => x)

  const showAndHideCart = () => {
    if (
      localStorage.getItem("isChecked") != null &&
      localStorage.getItem("isChecked") == "true"
    ) {
      localStorage.setItem("isChecked", "false");
      $(document).ready(function () {
        $(".cart__div").addClass("right-[-150%] ");
      });
    } else {
      localStorage.setItem("isChecked", "true");
      $(document).ready(function () {
        $(".cart__div").removeClass("right-[-150%]").addClass("right-0");
      });
    }
  };

  const addToBasket = () => {
    if (productId) {
      dispatch(addToCart(productId, qty));
      showAndHideCart();
    }
  };

  useEffect(() => {
    dispatch(listProductDetails(match.params.number));
    var url = "";
    url = `/api/products/${match.params.number}`;
    axios({
      method: "get",
      url: url,
    }).then(
      (response) => (
        setproductData(response.data.image),
        console.log("images ", response.data.image),
        setproductVdoData(response.data.vdo),
        console.log(response.data.vdo),
        setDesc(JSON.parse(response.data.description))
      ),
      (err) => err
    );
  }, [dispatch, match]);

  const handleClick = (index) => {
    setImgIndex(index);
  };
  console.log(productVdoData);

  const [imgIndex, setImgIndex] = useState(0);

  // add this code to app.js for reducing coding

  // const showAndHideCart = () => {
  //   if (localStorage.getItem("isChecked") == "true") {
  //     $(document).ready(function () {
  //       $(".cart__div").toggle();
  //     });
  //     localStorage.setItem("isChecked", "false");
  //   } else {
  //     $(document).ready(function () {
  //       $(".cart__div").toggle();
  //     });
  //     localStorage.setItem("isChecked", "true");
  //   }
  // };

  var index = imgIndex;

  const Images =
    productData.length > 0
      ? productData.map((item, index) => ({ url: item }))
      : null;

  return (
    <>
      <Cart />

      {loading ? (
        <div className="animate-pulse">
          <ProductDetailSkeleton />
        </div>
      ) : (
        <div className="">
          <div className="px-4 mt-3">
            <CheckoutStep
              mainCategory={
                product.mainCategory ? product.mainCategory : product.store
              }
              subCategory={
                product.subCategory ? product.subCategory : product.title
              }
            />
          </div>
          <div className=" ">
            <div className="flex flex-col ">
              <div className="py-2 px-4  order-2 grid grid-cols-4 gap-3">
                {productData.length > 0
                  ? productData.map((item, index) => (
                      <div className="p-1 border">
                        <img
                          className="object-contain  max-h-24"
                          key={index}
                          src={item}
                          onClick={() => handleClick(index)}
                          width="100%"
                          height="100%"
                          alt=""
                        />
                      </div>
                    ))
                  : null}
              </div>
              <div className="p-4  order-1">
                <div className=" p-2 border ">
                  {imgIndex !== "vdo"
                    ? productData.length > 0 && (
                        <img
                          className="object-contain max-h-80"
                          src={productData[imgIndex]}
                          alt=""
                          width="100%"
                          height="100%"
                        />
                      )
                    : productVdoData.length > 0 && (
                        <iframe
                          className=" max-h-80"
                          title="video"
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${productVdoData}`}
                        ></iframe>
                      )}
                </div>
              </div>
              <div className="p-4 order-3 ">
                <div className=" ">
                  <h2 className="text-2xl capitalize font-semibold">
                    {product.title}
                  </h2>
                  <div className="flex gap-5 items-center my-5">
                    <h3 className="text-xl font-semibold">
                      &#8377;{product.price}
                    </h3>
                    <h3 className="text-muted text-xl text-gray-500  font-semibold">
                      &#8377;{product.actualPrice}
                    </h3>
                    <h3 className="bg-green-200 text-green-600 rounded font-semibold text-md p-1 px-2">
                      {product.off}% OFF
                    </h3>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-700 border-sky-500 border-b-2 inline-block mb-5">
                    Product Details
                  </h4>
                  {
                    <div
                      dangerouslySetInnerHTML={{ __html: draftToHtml(desc) }}
                    ></div>
                  }

                  <div className="mt-5 text-center">
                    <button
                      className="btn w-75 "
                      onClick={addToBasket}
                      id="show"
                    >
                      <span className="align-center">
                        <i class="fas fa-cart-plus"></i> ADD TO CART
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="flex-order col-lg-2 col-md-2 right">
                {productVdoData[0] !== "" ? (
                  <div
                    className="vdoDiv   productInfo__small__vdo__Container"
                    onClick={() => handleClick("vdo")}
                  >
                    <PlayCircleFilledOutlinedIcon />
                    <img
                      onClick={() => handleClick("vdo")}
                      key={index}
                      src={productData[0]}
                      width="100%"
                      height="100%"
                      onClick={() => handleClick(index)}
                    />
                  </div>
                ) : null}
              </div> */}
            </div>
            {/* <div className="col-md-10 col-sm-12 ">
                <div className="productDetail__padding">
                  <h2>{product.title}</h2>
                  <h2>&#8377;{product.price}</h2>
                  <h4>Description</h4>
                  <div
                    dangerouslySetInnerHTML={{ __html: draftToHtml(desc) }}
                  ></div>

                  <div className="mt-5">
                    <button
                      className="btn w-75 "
                      onClick={addToBasket}
                      id="show"
                    >
                      <span className="align-center">
                        <i class="fas fa-cart-plus"></i> ADD TO CART
                      </span>
                    </button>
                  </div>
                </div>
              </div> 
            </div>*/}
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(ProductDetail);
