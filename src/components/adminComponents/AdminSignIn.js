import React, { useState , useEffect} from 'react'
import { Link, withRouter,  } from "react-router-dom";
import { login } from "../../actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CircularProgress,  } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

const AdminSignIn = ({location, history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const redirect = location.search ? location.search.split("=")[1] : "/admindash";
    const dispatch = useDispatch();
    const adminLogin = useSelector((state) => state.adminLogin);
    const { loading, error, adminInfo } = adminLogin;
  
    useEffect(() => {
      if (adminInfo) {
        history.push(redirect);
      }
    }, [history, adminInfo, redirect]);
  
    const submitHandler = (e) => {
      e.preventDefault();
      //dispatch
      dispatch(login(email, password));
    };
    return (
      <div className="adminLogBg container-fluid d-flex justify-content-center align-items-center">    
        <form onSubmit={submitHandler }className="adminForm"> 
        <div>
          {error && <Alert severity="error">{error}</Alert>}
          {loading && <CircularProgress />}
          {loading}
        </div>
           <div className="col-2">
  <div className="signin">
            <div className="formcontainer">
              <div className="formsection">
              <h6 className="fw-bold mb-4" >Login to admin account</h6>
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
                </div>
                <Button variant="contained" color="primary" type="submit" fullWidth>Log In</Button>
  
               
              </div>
            </div>
          </div>
           
  </div>
        </form>
        <div className="bg-white d-flex justify-content-center align-items-center " style={{width:"336px", height:"237px", paddingRight:"20px",fontFamily: "fantasy"}}>
          <h1>ADMIN LOGIN</h1>
        </div>
        </div>
    );
  };

export default withRouter(AdminSignIn)
