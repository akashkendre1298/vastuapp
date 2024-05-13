// viewClients.js

import { IonContent, IonPage } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ToolBar from "../../components/ToolBar/ToolBar";

function viewClients() {
  const [clients, setClients] = useState([]);
  const { executiveId } = useParams();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Fetch data from the API
        const response = await fetch(
          `http://localhost:8888/api/cases/byExecutiveId/${executiveId}`
        );

        // Check if the request was successful
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        // Parse the JSON response
        const data = await response.json();
        console.log("Fetched data:", data);
        // Set the fetched clients in state
        setClients(data);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchClients();
  }, [executiveId]);

  return (
    <IonPage>
      <ToolBar />

      <IonContent>
        <div>
          {clients.map((client) => (
            <div key={client._id}>
              <p>Case Label: {client.caseLabel}</p>
              <p>Client: {client.client}</p>
              <p>Executive: {client.executive}</p>
              <p>Issues: {client.issues}</p>
              {/* Add more fields as needed */}
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default viewClients;
