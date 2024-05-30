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
  IonButton,
  IonToast,
} from "@ionic/react";
import ToolBar from "../../components/ToolBar/ToolBar";
import "./AddCases.css";

const AddCasePage = () => {
  const [caseLabel, setCaseLabel] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [executives, setExecutives] = useState([]);
  const [selectedExecutive, setSelectedExecutive] = useState("");
  const [issue, setIssue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://localhost:8888/api/clients");
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        setClients(data.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setClients([]);
      }
    };

    const fetchExecutives = async () => {
      try {
        const response = await fetch("http://localhost:8888/api/executives");
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        setExecutives(data);
      } catch (error) {
        console.error("Error fetching executives:", error);
        setExecutives([]);
      }
    };

    fetchClients();
    fetchExecutives();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleAddCase = async () => {
    try {
      const selectedClientName = clients.find(
        (client) => client._id === selectedClient
      )?.firstName;
      const selectedExecutiveName = executives.find(
        (executive) => executive._id === selectedExecutive
      )?.firstName;

      const caseData = {
        caseLabel: caseLabel,
        client: selectedClientName || "",
        client_id: selectedClient || "",
        executive: selectedExecutiveName || "",
        executive_id: selectedExecutive || "",
        issues: issue || "",
      };

      console.log("Case data to be sent:", caseData);

      const response = await fetch("http://localhost:8888/api/cases", {
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

      // If there is a file selected, handle the file upload separately
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const imageUploadResponse = await fetch(
          `http://localhost:8888/api/cases/${responseData.caseId}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!imageUploadResponse.ok) {
          throw new Error(`Image upload failed: ${imageUploadResponse.status}`);
        }

        const imageUploadData = await imageUploadResponse.json();
        console.log("Image upload response:", imageUploadData);
      }

      // Case added successfully
      console.log("Case added successfully");
      setShowToast(true);

      // Clear all fields
      setCaseLabel("");
      setSelectedClient("");
      setSelectedExecutive("");
      setIssue("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error adding case:", error);
      // Handle errors appropriately (e.g., display an error message to the user)
    }
  };

  return (
    <IonPage className="case-page">
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
        <div className="add-executive">
          <div>
            <IonLabel position="floating" className="label-cases">Case Name</IonLabel>
            <IonItem className="add-executive-item" style={{
              marginTop:"10px"
            }}>
              <IonInput
                value={caseLabel}
                onIonChange={(e) => setCaseLabel(e.detail.value)}
                placeholder="Case Name"
                required
              ></IonInput>
            </IonItem>
          </div>
          <div>
            <IonItem className="add-executive-item">
              <IonLabel position="floating" className="label-cases">Client Name</IonLabel>
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
              <div className="select-arrow"></div>
            </IonItem>
          </div>
          <div>
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
              <div className="select-arrow"></div>
            </IonItem>
          </div>
          {/* <div>
            <IonLabel position="floating">Add Image</IonLabel>
            <IonItem className="add-executive-item">
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </IonItem>
          </div> */}
          <div>
            <IonLabel position="stacked" className="label-cases">Issue</IonLabel>
            <IonItem className="add-executive-item" style={{
              marginTop:"10px"
            }}>
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
          <div className="button-container">
            <button className="add-case-button" onClick={handleAddCase}>
              Add Case
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddCasePage;
