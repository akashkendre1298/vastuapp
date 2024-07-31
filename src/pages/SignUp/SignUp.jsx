import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { IonPage, IonImg, IonContent } from "@ionic/react";
import "./SignUp.css";
import logo from "../../Assets/pandit_shivkumar_logo.png";

const SignupPage = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any field is empty
    if (!firstname || !lastname || !email || !phonenumber || !password) {
      setError("All fields are mandatory.");
      return;
    }

    // Validate phone number
    const phoneRegex = /^[1-9]\d{9}$/;
    if (!phoneRegex.test(phonenumber)) {
      setError("Invalid phone number. Please enter a 10-digit number.");
      return;
    }

    try {
      // Check if email is already registered
      const emailCheckResponse = await fetch(
        "https://backend.piyushshivkumarshhri.com/api/admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }), // Adjust according to the API specification
        }
      );

      if (emailCheckResponse.ok) {
        const emailCheckResult = await emailCheckResponse.json();
        // Adjust the condition based on the response structure
        if (emailCheckResult.some((user) => user.email === email)) {
          setError(
            "Email is already registered. Please use a different email."
          );
          return;
        }
      } else {
        setError("Failed to check email. Please try again.");
        return;
      }

      // Proceed with user registration
      const userData = {
        firstname,
        lastname,
        email,
        phonenumber,
        password,
      };

      const response = await fetch(
        "https://backend.piyushshivkumarshhri.com/api/admin/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        console.log("User signed up successfully");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setPassword("");
        setSuccessMessage(
          "User signed up successfully. Redirecting to login..."
        );
        setTimeout(() => {
          setSuccessMessage("");
          history.push("/");
        }, 3000);
      } else {
        setError("Failed to sign up user. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Network error. Please check your internet connection.");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div className="signup-page">
          <div className="signupdiv-for-logo">
            <IonImg src={logo} className="signup-logo" />
          </div>
          <div className="signup-heading">
            <p>Sign Up</p>
            <p className="para-after-signup-heading">
              Please enter details to create an account
            </p>
          </div>
          <div className="input-div">
            <label htmlFor="firstname" className="label-signup">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              placeholder="First Name"
              className="input-signup"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastname" className="label-signup">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              placeholder="Last Name"
              className="input-signup"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="email" className="label-signup">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="input-signup"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="phonenumber" className="label-signup">
              Contact Number
            </label>
            <input
              type="tel"
              id="phonenumber"
              placeholder="Phone number"
              className="input-signup"
              value={phonenumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <label htmlFor="password" className="label-signup">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create password"
              className="input-signup"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          <button
            className="signUp-button signUp-button-signup"
            onClick={handleSubmit}
          >
            Create Account
          </button>
          <p className="login-link">
            Already have an account?{" "}
            <a href="/" onClick={() => history.push("/")}>
              Log in
            </a>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
