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
import "./AddExecutive.css";
import logo from "../../Assets/pandit_shivkumar_logo.png";
import BottomTabs from "./../../components/BottomTabs/BottomTabs";
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

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8888/api/executives", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Executive added successfully");
        // Clear form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          address: "",
          city: "",
          password: "",
        });
      } else {
        console.error("Failed to add executive");
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
          <IonBackButton defaultHref="#" className="back-button"></IonBackButton>

          </IonButtons>
          <IonButtons slot="end">
            <IonImg src={logo} alt="App Logo"></IonImg>
          </IonButtons>
        </IonToolbar>
        <IonContent
          className="add-executive"
          style={{ paddingTop: "20px", height: "100vh" }}
        >
          <IonGrid style={{backgroundColor:"rgba(192, 188, 188, 0.601)"}}>
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
                      <IonLabel position="stacked">Password</IonLabel>
                    </div>
                    <IonItem className="add-executive-item">
                      <IonInput
                        placeholder="password"
                        type="password"
                        className="add-executive-input"
                        name="password"
                        value={formData.password}
                        onIonChange={handleChange}
                      />
                    </IonItem>
                    {/* <IonButton type="submit"  className="add-executive-button">Add</IonButton> */}

                    <button className="add-executive-button">
                      Add Executive{" "}
                    </button>
                  </form>
                </IonCardContent>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
    
      </IonPage>
    </>
  );
};

export default AddExecutive;
