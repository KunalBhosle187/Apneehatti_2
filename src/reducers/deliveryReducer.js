import { DELIVERY_FAIL, DELIVERY_REQUEST, DELIVERY_SUCCESS } from "../constants/deliveryConstant"

export const deliveryOrderCreateReducer = (state = {}, action) => {
    switch(action.type){
        case DELIVERY_REQUEST:
            return {loading:true}
        case DELIVERY_SUCCESS:
            return{loading:false, success:true , deliveryOrdCreate:action.payload}
        case DELIVERY_FAIL:
            return{loading:false, error:action.payload}
        default:
            return state
    }
}