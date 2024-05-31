import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonPage,
} from "@ionic/react";
import "./AddExecutive.css";
import ToolBar from "../../components/ToolBar/ToolBar";

const AddExecutive = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://vastu-web-app.onrender.com/api/executives", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Executive added successfully");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          address: "",
          city: "",
          password: "",
        });
        setSuccessMessage("Executive added successfully!");

        // Clear the success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        console.error("Failed to add executive");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const keyboardDidShow = () => {
      document.body.classList.add("keyboard-open");
    };

    const keyboardDidHide = () => {
      document.body.classList.remove("keyboard-open");
    };

    window.addEventListener("keyboardDidShow", keyboardDidShow);
    window.addEventListener("keyboardDidHide", keyboardDidHide);

    return () => {
      window.removeEventListener("keyboardDidShow", keyboardDidShow);
      window.removeEventListener("keyboardDidHide", keyboardDidHide);
    };
  }, []);

  return (
    <IonPage>
      <ToolBar />
      <IonContent className="add-executive" style={{  height: "100vh" }}>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCardHeader className="add-executive-card-header">
                {/* <IonCardTitle>Add Executive</IonCardTitle> */}
              </IonCardHeader>
              <IonCardContent className="add-executive-card-content">
                <form onSubmit={handleSubmit}>
                  <div style={{ paddingBottom: "10px" }}>
                    <IonLabel position="stacked">First Name</IonLabel>
                  </div>
                  <IonItem className="add-executive-item">
                    <IonInput
                      placeholder="firstName"
                      className="add-executive-input"
                      name="firstName"
                      value={formData.firstName}
                      onIonChange={handleChange}
                      pattern="[A-Za-z ]*"
                    />
                  </IonItem>

                  <div style={{ paddingBottom: "10px" }}>
                    <IonLabel position="stacked">Last Name</IonLabel>
                  </div>
                  <IonItem className="add-executive-item">
                    <IonInput
                      placeholder="lastName"
                      className="add-executive-input"
                      name="lastName"
                      value={formData.lastName}
                      onIonChange={handleChange}
                      pattern="[A-Za-z ]*"
                    />
                  </IonItem>

                  <div style={{ paddingBottom: "10px" }}>
                    <IonLabel position="stacked">Email Address</IonLabel>
                  </div>
                  <IonItem className="add-executive-item">
                    <IonInput
                      placeholder="email"
                      type="email"
                      className="add-executive-input"
                      name="email"
                      value={formData.email}
                      onIonChange={handleChange}
                    />
                  </IonItem>
                  <div style={{ paddingBottom: "10px" }}>
                    <IonLabel position="stacked">Contact Number</IonLabel>
                  </div>

                 <IonItem className="add-executive-item">
  <IonInput
    placeholder="Contact Number"
    type="tel"
    className="add-executive-input"
    name="phoneNumber"
    value={formData.phoneNumber}
    onIonChange={handleChange}
    pattern="[0-9]{10}"
    title="Please enter a 10-digit phone number"
  />
</IonItem>


                  <div style={{ paddingBottom: "10px" }}>
                    <IonLabel position="stacked">Location</IonLabel>
                  </div>
                  <IonItem className="add-executive-item">
                    <IonInput
                      placeholder="address"
                      className="add-executive-input"
                      name="address"
                      value={formData.address}
                      onIonChange={handleChange}
                    />
                  </IonItem>

                  <div style={{ paddingBottom: "10px" }}>
                    <IonLabel position="stacked">City</IonLabel>
                  </div>

                  <IonItem className="add-executive-item">
                    <IonInput
                      placeholder="city"
                      className="add-executive-input"
                      name="city"
                      value={formData.city}
                      onIonChange={handleChange}
                      pattern="[A-Za-z ]*"
                    />
                  </IonItem>

                  <div style={{ paddingBottom: "10px" }}>
                    <IonLabel position="stacked">Password</IonLabel>
                  </div>
                  <IonItem className="add-executive-item" style={{ marginBottom: "50px" }}>
                    <IonInput
                      placeholder="password"
                      type="password"
                      className="add-executive-input"
                      name="password"
                      value={formData.password}
                      onIonChange={handleChange}
                    />
                  </IonItem>

                  <button className="add-executive-button">
                    Add Executive
                  </button>
                </form>
                {successMessage && (
                  <div className="success-message">
                    {successMessage}
                  </div>
                )}
              </IonCardContent>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AddExecutive;
