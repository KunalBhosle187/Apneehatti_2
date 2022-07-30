import { CircularProgress , Button} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../actions/userAction";
import Alert from '@material-ui/lab/Alert';


const ResetPassword = ({history}) => {
    const [femail, setFemail] = useState();
    const [fpassword, setFpassword] = useState();
    const [fcpassword, setFcpassword] = useState();
    const [otp, setOtp] = useState();

    const dispatch = useDispatch();
    const userResetPassword = useSelector((state) => state.userResetPassword);
    const { loading, error } = userResetPassword;


    const submitHandler = (e) =>{
        e.preventDefault();
        //dispatch
        if(fpassword == fcpassword){
            dispatch(resetPassword(femail ,otp, fpassword ))
        }
        // history.push("./login")

    }



  return (

    <div className="resetpassword container-fluid bg-white   ">
        <nav className="navbar navbar-light bg-light ">
  <div className="container-fluid">
    <span className="navbar-brand mb-0 h1">Apneehatti</span>
  </div>
</nav>
      

<div className="mt-5 d-flex flex-column align-items-center justify-content-center  ">


   <h2 className="fw-bolder mb-3">Set up your new password</h2>
   <div>
        {error && <Alert severity="info">{error}</Alert>}
        {loading && <CircularProgress />}
        {loading}
      </div>
      <form onSubmit={submitHandler} className="col-4 bg-white px-5 py-3" >
         
        <div className="mb-3 inputField">
          <input
            type="text"
            id="formGroupExampleInput"
            placeholder="Your email"
            value={femail}
            onChange={(e)=> setFemail(e.target.value)}
          />
        </div>
        <div className="mb-3 inputField">
          <input
            type="text"
            id="formGroupExampleInput"
            value={otp}
            placeholder="Enter OTP"
            maxLength="4"
            onChange={(e)=> setOtp(e.target.value)}
          />
        </div>
        <div className="mb-3 inputField">
          <input
            type="password"
            id="formGroupExampleInput"
            value={fpassword}
            placeholder="New password"
            onChange={(e)=> setFpassword(e.target.value)}
          />
        </div>
        <div className="mb-3 inputField">
          <input
            type="password"
            id="formGroupExampleInput"
            value={fcpassword}
            placeholder="Confirm password"
            onChange={(e)=> setFcpassword(e.target.value)}
          />
        </div>
        <Button className="w-100 p-3 fw-bold fs-7 " type="submit"  >Reset Password</Button>
      </form>
      </div>
      </div>

  );
};

export default ResetPassword;
