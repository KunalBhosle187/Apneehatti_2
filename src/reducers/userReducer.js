import {USER_LOGIN_REQUEST,
        USER_LOGIN_SUCCESS,
        USER_LOGIN_FAIL ,
        USER_LOGOUT, 
        USER_REG_REQUEST,
         USER_REG_SUCCESS, 
         USER_REG_FAIL,USER_DETAIL_REQUEST,USER_DETAIL_SUCCESS,
         USER_DETAIL_FAIL ,
         USER_DETAIL_UPDATE_REQUEST,
          USER_DETAIL_UPDATE_SUCCESS,
           USER_DETAIL_UPDATE_FAIL,
            USER_DETAIL_RESET,
            USER_FORGOT_PASSWORD_REQUEST,
            USER_FORGOT_PASSWORD_SUCCESS,
            USER_FORGOT_PASSWORD_FAIL, USER_RESET_PASSWORD_REQUEST, USER_RESET_PASSWORD_SUCCESS,USER_RESET_PASSWORD_FAIL} from "../constants/userConstant"

export const userLoginReducer = (state={ }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading:true
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading:false, userInfo:action.payload
            }
        case USER_LOGIN_FAIL:
            return{
                loading:false, error:action.payload
            }
        case USER_LOGOUT:
            return{}
            
        default:
            return state;
    }
}

export const userRegisterReducer = (state={ }, action) => {
    switch (action.type) {
        case USER_REG_REQUEST:
            return {
                loading:true
            }
        case USER_REG_SUCCESS:
            return {
                loading:false, userInfo:action.payload
            }
        case USER_REG_FAIL:
            return{
                loading:false, error:action.payload
            }
     
            
        default:
            return state;
    }
}

export const userDetailsReducer = (state = {user:{}}, action) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST:
            return {...state,loading:true   }
        case USER_DETAIL_SUCCESS:
            return { loading:false, user:action.payload}
        case USER_DETAIL_FAIL:
            return{  loading:false, error:action.payload }
        case USER_DETAIL_RESET:
            return {user:{}}
     
        default:
            return state;
    }

}

export const userUpdateProfileReducer = (state={}, action)=>{
    switch (action.type) {
        case USER_DETAIL_UPDATE_REQUEST:
            return {loading:true   }
        case USER_DETAIL_UPDATE_SUCCESS:
            return { loading:false, success:true, userInfo:action.payload}
        case USER_DETAIL_UPDATE_FAIL:      
            return{  loading:false, error:action.payload }
     
        default:
            return state;
    }
}

export const userForgotPasswordReducer = (state={}, action)=>{
    switch (action.type) {
        case USER_FORGOT_PASSWORD_REQUEST:
            return {loading:true   }
        case USER_FORGOT_PASSWORD_SUCCESS:
            return { loading:false,  userInfo:action.payload}
        case USER_FORGOT_PASSWORD_FAIL:      
            return{  loading:false, error:action.payload }
     
        default:
            return state;
    }
}

export const userResetPasswordReducer = (state={}, action)=>{
    switch (action.type) {
        case USER_RESET_PASSWORD_REQUEST:
            return {loading:true   }
        case USER_RESET_PASSWORD_SUCCESS:
            return { loading:false,  userInfo:action.payload}
        case USER_RESET_PASSWORD_FAIL:      
            return{  loading:false, error:action.payload }
     
        default:
            return state;
    }
}