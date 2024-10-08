import React, { useState } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
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
    // Validate input fields
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
                  <IonInput
                    placeholder="First Name"
                    className="add-executive-input"
                    name="firstName"
                    value={formData.firstName}
                    onIonChange={handleChange}
                    pattern="[A-Za-z ]*"
                  />
                </IonItem>

                <div style={{ paddingBottom: "10px" }}>
                  {/* <IonLabel position="stacked">Last Name</IonLabel> */}
                </div>
                <IonItem className="add-executive-item">
                  <IonInput
                    placeholder="Last Name"
                    className="add-executive-input"
                    name="lastName"
                    value={formData.lastName}
                    onIonChange={handleChange}
                    pattern="[A-Za-z ]*"
                  />
                </IonItem>

                <div style={{ paddingBottom: "10px" }}>
                  {/* <IonLabel position="stacked">Email Address</IonLabel> */}
                </div>
                <IonItem className="add-executive-item">
                  <IonInput
                    placeholder="Email"
                    type="email"
                    className="add-executive-input"
                    name="email"
                    value={formData.email}
                    onIonChange={handleChange}
                  />
                </IonItem>

                <div style={{ paddingBottom: "10px" }}>
                  {/* <IonLabel position="stacked">Contact Number</IonLabel> */}
                </div>
                <IonItem className="add-executive-item">
                  <IonInput
                    placeholder="Phone Number"
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
                  {/* <IonLabel position="stacked">Location</IonLabel> */}
                </div>
                <IonItem className="add-executive-item">
                  <IonInput
                    placeholder="Address"
                    className="add-executive-input"
                    name="address"
                    value={formData.address}
                    onIonChange={handleChange}
                  />
                </IonItem>

                <div style={{ paddingBottom: "10px" }}>
                  {/* <IonLabel position="stacked">City</IonLabel> */}
                </div>
                <IonItem className="add-executive-item">
                  <IonInput
                    placeholder="City"
                    className="add-executive-input"
                    name="city"
                    value={formData.city}
                    onIonChange={handleChange}
                    pattern="[A-Za-z ]*"
                  />
                </IonItem>
                <IonItem
                  className="add-executive-item"
                  style={{ marginBottom: "50px" }}
                >
                  <IonInput
                    placeholder="Reference"
                    className="add-executive-input"
                    name="refrance" // Ensure the name attribute matches the key in formData
                    value={formData.refrance}
                    onIonChange={handleChange}
                  />
                </IonItem>

                <button
                  className="add-executive-button"
                  style={{
                    position: "fixed",
                    bottom: 5,
                    width: "86%",
                    zIndex: 1,
                    marginTop: "20px",
                  }}
                  onClick={handleSubmit}
                >
                  Add Client
                </button>
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
    </IonPage>
  );
};

export default Client;
