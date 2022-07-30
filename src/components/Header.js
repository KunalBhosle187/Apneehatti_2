import React, { useState, useEffect } from "react";
import $ from "jquery";
import { Link, withRouter } from "react-router-dom";
import { Redirect, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@material-ui/icons/Person";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import LoginIcon from "@mui/icons-material/Login";
import CancelIcon from "@mui/icons-material/Cancel";
import Signin from "../components/Signin";
import { Button, IconButton } from "@material-ui/core";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { listProducts } from "../stores/actions/productActions";
import HomeIcon from "@mui/icons-material/Home";
import Cart from "../stores/components/Cart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { listSearchProducts } from "../stores/actions/productActions";
import CategoryIcon from "@mui/icons-material/Category";

import {
  MenuAlt1Icon,
  SearchIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  XIcon,
} from "@heroicons/react/solid";

function Header({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const location = useLocation();
  const store = location.pathname.split("/").slice(1)[0];
  const [loginStatus, setLoginStatus] = useState(false);

  console.log(store.length);
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const category = products && products.map((item) => item.mainCategory);

  console.log("category", category);
  const [mobileUserSidemenuCancelBtn, setMobileUserSidemenuCancelBtn] =
    useState(false);
  const [mobileSidemenuCancelBtn, setMobileSidemenuCancelBtn] = useState(false);

  const [showSlider, setShowSlider] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearchbar, setShowSearchbar] = useState(false);

  useEffect(() => {
    dispatch(listProducts());
    let pop_status = localStorage.getItem("pop_status");
    if (!pop_status) {
      setLoginStatus(true);
      localStorage.setItem("pop_status", 1);
    }
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    window.location.replace("/");
  };

  const [searchText, setSearchText] = useState("");
  const showAndHideCart = () => {
    if (localStorage.getItem("isChecked") == "true") {
      $(document).ready(function () {
        $(".cart__div").addClass("right-[-150%]");
      });
      localStorage.setItem("isChecked", "false");
    } else {
      $(document).ready(function () {
        $(".cart__div").removeClass("right-[-150%]").addClass("right-0");
      });
      localStorage.setItem("isChecked", "true");
    }
  };

  $(document).ready(function () {
    $(".mob__sidebar__cancel__icon , .btns").click(function () {
      $(".mob__sidebar ").hide();
      $(".app").removeClass("position-fixed");
    });

    $(".moreVertIcon").click(function () {
      $(".mob__sidebar").show();
      $(".app").addClass("position-fixed");
    });

    $(".showMobileSearchBar").click(function () {
      $(".tHideInMobile").toggle();
    });

    // $("ul#mob__sidebar__parent__category").on(
    //   "click",
    //   "li#mob__sidebar__parent__category__li",
    //   function () {
    //     // $("li#collapseDropdown")
    //     //   .css("background-color", "white")
    //     //   .find("i.fa-minus")
    //     //   .removeClass("fa-minus")
    //     //   .addClass("fa-plus");

    //     // $("li#collapseDropdown")
    //     //   .attr("id", "mob__sidebar__parent__category__li")
    //     //   .find("ul.mob__sidebar__child__category")
    //     //   .addClass("hidden");

    //     $(this).find("i.fa-plus").removeClass("fa-plus").addClass("fa-minus");

    //     $(this)
    //       .attr("id", "collapseDropdown")
    //       .find("ul.mob__sidebar__child__category")
    //       .removeClass("hidden");
    //   }
    // );

    // $("ul#mob__sidebar__parent__category").on(
    //   "click",
    //   "li#collapseDropdown",
    //   function () {
    //     $(this)
    //       .css("background-color", "white")
    //       .find("i.fa-minus")
    //       .removeClass("fa-minus")
    //       .addClass("fa-plus");

    //     $(this)
    //       .attr("id", "mob__sidebar__parent__category__li")
    //       .find("ul.mob__sidebar__child__category")
    //       .hide();
    //   }
    // );
  });

  return (
    <>
      <Cart />
      {!userInfo ? (
        loginStatus ? (
          <div className="loginBlockOuter col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="loginBlockMain col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="loginBlock col-lg-9  col-md-11 col-sm-10 col-10 d-flex flex-wrap ">
                <Signin />
              </div>
            </div>
          </div>
        ) : null
      ) : null}
      <div className="sticky top-0  bg-white z-30 transition-all w-full">
        <div className=" w-full ">
          <div className="flex justify-between items-center px-2 shadow-md">
            <div className="flex items-center">
              <div className="xl:hidden  ease-in-out">
                {!showSlider ? (
                  <MenuAlt1Icon
                    onClick={() => setShowSlider(true)}
                    className="h-7 px-2 "
                  />
                ) : (
                  <XIcon
                    onClick={() => setShowSlider(false)}
                    className="h-7 px-2 "
                  />
                )}
              </div>
              <Link to="/">
                <img
                  src="/pictures/ApneeHatti_light.png"
                  width={85}
                  height={85}
                  alt=""
                />
              </Link>
            </div>
            <div className="border shadow-sm py-2 md:flex w-1/3 hidden xl:flex">
              <input
                type="text"
                className="w-full border-none text-xl px-2 "
                placeholder="Search Products"
              />
              <SearchIcon className="h-7 px-2" />
            </div>
            <div className="flex items-center ">
              {!showSearchbar ? (
                <SearchIcon
                  className="h-7  xl:hidden px-2"
                  onClick={() => setShowSearchbar(!showSearchbar)}
                />
              ) : null}
              <h1 className="text-xl font-semibold hidden px-2 xl:block">
                My Account
              </h1>
              <ShoppingBagIcon
                className="h-7 px-2 "
                onClick={() => showAndHideCart()}
              />
            </div>
          </div>
        </div>

        <div
          className={` bg-slate-600 bg-opacity-10 fixed top-20 bottom-0 overflow-y-scroll duration-500 ${
            showSlider ? "w-full" : "w-0"
          }`}
        >
          <div className=" w-full h-full bg-white    ">
            {!userInfo ? (
              <div className=" ">
                <h3>Welcome Back User</h3>
                <button
                  onClick={() => setLoginStatus(true)}
                  className="col-12 btn"
                >
                  <span>Sign in</span>
                </button>
              </div>
            ) : (
              <div className="bg-white w-full pb-10 ">
                <a className="bg-gray-50 w-full block p-3 flex sticky top-0">
                  <CategoryIcon className="" />
                  <h4 className="text-lg  ml-2 uppercase font-semibold ">
                    Category
                  </h4>
                </a>

                <ul id="mob__sidebar__parent__category">
                  <a href={`/all`}>
                    <li
                      id="mob__sidebar__parent__category__li"
                      className="p-3 px-6"
                    >
                      <span className="active:text-blue-600 font-normal text-sm font-bold ">
                        All
                      </span>
                    </li>
                  </a>

                  {category &&
                    category
                      .filter((q, idx) => category.indexOf(q) === idx)
                      .map((q, index) =>
                        q !== undefined ? (
                          <li
                            key={index}
                            className="p-3 px-6 block"
                            onClick={(e) => setShowDropdown(e.target.innerText)}
                          >
                            <div className=" active:text-blue-600 active:font-semibold font-normal flex items-center justify-between">
                              <span className="font-bold">{q}</span>
                              <i
                                className={`far ${
                                  showDropdown === q ? "fa-minus" : "fa-plus"
                                } text-lg`}
                              ></i>
                            </div>
                            <ul
                              className={`${
                                showDropdown === q ? "block" : "hidden"
                              } ml-3 mt-1`}
                            >
                              {products
                                .filter((item, idx) => item.mainCategory === q)
                                .map((subItem, subItemIndex) => (
                                  <li className="active: font-normal ">
                                    <a
                                      href={`/${q}/${subItem.subCategory}`}
                                      key={subItemIndex}
                                    >
                                      {subItem.subCategory}
                                    </a>
                                  </li>
                                ))}
                            </ul>
                          </li>
                        ) : null
                      )}
                </ul>
                <Link
                  to={`/user/userprofile`}
                  className="sticky top-0 active:text-blue-500 p-3  bg-gray-50 w-full  flex items-center mt-3"
                >
                  <AccountCircleOutlinedIcon className=" " />
                  <h4 className="text-lg ml-2 uppercase font-semibold  ">
                    Profile
                  </h4>
                </Link>

                <div
                  className="sticky top-0 active:text-blue-500 p-3  bg-gray-50 w-full  flex  items-center mt-3"
                  onClick={showAndHideCart}
                >
                  <ShoppingCartIcon className=" h-6" />
                  <h4 className="text-lg ml-2 uppercase font-semibold  ">
                    Cart
                  </h4>
                </div>

                <Link
                  to={`/user/myorders`}
                  className="sticky top-0 active:text-blue-500 p-3  bg-gray-50 w-full  flex  items-center mt-3"
                >
                  <ShoppingBagIcon className=" h-6" />
                  <h4 className="text-lg ml-2 uppercase font-semibold  ">
                    My Orders
                  </h4>
                </Link>

                <div
                  onClick={logoutHandler}
                  className="sticky top-0 active:text-blue-500 p-3  bg-gray-50 w-full  flex  items-center mt-3"
                >
                  <LogoutOutlinedIcon className=" " />
                  <h4 className="text-lg ml-2 uppercase font-semibold  ">
                    Logout
                  </h4>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showSearchbar ? (
        <div className=" duration-500 hidden w-100% p-1 border mx-2 mt-2">
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search product ..."
            className="w-full"
          />

          <div className="bg-gray-100">
            <IconButton
              onClick={() => {
                dispatch(listSearchProducts(searchText));
                setShowSearchbar(!showSearchbar);
              }}
            >
              <SearchSharpIcon />
            </IconButton>
          </div>
        </div>
      ) : null}
    </>
  );
}

{
  /* <div className="newHeader  ">
     
      </div> */
}
{
  /* <nav className="navbar navbar-default navbar-fixed-top">
        <div className="newHeader__header gx-0 col-12 row justify-content-between align-items-center py-2 px-3">
          <div className="col-1 moreVertIcon pHideInDesktop">
            <MoreVertIcon />
          </div>
          <div className="col-2 col-sm-1 col-md-1  col-lg-1 newHeaderLogoContainer">
            <img
              width="100%"
              height="100%"
              className="newHeaderLogo"
              onClick={(event) => (window.location.href = `/store/all`)}
              src="/pictures/apneehatti_logo.svg"
            />
          </div>
          <div className="col-1  pHideInDesktop showMobileSearchBar ">
            <SearchSharpIcon />
          </div>
          <div className="col-12 col-sm-5 col-md-5 col-lg-4  tHideInMobile">
            <div className="searbar__newlook">
              <input
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search product ..."
              />

              <IconButton
                onClick={() => dispatch(listSearchProducts(searchText))}
              >
                <SearchSharpIcon />
              </IconButton>
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-3 pHideInMobile">
            {userInfo ? (
              <div className="col-lg-12 col-sm-12 d-flex flex-wrap justify-content-between align-items-center">
                <Link className=" " to={`/user/userprofile`}>
                  <AccountCircleOutlinedIcon /> Account
                </Link>
                <Link className=" " onClick={showAndHideCart}>
                  <ShoppingBasketOutlinedIcon /> Cart
                </Link>
                <Link className=" " onClick={logoutHandler}>
                  <PowerSettingsNewOutlinedIcon /> Logout
                </Link>
              </div>
            ) : (
              <div className="col-lg-4 d-flex flex-wrap justify-content-between align-items-center">
                <h4 className="col-lg-6" onClick={showAndHideCart}>
                  <ShoppingBasketOutlinedIcon />
                </h4>
                <h4 className="col-lg-6" onClick={() => setLoginStatus(true)}>
                  <LoginIcon />
                </h4>
              </div>
            )}
          </div>
        </div>
      </nav>

        

  

      {/* <div className="">
        <div className="navbar__mega__menu__container ">
          <div className="navbar__mega__menu col-lg-12 col-md-12 col-sm-12">
            <div className="col-lg-2 col-md-3 col-sm-4 col-4">
              <div className="hideAndShowContainer">
                <a href={`/all`}>
                  <Button>
                    <div className="navbar__mega__img__container">
                      <img
                        className="beauty__img"
                        width="100%"
                        height="100%"
                        src={`/pictures/navbar/All.png`}
                      />
                    </div>
                    <h6>All</h6>
                  </Button>
                </a>
              </div>
            </div>
            {category &&
              category
                .filter((q, idx) => category.indexOf(q) === idx)
                .map((q, index) =>
                  q != undefined ? (
                    <div className="col-lg-2 col-md-3 col-sm-4 col-4">
                      <div className="hideAndShowContainer">
                        <a href={`/${q}/all`} key={index}>
                          <Button>
                            <div className="navbar__mega__img__container">
                              <img
                                className="beauty__img"
                                width="100%"
                                height="100%"
                                src={`/pictures/navbar/${q
                                  .toLowerCase()
                                  .split(" ")
                                  .join("")}.png`}
                              />
                            </div>
                            <h6>{q}</h6>
                          </Button>
                        </a>
                        <div className="dropDownMegaMenuBlockContainer pt-2">
                          <div className="dropDownMegaMenuBlock col-lg-2">
                            <h5 className="col-lg-12 mb-2">
                              Shop by sub-category
                            </h5>
                            <div className="col-lg-5">
                              <ul className="p-0">
                                {products
                                  .filter((item, idx) => item.mainCategory == q)
                                  .map((subItem, subItemIndex) => (
                                    <li>
                                      <a
                                        href={`/${q}/${subItem.subCategory}`}
                                        key={subItemIndex}
                                      >
                                        {subItem.subCategory}
                                      </a>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
          </div>
        </div>

      

        {mobileUserSidemenuCancelBtn ? (
          <div className="mobile__user__sidemenu">
            <div className="mobile__user__sidemenu__container">
              {userInfo ? (
                <div className="mobile__user__sidemenu__cancel">
                  <h1>
                    Hello ,<br />
                    {userInfo.name}
                  </h1>
                  <CancelIcon
                    onClick={() => setMobileUserSidemenuCancelBtn(false)}
                  />
                </div>
              ) : (
                <div className="mobile__user__sidemenu__cancel">
                  <h1>Hello Sir</h1>
                  <CancelIcon
                    onClick={() => setMobileUserSidemenuCancelBtn(false)}
                  />
                </div>
              )}
              <div>
                <Link
                  to="/user/userprofile"
                  onClick={() => setMobileUserSidemenuCancelBtn(false)}
                >
                  <div className="mobile__user__sidemenu__item">
                    <PersonIcon />
                    <h5>Your Profile</h5>
                  </div>
                </Link>
                <Link
                  to="/user/myorders"
                  onClick={() => setMobileUserSidemenuCancelBtn(false)}
                >
                  <div className="mobile__user__sidemenu__item">
                    <ShoppingCartIcon />
                    <h5>Your Orders</h5>
                  </div>
                </Link>

                <div
                  className="mobile__user__sidemenu__item"
                  onClick={logoutHandler}
                >
                  <LogoutIcon />
                  <h5>Logout</h5>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {mobileSidemenuCancelBtn ? (
          <div className="mobile__user__sidemenu d-flex flex-column">
            <div className="mobile__user__sidemenu__browseApneehatti">
              <h2>Browse Apneehatti</h2>
              <CancelIcon onClick={() => setMobileSidemenuCancelBtn(false)} />
            </div>
            <Link to="/" onClick={() => setMobileSidemenuCancelBtn(false)}>
              <div className="mobile__user__sidemenu__apneehattiHome">
                <h3>Home</h3>
                <HomeIcon />
              </div>
            </Link>
            <div>
              {store == "store" ? (
                <div className="mobile__user__sidemenu__categories__list">
                  <Link
                    onClick={() => setMobileSidemenuCancelBtn(false)}
                    to="./all"
                  >
                    <Button>
                      <li>All</li>
                    </Button>
                  </Link>
                  <Link
                    onClick={() => setMobileSidemenuCancelBtn(false)}
                    to="./Men"
                  >
                    <Button>
                      <li>Men</li>
                    </Button>
                  </Link>
                  <Link
                    onClick={() => setMobileSidemenuCancelBtn(false)}
                    to="./Women"
                  >
                    <Button>
                      <li>Women</li>
                    </Button>
                  </Link>
                  <Link
                    onClick={() => setMobileSidemenuCancelBtn(false)}
                    to="./Bags & Footwear"
                  >
                    <Button>
                      <li>Bags & Footwear</li>
                    </Button>
                  </Link>
                  <Link
                    onClick={() => setMobileSidemenuCancelBtn(false)}
                    to="./Home & Kitchen"
                  >
                    <Button>
                      <li>Home & Kitchen</li>
                    </Button>
                  </Link>
                  <Link
                    onClick={() => setMobileSidemenuCancelBtn(false)}
                    to="./Kids"
                  >
                    <Button>
                      <li>Kids</li>
                    </Button>
                  </Link>
                  <Link
                    onClick={() => setMobileSidemenuCancelBtn(false)}
                    to="./Electronics"
                  >
                    <Button>
                      <li>Electronics</li>
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="mobile__user__sidemenu__categories__list">
                  <Link
                    onClick={() => setMobileSidemenuCancelBtn(false)}
                    to="store/all"
                  >
                    <Button>
                      <li>All</li>
                    </Button>
                  </Link>
                  <Link
                    onClick={() => setMobileSidemenuCancelBtn(false)}
                    to="/store/Men"
                  >
                    <Button>
                      <li>Men</li>
                    </Button>
                  </Link>
                  <Link
                    onClick={() => setMobileSidemenuCancelBtn(false)}
                    to="/store/Women"
                  >
                    <Button>
                      <li>Women</li>
                    </Button>
                  </Link>
                  <Link
                    onClick={() => setMobileSidemenuCancelBtn(false)}
                    to="/store/Bags & Footwear"
                  >
                    <Button>
                      <li>Bags & Footwear</li>
                    </Button>
                  </Link>
                  <Link
                    onClick={() => setMobileSidemenuCancelBtn(false)}
                    to="/store/Home & Kitchen"
                  >
                    <Button>
                      <li>Home & Kitchen</li>
                    </Button>
                  </Link>
                  <Link
                    onClick={() => setMobileSidemenuCancelBtn(false)}
                    to="/store/Kids"
                  >
                    <Button>
                      <li>Kids</li>
                    </Button>
                  </Link>
                  <Link
                    onClick={() => setMobileSidemenuCancelBtn(false)}
                    to="/store/Electronics"
                  >
                    <Button>
                      <li>Electronics</li>
                    </Button>
                  </Link>
                </div>
              )}
              {category &&
                category
                  .filter((q, idx) => category.indexOf(q) === idx)
                  .map((q, index) => (
                    <Link
                      key={index}
                      onClick={() => setMobileSidemenuCancelBtn(false)}
                      to={`/store/${q}`}
                    >
                      <Button>
                        <li className="categoryBeauty" key={index}>
                          {q}
                        </li>
                      </Button>
                    </Link>
                  ))}
            </div>
          </div>
        ) : null}
      </div>  */
}

export default withRouter(Header);
