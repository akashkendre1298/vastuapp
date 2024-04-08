import React from "react";
import "./Login.css"; // Import the CSS file
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonImg,
  IonLabel,
  IonButton,
} from "@ionic/react";
import logo from "../../Assets/pandit_shivkumar_logo.png"

class LoginPage extends React.Component {
  render() {
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
        <input type="email" className="login-input" />
        <IonLabel>Password</IonLabel>

        <input type="password" className="login-input" />

        {/* Forgot password and signup links */}
        <a href="#" className="forgot-password">
          Forgot Password?
        </a>
        <IonButton shape="round" className="login-button">
          Login
        </IonButton>

        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </IonPage>
    );
  }
}

export default LoginPage;
