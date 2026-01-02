import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { MdEmail, MdMusicNote } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/authTunks";
import { ScaleLoader } from "react-spinners";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginAction({
        email,
        password,
        remember,
      })
    );
  };

  return (
    <>
      <div className="loginFormContainer">
        <div className="loginFormInner">
          <div className="loginHeader">
            <h1>Welcome Back</h1>
            <p>Please enter your details to sign in</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="email">Email or Username</label>
              <div className="inputWrapper">
                <span className="inputIcon">
                  <MdEmail />
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <div className="inputWrapper">
                <span className="inputIcon">
                  <IoMdLock />
                </span>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="formOptions">
              <label className="rememberMe">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Remember for 30 days</span>
              </label>
              <a href="#" className="forgotPassword">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="loginButton" disabled={isLoading}>
              {isLoading ? (
                <ScaleLoader color="white" height={"12px"} />
              ) : (
                "Log In"
              )}
            </button>

            {error && <p className="errorMessage">{error}</p>}

            <div className="divider">
              <span>OR CONTINUE WITH</span>
            </div>

            <div className="socialButtons">
              <button type="button" className="socialButton">
                <FaGoogle />
                Google
              </button>
              <button type="button" className="socialButton">
                <MdMusicNote />
                Spotify
              </button>
            </div>

            <p className="signupLink">
              Dont'have Account??{" "}
              <span className="link" onClick={() => navigate("/register")}>
                Go to Register Page
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
