import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useLoginMutation } from "../../app/api.js";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  if (isLoading) {
    toast.info("Checking Credentials...");
  }
  const handleLogin = async () => {
    try {
      await login({ email, password }).unwrap();
      toast.success("Login Successful!");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.msg || "Invalid email or password");
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <div className="login-info">
        <div className="login-box">
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
        <div className="login-bottom">
          <button
            type="button"
            className="login-button primary-button"
            onClick={handleLogin}
          >
            Log In
          </button>
          <div className="signup-link">
            <p>Don't have an account?</p>
            <Link to={`/signup`}>Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
