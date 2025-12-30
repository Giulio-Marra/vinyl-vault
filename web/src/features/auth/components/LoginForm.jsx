import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { MdEmail, MdMusicNote } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/authTunks";
import { ScaleLoader } from "react-spinners";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

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
      <div className="LoginPageContainer">
        <div className="loginImageContainer">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDsEZoyPbOsj4R8ymtzgeAszi61FAE0WQ6dWrhlBQDU4fYAogZrx6_hnsuKCOMi2x8XBYuxuQma6XIk_QipU3A_DZFOTAC_Jgj-w0UOm1V-DZeAb63FzibzW0I-4FH3qxkTByaP9F_AMhdzIQ-F1Z7dxLT0KysGZMMPKpaCxevy3JzPXTVvUYmxm1mFO6rDZerNJP2XVAGCrwCT2YqoZ6qVKQHUIjv4KfwbrATLfkPRVyzoEjrkMmsDB7SsSf0hcX-_GM3X9KndlD9"
            alt=""
            className="imageLogin"
          />
          <div className="containerTextLoginImage">
            <h1>Spin it Again.</h1>
            <p>
              Your collection is waiting. Dive back into the crates and discover
              your next favorite sound.
            </p>
          </div>
        </div>
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

              <button
                type="submit"
                className="loginButton"
                disabled={isLoading}
              >
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
                Don't have an account? <a href="#">Sign up for free</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
