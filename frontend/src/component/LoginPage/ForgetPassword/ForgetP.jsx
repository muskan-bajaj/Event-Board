import React from 'react'
import { Link } from 'react-router-dom'
import './ForgetP.css'

export default function LoginPage() {
  return (
    <div className='bkgrd'>
      <div className="kiitLogo">
        <img className='kLogo' src="https://uploads-ssl.webflow.com/63a4333d6709521275441c77/63f294d8f9b3c8677b30ad6d_kiitlogo.png" alt=''/>
      </div>
      <div className="login">
        <div className='black'>
          <div className="loginForm">
            <div className='loginHeading'>
              Forget Password
            </div>
            <div className="emailOTP">
                <div className="emailInput">
                    <label for="email">
                        <span className='span'>Email</span>
                        <input type="email" id='email' className='email' placeholder='username@gmail.com'/>
                    </label>
                </div>
                <div className="otp">
                    <button id='otp'>OTP</button>
                </div>
            </div>
            
            <div className="passwordInput">
              <label for="password">
                <span className='span'>OTP</span>
                <input type="password" id='password' className='password' placeholder='XX-XX-XX'/>
              </label>
            </div>
            <div className="signIn">
              <Link to='/dashboard'>
                <button className='signInButton'>Sign In</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}