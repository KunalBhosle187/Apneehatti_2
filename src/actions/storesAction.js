import axios from "axios";
import {STORES_REQUEST, STORES_SUCCESS, STORES_FAIL} from "../constants/storeConstant"


export const Stores = () => async (dispatch) => {
    try {
        dispatch({type:STORES_REQUEST});
         const {data} = await axios.get('/api/store/store');
         dispatch({
             type:STORES_SUCCESS,
             payload:data
         })
    } catch (error) {
        dispatch({
            type:STORES_FAIL,
            payload:error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
  };