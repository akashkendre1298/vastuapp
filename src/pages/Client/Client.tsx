import React, { useState } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonFooter,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonImg,
  IonPage,
} from "@ionic/react";
import "./Client.css";
import logo from "../../Assets/pandit_shivkumar_logo.png";
import BottomTabs from "../../components/BottomTabs/BottomTabs";
const Client = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    feedback: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8888/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Client added successfully");
        // Clear form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          address: "",
          city: "",
          feedback: "",
        });
      } else {
        console.error("Failed to add client");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <IonPage>
        <IonToolbar style={{ color: "#00004D" }}>
          {" "}
          <IonButtons slot="start">
            <IonBackButton defaultHref="#"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonImg src={logo} alt="App Logo"></IonImg>
          </IonButtons>
        </IonToolbar>
        <IonContent
        
          style={{ paddingTop: "20px", height: "100vh" }}
        >
          <IonGrid style={{ backgroundColor: "rgba(192, 188, 188, 0.601)" }}>
            <IonRow>
              <IonCol>
                <IonCardHeader className="add-executive-card-header">
                  <IonCardTitle>Add Client</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="add-executive-card-content">
                  <form onSubmit={handleSubmit}>
                    <div
                      style={{ paddingBottom: "10px" }}
                      
                    >
                      <IonLabel position="stacked">First Name</IonLabel>
                    </div>
                    <IonItem
                      className="add-executive-item"
                      style={{
                        border: "1px solid black",
                        marginBottom: "25px",
                      }}
                    >
                      <IonInput
                        placeholder="firstName"
                        className="add-executive-input"
                        name="firstName"
                        value={formData.firstName}
                        onIonChange={handleChange}
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
                        placeholder="phoneNumber"
                        type="tel"
                        className="add-executive-input"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onIonChange={handleChange}
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
                      />
                    </IonItem>

                    <div style={{ paddingBottom: "10px" }}>
                      <IonLabel position="stacked">feedback</IonLabel>
                    </div>
                    <IonItem className="add-executive-item">
                      <IonInput
                        placeholder="feedback"
                        className="add-executive-input"
                        name="feedback"
                        value={formData.feedback}
                        onIonChange={handleChange}
                      />
                    </IonItem>
                    {/* <IonItem className="add-executive-item">
                    <IonLabel position="stacked">Password</IonLabel>
                    <IonInput placeholder='' 
                      type="password" 
                      className="add-executive-input" 
                      name="password"
                      value={formData.password}
                      onIonChange={handleChange}
                    />
                  </IonItem> */}
                    {/* <IonButton type="submit"  className="add-executive-button">Add</IonButton> */}

                    <button className="add-executive-button">
                      Add Client{" "}
                    </button>
                  </form>
                </IonCardContent>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
        {/* <IonFooter>
          <IonToolbar>
            <BottomTabs />
          </IonToolbar>
        </IonFooter> */}
      </IonPage>
    </>
  );
};

export default Client;
