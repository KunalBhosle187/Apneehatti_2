import axios from "axios";
import { DELIVERY_FAIL, DELIVERY_REQUEST, DELIVERY_SUCCESS } from "../../constants/deliveryConstant";

export const createDeliveryOrder = (deliveryOrdCreate) => async (dispatch, getState) => {
    try {
        dispatch({type:DELIVERY_REQUEST})
        const {
            userLogin:{userInfo}} = getState();
        const config = {headers: {'Content-Type':'application/json',
         Authorization:`Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIwMTgxMTMsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjQwMzIyNzg4LCJleHAiOjE2NDExODY3ODgsIm5iZiI6MTY0MDMyMjc4OCwianRpIjoiMkpNcmREdk05cGhrczByciJ9.QpCA2NAQht7hPZ-VtWF_A95bV-7Dh8rBP3ae91yxyNw`}};
         const {data} = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',deliveryOrdCreate,config)
         dispatch({type:DELIVERY_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:DELIVERY_FAIL , 
            payload:error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,})
    }
}