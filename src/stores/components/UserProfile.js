import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, Route, withRouter } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import { logout } from "../../actions/userAction";

import LocalMallIcon from "@mui/icons-material/LocalMall";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import UserOrder from "./UserOrder";
import UserProfileInfo from "./UserProfileInfo";
import Header from "../../components/Header";

const UserProfile = ({ location, history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <>
      <Header />
      <div className="userProfile">
        <div className="Profile">
          <div className="reg">
            <div className="userProfile__container">
              <div className=" userProfile__sidebar mt-2 ">
                <div className="userProfile__sidebar_userInfo ">
                  <li className="userProfile__sidebar__hello">Hello,</li>
                  <li className="userProfile__sidebar__name">{user.name}</li>
                </div>
                <div className="mt-3 userProfile__sidebar__sidebar ">
                  <Link to="/user/userprofile">
                    <li className="easy__filter">
                      <h5>Profile</h5> <PersonIcon className="me-3" />
                    </li>
                  </Link>
                  <Link to="/user/myorders">
                    <li className="easy__filter">
                      <h5>Orders</h5> <LocalMallIcon className="me-3" />
                    </li>
                  </Link>
                </div>
              </div>
              <div className="">
                <Route path="/user">
                  <Redirect to="/user/userprofile" />
                </Route>
                <Route path="/user/myorders" component={UserOrder} />
                <Route path="/user/userprofile" component={UserProfileInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(UserProfile);
