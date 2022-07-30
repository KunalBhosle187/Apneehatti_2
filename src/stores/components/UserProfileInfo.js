import React, { useEffect, useState } from "react";
import { getUserDetails, updateUserProfile } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Icon,
  Table,
} from "@material-ui/core";
import { ListMyOrders } from "../actions/orderAction";
import dateFormat from "dateformat";
import Alert from "@material-ui/lab/Alert";
import validator from "validator";

const UserProfileInfo = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [inputDisable, setInputDisable] = useState(true);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const { loading, error, user } = userDetails;
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!user.name) {
      dispatch(getUserDetails("profile"));
    } else {
      setName(user.name);
      setEmail(user.email);
      setMobile(user.mobile);
    }
  }, [user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    if (!validator.isMobilePhone(mobile, ["en-IN"])) {
      setMessage("Invalid Mobile Number");
    } else if (password.length < 6) {
      setMessage("Password Must be 6 character");
    } else if (name.length == 0) {
      setMessage("Please Enter Your Name");
    } else if (!validator.isEmail(email)) {
      setMessage("Invalid Email Address");
    } else {
      dispatch(
        updateUserProfile({ id: user._id, name, email, mobile, password })
      );
      window.location.reload();
    }
  };

  return (
    <div>
      <div>
        {message && (
          <Alert severity="error" variant="filled">
            {message}
          </Alert>
        )}
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="filled" severity="success">
            Profile Updated
          </Alert>
        )}

        {loading && <CircularProgress />}
      </div>
      <div className="userProfileContainer ">
        <div className="yourProfileContainer ">
          <div className="profileHeader">
            <div>
              <h3>Profile</h3>
              <h6>Update your personal details</h6>
            </div>
            {!visible ? (
              <button className="btn" onClick={() => setVisible(true)}>
                <span>update</span>
              </button>
            ) : (
              <div className="d-flex align-items-center">
                <Button onClick={() => setVisible(false)}>Cancel</Button>
                <button className="btn">
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>
          {!visible ? (
            <div className="profileGrid">
              <h5>Username</h5>
              <h6>{name}</h6>
              <h5>Email</h5>
              <h6>{email}</h6>
              <h5>Mobile No</h5>
              <h6>{mobile}</h6>
            </div>
          ) : (
            <div className="profileGrid">
              <h5>Username</h5>
              <input type="text" name="name" required />
              <h5>Email</h5>
              <input type="email" name="email" required />
              <h5>Mobile No</h5>
              <input type="number" name="mobileNo" required />
              <h5>Password</h5>
              <input type="password" name="password" required />
              <h5>Confirm Password</h5>
              <input type="text" required />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
