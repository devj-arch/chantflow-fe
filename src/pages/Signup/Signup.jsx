import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import "./Signup.css"
import { useSignupMutation } from "../../app/api.js"
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen.jsx'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signup, {isLoading}] = useSignupMutation()
  const navigate = useNavigate()

  if(isLoading) return <LoadingScreen />
  const handleSignup = async() => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await signup({ name, email, password }).unwrap()
      alert('Signup Successful!')
      navigate("/login")
    } catch (err) {
      alert(err?.data?.msg || "Signup failed");
    }
  }

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <div className="signup-info">
        <div className="signup-box">
          <div className="name">
            <input
              type="text"
              id="name input-box"
              placeholder="John Doe"
              className="input-box"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p>Name</p>
          </div>
          <div className="email">
            <input
              type="text"
              id="email input-box"
              placeholder="name@example.com"
              className="input-box"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>Email</p>
          </div>
          <div className="password">
            <input
              type="password"
              id="password input-box"
              placeholder="•••••••"
              className="input-box"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>Password</p>
          </div>
        </div>
        <div className="signup-bottom">
          <button type="button" className="signup-button primary-button" onClick={handleSignup}>
            Sign Up
          </button>
          <div className="login-link">
            <p>Already have an account?</p>
            <Link to={`/login`}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

