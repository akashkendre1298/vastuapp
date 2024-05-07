import React, { useState } from "react";
import "./Login.css"; // Import the CSS file
import { IonPage, IonImg, IonLabel } from "@ionic/react";
import logo from "../../Assets/pandit_shivkumar_logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    // Check if any field is empty
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:8888/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("User logged in successfully");
        // Redirect the user to the dashboard or home page
        window.location.href = "/bottomtabs/home";
      } else {
        console.error("Failed to log in");
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Network error. Please check your internet connection.");
    }
  };

  return (
    <IonPage className="login-page">
      <div className="login-container">
        {/* Logo centered horizontally */}
        <div className="login-logo-div">
          <IonImg src={logo} className="login-logo" />
        </div>
        <div className="login-title">
          <p>Login</p>
          <p className="para-after-login-title">Please sign in to continue</p>
        </div>
        {/* Login form elements */}
        <div className="form-group">
          <label>Email &nbsp; &nbsp; &nbsp; &nbsp;</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </div>
        {/* Error message */}
        {error && <p className="error-message">{error}</p>}
        {/* Forgot password and signup links */}
        <a href="#" className="forgot-password">
          Forgot Password?
        </a>
        <button onClick={handleSubmit} className="login-button">
          Login
        </button>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </IonPage>
  );
};

export default LoginPage;
