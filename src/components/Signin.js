import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { login } from "../actions/userAction";
import { Register } from "../actions/userAction";

import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import validator from "validator";
import { XIcon } from "@heroicons/react/solid";

const Signin = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/store";
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const [newUser, setnewUser] = useState(true);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login(email, password));
    } else {
      setMessage("Fill all the field");
    }
  };

  const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState();
  // const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  // const [message, setMessage] = useState("");

  // const redirect = location.search ? location.search.split("=")[1] : "/";
  // // const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading: regloading, error: regerror } = userRegister;
  const [loginStatus, setLoginStatus] = useState(false);

  const registerSubmitHandler = (e) => {
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
        console.log("check dispatch");
        dispatch(Register(name, email, mobile, password));
        console.log("register successfully");
      }
    } else {
      setMessage("Fill all the fields");
    }
  };

  return (
    <>
      <div className="z-40 fixed top-0 bottom-0 w-full h-screen bg-slate-500 bg-opacity-40 ">
        <div className=" flex items-center justify-center h-full w-full">
          <div className="  bg-white border overflow-auto h-fit w-full mx-8 p-5    ">
            <div className="flex justify-center">
              <img src="/pictures/AH_letter_logo.png" className="p-2 h-20 " />
            </div>
            {newUser ? (
              <div>
                <form onSubmit={loginSubmitHandler}>
                  {error && (
                    <div
                      id="alert-border-2"
                      class="flex p-4 mb-4 bg-red-100 border-t-4 border-red-500 dark:bg-red-200"
                      role="alert"
                    >
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-red-700"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <div class="ml-3 text-sm font-medium text-red-700">
                        {error}
                      </div>
                      <button
                        type="button"
                        class="ml-auto -mx-1.5 -my-1.5 bg-red-100 dark:bg-red-200 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 dark:hover:bg-red-300 inline-flex h-8 w-8"
                        data-dismiss-target="#alert-border-2"
                        aria-label="Close"
                      >
                        <span class="sr-only">Dismiss</span>
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  )}

                  <div class="mb-6">
                    <label
                      for="semail"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="semail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@flowbite.com"
                      required=""
                    />
                  </div>
                  <div class="mb-6">
                    <label
                      for="spassword"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Your password
                    </label>
                    <input
                      type="password"
                      id="spassword"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div class="flex items-start mb-6">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <label
                      for="remember"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-center mt-8">
                    <button
                      type="submit"
                      class="text-white mb-2 w-48 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Sign in
                    </button>
                    <label
                      for="terms"
                      class=" block text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      New to apneehatti ?
                      <a
                        href="#"
                        class="text-blue-600 hover:underline dark:text-blue-500"
                        onClick={() => setnewUser(false)}
                      >
                        &nbsp;Create account
                      </a>
                    </label>
                  </div>
                </form>

                {/* <form
              onSubmit={loginSubmitHandler}
              className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex flex-wrap  p-4  loginForm"
            >
              <div className="col-lg-4 col-md-4 login__tagline hidden">
                <h3>Local Roots, Global Reach</h3>
                <img src="/pictures/apneehatti_logo.svg" />
              </div>

              <div className="signin col-lg-8 col-md-7 col-sm-12 col-12 d-flex justify-content-center align-items-center">
                <div className="formcontainer">
                  {error && <Alert severity="error">{error}</Alert>}

                  <div className="formLoginSection">
                    <h6 className="fw-bold mb-4">Login to your account</h6>
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
                      <div className="forgotPasswordContainer text-end">
                        <a
                          className="forgotPassword mb-1 "
                          href="/forgotpassword"
                        >
                          <strong>Recover Password</strong>
                        </a>
                      </div>
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

                    <Button variant="contained" type="submit" fullWidth>
                      Log In
                    </Button>

                    <p className="mt-2">
                      New To Apneehatti ? &nbsp;{" "}
                      <span onClick={() => setnewUser(false)}>Sign Up</span>
                    </p>
                  </div>
                </div>
              </div>
            </form> */}
              </div>
            ) : (
              <div className="p-4  max-h-72 overflow-y-scroll ">
                <div className="hidden">
                  <h3>Local Roots , Global Reach</h3>
                  <img src="/pictures/apneehatti_logo.svg" />
                </div>

                <form onSubmit={registerSubmitHandler} className="">
                  {regerror && (
                    <div
                      id="alert-border-2"
                      class="flex p-4 mb-4 bg-red-100 border-t-4 border-red-500 dark:bg-red-200"
                      role="alert"
                    >
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-red-700"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <div class="ml-3 text-sm font-medium text-red-700">
                        {regerror}
                      </div>
                      <button
                        type="button"
                        class="ml-auto -mx-1.5 -my-1.5 bg-red-100 dark:bg-red-200 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 dark:hover:bg-red-300 inline-flex h-8 w-8"
                        data-dismiss-target="#alert-border-2"
                        aria-label="Close"
                      >
                        <span class="sr-only">Dismiss</span>
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  )}
                  {regloading && <CircularProgress />}
                  {message && (
                    <div
                      id="alert-border-2"
                      class="flex p-4 mb-4 bg-red-100 border-t-4 border-red-500 dark:bg-red-200"
                      role="alert"
                    >
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-red-700"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <div class="ml-3 text-sm font-medium text-red-700">
                        {message}
                      </div>
                      <button
                        type="button"
                        class="ml-auto -mx-1.5 -my-1.5 bg-red-100 dark:bg-red-200 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 dark:hover:bg-red-300 inline-flex h-8 w-8"
                        data-dismiss-target="#alert-border-2"
                        aria-label="Close"
                      >
                        <span class="sr-only">Dismiss</span>
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  )}

                  <div class="mb-6">
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      placeholder="name@gmail.com"
                      required=""
                    />
                  </div>
                  <div class="mb-6">
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      required=""
                    />
                  </div>
                  <div class="mb-6">
                    <label
                      for="mobile"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="number"
                      id="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      required=""
                    />
                  </div>
                  <div class="mb-6">
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Your password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      required=""
                    />
                  </div>
                  <div class="mb-6">
                    <label
                      for="repeat-password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Repeat password
                    </label>
                    <input
                      type="password"
                      id="repeat-password"
                      value={cpassword}
                      onChange={(e) => setCPassword(e.target.value)}
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      required=""
                    />
                  </div>
                  <div class="flex items-start ">
                    <div class="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>

                    <label
                      for="terms"
                      class="ml-2 text-sm font-medium block text-gray-900 dark:text-gray-300"
                    >
                      I agree with the{" "}
                      <a
                        href="#"
                        class="text-blue-600 hover:underline dark:text-blue-500"
                      >
                        terms and conditions
                      </a>
                    </label>
                  </div>

                  <div className="text-center mt-8">
                    <button
                      type="submit"
                      class="text-white mb-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Register new account
                    </button>
                    <label
                      for="terms"
                      class=" block text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Have an account !
                      <a
                        href="#"
                        class="text-blue-600 hover:underline dark:text-blue-500"
                        onClick={() => setnewUser(true)}
                      >
                        &nbsp;sign in
                      </a>
                    </label>
                  </div>
                </form>
                {/* 
            <div className="signin col-lg-8 col-md-8 col-sm-12 col-12  d-flex justify-content-center align-items-center flex-column">
              <div className="formSignUpContainer col-md-12 col-sm-12 justify-content-center">
                <div align="center">
                  {regerror && (
                    <Alert severity="error" variant="filled">
                      {regerror}
                    </Alert>
                  )}
                  {regloading && <CircularProgress />}
                  {message && (
                    <Alert severity="error" variant="filled">
                      {message}
                    </Alert>
                  )}
                </div>
                <h6 className="fw-bold mb-4 text-uppercase">
                  Register your account
                </h6>
                <form
                  autoComplete="off"
                  onSubmit={registerSubmitHandler}
                  className="formLoginSection"
                >
                  <div className="formsection">
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
                  </div>
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    type="submit"
                    className="formbtn"
                  >
                    Register
                  </Button>
                </form>
              </div>
            </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Signin);
