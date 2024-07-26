import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonAlert,
} from "@ionic/react";
import { useParams, Link } from "react-router-dom";
import ToolBar from "../../components/ToolBar/ToolBar";
import "./ParticularCases.css";

const ParticularCase = () => {
  const [caseDetails, setCaseDetails] = useState({}); // Initialize as empty object
  const [status, setStatus] = useState(""); // State for status
  const [error, setError] = useState(null); // Initialize error state
  const [showSuccess, setShowSuccess] = useState(false); // State for success message
  const { caseId } = useParams(); // Get caseId from URL parameter

  useEffect(() => {
    // Fetch case details using caseId from API
    fetch(`https://backend.piyushshivkumarshhri.com/api/cases/${caseId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched from API:", data);
        setCaseDetails(data);
        setStatus(data.status); // Set initial status from fetched data
      })
      .catch((error) => {
        console.error("Error fetching case details:", error);
        setError(error); // Set error state if an error occurs
      });
  }, [caseId]); // Fetch details when caseId changes

  const handleStatusChange = (event) => {
    const newStatus = event.detail.value;
    setStatus(newStatus);

    // Update status in the backend
    fetch(`https://backend.piyushshivkumarshhri.com/api/cases/${caseId}`, {
      method: "PATCH", // Use PATCH method for partial update
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Status updated:", data);
        setCaseDetails((prevDetails) => ({
          ...prevDetails,
          status: newStatus,
        }));
        setShowSuccess(true); // Show success message
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        setError(error); // Set error state if an error occurs
      });
  };

  return (
    <IonPage>
      <ToolBar />
      <IonContent>
        {/* Display error message if there's an error */}
        {error && <div>Error: {error.message}</div>}
        {/* Display success message */}
        <IonAlert
          isOpen={showSuccess}
          onDidDismiss={() => setShowSuccess(false)}
          header={"Success"}
          message={"Status updated successfully!"}
          buttons={["OK"]}
        />
        {/* Display case details */}
        <div className="case-details-container">
          <IonLabel className="case-details-label">
            <h2 style={{ fontSize: "24px" }}>{caseDetails.caseLabel}</h2>
            <p>
              <b>Client:</b> {caseDetails.client}
            </p>
            <p>
              <b>Executive:</b> {caseDetails.executive}
            </p>
            <p>
              <b>Issues:</b> {caseDetails.issues}
            </p>
            <p>
              <b>Solution:</b> {caseDetails.solution}
            </p>
            <p>
              <b>Payment:</b> {caseDetails.payment}
            </p>
            <p>
              <b>Contact Number:</b> {caseDetails.contactNumber}
            </p>
            <p>
              <b>First Meeting Date:</b> {caseDetails.firstMeetingDate}
            </p>
            <p>
              <b>Status:</b>
              <IonSelect
                value={status}
                interface="popover"
                placeholder="Select Status"
                onIonChange={handleStatusChange}
              >
                <IonSelectOption value="onHold">On Hold</IonSelectOption>
                <IonSelectOption value="onGoing">On Going</IonSelectOption>
                <IonSelectOption value="closed">Closed</IonSelectOption>
              </IonSelect>
            </p>
          </IonLabel>
        </div>
        <Link
          to="/bottomtabs/viewproduct"
          className="recommended-products-button"
        >
          Recommended Products
        </Link>
      </IonContent>
    </IonPage>
  );
};

export default ParticularCase;
