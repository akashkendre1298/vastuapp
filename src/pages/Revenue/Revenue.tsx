import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonButtons,
  IonBackButton,
  IonImg,
} from "@ionic/react";
import "./Revenue.css";
import logo from "../../Assets/pandit_shivkumar_logo.png";

const Revenue = () => {
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await fetch("http://localhost:8888/api/cases/");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Assuming 'totalAmount' is a property in the response data
        if (data && data.totalAmount) {
          setTotalAmount(data.totalAmount);
        } else {
          throw new Error("Total amount not found in response");
        }
      } catch (error) {
        console.error("Error fetching total amount:", error);
      }
    };

    fetchTotalAmount();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ color: "#00004D" }}>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="#"
              className="back-button"
            ></IonBackButton>
          </IonButtons>

          <IonButtons slot="end">
            <IonImg src={logo} alt="App Logo" />
          </IonButtons>
        </IonToolbar>

        <IonToolbar color="primary">
          <IonTitle>Revenue</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="total-revenue-div">
          <div>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              Total Revenue
            </p>
          </div>
          <div>
            {totalAmount && (
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                ₹ {totalAmount}
              </p>
            )}
          </div>
        </div>
        <div className="div-revenue-first-section">
          {/* <div>
            <p>
              <IonSelect interface="popover">
                <IonSelectOption value="1">This Month</IonSelectOption>
                <IonSelectOption value="2">Last Weak</IonSelectOption>
                <IonSelectOption value="3">last year</IonSelectOption>
              </IonSelect>
            </p>
          </div> */}
        </div>
        <div className="div-revenue-first-section">
          <div>
            <p>Nishant</p>
          </div>
          <div>
            <p>₹25000</p>
          </div>
        </div>

        <div className="div-revenue-first-section">
          <div>
            <p>Sagar</p>
          </div>
          <div>
            <p>₹15000</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Revenue;
