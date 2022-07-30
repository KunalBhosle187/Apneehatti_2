import { Button, Link } from "@material-ui/core";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CheckoutStep = ({
  Home,
  mainCategory,
  subCategory,
  step1,
  step2,
  step3,
  step4,
}) => {
  return (
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <a
            href="#"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <svg
              class="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            Home
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <svg
              class="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <a
              href="#"
              class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
            >
              {mainCategory}
            </a>
          </div>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <svg
              class="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
              {subCategory}
            </span>
          </div>
        </li>
      </ol>
    </nav>

    // <div className="breadcrumbComponent">
    //   <div className="d-flex">
    //     {Home != null ? (
    //       <div className="d-flex align-items-center">
    //         {Home ? (
    //           <Button>
    //             <Link color="inherit" to="/">
    //               {Home}
    //             </Link>
    //           </Button>
    //         ) : (
    //           <Button>
    //             <Link disabled>{Home}</Link>
    //           </Button>
    //         )}
    //       </div>
    //     ) : null}

    //     {step1 != null ? (
    //       <div className="d-flex align-items-center">
    //         {step1 ? (
    //           <Button>
    //             <Link color="inherit" to="/login">
    //               Sign In
    //             </Link>
    //           </Button>
    //         ) : (
    //           <Button>
    //             <Link disabled>Sign In</Link>
    //           </Button>
    //         )}
    //       </div>
    //     ) : null}

    //     {mainCategory != null ? (
    //       <div className="d-flex align-items-center">
    //         <ArrowForwardIosIcon style={{ fontSize: "10px" }} />

    //         {mainCategory ? (
    //           <Button>
    //             <Link color="inherit" to="/shipping">
    //               {mainCategory}
    //             </Link>
    //           </Button>
    //         ) : (
    //           <Button>
    //             <Link disabled>{mainCategory}</Link>
    //           </Button>
    //         )}
    //       </div>
    //     ) : null}

    //     {step2 != null ? (
    //       <div className="d-flex align-items-center">
    //         <ArrowForwardIosIcon style={{ fontSize: "10px" }} />

    //         {step2 ? (
    //           <Button>
    //             <Link color="inherit" to="/shipping">
    //               Deliver & Payment
    //             </Link>
    //           </Button>
    //         ) : (
    //           <Button>
    //             <Link disabled>Deliver & Payment</Link>
    //           </Button>
    //         )}
    //       </div>
    //     ) : null}

    //     {step3 != null ? (
    //       <div className="d-flex align-items-center">
    //         <ArrowForwardIosIcon style={{ fontSize: "10px" }} />

    //         {step3 ? (
    //           <Button>
    //             <Link color="inherit" to="/payment">
    //               Place Order
    //             </Link>
    //           </Button>
    //         ) : (
    //           <Button>
    //             <Link disabled>Place Order</Link>
    //           </Button>
    //         )}
    //       </div>
    //     ) : null}

    //     {subCategory != null ? (
    //       <div className="d-flex align-items-center">
    //         <ArrowForwardIosIcon style={{ fontSize: "10px" }} />

    //         {subCategory ? (
    //           <Button>
    //             <Link color="inherit" to="/payment">
    //               {subCategory}
    //             </Link>
    //           </Button>
    //         ) : (
    //           <Button>
    //             <Link disabled>{subCategory}</Link>
    //           </Button>
    //         )}
    //       </div>
    //     ) : null}

    //     {step4 != null ? (
    //       <div className="d-flex align-items-center">
    //         <ArrowForwardIosIcon style={{ fontSize: "10px" }} />

    //         {step4 ? (
    //           <Button>
    //             <Link color="inherit" to="/placeorder">
    //               Place Order
    //             </Link>
    //           </Button>
    //         ) : (
    //           <Button>
    //             <Link disabled>Place Order</Link>
    //           </Button>
    //         )}
    //       </div>
    //     ) : null}
    //   </div>
    // </div>
  );
};

export default CheckoutStep;
