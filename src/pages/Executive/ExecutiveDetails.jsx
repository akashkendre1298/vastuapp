// ExecutiveDetails.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
} from "@ionic/react";
import ToolBar from "../../components/ToolBar/ToolBar";

const ExecutiveDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [executive, setExecutive] = useState(null);

  useEffect(() => {
    const fetchExecutive = async () => {
      try {
        const response = await fetch(
          `https://backend.piyushshivkumarshhri.com/api/executives/${id}`
        );
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response
        setExecutive(data);
      } catch (error) {
        console.error("Error fetching executive:", error);
        // Handle errors appropriately (e.g., display an error message to the user)
      }
    };

    fetchExecutive();
  }, [id]); // Fetch executive data whenever ID changes

  return (
    <IonPage>
      <IonHeader>
        <ToolBar />
      </IonHeader>

      <IonContent>
        {executive && (
          <>
            <IonItem>
              <IonLabel>First Name: {executive.firstName}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Last Name: {executive.lastName}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Email: {executive.email}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Phone Number: {executive.phoneNumber}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Address: {executive.address}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>City: {executive.city}</IonLabel>
            </IonItem>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ExecutiveDetails;
