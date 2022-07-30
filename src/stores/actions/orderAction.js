import axios from 'axios'
import {ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL,ORDER_CREATE_REQUEST, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_FAIL, ORDER_PAY_SUCCESS, ORDER_PAY_REQUEST, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS,
     ORDER_LIST_MY_FAIL,
     SEND_CONFIRMATION_MAIL_REQUEST,
     SEND_CONFIRMATION_MAIL_SUCCESS,
     SEND_CONFIRMATION_MAIL_FAIL,
   } from "../../constants/orderConstant"

import { SELLER_ORDER_DELIVERY_REQUEST,
    SELLER_ORDER_DELIVERY_SUCCESS,
    SELLER_ORDER_DELIVERY_FAIL} from "../../constants/sellerOrderConstant"

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({type:ORDER_CREATE_REQUEST})
        const {
            userLogin:{userInfo}} = getState();
        const config = {headers: {'Content-Type':'application/json',
         Authorization:`Bearer ${userInfo.token}`}};
         const {data} = await axios.post('/api/orders',order,config)
         dispatch({type:ORDER_CREATE_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:ORDER_CREATE_FAIL , 
            payload:error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,})
    }
}

export const sendEmail = (emailSent) => async (dispatch, getState) => {
    try {
        dispatch({type:SEND_CONFIRMATION_MAIL_REQUEST})
        const {
            userLogin:{userInfo}} = getState();
        const config = {headers: {'Content-Type':'application/json',
         Authorization:`Bearer ${userInfo.token}`}};
         const {data} = await axios.post('/api/orders/sendConfirmationMail', emailSent ,config)
         dispatch({type:SEND_CONFIRMATION_MAIL_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:SEND_CONFIRMATION_MAIL_FAIL , 
            payload:error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,})
    }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({type:ORDER_DETAILS_REQUEST})
        const {
            userLogin:{userInfo}} = getState();
            const config = {
                headers: {Authorization:`Bearer ${userInfo.token}`,
            },
        };
            const {data} = await axios.get(`/api/orders/${id}`,config)
            dispatch({type:ORDER_DETAILS_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:ORDER_DETAILS_FAIL , 
            payload:error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,})
    }
}

export const payOrder = (orderId , paymentResults) => async (dispatch, getState) => {
    try {
        dispatch({type:ORDER_PAY_REQUEST})
        const {
            userLogin:{userInfo}} = getState();
            const config = {
                headers: {
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${userInfo.token}`,
            },
        };
            const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResults, config)
            dispatch({type:ORDER_PAY_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:ORDER_PAY_FAIL , 
            payload:error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,})
    }
}

export const ListMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({type:ORDER_LIST_MY_REQUEST})
        const {
            userLogin:{userInfo}} = getState();
            const config = {
                headers: {Authorization:`Bearer ${userInfo.token}`,
            },
        };  
            
            const {data} = await axios.get('/api/orders/myorders', config)
            dispatch({type:ORDER_LIST_MY_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:ORDER_LIST_MY_FAIL , 
            payload:error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,})
    }
}


export const deliverdOrder = (orderId , productID ) => async (dispatch, getState) => {
    try {
        dispatch({type:SELLER_ORDER_DELIVERY_REQUEST})
        const {
            userLogin:{userInfo}} = getState();
            const config = {
                headers: {
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${userInfo.token}`,
            },
        };
            const {data} = await axios.put(`/api/orders/${orderId}/${productID}/delivered`, config)
            dispatch({type:SELLER_ORDER_DELIVERY_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:SELLER_ORDER_DELIVERY_FAIL , 
            payload:error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,})
    }
}