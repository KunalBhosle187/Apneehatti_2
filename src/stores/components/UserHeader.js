import React, { useState  } from "react";
import { Link, withRouter } from "react-router-dom";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from '@mui/icons-material/Home';
import {Button} from "@material-ui/core";


import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import LoginIcon from '@mui/icons-material/Login';
import CancelIcon from '@mui/icons-material/Cancel';
import LogoutIcon from "@mui/icons-material/Logout";


import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DehazeIcon from '@mui/icons-material/Dehaze';


function UserHeader({ history }) {
  const [mobileUserSidemenuCancelBtn , setMobileUserSidemenuCancelBtn] = useState(false)
  const [mobileSidemenuCancelBtn , setMobileSidemenuCancelBtn] = useState(false)
   
  const location = useLocation();
  const store = location.pathname.split("/").slice(1)[0];
  const userLogin = useSelector((state) => state.userLogin);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const category = products && products.map((item) => item.category);
 

  const { userInfo } = userLogin;
  const dispatch = useDispatch();


  const logoutHandler = () => {
    dispatch(logout());
    setMobileUserSidemenuCancelBtn(true)
    history.push("/");
  };
  return (<div>
             {mobileUserSidemenuCancelBtn ? <div className="mobile__user__sidemenu">
              <div className="mobile__user__sidemenu__cancel">
                <CancelIcon onClick={() => setMobileUserSidemenuCancelBtn(false)}/>
              </div>
              <div className="mobile__user__sidemenu__container">
            <h1>Hello Kunal</h1>
            <div>
              <Link to="/user/userprofile" onClick={() => setMobileUserSidemenuCancelBtn(false)}>
              <div className="mobile__user__sidemenu__item" >
                  <PersonIcon/>
                  <h5>Your Profile</h5>
              </div>
              </Link>
              <Link to="/user/myorders" onClick={() => setMobileUserSidemenuCancelBtn(false)}>
              <div  className="mobile__user__sidemenu__item" >
                   <ShoppingCartIcon/>
                  <h5>Your Orders</h5>
              </div>
              </Link>

              <div  className="mobile__user__sidemenu__item"
                                  onClick={logoutHandler}
           >
                   <LogoutIcon/>
                  <h5>Logout</h5>
              </div>
              
            </div>
            </div>
           
</div> : null}

{mobileSidemenuCancelBtn ? <div className="mobile__user__sidemenu d-flex flex-column">
 <div className="mobile__user__sidemenu__browseApneehatti">
 <h2>Browse Apneehatti</h2>
 <CancelIcon onClick={() => setMobileSidemenuCancelBtn(false)}/>
 </div>
 <Link to="/" onClick={() => setMobileSidemenuCancelBtn(false)}>
  <div className="mobile__user__sidemenu__apneehattiHome">
  <h3>Apneehatti Home</h3>
  <HomeIcon/>
  </div>
 </Link>
  <div>
    <h3>Categories For You</h3>
    {
                  store == "store" ?
                  (<div className="mobile__user__sidemenu__categories__list">
                <Link onClick={() => setMobileSidemenuCancelBtn(false)} to="./all"><Button><li>All</li></Button></Link>
                <Link onClick={() => setMobileSidemenuCancelBtn(false)} to="./Men"><Button><li>Men</li></Button></Link>
                <Link onClick={() => setMobileSidemenuCancelBtn(false)} to="./Women"><Button><li>Women</li></Button></Link>
                <Link onClick={() => setMobileSidemenuCancelBtn(false)} to="./Bags & Footwear"><Button><li>Bags & Footwear</li></Button></Link>
                <Link onClick={() => setMobileSidemenuCancelBtn(false)} to="./Home & Kitchen"><Button><li>Home & Kitchen</li></Button></Link>
                <Link onClick={() => setMobileSidemenuCancelBtn(false)} to="./Kids"><Button><li>Kids</li></Button></Link>
                <Link onClick={() => setMobileSidemenuCancelBtn(false)} to="./Electronics"><Button><li>Electronics</li></Button></Link>
                  </div>) : 
                  (<div className="mobile__user__sidemenu__categories__list">
                    <Link onClick={() => setMobileSidemenuCancelBtn(false)} to="store/all"><Button><li >All</li></Button></Link>
                <Link onClick={() => setMobileSidemenuCancelBtn(false)} to="/store/Men"><Button><li>Men</li></Button></Link>
                <Link onClick={() => setMobileSidemenuCancelBtn(false)} to="/store/Women"><Button><li>Women</li></Button></Link>
                <Link onClick={() => setMobileSidemenuCancelBtn(false)} to="/store/Bags & Footwear"><Button><li>Bags & Footwear</li></Button></Link>
                <Link onClick={() => setMobileSidemenuCancelBtn(false)} to="/store/Home & Kitchen"><Button><li>Home & Kitchen</li></Button></Link>
                <Link onClick={() => setMobileSidemenuCancelBtn(false)} to="/store/Kids"><Button><li>Kids</li></Button></Link>
                <Link onClick={() => setMobileSidemenuCancelBtn(false)} to="/store/Electronics"><Button><li>Electronics</li></Button></Link>
                  </div>)
                }
                  {category &&
                  category
                    .filter((q, idx) => category.indexOf(q) === idx)
                    .map((q, index) => (
                      // <Button><li onClick={() => catFilter(q)} key={index}>
                      //   {q}
                      //   {console.log(q)}
                      // </li></Button>

                      <Link onClick={() => setMobileSidemenuCancelBtn(false)} to={`/store/${q}`}>
                      <Button><li className="categoryBeauty"  key={index}>
                      {q}
                    </li></Button>
                    </Link>
                    ))}
  </div>

</div> : null }


  
 </div> );
}

export default withRouter(UserHeader);
