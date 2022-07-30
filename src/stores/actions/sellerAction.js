import axios from "axios";
import {
  SELLER_LOGIN_FAIL,
  SELLER_LOGIN_REQUEST,
  SELLER_LOGIN_SUCCESS,
  SELLER_LOGOUT,
} from "../../constants/sellerConstant";
import {
  SELLER_ORDER_DETAILS_REQUEST,
  SELLER_ORDER_DETAILS_SUCCESS,
  SELLER_ORDER_DETAILS_FAIL,
  SELLER_ORDER_DETAILS_RESET,
  SHIPPED_ORDERS_REQUEST,
  SHIPPED_ORDERS_SUCCESS,
  PENDING_ORDERS_REQUEST,
  PENDING_ORDERS_SUCCESS,
  PENDING_ORDERS_FAIL,
  SHIPPED_ORDERS_FAIL,
  SEARCH_ORDERS_REQUEST,
  SEARCH_ORDERS_SUCCESS,
  SEARCH_ORDERS_FAIL,
} from "../../constants/sellerOrderConstant";
// import {USER_DETAIL_RESET} from "../../../constants/userConstant"

import io from "socket.io-client";
const socket = io();

export const logout = () => (dispatch) => {
  localStorage.removeItem("sellerInfo");
  dispatch({ type: SELLER_LOGOUT });
  // dispatch({type:USER_DETAIL_RESET});
  dispatch({ type: SELLER_ORDER_DETAILS_RESET });
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/amazon/seller/login",
      { email, password },
      config
    );
    dispatch({
      type: SELLER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("sellerInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: SELLER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrder = () => async (dispatch) => {
  try {
    dispatch({ type: SELLER_ORDER_DETAILS_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    var updatedOrders = [];

    console.log("updatedData", updatedOrders);
    const { data } = await axios.get("/api/amazon/seller/list");
    socket.on("get-updatedOrders", (updatedData) => {
      dispatch({
        type: SELLER_ORDER_DETAILS_SUCCESS,
        payload: updatedData,
      });
    });
  } catch (error) {
    dispatch({
      type: SELLER_ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listShippedOrder = () => async (dispatch) => {
  try {
    dispatch({ type: SHIPPED_ORDERS_REQUEST });
    const { data } = await axios.get("/api/amazon/seller/list");

    dispatch({
      type: SHIPPED_ORDERS_SUCCESS,
      shippedOrd: data,
    });
  } catch (error) {
    dispatch({
      type: SHIPPED_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPendingOrder = () => async (dispatch) => {
  try {
    dispatch({ type: PENDING_ORDERS_REQUEST });
    const { data } = await axios.get("/api/amazon/seller/list");
    socket.on("get-updatedOrders", (updatedData) => {
      dispatch({
        type: PENDING_ORDERS_SUCCESS,
        pendingOrd: updatedData,
      });
    });
  } catch (error) {
    dispatch({
      type: PENDING_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSearchOrder = (searchKeyword) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_ORDERS_REQUEST });
    const { data } = await axios.get("/api/amazon/seller/list");
    dispatch({
      type: SEARCH_ORDERS_SUCCESS,
      searchOrd: data,
      searchKey: searchKeyword,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
