import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToast,
} from "@ionic/react";
import ToolBar from "../../components/ToolBar/ToolBar";
import "./AddCases.css";

const AddCasePage = () => {
  const [caseName, setCaseName] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [executives, setExecutives] = useState([]);
  const [selectedExecutive, setSelectedExecutive] = useState("");
  const [issue, setIssue] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("https://vastu-web-app.onrender.com/api/clients");
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response
        setClients(data.data); // Access the 'data' key to get the array of clients
        // console.log('Clients:', data.data); // Log the fetched client data
      } catch (error) {
        console.error("Error fetching clients:", error);
        setClients([]); // Initialize clients state as empty array
      }
    };

    const fetchExecutives = async () => {
      try {
        const response = await fetch("https://vastu-web-app.onrender.com/api/executives");
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response
        setExecutives(data);
        // console.log('Executives:', data); // Log the fetched executive data
      } catch (error) {
        console.error("Error fetching executives:", error);
        setExecutives([]); // Initialize executives state as empty array
      }
    };

    fetchClients();
    fetchExecutives();
  }, []);

  const handleAddCase = async () => {
    try {
      // Get the selected client and executive names
      const selectedClientName = clients.find(
        (client) => client._id === selectedClient
      )?.firstName;
      const selectedExecutiveName = executives.find(
        (executive) => executive._id === selectedExecutive
      )?.firstName;

      const caseData = {
        caseLabel: caseName,
        client: selectedClientName,
        client_id: selectedClient, // Assuming client_id is the ID of the selected client
        executive: selectedExecutiveName,
        executiveID: selectedExecutive, // Assuming executiveID is the ID of the selected executive
        issues: issue,
      };

      console.log("Data to be sent:", caseData);

      const response = await fetch("https://vastu-web-app.onrender.com/api/cases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(caseData),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Response from server:", responseData);

      // Case added successfully
      console.log("Case added successfully");
      setShowToast(true);

      // Clear all fields
      setCaseName("");
      setSelectedClient("");
      setSelectedExecutive("");
      setIssue("");
    } catch (error) {
      console.error("Error adding case:", error);
      // Handle errors appropriately (e.g., display an error message to the user)
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <ToolBar />
      </IonHeader>
      <IonContent>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Case added successfully!"
          duration={2000}
        />
        <div style={{ padding: "10px", marginTop: "25px", height: "80vh" }}>
          <div>
            <IonLabel position="floating" style={{ paddingLeft: "10px" }}>
              Case Name
            </IonLabel>
            <IonItem className="add-executive-item" style={{ marginTop: "10px" }}>
              <IonInput
                value={caseName}
                onIonChange={(e) => setCaseName(e.detail.value)}
                placeholder="Case Name"
                required
              ></IonInput>
            </IonItem>
          </div>
          <div>
            <IonLabel position="floating"></IonLabel>
            <IonItem className="add-executive-item">
              <IonLabel position="floating">Client Name</IonLabel>
              <IonSelect
                value={selectedClient}
                onIonChange={(e) => setSelectedClient(e.detail.value)}
                interface="popover"
              >
                {clients.map((client) => (
                  <IonSelectOption key={client._id} value={client._id}>
                    {client.firstName}
                  </IonSelectOption>
                ))}
              </IonSelect>
              <div class="select-arrow"></div>
            </IonItem>
          </div>
          <div>
            <IonLabel position="floating"></IonLabel>
            <IonItem className="add-executive-item">
              <IonLabel position="floating">Executive Name</IonLabel>
              <IonSelect
                value={selectedExecutive}
                onIonChange={(e) => setSelectedExecutive(e.detail.value)}
                interface="popover"
              >
                {executives.map((executive) => (
                  <IonSelectOption key={executive._id} value={executive._id}>
                    {executive.firstName}
                  </IonSelectOption>
                ))}
              </IonSelect>
              <div class="select-arrow"></div>
            </IonItem>
          </div>
          <div>
            <IonLabel position="floating" style={{ paddingLeft: "10px" }}>
              Add Image
            </IonLabel>
            <IonItem className="add-executive-item" style={{ marginTop: "10px" }}>
              <input type="file" accept="image/*" />
            </IonItem>
          </div>
          <div>
            <IonLabel position="stacked" style={{ paddingLeft: "10px" }}>
              Issue
            </IonLabel>
            <IonItem className="add-executive-item" style={{ marginTop: "10px" }}>
              <IonTextarea
                value={issue}
                onIonChange={(e) => {
                  console.log("Issue change event:", e.detail.value);
                  setIssue(e.detail.value);
                }}
                placeholder="Write Issue"
                required
              ></IonTextarea>
            </IonItem>
          </div>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <div>
              <button className="add-case-button" onClick={handleAddCase}>
                Add Case
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddCasePage;

