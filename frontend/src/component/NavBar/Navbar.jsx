import React, { useContext } from "react";
import navCSS from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../Context/Context";
// import RegistrationForm from '../Form/RegistrationForm/RegistrationForm';
// import Form from '../../Page/Form';

export default function Navbar() {
  // const authContextValue=useContext(AuthContext);
  const redirect = useNavigate();

  const handleLogin = async () => {
    // authContextValue.setOnLogin(true);
    // console.log(authContextValue.onLogin)
    localStorage.setItem("onLogin", true);
  };

  const handleHome = async () => {
    // authContextValue.setOnLogin(false);
    localStorage.removeItem("onLogin");
  };

  const handleLogout = async () => {
    // authContextValue.setLoggedIn(false);
    localStorage.removeItem("onLogin");
    // authContextValue.setOnLogin(false);
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    // authContextValue.setFields([]);
    redirect("/");
  };

  // const handleForm=async()=>{
  //   return(
  //     <RegistrationForm/>
  //   )
  // }

  return (
    <div className={navCSS.navbar}>
      <div className={navCSS.image}>
        <img
          className={navCSS.navLogo}
          alt=""
          src="https://uploads-ssl.webflow.com/63a4333d6709521275441c77/64b779bddbed93bc00ac4587_KIIT-logo-HD%201.png"
        ></img>
      </div>

      <div className={navCSS.login}>
        {localStorage.getItem("id") ? (
          <>
            <Link to="/dashboard/form" style={{ textDecoration: "none" }}>
              <button className={navCSS.loginB}>Forms</button>
            </Link>
            <button className={navCSS.loginB} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            {localStorage.getItem("onLogin") ? (
              <Link to="/" style={{ textDecoration: "none" }}>
                <button className={navCSS.loginB} onClick={handleHome}>
                  Home
                </button>
              </Link>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button className={navCSS.loginB} onClick={handleLogin}>
                  Login
                </button>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}
