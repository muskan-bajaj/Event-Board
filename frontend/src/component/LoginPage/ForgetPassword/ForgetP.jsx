import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import loginCSS from "../LoginPage.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [update, setUpdate] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const redirect = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!update) {
      const response = await fetch("/api/user/forgetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await response.json();
      if (json.user === "invalid") {
        setError("email not registered");
      }
      if (json.user === "valid") {
        setError("");
        setUpdate(true);
      }
    }
    if (update) {
      const response = await fetch("/api/user/verifyOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const json = await response.json();
      if (json.verified === "true") {
        redirect(`/resetPassword/${email}`);
      }
    }
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
        {update && (
          <div className={loginCSS.emailInput}>
            <br />
            <label for="otp">Enter OTP</label>
            <input
              type="number"
              id="otp"
              placeholder="Check mail for otp"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
          </div>
        )}
        <br />
        <div className={loginCSS.signIn}>
          {error && <div className={loginCSS.loginError}>{error}</div>}
          <button className={loginCSS.signInButton} onClick={handleSubmit}>
            {update ? "Verify OTP" : "Send OTP"}
          </button>
        </div>
      </form>
    </div>
  );
}
