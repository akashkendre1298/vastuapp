import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonLabel } from "@ionic/react";
import { useParams } from "react-router-dom";
import ToolBar from "../../components/ToolBar/ToolBar";
import "./ParticularCases.css"
const ParticularCase = () => {
  const [caseDetails, setCaseDetails] = useState({}); // Initialize as empty object
  const [error, setError] = useState(null); // Initialize error state
  const { caseId } = useParams(); // Get caseId from URL parameter

  useEffect(() => {
    // Fetch case details using caseId from API
    fetch(`https://vastu-web-app.onrender.com/api/cases/${caseId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched from API:", data);
        console.log("Data fetched:", data.caseLabel);
        setCaseDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching case details:", error);
        setError(error); // Set error state if an error occurs
      });
  }, [caseId]); // Fetch details when caseId changes

  return (
    <IonPage>
      <ToolBar />
      <IonContent>
        {/* Display error message if there's an error */}
        {error && <div>Error: {error.message}</div>}
        {/* Display case details */}
        <div className="case-details-container">
          <IonLabel className="case-details-label">
            <h2 style={{fontSize:"24px"}}> {caseDetails.caseLabel}</h2>
            <p><b>Client:</b> {caseDetails.client}</p>
            <p><b>Executive:</b> {caseDetails.executive}</p>
            <p><b>Issues: </b>{caseDetails.issues}</p>
            <p><b>Solution:</b> {caseDetails.solution}</p>
            <p><b>Payment:</b> {caseDetails.payment}</p>
            <p><b>Contact Number:</b> {caseDetails.contactNumber}</p>
            <p><b>First Meeting Date:</b> {caseDetails.firstMeetingDate}</p>
          </IonLabel>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ParticularCase;
