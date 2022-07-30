import { StarIcon } from "@heroicons/react/solid";
import { IconButton } from "@material-ui/core";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, withRouter } from "react-router-dom";
import { addToCart } from "../actions/cartAction";

function Product({ proinfo, match }) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  // const addToBasket = (productId) => {
  //   if (productId) {
  //     dispatch(addToCart(productId, qty));
  //   }
  // };
  return (
    <>
      <Link
        className=""
        to={`/${proinfo.mainCategory}/${proinfo.subCategory}/products/${proinfo._id}`}
      >
        <div className="border rounded-md p-4 h-full bg-white">
          <div className="relative h-40  flex items-center justify-center ">
            <img
              className="z-0 object-contain  h-full"
              src={proinfo.image[0]}
              layout="responsive"
              alt=""
              width="100%"
              height="100%"
            />
            <span className="text-green-700 bg-green-300 rounded-lg text-sm px-2 capitalize z-10 absolute top-0 right-1">
              sale
            </span>
          </div>
          <div className="mt-3 ">
            <h1 className="capitalize text-sm font-semibold  ">
              {proinfo.title}
            </h1>

            <div class="flex items-center mt-1">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>First star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Second star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Third star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Fourth star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-300 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Fifth star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>

            <div className="flex items-center mt-2">
              <h1 className="font-bold text-md">${proinfo.price}</h1>
              <h2 className="text-gray-600 ml-3 text-sm">
                ${proinfo.actualPrice}
              </h2>
            </div>
          </div>
        </div>
      </Link>
      {/* <div className=" p-1 h-100">
        <div className="productContainer h-100">
          <div className="product h-100">
            <Link
              className="product__img__container__cover"
              to={`/${proinfo.mainCategory}/${proinfo.subCategory}/products/${proinfo._id}`}
            >
              <IconButton className="discount__tag">
                <h4>{proinfo.off || 10}%</h4>
              </IconButton>
              <div className="product__img__container col-lg-11 col-md-11 col-sm-11">
                <img src={proinfo.image[0]} width="100%" height="100%" />
                <i
                  // onClick={addToBasket(proinfo._id)}
                  className="fas fa-cart-plus "
                  style={{
                    background: "aliceblue",
                    padding: "0.5em",
                    borderRadius: "50%",
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                  }}
                ></i>
              </div>
            </Link>

            <div className="product_footer ">
              <h6 className="title ">{proinfo.title}</h6>
              {/* <div>
                <div className="rating">
                  <h6>
                    <i class="fas fa-star"></i> 4.5
                  </h6>
                </div>
              </div>
              <div className="product__flexContainer">
                <div className="product__flexContainer">
                  <h6 className="price">&#x20B9; {proinfo.price}</h6>
                  <h6 className="originalPrice">
                    &#x20B9; {proinfo.actualPrice || 250}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <article class="product-card ">
        <div class="product-card-image-container">
          <span class="sr-only">Product Image</span>
          <span className="product-card-image">
            <img
              alt={proinfo.title}
              src={proinfo.image[0]}
              decoding="async"
              data-nimg="fill"
              class="product-image"
            />
          </span>
        </div>
        <header class="p-3 product-card-footer">
          <div class="mb-2 dflex align-items-center">
            <span class="text-sm font-semibold text-heading md:text-base">
              ${proinfo.price}
            </span>
            <del class="text-xs text-muted ltr:ml-2 rtl:mr-2 md:text-sm">
              ${proinfo.actualPrice || null}
            </del>
          </div>
          <h3 class="mb-4 cursor-pointer truncate text-xs text-body md:text-sm">
            {proinfo.title}
          </h3>
          <button class="product-add-cart-btn">
            <span class="flex-1">Add</span>
            <span class="">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-4 w-4 stroke-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </span>
          </button>
        </header>
      </article> */}
    </>
  );
}

export default withRouter(Product);
