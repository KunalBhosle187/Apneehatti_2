import axios from "axios";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstant";
import {
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REG_FAIL,
  USER_REG_REQUEST,
  USER_REG_SUCCESS,
  USER_DETAIL_UPDATE_SUCCESS,
  USER_DETAIL_UPDATE_REQUEST,
  USER_DETAIL_UPDATE_FAIL,
  USER_DETAIL_RESET,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_SUCCESS,
} from "../constants/userConstant";

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAIL_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const Register = (name, email, mobile, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REG_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/users",
      { name, email, mobile, password },
      config
    );
    dispatch({
      type: USER_REG_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAIL_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);
    dispatch({
      type: USER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAIL_UPDATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: USER_DETAIL_UPDATE_SUCCESS,
      payload: data,
    });
    console.log(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_DETAIL_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const forgotPassword = (email, otp) => async (dispatch) => {
  try {
    dispatch({ type: USER_FORGOT_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/users/emailsend",
      { email, otp },
      config
    );
    dispatch({
      type: USER_FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetPassword = (email, otp, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_RESET_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/users/changepassword",
      { email, otp, password },
      config
    );
    dispatch({
      type: USER_RESET_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
