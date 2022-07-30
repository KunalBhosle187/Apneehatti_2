import {ORDER_CREATE_FAIL,ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS , ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS,ORDER_LIST_MY_FAIL, ORDER_LIST_MY_RESET, SEND_CONFIRMATION_MAIL_REQUEST, SEND_CONFIRMATION_MAIL_SUCCESS, SEND_CONFIRMATION_MAIL_FAIL} from '../constants/orderConstant';
import { SELLER_ORDER_DELIVERY_REQUEST,
    SELLER_ORDER_DELIVERY_SUCCESS,
    SELLER_ORDER_DELIVERY_FAIL} from "../constants/sellerOrderConstant"

export const orderCreateReducer = (state = {}, action) => {
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return {loading:true}
        case ORDER_CREATE_SUCCESS:
            return{loading:false, success:true , order:action.payload}
        case ORDER_CREATE_FAIL:
            return{loading:false, error:action.payload}
        default:
            return state
    }
}


export const sendEmailReducer = (state = {}, action) => {
    switch(action.type){
        case SEND_CONFIRMATION_MAIL_REQUEST:
            return {loading:true}
        case SEND_CONFIRMATION_MAIL_SUCCESS:
            return{loading:false, success:true , emailSent:action.payload}
        case SEND_CONFIRMATION_MAIL_FAIL:
            return{loading:false, error:action.payload}
        default:
            return state
    }
}

export const orderDetailsReducer = (state = {orderItems:[], loading:true, shippingAddress:{}}, action) => {
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {...state, loading:true}
        case ORDER_DETAILS_SUCCESS:
            return{loading:false, order:action.payload}
        case ORDER_DETAILS_FAIL:
            return{loading:false, error:action.payload}
        default:
            return state
    }
}


export const orderPayReducer = (state = {}, action) => {
    switch(action.type){
        case ORDER_PAY_REQUEST:
            return { loading:true}
        case ORDER_PAY_SUCCESS:
            return{loading:false, success:true}
        case ORDER_PAY_FAIL:
            return{loading:false, error:action.payload}
        case ORDER_PAY_RESET:
            return{}
        default:
            return state
    }
}

export const orderListMyReducer = (state = {orders:[] }, action) => {
    switch(action.type){
        case ORDER_LIST_MY_REQUEST:
            return {loading:true}
        case ORDER_LIST_MY_SUCCESS:
            return{loading:false, orders:action.payload }
        case ORDER_LIST_MY_FAIL:
            return{loading:false, error:action.payload}
        case ORDER_LIST_MY_RESET:
                return {orders:[]};
          
        default:
            return state
    }
}


export const orderDeliverdReducer = (state = {}, action) => {
    switch(action.type){
        case SELLER_ORDER_DELIVERY_REQUEST:
            return { loading:true}
        case SELLER_ORDER_DELIVERY_SUCCESS:
            return{loading:false, success:true}
        case SELLER_ORDER_DELIVERY_FAIL:
            return{loading:false, error:action.payload}
        default:
            return state
    }
}