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
  IonButton
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
  const [selectedFile, setSelectedFile] = useState(null);

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

      const formData = new FormData();
      formData.append("caseLabel", caseName);
      formData.append("client", selectedClientName);
      formData.append("client_id", selectedClient);
      formData.append("executive", selectedExecutiveName);
      formData.append("executiveID", selectedExecutive);
      formData.append("issues", issue);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const response = await fetch("http://localhost:8888/api/cases", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Response from server:", responseData);

      // Case added successfully
      console.log("Case added successfully");
      // You can redirect or show a success message here
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
        <div className="add-executive">
          <div>
            <IonLabel position="floating">Case Name</IonLabel>
            <IonItem className="add-executive-item">
              <IonInput
                value={caseName}
                onIonChange={(e) => setCaseName(e.detail.value)}
                placeholder="Case Name"
                required
              ></IonInput>
            </IonItem>
          </div>
          <div>
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
          <div>
            <IonLabel position="floating">Add Image</IonLabel>
            <IonItem className="add-executive-item">
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </IonItem>
          </div>
          <div>
            <IonLabel position="stacked">Issue</IonLabel>
            <IonItem className="add-executive-item">
              <IonTextarea
                value={issue}
                onIonChange={(e) => setIssue(e.detail.value)}
                placeholder="Write Issue"
                required
              ></IonTextarea>
            </IonItem>
          </div>
          <div className="button-container">
            <IonButton className="add-case-button" onClick={handleAddCase}>
              Add Case
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddCasePage;
