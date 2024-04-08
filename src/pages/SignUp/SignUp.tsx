import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonPage,
  IonImg,
  IonItem,
  IonInput,
  IonContent,
} from "@ionic/react";
import "./SignUp.css";
import logo from "../../Assets/pandit_shivkumar_logo.png";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8888/api/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          contactNumber,
          password
        })
      });

      if (response.ok) {
        console.log('User registered successfully');
        // Clear form fields after successful registration (optional)
        setFirstName("");
        setLastName("");
        setEmail("");
        setContactNumber("");
        setPassword("");
      } else {
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <IonPage>
        <div className="signup-page">
          <div className="signupdiv-htmlhtmlFor-logo">
            <IonImg src={logo} className="signup-logo"></IonImg>
          </div>
          <div className="signup-heading">
            <p>Sign Up</p>
            <p className="para-after-signup-heading">
              Please enter details to create account
            </p>
          </div>
          <div className="input-div">
            <label htmlFor="" className="label-signup">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="input-signup"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName" className="label-signup">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              className="input-signup"
              value={lastName}
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
            <label htmlFor="contactNumber" className="label-signup">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              placeholder="Phone number"
              className="input-signup"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
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
          <div>
            <button onClick={handleSubmit} className="signUp-button">
              Create Account
            </button>
          </div>
        </div>
      </IonPage>
    </>
  );
};

export default SignupPage;
