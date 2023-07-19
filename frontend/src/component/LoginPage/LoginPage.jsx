import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";

import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [id, setId]=useState('');
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
    <div className="bkgrd">
      <form className="login">
        {/* <div className="loginForm"> */}
        <div className="emailInput">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="username@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="passwordInput">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="forgetPassword">
          <div></div>
          <Link to="/forgetPassword" style={{ textDecoration: "none" }}>
            <div className="fpLink">Forgot Password?</div>
          </Link>
        </div>
        <div className="signIn">
          {error && <div className="loginError">{error}</div>}
          <button className="signInButton" onClick={handleSubmit}>
            Log In
          </button>
        </div>
        {/* </div> */}
      </form>
    </div>
  );
}
