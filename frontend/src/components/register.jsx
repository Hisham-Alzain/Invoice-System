import React, { useState, useRef } from "react";
import Cookies from "js-cookie"; // Make sure to install js-cookie if you haven't already
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation
import styles from "./css/Register.module.css";

const Register = ({ islogin }) => {
  const [isLogin, setIsLogin] = useState(islogin);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [failMessage, setFailMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const initialized = useRef(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (!initialized.current) {
      initialized.current = true;
      // Perform Login logic (Call API)
      fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
          connection: "keep-alive",
          "Accept-Encoding": "gzip, deflate, br",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          } else {
            return response.json();
          }
        })
        .then((data) => {
          // Do something with the token returned from Server data['token']
          const token = data.access_token;
          Cookies.set("access_token", token, { secure: true, expires: 365 });
          // Reset the form fields
          setEmail("");
          setPassword("");
          setFailMessage("");
          // Redirect to dashboard
          navigate("/");
        })
        .catch((error) => {
          // Handle errors
          console.log(error)
          setFailMessage("Invalid email or password");
        });
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setFailMessage("Passwords do not match");
      return;
    }
    // Perform Signup logic (Call API)
    fetch("http://127.0.0.1:8000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
        connection: "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // Handle successful signup
        // Reset the form fields
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFailMessage("");
        // Switch to login form
        setIsLogin(true);
      })
      .catch((error) => {
        // Handle errors
        setFailMessage("Error signing up. Please try again.");
      });
  };

  const handleForgotPassword = () => {
    navigate("/forgetPassword");
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.form}>
      <div className={styles.Regwrapper}>
        <div className={styles.titleText}>
          <div
            className={`${styles.title} ${
              isLogin ? styles.login : styles.signup
            }`}
          >
            {isLogin ? "Login Form" : "Signup Form"}
          </div>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.slideControls}>
            <input
              type="radio"
              name="slide"
              id="login"
              checked={isLogin}
              onChange={() => setIsLogin(true)}
            />
            <input
              type="radio"
              name="slide"
              id="signup"
              checked={!isLogin}
              onChange={() => setIsLogin(false)}
            />
            <label
              htmlFor="login"
              className={`${styles.slide} ${styles.loginLabel}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </label>
            <label
              htmlFor="signup"
              className={`${styles.slide} ${styles.signupLabel}`}
              onClick={() => setIsLogin(false)}
            >
              Signup
            </label>
            <div
              className={styles.sliderTab}
              style={{ left: isLogin ? "0" : "50%" }}
            ></div>
          </div>
          <div className={styles.formInner}>
            <form
              onSubmit={handleLogin}
              className={isLogin ? styles.loginForm : styles.hiddenForm}
            >
              <div className={styles.field}>
                <input
                  type="text"
                  placeholder="Email Address"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <span
                  onClick={handleTogglePassword}
                  className={styles.togglePassword}
                >
                  {showPassword ? (
                    <i className="fa fa-eye-slash"></i>
                  ) : (
                    <i className="fa fa-eye"></i>
                  )}
                </span>
              </div>
              <div className={styles.passLink}>
                <a href="#" onClick={handleForgotPassword}>
                  Forgot password?
                </a>
              </div>
              {failMessage && (
                <div className={styles.failMessage}>{failMessage}</div>
              )}
              <div className={`${styles.field} ${styles.btn}`}>
                <div className={styles.btnLayer}></div>
                <input type="submit" value="Login" />
              </div>
              <div
                className={styles.signupLink}
                onClick={() => setIsLogin(false)}
              >
                Not a member? <a href="#">Signup now</a>
              </div>
            </form>
            <form
              onSubmit={handleSignup}
              className={!isLogin ? styles.signupForm : styles.hiddenForm}
            >
              <div className={styles.field}>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <input
                  type="text"
                  placeholder="Email Address"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <span
                  onClick={handleTogglePassword}
                  className={styles.togglePassword}
                >
                  {showPassword ? (
                    <i className="fa fa-eye-slash"></i>
                  ) : (
                    <i className="fa fa-eye"></i>
                  )}
                </span>
              </div>

              <div className={styles.field}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>
              {failMessage && (
                <div className={styles.failMessage}>{failMessage}</div>
              )}
              <div className={`${styles.field} ${styles.btn}`}>
                <div className={styles.btnLayer}></div>
                <input type="submit" value="Signup" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
