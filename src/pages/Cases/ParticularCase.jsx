import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonAlert,
  IonTextarea,
  IonItem,
  IonInput,
} from "@ionic/react";
import { useParams, Link } from "react-router-dom";
import ToolBar from "../../components/ToolBar/ToolBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ParticularCases.css";

const ParticularCase = () => {
  const [caseDetails, setCaseDetails] = useState({}); // Initialize as empty object
  const [status, setStatus] = useState(""); // State for status
  const [error, setError] = useState(null); // Initialize error state
  const [showFeedback, setShowFeedback] = useState(false); // State for feedback popup
  const [rating, setRating] = useState(""); // State for rating
  const [feedback, setFeedback] = useState(""); // State for feedback
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
        // console.log("Data fetched from API:", data);
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
        // console.log("Status updated:", data);
        setCaseDetails((prevDetails) => ({
          ...prevDetails,
          status: newStatus,
        }));
        toast.success("Status updated successfully!");
        if (newStatus === "closed") {
          setShowFeedback(true); // Show feedback popup if status is closed
        }
      })
      .catch((error) => {
        toast.error("Error updating status");
        setError(error); // Set error state if an error occurs
      });
  };

  const handleFeedbackSubmit = () => {
    // Handle feedback submission logic here
    console.log("Rating:", rating);
    console.log("Feedback:", feedback);
    setShowFeedback(false); // Close feedback popup
  };

  return (
    <IonPage>
      <ToolBar />
      <IonContent style={{ backgroundColor: "#e2dee9" }}>
        {/* Display error message if there's an error */}
        {error && <div>Error: {error.message}</div>}
        {/* Display feedback popup */}
        <IonAlert
          isOpen={showFeedback}
          onDidDismiss={() => setShowFeedback(false)}
          header={"Feedback"}
          cssClass="feedback-popup"
          inputs={[
            {
              name: "rating",
              type: "number",
              min: 1,
              max: 5,
              placeholder: "Rating (1-5)",
              value: rating,
              onIonChange: (e) => setRating(e.detail.value),
              cssClass: "feedback-input",
            },
            {
              name: "feedback",
              type: "textarea",
              placeholder: "Write your feedback here...",
              value: feedback,
              onIonChange: (e) => setFeedback(e.detail.value),
              cssClass: "feedback-input",
            },
          ]}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                setShowFeedback(false);
              },
            },
            {
              text: "Submit",
              handler: handleFeedbackSubmit,
            },
          ]}
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
              {/* <b>First Meeting Date:</b> {caseDetails.firstMeetingDate} */}
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
          to={{
            pathname: "/bottomtabs/addproduct",
            state: { selectedCase: caseDetails.caseLabel }
          }}
          className="recommended-products-button"
        >
          Recommend Products
        </Link>
        <ToastContainer   position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </IonContent>
    </IonPage>
  );
};

export default ParticularCase;
