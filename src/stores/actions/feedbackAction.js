import axios from "axios";
import { FEEDBACK_FAIL, FEEDBACK_REQUEST, FEEDBACK_SUCCESS } from "../../constants/feedbackConstant";

export const feedbackFromUser = ( feedback , userInfo ) => async (dispatch) => {
    try {
        dispatch({ type:FEEDBACK_REQUEST});
        const config = {headers: {'Content-Type':'application/json'}};
        const {data} = await axios.post(
          '/api/feedback',
          { feedback , userInfo },
          config)
        dispatch({
            type:FEEDBACK_SUCCESS,
            payload:data
        })
    } catch (error) {
      dispatch({
          type:FEEDBACK_FAIL,
          payload:error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
      })
    }
  }