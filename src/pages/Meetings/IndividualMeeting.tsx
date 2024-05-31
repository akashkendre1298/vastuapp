// IndividualMeetingDetails.js
import { IonHeader } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ToolBar from "../../components/ToolBar/ToolBar";

const IndividualMeetingDetails = () => {
  const { meetingId } = useParams(); // Get the meeting ID from URL parameter
  const [meetingDetails, setMeetingDetails] = useState(null);

  useEffect(() => {
    // Fetch meeting details using the meeting ID
    const fetchMeetingDetails = async () => {
      try {
        const response = await fetch(`https://vastu-web-app.onrender.com/api/meetings/${meetingId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch meeting details");
        }
        const data = await response.json();
        setMeetingDetails(data);
      } catch (error) {
        console.error("Error fetching meeting details:", error);
      }
    };

    fetchMeetingDetails();
  }, [meetingId]);

  return (
   
   <>
     <IonHeader>
        <ToolBar />
      </IonHeader>
   
   <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
  <h2 style={{ marginBottom: "20px" }}>Meeting Details</h2>
  {meetingDetails ? (
    <div>
      <p><strong>Meeting Title:</strong> {meetingDetails.meetingTitle}</p>
      <p><strong>Executive Name:</strong> {meetingDetails.executiveName}</p>
      <p><strong>Executive ID:</strong> {meetingDetails.executiveID}</p>
      <p><strong>Meeting Mode:</strong> {meetingDetails.meetingMode}</p>
      <p><strong>Date:</strong> {meetingDetails.date}</p>
      <p><strong>Details:</strong> {meetingDetails.details}</p>
    </div>
  ) : (
    <p>Loading meeting details...</p>
  )}
</div>
   </>
   

  );
};

export default IndividualMeetingDetails;
