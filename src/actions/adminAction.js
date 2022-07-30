import axios from "axios";
import { ADMIN_LOG_FAIL, ADMIN_LOG_REQUEST, ADMIN_LOG_SUCCESS, ADMIN_LOGOUT} from "../constants/adminConstant";


export const logout = () => dispatch => {
  localStorage.removeItem('adminInfo')
  dispatch({type:ADMIN_LOGOUT});
}


export const login = (email,password) => async (dispatch) => {
  try {
      dispatch({ type:ADMIN_LOG_REQUEST});
      const config = {headers: {'Content-Type':'application/json'}}
      const {data} = await axios.post(
        '/api/admin/adminlog',
        {email, password},
         config
         );
      dispatch({
          type:ADMIN_LOG_SUCCESS,
          payload:data
      })
      localStorage.setItem('adminInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
        type:ADMIN_LOG_FAIL,
        payload:error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message,
    })
  }
}

