import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonLabel } from "@ionic/react";
import { useParams } from "react-router-dom";
import ToolBar from "../../components/ToolBar/ToolBar";

const ParticularCase = () => {
  const [caseDetails, setCaseDetails] = useState({}); // Initialize as empty object
  const { caseId } = useParams(); // Get caseId from URL parameter

  useEffect(() => {
    // Fetch case details using caseId from API
    fetch(`http://localhost:8888/api/cases/${caseId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetched from API:", data);
        console.log("Data fetched:", data.data.caseLabel);

        setCaseDetails(data.data); 
      })
      .catch((error) => {
        console.error("Error fetching case details:", error);
      });
  }, [caseId]); // Fetch details when caseId changes

  return (
    <IonPage>
   <ToolBar/>

      <IonContent>
        {/* Display case details */}
        <IonLabel>
          <h2>Case Label: {caseDetails.caseLabel}</h2>
          {/* Display other properties similarly */}
        </IonLabel>
      </IonContent>
    </IonPage>
  );
};

export default ParticularCase;
