import React, { Suspense } from "react";
import "./index.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import io from "socket.io-client";
import { socketContext, socket } from "./context/socket";
const Signin = React.lazy(() => import("./components/Signin"));
const Registration = React.lazy(() => import("./components/Registration"));
const ForgotPassword = React.lazy(() => import("./components/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./components/ResetPassword"));
const StoreList = React.lazy(() =>
  import("./components/adminComponents/StoreList")
);
const AdminHeader = React.lazy(() =>
  import("./components/adminComponents/AdminHeader")
);
const AdminFooter = React.lazy(() =>
  import("./components/adminComponents/AdminFooter")
);
const AdminSignIn = React.lazy(() =>
  import("./components/adminComponents/AdminSignIn")
);
const AdminDash = React.lazy(() =>
  import("./components/adminComponents/AdminDash")
);
const Header = React.lazy(() => import("./components/Header"));
const Homescreen = React.lazy(() => import("./stores/components/Homescreen"));
const ProductDetail = React.lazy(() =>
  import("./stores/components/ProductDetail")
);
const Cart = React.lazy(() => import("./stores/components/Cart"));
const UserProfile = React.lazy(() => import("./stores/components/UserProfile"));
const UserHeader = React.lazy(() => import("./stores/components/UserHeader"));
const UserFooter = React.lazy(() => import("./stores/components/UserFooter"));
const Shipping = React.lazy(() => import("./stores/components/Shipping"));
const PlaceOrder = React.lazy(() => import("./stores/components/PlaceOrder"));
const Order = React.lazy(() => import("./stores/components/Order"));
const SellerLayout = React.lazy(() =>
  import("./stores/seller_components/SellerLayout")
);
const SellerLogin = React.lazy(() =>
  import("./stores/seller_components/SellerLogin")
);
const Search = React.lazy(() => import("./stores/components/Search"));
const Feedback = React.lazy(() => import("./stores/components/Feedback"));
const SellerProductUpload = React.lazy(() =>
  import("./stores/seller_components/SellerProductUpload")
);
const Footer = React.lazy(() => import("./stores/components/Footer"));
const Home = React.lazy(() => import("./components/Home"));
const PrivacyPolicy = React.lazy(() =>
  import("./stores/components/footerComponents/PrivacyPolicy")
);
const TermsOfUse = React.lazy(() =>
  import("./stores/components/footerComponents/TermsOfUse")
);
const ShippingReturn = React.lazy(() =>
  import("./stores/components/footerComponents/ShippingReturn")
);
const Cancellation = React.lazy(() =>
  import("./stores/components/footerComponents/Cancellation")
);
const ContactUs = React.lazy(() =>
  import("./stores/components/footerComponents/ContactUs")
);
const About = React.lazy(() =>
  import("./stores/components/footerComponents/About")
);

function App() {
  return (
    <socketContext.Provider value={socket}>
      <div className="app">
        <Suspense>
          <BrowserRouter>
            {/* Admin */}
            <Route path="/admin" component={AdminSignIn} />
            <Route path="/admindash" component={AdminDash} />
            {/* Admin  End*/}

            {/* HomePage */}

            <Route exact path="/">
              <Header />
              <Home />
              <Footer />
            </Route>

            {/* HomePage End */}

            {/* Seller */}
            {/* <Route exact path="/fragrance/seller" component={SellerLogin}/> */}
            <Route exact path="/seller" component={SellerLogin} />
            <Route
              exact
              path="/productUpload"
              component={SellerProductUpload}
            />

            {/* <Route exact path="/fragrance/sellerdashboard" component={SellerLayout}/> */}
            <Route path="/sellerdashboard" component={SellerLayout} />

            {/* Seller end */}

            {/* Authentication */}
            {/* <Route path="/" component={HomePage}/> */}
            <Route exact path="/login" component={Signin} />
            <Route exact path="/register" component={Registration} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/resetpassword" component={ResetPassword} />
            {/* Authentication End */}

            {/* store list */}
            <Route exact path="/storelist">
              <StoreList />
            </Route>
            {/* store end */}

            <div>
              {/* Store route */}
              {/* footer Policies */}
              <Header />
              <Route exact path="/privacy_policy">
                <PrivacyPolicy />
              </Route>

              <Route exact path="/term_&_conditions">
                <TermsOfUse />
              </Route>

              <Route exact path="/about_us">
                <About />
              </Route>

              <Route exact path="/contact_us">
                <ContactUs />
              </Route>

              <Route exact path="/shipping_info">
                <ShippingReturn />
              </Route>

              <Route exact path="/cancelletion_&_return">
                <Cancellation />
              </Route>
              {/* footer Policies End */}

              <Route exact path="/all">
                <Homescreen />
              </Route>

              <Route exact path="/:main_category/:sub_category">
                <Homescreen />
              </Route>

              <Route
                exact
                path="/:main_category/:sub_category/products/:number"
              >
                <ProductDetail />
              </Route>
              <Route exact path="/cart/:number?">
                <Cart />
              </Route>
              <Route exact path="/cart">
                <Cart />
              </Route>

              <Route exact path="/shipping">
                <Shipping />
              </Route>

              <Route
                exact
                path="/:main_category/:sub_category/products/shipping/placeorder"
              >
                <PlaceOrder />
              </Route>

              <Route exact path="/shipping/placeorder/order/:id">
                <Order />
              </Route>
              <Route exact path="/search">
                <Search />
              </Route>

              <Route path="/user">
                <UserHeader />
                <UserProfile />
              </Route>
              <Footer />

              {/* <Route exact path="/:store/feedback">
            <Header/>
            <Feedback/>
            <Footer/>
          </Route> */}

              {/* store end */}

              {/* store end */}
            </div>
          </BrowserRouter>
        </Suspense>
      </div>
    </socketContext.Provider>
  );
}

export default App;
