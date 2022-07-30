import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Register } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";
import validator from "validator";
import { Alert } from "@mui/material";

const Registration = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState();
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [message, setMessage] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    if (name && email && mobile && password) {
      if (name && !validator.matches(name, "^[a-zA-Z]{2,40} [a-zA-Z]{2,40}$")) {
        setMessage("Name is not valid");
      } else if (email && !validator.isEmail(email)) {
        setMessage("Email Not Valid");
      } else if (mobile && !validator.isMobilePhone(mobile, "en-IN")) {
        setMessage("Mobile Number is Invalid");
      } else if (password !== cpassword) {
        setMessage("Password do not match");
      } else {
        dispatch(Register(name, email, mobile, password));
      }
    } else {
      setMessage("Fill all the fields");
    }
  };

  return (
    <div className="col-sm col-lg-6 row p-4 loginForm  ">
      <div className="col-lg-3 login__tagline ">
        <h3>Get Access to Your Profile</h3>
        <img src="/pictures/apneehatti_logo.svg" />
      </div>
      <div className="signin col-lg-9 d-flex justify-content-center align-items-center">
        <div className="formSignUpContainer col-md-12 col-sm justify-content-center">
          <div>
            {name && password && email && mobile
              ? error && (
                  <Alert severity="error" variant="filled">
                    {error}
                  </Alert>
                )
              : message && (
                  <Alert severity="error" variant="filled">
                    {message}
                  </Alert>
                )}

            {loading && <CircularProgress />}
          </div>

          <h6 className="fw-bold mb-4 text-uppercase">Register your account</h6>
          <form
            autoComplete="off"
            onSubmit={submitHandler}
            className="formsection"
          >
            <div className="inputField">
              <label className="form__label">
                <span>Full Name</span>
              </label>
              <input
                className="form_input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="inputField">
              <label className="form__label">
                <span>Email</span>
              </label>
              <input
                className="form_input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="inputField">
              <label className="form__label">
                <span>Mobile Number</span>
              </label>
              <input
                className="form_input"
                type="text"
                maxLength="10"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <div className="inputField">
              <label className="form__label">
                <span>Password</span>
              </label>
              <input
                className="form_input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="inputField">
              <label className="form__label">
                <span>Confirm Password</span>
              </label>
              <input
                className="form_input"
                type="password"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </div>
          </form>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            type="submit"
            className="formbtn"
          >
            Register
          </Button>
          <p>
            Have An Account ! &nbsp;
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Registration);
