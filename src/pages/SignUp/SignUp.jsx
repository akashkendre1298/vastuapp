import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import logo from "../../Assets/pandit_shivkumar_logo.png";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
    image: null,
  });
  const [messages, setMessages] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // console.log("Image URL:", imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("firstname", formData.firstname);
    form.append("lastname", formData.lastname);
    form.append("email", formData.email);
    form.append("phonenumber", formData.phonenumber);
    form.append("password", formData.password);
    form.append("image", formData.image);

    try {
      const response = await axios.post(
        "https://backend.piyushshivkumarshhri.com/api/admin/signup",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessages({ type: "success", text: response.data.message });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessages({ type: "error", text: error.response.data.message });
      } else {
        setMessages({ type: "error", text: "An unexpected error occurred." });
      }
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-form-container">
          <div className="signup-logo-container">
            <img src={logo} alt="Logo" className="signup-logo" />
          </div>
          <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
            Register
          </h1>
          {messages && (
            <div className={`signup-toast ${messages.type}`}>
              {messages.text}
            </div>
          )}
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="signup-input-item">
              {/* <label className="signup-label">First Name</label> */}
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                className="signup-input"
              />
            </div>
            <div className="signup-input-item">
              {/* <label className="signup-label">Last Name</label> */}
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                className="signup-input"
              />
            </div>
            <div className="signup-input-item">
              {/* <label className="signup-label">Email</label> */}
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                className="signup-input"
              />
            </div>
            <div className="signup-input-item">
              {/* <label className="signup-label">Phone Number</label> */}
              <input
                type="text"
                name="phonenumber"
                placeholder="Phone Number"
                value={formData.phonenumber}
                onChange={handleChange}
                className="signup-input"
              />
            </div>
            <div className="signup-input-item">
              {/* <label className="signup-label">Password</label> */}
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="signup-input"
              />
            </div>
            <div className="signup-input-item">
              {/* <label className="signup-label">Profile Picture</label> */}
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="signup-file-input"
              />
            </div>
            <button type="submit" className="signup-submit-button">
              Submit
            </button>
          </form>

          <div className="signup-link-container">
            <a href="/" className="signup-link">
              Already have an account? Log in
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
