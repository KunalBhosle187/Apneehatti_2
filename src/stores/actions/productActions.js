import React, { useContext } from "react";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_SEARCH_LIST_REQUEST,
  PRODUCT_SEARCH_LIST_SUCCESS,
  PRODUCT_SEARCH_LIST_FAILS,
  PRODUCT_UPLOAD_REQUEST,
  PRODUCT_UPLOAD_SUCCESS,
  PRODUCT_UPLOAD_FAILS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAILS,
  PRODUCT_UPDATE_MANY_REQUEST,
  PRODUCT_UPDATE_MANY_SUCCESS,
  PRODUCT_UPDATE_MANY_FAILS,
  PRODUCT_DELETE_MANY_REQUEST,
  PRODUCT_DELETE_MANY_SUCCESS,
  PRODUCT_DELETE_MANY_FAILS,
} from "../../constants/productConstant";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/products");

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSearchProducts = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_SEARCH_LIST_REQUEST });
    const { data } = await axios.get("/api/products");
    dispatch({
      type: PRODUCT_SEARCH_LIST_SUCCESS,
      searchData: data,
      searchKey: keyword,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_SEARCH_LIST_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (number) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${number}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const uploadProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPLOAD_REQUEST });

    const { data } = await axios.post("/api/product/upload", product);
    console.log("upload Product", data);
    dispatch({ type: PRODUCT_UPLOAD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPLOAD_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct =
  (updatedProduct, productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
      const { data } = await axios.patch(
        `/api/products/edit/${productId}`,
        updatedProduct
      );
      console.log("update Product", data);
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAILS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateManyProduct =
  (updatedManyProduct) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_MANY_REQUEST });
      const { data } = await axios.patch(
        `/api/products/updateMany`,
        updatedManyProduct
      );
      console.log("update Product", data);
      dispatch({ type: PRODUCT_UPDATE_MANY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_MANY_FAILS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteManyProduct =
  (deletedManyProduct) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_MANY_REQUEST });
      const { data } = await axios.patch(
        `/api/products/deleteMany`,
        deletedManyProduct
      );
      console.log("delete Product", data);
      dispatch({ type: PRODUCT_DELETE_MANY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_MANY_FAILS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
