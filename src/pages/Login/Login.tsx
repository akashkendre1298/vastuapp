import React, { useState } from "react";
import "./Login.css"; // Import the CSS file
import {
  IonPage,

  IonImg,
  IonLabel,
} from "@ionic/react";
import logo from "../../Assets/pandit_shivkumar_logo.png"

const LoginPage =()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  
  const handleSubmit = async () => {
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
        window.location.href = "/home"; // Example redirect
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
        {/* <IonHeader>
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        {/* Logo centered horizontally */}
        <div className="login-logo-div">
          <IonImg src={logo} className="login-logo" />
        </div>
        <div className="login-title">
          <p>Login</p>
          <p className="para-after-login-title">Please sign in To continue</p>
        </div>
        {/* Login form elements */}
        <IonLabel>Email</IonLabel>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
        <IonLabel>Password</IonLabel>

        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        {/* Forgot password and signup links */}
        <a href="#" className="forgot-password">
          Forgot Password?
        </a>
        <button  onClick={handleSubmit} className="login-button" >
              Login
            </button>

        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </IonPage>
    );
  }


export default LoginPage;
