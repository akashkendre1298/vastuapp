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
} from "@ionic/react";
import "./SignUp.css";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Implement your signup logic here
    // e.g., send data to a backend API
    console.log("Signup submitted:", {
      firstName,
      lastName,
      email,
      contactNumber,
      password,
    });

    // Clear htmlhtmlForm fields after submission (optional)
    setFirstName("");
    setLastName("");
    setEmail("");
    setContactNumber("");
    setPassword("");
  };

  return (
    <>
      <IonPage>
        <div className="signup-page">
          <div className="signupdiv-htmlhtmlFor-logo">
            <IonImg src="" className="signup-logo"></IonImg>
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
            />
            <label htmlFor="lastName" className="label-signup">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              className="input-signup"
            />
            <label htmlFor="email" className="label-signup">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="input-signup"
            />
            <label htmlFor="contactNumber" className="label-signup">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              placeholder="Phone number"
              className="input-signup"
            />
            <label htmlFor="password" className="label-signup">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create password"
              className="input-signup"
            />{" "}
          </div>
          <div>
          <button  className="signUp-button">
          Create Account
        </button>
          </div>
        </div>
      </IonPage>
    </>
  );
};

export default SignupPage;
