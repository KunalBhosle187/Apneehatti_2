import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../actions/userAction";
import Alert from '@material-ui/lab/Alert';
import { CircularProgress , Button} from "@material-ui/core";

const ForgotPassword = ({history}) => {
    const [femail, setFemail] = useState();
    const dispatch = useDispatch();
    const userForgotPassword = useSelector((state) => state.userForgotPassword);
    const { loading, error   } = userForgotPassword;


    const submitHandler = (e) =>{
        e.preventDefault();
        //dispatch
        dispatch(forgotPassword(femail))
    }



  return (
  <div className="container-fluid">
    <div className="forgot d-flex ">
        <div className="col-8">
          <img src="/pictures/undraw_forgot_password_gi2d.svg" width="100%" height="100%"/>
        </div>

            <form onSubmit={submitHandler} className="forgotContainer d-flex justify-content-center  flex-column h-100 d-inline-block col-4 px-3 py-3 ">
            <div>
            {error && <Alert severity="info" variant="standard" colo="primary" >{error}</Alert>}
        {loading && <CircularProgress />}
        {loading}
      </div>
          <h4 className="fw-bolder mb-3">Recover Password</h4>
          <h6>Don't worry, we got you</h6>
          <h7>Enter the email address associated with your account , We will send you an email with OTP to recover your password</h7>
        <div className="mt-3 inputField">
  
          <input
            type="text"
            className="form_input"
            id="formGroupExampleInput"
            placeholder="Your email"
            value={femail}
            onChange={(e)=> setFemail(e.target.value)}
          />
        </div>
       <Button  type="submit" >Send OTP</Button>
      </form>
    </div>
    </div>
  );
};

export default ForgotPassword;
