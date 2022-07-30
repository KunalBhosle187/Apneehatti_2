import React from "react";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { logout } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, withRouter } from "react-router-dom";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import LoginIcon from '@mui/icons-material/Login';

const AdminHeader = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    window.location.href = "/";
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg mobileNav  navbar-dark py-2">
        <div className="container-fluid row-cols-3 justify-content-around align-items-center col-sm-12 ">
          <div className="HeaderImgContainer col-lg-3 col-sm-4">
            <img src="/pictures/apneehatti_logo.svg" />
          </div>
          <div
            className="collapse navbar-collapse storeMenu_md"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a color="black" href="#">
                  HOME
                </a>
              </li>
              <li className="nav-item">
                <a href="#">SERVICES</a>
              </li>
              <li className="nav-item">
                <a href="#">CONTACT US</a>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center col-sm-9">
           {!userInfo ? ( <Link to="/login" className="mx-3 col-sm-3">
              <div className="d-flex storeMenu_rt align-items-center">
                <LoginIcon />
                <h7 className="mx-3 fw-bold">Login</h7>
              </div>
            </Link>):(
               <Link to="./user/profile" className="mx-3 col-sm-3">
               <div className="d-flex storeMenu_rt align-items-center">
                 <PersonOutlineOutlinedIcon />
                 <h7 className="mx-3 fw-bold">{userInfo.name}</h7>
               </div>
             </Link>
 
            )
}
         { userInfo ?  <div
              className="dropdown_option d-flex align-items-center mx-3 "
              onClick={logoutHandler}
            >
              <LogoutIcon />
              <h7 className="fw-bold">Logout</h7>
            </div> : null}
            <button
              className="navbar-toggler me-5"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <ClearAllIcon className="navbar-toggler-icon border-0" />
            </button>
          </div>
        </div>
      </nav>

      <nav className="navbar desktopNav  navbar-dark py-2">
        <div className="container-fluid d-flex justify-content-between px-5 ">
        
          <div className="HeaderImgContainer ">
            <img src="/pictures/apneehatti_logo.svg" />
          </div>
          
          <div className="storeMenu_md d-flex ">
            <a className="" href="#">
              HOME
            </a>

            <a className="" href="#">
              SERVICES
            </a>

            <a className="" href="#">
              CONTACT US
            </a>
          </div>
        
          <div className="d-flex align-items-center ">
            {!userInfo ? (
               <Link to="/login" className="mx-3 ">
               <div className="d-flex storeMenu_rt align-items-center">
                 <LoginIcon />
                 <h7 className="mx-3 fw-bold">Login</h7>
               </div>
             </Link>
            ) : (
              <Link to="./user/profile" className="mx-3 ">
              <div className="d-flex storeMenu_rt align-items-center">
                <PersonOutlineOutlinedIcon />
                <h7 className="mx-3 fw-bold">{userInfo.name}</h7>
              </div>
            </Link>
            )}
           

            {userInfo ? <div
              className="dropdown_option d-flex align-items-center mx-3 "
              onClick={logoutHandler}
            >
              <LogoutIcon />
              <h7 className="fw-bold">Logout</h7>
            </div> : null}
          </div>
        
        </div>
      </nav>
    </div>
  );
};

export default withRouter(AdminHeader);
