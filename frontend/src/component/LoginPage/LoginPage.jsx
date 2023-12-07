import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";

import loginCSS from "./LoginPage.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const authContextValue = useContext(AuthContext);

  const redirect = useNavigate();

  const fetchFunction = async () => {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      authContextValue.email = email;
      setError(json.error);
      if (!json.error) {
        authContextValue.setLoggedIn(true);
        authContextValue.setUserID(json.id);
        authContextValue.login(json.email, json.jwtToken, json.id);
        redirect("/dashboard");
      }
      if (json.error) {
        authContextValue.setLoggedIn(false);
      }
    }

    if (response.ok) {
      setError(error);
      authContextValue.setLoggedIn(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchFunction();
  };

  return (
    <div className={loginCSS.bkgrd}>
      <form className={loginCSS.login}>
        <div className={loginCSS.emailInput}>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="username@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className={loginCSS.passwordInput}>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className={loginCSS.forgetPassword}>
          <div></div>
          <Link to="/forgetPassword" style={{ textDecoration: "none" }}>
            <div className={loginCSS.fpLink}>Forgot Password?</div>
          </Link>
        </div>
        <div className={loginCSS.signIn}>
          {error && <div className={loginCSS.loginError}>{error}</div>}
          <button className={loginCSS.signInButton} onClick={handleSubmit}>
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
