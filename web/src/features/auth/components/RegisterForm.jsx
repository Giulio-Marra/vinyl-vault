import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { MdEmail, MdMusicNote } from "react-icons/md";
import { useNavigate } from "react-router";
import { registerService } from "../redux/authService";
import { ScaleLoader } from "react-spinners";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.terms) {
      setError("You must accept the Terms of Service and Privacy Policy");
      return;
    }

    try {
      setLoading(true);
      await registerService({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      navigate("/login");
    } catch (err) {
      // Errori di connessione (backend spento)
      if (!err.status) {
        navigate("/error", {
          state: {
            statusCode: "Connection Error",
            message: "Cannot reach server. Please check your connection.",
          },
        });
      }
      // Errori recuperabili (validazione, conflitti)
      else if (err.status === 400 || err.status === 409) {
        setError(err.message);
      }
      // Errori critici (server error)
      else if (err.status >= 500) {
        navigate("/error", {
          state: {
            statusCode: err.status,
            message: "Server error. Please try again later.",
          },
        });
      }
      // Errori sconosciuti
      else {
        setError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerFormContainer">
      <div className="loginFormInner">
        <div className="loginHeader">
          <h1>Join the Club</h1>
          <p>Create an account to track orders and curate your collection.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="username">Username</label>
            <div className="inputWrapper">
              <span className="inputIcon">
                <MdEmail />
              </span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <div className="inputWrapper">
              <span className="inputIcon">
                <MdEmail />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="formGroup">
            <div className="flexPass">
              <div>
                <label htmlFor="password">Password</label>
                <div className="inputWrapper">
                  <span className="inputIcon">
                    <IoMdLock />
                  </span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="inputWrapper">
                  <span className="inputIcon">
                    <IoMdLock />
                  </span>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {error && <p className="errorMessage">{error}</p>}
          <div className="formOptions">
            <label className="rememberMe">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>
          </div>
          <button type="submit" className="registerButton">
            {loading ? (
              <ScaleLoader color="white" height={"12px"} />
            ) : (
              "Register Account"
            )}
          </button>

          <div className="divider">
            <span>OR CONTINUE WITH</span>
          </div>
          <div className="socialButtons">
            <button type="button" className="socialButton">
              <FaGoogle /> Google
            </button>
            <button type="button" className="socialButton">
              <MdMusicNote /> Spotify
            </button>
          </div>
          <p className="signupLink">
            Already have an account?{" "}
            <span className="link" onClick={() => navigate("/login")}>
              Go to Login Page
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
