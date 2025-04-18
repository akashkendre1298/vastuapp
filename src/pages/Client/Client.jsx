import React, { useState } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCardContent,
  IonItem,
  IonLabel,
  IonPage,
  IonToast,
} from "@ionic/react";
import "./Client.css";
import ToolBar from "../../components/ToolBar/ToolBar";

const Client = () => {
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    refrance: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      city,
      refrance,
    } = formData;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !address ||
      !city ||
      !refrance
    ) {
      setShowErrorToast(true);
      return;
    }

    console.log("Form data before submission:", formData); // Log form data
    try {
      const response = await fetch(
        "https://backend.piyushshivkumarshhri.com/api/clients",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Client added successfully");

        setShowToast(true);

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          address: "",
          city: "",
          refrance: "",
        });
      } else {
        console.error("Failed to add client", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <IonPage>
      <ToolBar />

      <IonContent
        style={{
          paddingTop: "20px",
          height: "100vh",
          backgroundColor: "#e2dee9",
        }}
      >
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCardContent className="add-executive-card-content">
                <div style={{ paddingBottom: "10px" }}>
                  {/* <IonLabel position="stacked">First Name</IonLabel> */}
                </div>
                <IonItem
                  className="add-executive-item"
                  style={{
                    border: "1px solid black",
                    marginBottom: "25px",
                  }}
                >
                  <input
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      color: "black",
                      border: "none",
                      outline: "none",
                    }}
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    pattern="[A-Za-z ]*"
                  />
                </IonItem>

                <div style={{ paddingBottom: "10px" }}>
                  {/* <IonLabel position="stacked">Last Name</IonLabel> */}
                </div>
                <IonItem className="add-executive-item">
                  <input
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      color: "black",
                      border: "none",
                      outline: "none",
                    }}
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    pattern="[A-Za-z ]*"
                  />
                </IonItem>

                {/* <div style={{ paddingBottom: "10px" }}>
                
                </div>
                <IonItem className="add-executive-item">
                  <input
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      color: "black",
                      border: "none",
                      outline: "none",
                    }}
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </IonItem> */}

                <div style={{ paddingBottom: "10px" }}>
                  {/* <IonLabel position="stacked">Contact Number</IonLabel> */}
                </div>
                <IonItem className="add-executive-item">
                  <input
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      color: "black",
                      border: "none",
                      outline: "none",
                    }}
                    placeholder="Phone Number"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    title="Please enter a 10-digit phone number"
                  />
                </IonItem>

                <div style={{ paddingBottom: "10px" }}>
                  {/* <IonLabel position="stacked">Location</IonLabel> */}
                </div>
                <IonItem className="add-executive-item">
                  <input
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      color: "black",
                      border: "none",
                      outline: "none",
                    }}
                    placeholder="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </IonItem>

                <div style={{ paddingBottom: "10px" }}>
                  {/* <IonLabel position="stacked">City</IonLabel> */}
                </div>
                <IonItem className="add-executive-item">
                  <input
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      color: "black",
                      border: "none",
                      outline: "none",
                    }}
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    pattern="[A-Za-z ]*"
                  />
                </IonItem>
                <IonItem
                  className="add-executive-item"
                  style={{ marginBottom: "50px" }}
                >
                  <input
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      color: "black",
                      border: "none",
                      outline: "none",
                    }}
                    placeholder="About Client"
                    name="refrance" 
                    value={formData.refrance}
                    onChange={handleChange}
                  />
                </IonItem>

                <IonToast
                  isOpen={showToast}
                  onDidDismiss={() => setShowToast(false)}
                  message="Client added successfully"
                  duration={2000}
                />
                <IonToast
                  isOpen={showErrorToast}
                  onDidDismiss={() => setShowErrorToast(false)}
                  message="All fields are required"
                  duration={2000}
                />
              </IonCardContent>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <button
        style={{
          width: "90%",
          height: "50px",
          backgroundColor: "#00004d",
          color: "white",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "bold",
          position: "fixed",
          bottom: "10px",
          right: "20px",
          cursor: "pointer",
          zIndex: "100",
        }}
        onClick={handleSubmit}
      >
        Add Client
      </button>
    </IonPage>
  );
};

export default Client;
