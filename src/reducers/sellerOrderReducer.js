import{SELLER_ORDER_DETAILS_REQUEST,
SELLER_ORDER_DETAILS_SUCCESS,
SELLER_ORDER_DETAILS_FAIL, SELLER_ORDER_DETAILS_RESET, PENDING_ORDERS, SHIPPED_ORDERS_REQUEST, SHIPPED_ORDERS_SUCCESS, SHIPPED_ORDERS_FAIL, PENDING_ORDERS_REQUEST, PENDING_ORDERS_SUCCESS, PENDING_ORDERS_FAIL, SEARCH_ORDERS_REQUEST, SEARCH_ORDERS_SUCCESS, SEARCH_ORDERS_FAIL} from "../constants/sellerOrderConstant"

export const orderListReducer = (state = {orderReq:[]}, action) => {
    switch(action.type){
        case SELLER_ORDER_DETAILS_REQUEST:
            return {loading:true, orderReq:[] }
            
       case SELLER_ORDER_DETAILS_SUCCESS:
           return {
             loading:false,
             orderReq:action.payload,
          
             }

        
       case SELLER_ORDER_DETAILS_FAIL:
           return{loading:false, error:action.payload}
       case SELLER_ORDER_DETAILS_RESET:
            return{ orderReq:[]}   
       default:
           return state;
    }
    
   } ;


   export const orderShippedListReducer = (state = {shippedOrders:[]}, action) => {
    switch(action.type){
        case SHIPPED_ORDERS_REQUEST:
            return {loading:true, shippedOrders:[] }
            
       case SHIPPED_ORDERS_SUCCESS:
           return {
             loading:false,
             shippedOrders:action.shippedOrd
             .filter((x) => {
                x.orderItems = x.orderItems.filter((s) => ( s.DeleveredAt ))
                return x.orderItems.length;
                }),
             }
            
       case SHIPPED_ORDERS_FAIL:
           return{loading:false, error:action.shippedOrd}
       default:
           return state;
    }
    
   } ;   


   export const orderPendingListReducer = (state = {pendingOrders:[]}, action) => {
    switch(action.type){
        case PENDING_ORDERS_REQUEST:
            return {loading:true, pendingOrders:[] }
            
       case PENDING_ORDERS_SUCCESS:
           return {
             loading:false,
             pendingOrders:action.pendingOrd
             .filter((x) => {
                x.orderItems = x.orderItems.filter((s) => ( !s.DeleveredAt ))
                return x.orderItems.length;
                }),
             }
            
       case PENDING_ORDERS_FAIL:
           return{loading:false, error:action.pendingOrd}
       default:
           return state;
    }
    
   } ;

  
   export const searchOrderListReducer = (state = {searchOrders:[] }, action) => {
    switch(action.type){
        case SEARCH_ORDERS_REQUEST:
            return {loading:true, searchOrders:[] }
            
       case SEARCH_ORDERS_SUCCESS:
           const {searchOrd , searchKey} = action
           const filtered =  searchOrd
           .filter((x) => (x._id)?.toLowerCase().includes(searchKey?.toLowerCase() || " ") ||  x.orderItems.some(y => (y.title).toLowerCase().includes(searchKey.toLowerCase() || '')) ||
           x.orderItems.some(y => (y.isDelevered ? "shipped" : "pending").toLowerCase().includes(searchKey.toLowerCase() || '')))
           return {
            ...state,
             loading:false,
             searchOrders : filtered
             }
            
       case SEARCH_ORDERS_FAIL:
           return{loading:false, error:action.pendingOrd}
       default:
           return state;
    }
    
   } ;   