import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { login } from "../actions/sellerAction";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const SellerLogin = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search
    ? location.search.split("=")[1]
    : "./sellerdashboard";
  const dispatch = useDispatch();
  const sellerLog = useSelector((state) => state.sellerLog);
  const { loading, error, sellerInfo } = sellerLog;

  useEffect(() => {
    //  window.location.reload()
    if (sellerInfo) {
      history.push(redirect);
    } else {
      history.push("./seller");
    }
  }, [history, sellerInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(login(email, password));
  };
  return (
    <div className="signInBg container-md">
      <div>
        {error && <Alert severity="error">{error}</Alert>}
        {loading && <CircularProgress />}
        {loading}
      </div>

      <h3 className="fw-bold pt-3 ">Apneehatti</h3>

      <form
        onSubmit={submitHandler}
        className="d-flex justify-content-center align-items-center mt-5"
      >
        <div className="col">
          <div className="signin">
            <div className="formcontainer">
              <div className="">
                <h6 className="fw-bold mb-4">Login to your seller dashboard</h6>
                <div className="inputField">
                  <input
                    className="form_input"
                    type="email"
                    id="semail"
                    name="semail"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="inputField">
                  <input
                    className="form_input"
                    type="password"
                    id="spassword"
                    name="spassword"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="forgotPasswordContainer">
                  <a
                    className="forgotPassword text-end mb-1"
                    href="/forgotpassword"
                  >
                    Recover Password
                  </a>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Log In
                </Button>

                <p className="mt-2">For Seller Registration Contact to Admin</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col sellerLoginImg">
          <img
            src="/pictures/undraw_business_deal_cpi9.svg"
            width="400px"
            height="400px"
          />
        </div>
      </form>
    </div>
  );
};

export default withRouter(SellerLogin);
