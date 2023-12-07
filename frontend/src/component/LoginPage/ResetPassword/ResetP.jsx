import React, { useState } from "react";
import { useParams } from "react-router-dom";

import loginCSS from "../LoginPage.module.css";

export default function ResetP() {
  const { email } = useParams();

  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === rePassword) {
      const response = await fetch("/api/user/updatePassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      console.log(json);
    } else {
      setError("Passwords don't match!");
    }
  };

  return (
    <div className={loginCSS.bkgrd}>
      <form className={loginCSS.login}>
        <div className={loginCSS.emailInput}>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className={loginCSS.emailInput}>
          <br />
          <label for="re-password">Re-enter password</label>
          <input
            type="password"
            id="re-password"
            placeholder="Re-enter new password"
            onChange={(e) => setRePassword(e.target.value)}
            value={rePassword}
          />
        </div>
        <br />
        <div className={loginCSS.signIn}>
          {error && <div className={loginCSS.loginError}>{error}</div>}
          <button className={loginCSS.signInButton} onClick={handleSubmit}>
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}
