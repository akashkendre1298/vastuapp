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
} from "@ionic/react";
import ToolBar from "../../components/ToolBar/ToolBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddCases.css";

const AddCasePage = () => {
  const [caseName, setCaseName] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [executives, setExecutives] = useState([]);
  const [selectedExecutive, setSelectedExecutive] = useState("");
  const [issue, setIssue] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(
          "https://backend.piyushshivkumarshhri.com/api/clients"
        );
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response
        setClients(data.data); // Access the 'data' key to get the array of clients
      } catch (error) {
        console.error("Error fetching clients:", error);
        setClients([]); // Initialize clients state as empty array
      }
    };

    const fetchExecutives = async () => {
      try {
        const response = await fetch(
          "https://backend.piyushshivkumarshhri.com/api/executives"
        );
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response
        setExecutives(data);
      } catch (error) {
        console.error("Error fetching executives:", error);
        setExecutives([]); // Initialize executives state as empty array
      }
    };

    fetchClients();
    fetchExecutives();
  }, []);

  const handleAddCase = async () => {
    // Validate input fields
    if (!caseName || !selectedClient || !selectedExecutive || !issue) {
      toast.error("All fields are required");
      return;
    }
    try {
      // Get the selected client and executive details
      const selectedClientObj = clients.find(
        (client) => client._id === selectedClient
      );
      const selectedClientName = `${selectedClientObj?.firstName} ${selectedClientObj?.lastName}`;
      const selectedClientPhoneNumber = selectedClientObj?.phoneNumber; // Assuming phone number field is phoneNumber

      const selectedExecutiveName = executives.find(
        (executive) => executive._id === selectedExecutive
      )?.firstName;

      const caseData = {
        caseLabel: caseName,
        client: selectedClientName,
        client_id: selectedClient, // Assuming client_id is the ID of the selected client
        contactNumber: selectedClientPhoneNumber, // Include client's phone number
        executive: selectedExecutiveName,
        executiveID: selectedExecutive, // Assuming executiveID is the ID of the selected executive
        issues: issue,
      };

      // console.log("Data to be sent:", caseData);

      const response = await fetch(
        "https://backend.piyushshivkumarshhri.com/api/cases",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(caseData),
        }
      );
      if (response.ok) {
        toast.success("Case added successfully!");
        setCaseName("");
        setSelectedClient("");
        setSelectedExecutive("");
        setIssue("");
      } else {
        toast.error("Failed to add case");
      }
    } catch (error) {
      toast.error("Failed to add case");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <ToolBar />
      </IonHeader>
      <IonContent className="view-cases-content" style={{ backgroundColor: "#e2dee9" }}>
        <div style={{ padding: "10px", marginTop: "25px" }}>
          <div>
            {/* <IonLabel position="floating" style={{ paddingLeft: "10px" }}>
              Case Name
            </IonLabel> */}
            <IonItem
              className="add-executive-item"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
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
            <IonItem
              className="add-executive-item"
              style={{ marginBottom: "10px" }}
            >
              <IonLabel position="floating">Client Name</IonLabel>
              <IonSelect
                value={selectedClient}
                onIonChange={(e) => setSelectedClient(e.detail.value)}
                interface="popover"
              >
                {clients
                  .slice() // Create a shallow copy to avoid mutating the original array
                  .reverse()
                  .map((client) => (
                    <IonSelectOption
                      key={client._id}
                      value={client._id}
                      style={{ fontSize: "24px" }}
                    >
                      {client.firstName} {client.lastName}
                    </IonSelectOption>
                  ))}
              </IonSelect>
              <div className="select-arrow"></div>
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
                {executives
                  .slice() // Create a shallow copy to avoid mutating the original array
                  .reverse()
                  .map((executive) => (
                    <IonSelectOption key={executive._id} value={executive._id}>
                      {executive.firstName}
                    </IonSelectOption>
                  ))}
              </IonSelect>
              <div className="select-arrow"></div>
            </IonItem>
          </div>
          <div></div>
          <div>
            <IonItem
              className="add-executive-item"
              style={{ marginTop: "10px", marginBottom: "40px" }}
            >
              <textarea
                value={issue}
                onChange={(e) => {
                  setIssue(e.target.value);
                }}
                placeholder="Write Issue...."
                required
                style={{
                  width: "100%",
                  height: "100px",
                  border: "none",
                  resize: "none",
                  backgroundColor: "white",

                  verticalAlign: "middle", // Center the text vertically
                  lineHeight: "80px", // Aligns the text vertically within the textarea
                  outline: "none", // Removes the outline when focused
                  scrollbar: "none",
                }}
              ></textarea>
            </IonItem>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={handleAddCase}
            style={{
              width: "90%",
              height: "50px",
              backgroundColor: "#00004d",
              color: "white",
              borderRadius: "10px",
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
            Add Case
          </button>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 2147483647, position: 'fixed', top: 0, left: 0, width: '100%', pointerEvents: 'none' }}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddCasePage;
