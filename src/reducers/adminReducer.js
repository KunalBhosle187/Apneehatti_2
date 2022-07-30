import {ADMIN_LOG_REQUEST,
    ADMIN_LOG_SUCCESS,
    ADMIN_LOG_FAIL ,
    ADMIN_LOGOUT, } from "../constants/adminConstant"

export const adminLoginReducer = (state={ }, action) => {
switch (action.type) {
    case ADMIN_LOG_REQUEST:
        return {
            loading:true
        }
    case ADMIN_LOG_SUCCESS:
        return {
            loading:false, adminInfo:action.payload
        }
    case ADMIN_LOG_FAIL:
        return{
            loading:false, error:action.payload
        }
    case ADMIN_LOGOUT:
        return{}
        
    default:
        return state;
}
}

