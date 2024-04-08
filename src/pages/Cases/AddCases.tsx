import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea, IonButton, IonBackButton, IonButtons, IonImg } from '@ionic/react';
import logo from "../../Assets/pandit_shivkumar_logo.png"

const AddCasePage = () => {
  const [caseName, setCaseName] = useState('');
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [executives, setExecutives] = useState([]);
  const [selectedExecutive, setSelectedExecutive] = useState('');
  const [issue, setIssue] = useState('');
  
  useEffect(() => {
    const fetchClients = async () => {
        try {
          const response = await fetch('http://localhost:8888/api/clients');
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          const data = await response.json(); // Parse the JSON response
          setClients(data.data); // Access the 'data' key to get the array of clients
          console.log('Clients:', data.data); // Log the fetched client data
        } catch (error) {
          console.error('Error fetching clients:', error);
          setClients([]); // Initialize clients state as empty array
        }
      };
    const fetchExecutives = async () => {
      try {
        const response = await fetch('http://localhost:8888/api/executives');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response
        setExecutives(data);
        console.log('Executives:', data); // Log the fetched executive data
      } catch (error) {
        console.error('Error fetching executives:', error);
        setExecutives([]); // Initialize executives state as empty array
      }
    };
  
    fetchClients();
    fetchExecutives();
  }, []);
  
  const handleAddCase = async () => {
    try {
      // Get the selected client and executive names
      const selectedClientName = clients.find(client => client._id === selectedClient)?.firstName;
      const selectedExecutiveName = executives.find(executive => executive._id === selectedExecutive)?.firstName;
  
      console.log('Data to be sent:', {
        caseLabel: caseName,
        client: selectedClientName,
        client_id: selectedClient, // Assuming client_id is the ID of the selected client
        executive: selectedExecutiveName,
        executiveID: selectedExecutive, // Assuming executiveID is the ID of the selected executive
        issues: issue
      });
  
      const response = await fetch('http://localhost:8888/api/cases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          caseLabel: caseName,
          client: selectedClientName,
          client_id: selectedClient, // Assuming client_id is the ID of the selected client
          executive: selectedExecutiveName,
          executiveID: selectedExecutive, // Assuming executiveID is the ID of the selected executive
          issues: issue
        })
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('Response from server:', responseData);
  
      // Case added successfully
      console.log('Case added successfully');
      // You can redirect or show a success message here
    } catch (error) {
      console.error('Error adding case:', error);
      // Handle errors appropriately (e.g., display an error message to the user)
    }
  };
  

  return (
    <IonPage>
       <IonHeader>
    <IonToolbar style={{ color: "#00004D" }}>
      <IonButtons slot="start">
        <IonBackButton defaultHref="#" />
      </IonButtons>

      {/* <IonTitle>Executives</IonTitle> */}

      <IonButtons slot="end">
        <IonImg src={logo} alt="App Logo" />
      </IonButtons>
    </IonToolbar>

    <IonToolbar color="primary">
      <IonTitle>Case</IonTitle>
    </IonToolbar>
  </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">Case Name</IonLabel>
          <IonInput value={caseName} onIonChange={(e) => setCaseName(e.detail.value)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Client Name</IonLabel>
          <IonSelect value={selectedClient} onIonChange={(e) => setSelectedClient(e.detail.value)}>
            {clients.map(client => (
              <IonSelectOption key={client._id} value={client._id}>{client.firstName}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Executive Name</IonLabel>
          <IonSelect value={selectedExecutive} onIonChange={(e) => setSelectedExecutive(e.detail.value)}>
            {executives.map(executive => (
              <IonSelectOption key={executive._id} value={executive._id}>{executive.firstName}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Issue</IonLabel>
          <IonTextarea value={issue} onIonChange={(e) => setIssue(e.detail.value)} placeholder='Write Issue'></IonTextarea>
        </IonItem>

        <IonButton expand="full" onClick={handleAddCase}>Add Case</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddCasePage;
