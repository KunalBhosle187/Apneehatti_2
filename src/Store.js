import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productSearchListReducer,
  productUploadReducer,
  productUpdateReducer,
  productUpdateManyReducer,
  productDeleteManyReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  orderListReducer,
  orderPendingListReducer,
  orderShippedListReducer,
  searchOrderListReducer,
} from "./reducers/sellerOrderReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
} from "./reducers/userReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderDeliverdReducer,
  sendEmailReducer,
} from "./reducers/orderReducer";
import { sellerLoginReducer } from "./reducers/sellerReducer";
import { storesReducer } from "./reducers/storeReducer";
import { adminLoginReducer } from "./reducers/adminReducer";
import { userFeedbackReducer } from "./reducers/feedbackReducer";
import { deliveryOrderCreateReducer } from "./reducers/deliveryReducer";

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const sellerInfoFromStorage = localStorage.getItem("sellerInfo")
  ? JSON.parse(localStorage.getItem("sellerInfo"))
  : null;

const adminInfoFromStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const reducer = combineReducers({
  productList: productListReducer,
  productSearchList: productSearchListReducer,
  productUpload: productUploadReducer,
  productUpdate: productUpdateReducer,
  updateManyProduct: productUpdateManyReducer,
  deleteManyProduct: productDeleteManyReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  sellerLog: sellerLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  orderList: orderListReducer,
  shippedOrderList: orderShippedListReducer,
  pendingOrderList: orderPendingListReducer,
  searchOrderList: searchOrderListReducer,
  orderDeliverd: orderDeliverdReducer,
  stores: storesReducer,
  adminLogin: adminLoginReducer,
  userFeedback: userFeedbackReducer,
  deliveryOrderCreate: deliveryOrderCreateReducer,
  sendEmail: sendEmailReducer,
});

const initialState = {
  // cart : {cartItems : 'techinfo'},
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },

  // login
  userLogin: { userInfo: userInfoFromStorage },

  // seller login
  sellerLog: { sellerInfo: sellerInfoFromStorage },

  //admin login
  adminLogin: { adminInfo: adminInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
