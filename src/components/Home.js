import React from "react";
import { Button } from "@material-ui/core";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import { useSelector } from "react-redux";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import Product from "../stores/components/Product";
import CarouselItem from "./CarouselItem";

const Home = () => {
  // const store = location.pathname.split("/").slice(1)[0];

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const category = products && products.map((item) => item.category);

  const newArival = products.slice(12, 17);
  const popularPick = products.slice(17, 22);

  return (
    <>
      <div className=" bg-gray-50 pb-10 ">
        <CarouselItem />

        <div className="grid grid-cols-2 gap-1  my-4">
          <div className="">
            <img
              src="/pictures/banner/offer-1.png"
              width="100%"
              height="100%"
              alt=""
            />
          </div>
          <div className="">
            <img
              src="/pictures/banner/offer-2.png"
              width="100%"
              height="100%"
              alt=""
            />
          </div>
          <div className="hidden">
            <img
              src="/pictures/banner/offer-3.png"
              width="100%"
              height="100%"
              alt=""
            />
          </div>
        </div>

        {/* 
        <div className="d-flex justify-content-center featureBanner">
          <div className="col-lg-12 d-flex justify-content-center align-items-center featureBanner__border">
            <div className="col-lg-2 d-flex flex-column justify-content-center align-items-center feature__blocks__text">
              <StarBorderOutlinedIcon />
              <h4>100% Genuine Product Gurrentee</h4>
            </div>
            <div className="col-lg-2 d-flex flex-column justify-content-center align-items-center feature__blocks__text">
              <LocalShippingOutlinedIcon />
              <h4>Guaranteed On Time Delivery</h4>
            </div>
            <div className="col-lg-2 d-flex flex-column justify-content-center align-items-center feature__blocks__text">
              <SecurityOutlinedIcon />
              <h4>Secure Payment</h4>
            </div>
            <div className="col-lg-2 d-flex flex-column justify-content-center align-items-center feature__blocks__text">
              <SupportAgentOutlinedIcon />
              <h4>24 x 7 Customer Support</h4>
            </div>
          </div>
        </div> */}

        {/* <div className="px-1">
          <div className="home__banner__container col-lg-12 row gx-1 m-0 ">
            <div className="col-lg-9">
              <div className="col-lg-12 row gx-2 m-0">
                <div className="col-lg-3 d-flex flex-column align-items-center bg1">
                  <h3 className="text-center">
                    Upto 40% off | Shop now Apneehatti fresh
                  </h3>
                  <div className="d-flex col-lg-12 justify-content-between mt-1">
                    <div className="col-lg-6 productBg__container ">
                      <div className="productBg">
                        <img
                          src="https://apneehatti.s3.ap-south-1.amazonaws.com/image-1641879897604.png"
                          width="100%"
                          height="100%"
                        />
                        <h4 className="text-center ">
                          Upto 40% off | Top 100 deals
                        </h4>
                      </div>
                    </div>
                    <div className="col-lg-6 productBg__container ">
                      <div className="productBg">
                        <img
                          src="https://apneehatti.s3.ap-south-1.amazonaws.com/image-1641879897604.png"
                          width="100%"
                          height="100%"
                        />
                        <h4 className="text-center ">
                          Upto 40% off | Top 100 deals
                        </h4>
                      </div>
                    </div>
                  </div>
                  <h5 className="text-center mt-1">Shop now</h5>
                </div>
                <div className="col-lg-9">
                  <div
                    id="carouselExampleControls"
                    class="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-indicators-btn">
                      <div class="carousel-indicators">
                        <button
                          type="button"
                          data-bs-target="#carouselExampleCaptions"
                          data-bs-slide-to="0"
                          class="active"
                          aria-current="true"
                          aria-label="Slide 1"
                        ></button>
                        <button
                          type="button"
                          data-bs-target="#carouselExampleCaptions"
                          data-bs-slide-to="1"
                          aria-label="Slide 2"
                        ></button>
                        <button
                          type="button"
                          data-bs-target="#carouselExampleCaptions"
                          data-bs-slide-to="2"
                          aria-label="Slide 3"
                        ></button>
                      </div>
                    </div>
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img
                          src="/pictures/banner/bn1.png"
                          class="d-block  w-100 "
                          alt="..."
                          width="100%"
                          height="100%"
                        />
                      </div>
                      <div class="carousel-item">
                        <img
                          width="100%"
                          height="100%"
                          src="/pictures/banner/bn2.png"
                          class="d-block  w-100 "
                          alt="..."
                        />
                      </div>
                    </div>
                    <button
                      class="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleControls"
                      data-bs-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button
                      class="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleControls"
                      data-bs-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 row gx-1 lower__banner mt-1">
                <div className="col-lg-6 lower__banner__container">
                  <img
                    src="/pictures/banner/bn3.png"
                    width="100%"
                    height="100%"
                  />
                </div>
                <div className="col-lg-6 lower__banner__container">
                  <img
                    src="/pictures/banner/bn4.png"
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 bg2 d-flex flex-column align-items-center">
              <h3 className="text-center">
                Decorate your home with, Apnnehatti stuffs
              </h3>
              <div className="col-lg-12 col-12 col-sm-12 d-flex flex-wrap justify-content-center">
                <div className="col-lg-6 col-6 col-sm-6 productBg__container ">
                  <div className="productBg">
                    <img
                      src="https://apneehatti.s3.ap-south-1.amazonaws.com/image-1641879897604.png"
                      width="100%"
                      height="100%"
                    />
                    <h4 className="text-center ">
                      Upto 40% off | Top 100 deals
                    </h4>
                  </div>
                </div>
                <div className="col-lg-6 col-6 col-sm-6 productBg__container ">
                  <div className="productBg">
                    <img
                      src="https://apneehatti.s3.ap-south-1.amazonaws.com/image-1641879897604.png"
                      width="100%"
                      height="100%"
                    />
                    <h4 className="text-center ">
                      Upto 40% off | Top 100 deals
                    </h4>
                  </div>
                </div>
                <div className="col-lg-6 col-6 col-sm-6 productBg__container ">
                  <div className="productBg">
                    <img
                      src="https://apneehatti.s3.ap-south-1.amazonaws.com/image-1641879897604.png"
                      width="100%"
                      height="100%"
                    />
                    <h4 className="text-center ">
                      Upto 40% off | Top 100 deals
                    </h4>
                  </div>
                </div>
                <div className="col-lg-6 col-6 col-sm-6 productBg__container ">
                  <div className="productBg">
                    <img
                      src="https://apneehatti.s3.ap-south-1.amazonaws.com/image-1641879897604.png"
                      width="100%"
                      height="100%"
                    />
                    <h4 className="text-center ">
                      Upto 40% off | Top 100 deals
                    </h4>
                  </div>
                </div>
                <div className="col-lg-6 col-6 col-sm-6 productBg__container ">
                  <div className="productBg">
                    <img
                      src="https://apneehatti.s3.ap-south-1.amazonaws.com/image-1641879897604.png"
                      width="100%"
                      height="100%"
                    />
                    <h4 className="text-center ">
                      Upto 40% off | Top 100 deals
                    </h4>
                  </div>
                </div>
                <div className="col-lg-6 col-6 col-sm-6 productBg__container ">
                  <div className="productBg">
                    <img
                      src="https://apneehatti.s3.ap-south-1.amazonaws.com/image-1641879897604.png"
                      width="100%"
                      height="100%"
                    />
                    <h4 className="text-center ">
                      Upto 40% off | Top 100 deals
                    </h4>
                  </div>
                </div>
              </div>
              <h5 className="text-center mt-1">Shop now</h5>
            </div>
          </div>
        </div> */}

        <div className="">
          <div className="">
            <div className="py-4">
              <h3 className="text-center text-2xl font-semibold uppercase mb-2 ">
                Deals of the day
              </h3>
              <h3 className="text-center text-gray-500">
                Upto 50% Off plus free shipping | Grab it Fast
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2 m-2">
              {popularPick.map((proinfo) => (
                <Product key={proinfo._id} proinfo={proinfo} />
              ))}
            </div>
          </div>
        </div>

        {/* <div className="px-1">
          <div className="home__banner__container col-lg-12 row gx-2  ms-1 m-0 ">
            <div className="col-lg-3 bg2 d-flex flex-column align-items-center">
              <h3 className="text-center">
                Decorate your home with, Apnnehatti stuffs
              </h3>
              <div className="col-lg-12 col-12 col-sm-12 d-flex flex-wrap justify-content-center">
                <div className="col-lg-6 col-6 col-sm-6 productBg__container ">
                  <div className="productBg">
                    <img
                      src="https://apneehatti.s3.ap-south-1.amazonaws.com/image-1641879897604.png"
                      width="100%"
                      height="100%"
                    />
                    <h4 className="text-center ">
                      Upto 40% off | Top 100 deals
                    </h4>
                  </div>
                </div>
                <div className="col-lg-6 col-6 col-sm-6 productBg__container ">
                  <div className="productBg">
                    <img
                      src="https://apneehatti.s3.ap-south-1.amazonaws.com/image-1641879897604.png"
                      width="100%"
                      height="100%"
                    />
                    <h4 className="text-center ">
                      Upto 40% off | Top 100 deals
                    </h4>
                  </div>
                </div>
                <div className="col-lg-6 col-6 col-sm-6 productBg__container ">
                  <div className="productBg">
                    <img
                      src="https://apneehatti.s3.ap-south-1.amazonaws.com/image-1641879897604.png"
                      width="100%"
                      height="100%"
                    />
                    <h4 className="text-center ">
                      Upto 40% off | Top 100 deals
                    </h4>
                  </div>
                </div>
                <div className="col-lg-6 col-6 col-sm-6 productBg__container ">
                  <div className="productBg">
                    <img
                      src="https://apneehatti.s3.ap-south-1.amazonaws.com/image-1641879897604.png"
                      width="100%"
                      height="100%"
                    />
                    <h4 className="text-center ">
                      Upto 40% off | Top 100 deals
                    </h4>
                  </div>
                </div>
                <div className="col-lg-6 col-6 col-sm-6 productBg__container ">
                  <div className="productBg">
                    <img
                      src="https://apneehatti.s3.ap-south-1.amazonaws.com/image-1641879897604.png"
                      width="100%"
                      height="100%"
                    />
                    <h4 className="text-center ">
                      Upto 40% off | Top 100 deals
                    </h4>
                  </div>
                </div>
                <div className="col-lg-6 col-6 col-sm-6 productBg__container ">
                  <div className="productBg">
                    <img
                      src="https://apneehatti.s3.ap-south-1.amazonaws.com/image-1641879897604.png"
                      width="100%"
                      height="100%"
                    />
                    <h4 className="text-center ">
                      Upto 40% off | Top 100 deals
                    </h4>
                  </div>
                </div>
              </div>
              <h5 className="text-center mt-1">Shop now</h5>
            </div>
            <div className="col-lg-9">
              <div className="col-lg-12 row gx-2">
                <div className="col-lg-9">
                  <div
                    id="carouselExampleControls"
                    class="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-indicators-btn">
                      <div class="carousel-indicators">
                        <button
                          type="button"
                          data-bs-target="#carouselExampleCaptions"
                          data-bs-slide-to="0"
                          class="active"
                          aria-current="true"
                          aria-label="Slide 1"
                        ></button>
                        <button
                          type="button"
                          data-bs-target="#carouselExampleCaptions"
                          data-bs-slide-to="1"
                          aria-label="Slide 2"
                        ></button>
                        <button
                          type="button"
                          data-bs-target="#carouselExampleCaptions"
                          data-bs-slide-to="2"
                          aria-label="Slide 3"
                        ></button>
                      </div>
                    </div>
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img
                          src="/pictures/banner/bn1.png"
                          class="d-block  w-100 "
                          alt="..."
                          width="100%"
                          height="100%"
                        />
                      </div>
                      <div class="carousel-item">
                        <img
                          width="100%"
                          height="100%"
                          src="/pictures/banner/bn2.png"
                          class="d-block  w-100 "
                          alt="..."
                        />
                      </div>
                    </div>
                    <button
                      class="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleControls"
                      data-bs-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button
                      class="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleControls"
                      data-bs-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
                <div className="col-lg-3 d-flex flex-column align-items-center bg1">
                  <h3 className="text-center">
                    Upto 40% off | Shop now Apneehatti fresh
                  </h3>
                  <div className="d-flex col-lg-12 justify-content-between mt-1">
                    <div className="col-lg-6 productBg__container ">
                      <div className="productBg">
                        <img
                          src="https://apneehatti.s3.ap-south-1.amazonaws.com/image-1641879897604.png"
                          width="100%"
                          height="100%"
                        />
                        <h4 className="text-center ">
                          Upto 40% off | Top 100 deals
                        </h4>
                      </div>
                    </div>
                    <div className="col-lg-6 productBg__container ">
                      <div className="productBg">
                        <img
                          src="https://apneehatti.s3.ap-south-1.amazonaws.com/image-1641879897604.png"
                          width="100%"
                          height="100%"
                        />
                        <h4 className="text-center ">
                          Upto 40% off | Top 100 deals
                        </h4>
                      </div>
                    </div>
                  </div>
                  <h5 className="text-center mt-1">Shop now</h5>
                </div>
              </div>
              <div className="col-lg-12 row gx-1 lower__banner mt-1">
                <div className="col-lg-6 lower__banner__container">
                  <img
                    src="/pictures/banner/bn3.png"
                    width="100%"
                    height="100%"
                  />
                </div>
                <div className="col-lg-6 lower__banner__container">
                  <img
                    src="/pictures/banner/bn4.png"
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="h-48 my-4">
          <img
            src="/pictures/banner/banner4.png"
            // width="100%"
            // height="100%"
            className=" h-full object-cover"
            alt=""
          />
        </div>

        <div className="py-4">
          <h3 className="text-center text-2xl font-semibold uppercase mb-2">
            Latest new arrivals
          </h3>
          <h3 className="text-center text-gray-500">
            We’re crushing on new arrivals + 30% off all full price!
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 m-2">
          {popularPick.map((proinfo) => (
            <Product key={proinfo._id} proinfo={proinfo} />
          ))}
        </div>

        {/* <div className="col-lg-12 col-md-12 col-sm-12 d-flex flex-wrap justify-content-between align-items-start">
          <div className="col-lg-12 col-md-12 col-sm-12 ">
            <div className="col-lg-12 col-md-12 col-sm-12 d-flex flex-wrap justify-content-between align-items-center">
              <div className="home__banner__block col-lg-6 col-sm-6 col-md-6 px-1">
                <img src="/pictures/banner__1.png" width="100%" height="100%" />
              </div>
              <div className="home__banner__block col-lg-6 col-sm-6 col-md-6 px-1">
                <img src="/pictures/banner__2.jpg" width="100%" height="100%" />
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="popular__pick">
              <div className="popular__pick__heading">
                <h4>Todays top 5 popular picks</h4>
                <h5>See What catching people attention</h5>
              </div>
              <div className=" col-lg-12 col-sm-12  d-flex flex-wrap align-items-center">
                {popularPick.map((proinfo) => (
                  <div className="col-6 col-lg-2 col-md-3 col-sm-4">
                    <Product key={proinfo._id} proinfo={proinfo} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 col-12   newArrival__banner">
          <div className="col-lg-11 col-md-11 col-sm-11 d-flex justify-content-between  my-4">
            <h4 className="ultra ">New Arrival</h4>
            <Button>View all</Button>
          </div>
          <div className="col-12 col-lg-12 col-sm-12 d-flex flex-wrap align-items-center">
            {newArival.map((proinfo) => (
              <div className="col-6 col-lg-2 col-md-3 col-sm-4">
                <Product key={proinfo._id} proinfo={proinfo} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-12 col-12 d-flex flex-wrap justify-content-center align-items-center py-5">
          <div className="col-lg-10 col-12 d-flex flex-wrap justify-content-evenly align-items-center">
            <div className="col-lg-5 col-5 banner__size">
              <img src="/pictures/banner__3.jpg" width="100%" height="100%" />
            </div>
            <div className="col-lg-5 col-5 banner__size">
              <img src="/pictures/banner__2.jpg" width="100%" height="100%" />
            </div>
          </div>
        </div>*/}

        <div className="py-4">
          <h3 className="text-center text-2xl font-semibold uppercase mb-2">
            Top selling Products
          </h3>
          <h3 className="text-center text-gray-500 capitalize">
            Grab it fast | sale is live
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 m-2">
          {popularPick.map((proinfo) => (
            <Product key={proinfo._id} proinfo={proinfo} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
