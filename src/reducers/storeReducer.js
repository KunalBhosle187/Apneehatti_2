import {STORES_REQUEST, STORES_SUCCESS, STORES_FAIL} from "../constants/storeConstant"


export const storesReducer = (state = {storesList:[]},action) => {
    switch(action.type){
        case STORES_REQUEST:
            return {loading:true, storesList:[]}
       case STORES_SUCCESS:
           return {loading:false, storesList:action.payload}
       case STORES_FAIL:
           return{loading:false, error:action.payload}
       default:
           return state;
    }
   } ;