import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./IndividualClients.css"
import { IonBackButton, IonButtons, IonContent, IonHeader, IonImg, IonPage, IonToolbar } from "@ionic/react";
import logo from "../../Assets/pandit_shivkumar_logo.png";

const IndividualClients = () => {
  const { executiveId } = useParams();

  const [executive, setExecutive] = useState(null);
  const [clientCount, setClientCount] = useState(0);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Fetch executive details using executiveId
    fetch(`http://localhost:8888/api/executives/${executiveId}`)
      .then((response) => response.json())
      .then((data) => {
        setExecutive(data);
      })
      .catch((error) => {
        console.error("Error fetching executive details:", error);
      });

    // Fetch client details using executiveId
    fetch(`http://localhost:8888/api/cases/byExecutiveId/${executiveId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          // Extract caseLabels from each object in the data array
          const labels = data.data.map((item) => {
            return item.caseLabel;
          });
          // setCaseLabels(labels);
          setClientCount(data.count);
          setClients(data.clients);
        } else {
          console.error("Error: Data is not in the expected format");
        }
      })
      .catch((error) => {
        console.error("Error fetching client details:", error);
      });
  }, [executiveId]);

  const viewClients = () => {
    window.location.href = `/clients/${executiveId}`;
  };

  return (
    
    <IonPage className="main-content-individualclient">
      <IonHeader>
        <IonToolbar style={{ color: "#00004D" }}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="#" className="back-button"></IonBackButton>

          </IonButtons>

          {/* <IonTitle>Executives</IonTitle> */}

          <IonButtons slot="end">
            <IonImg src={logo} alt="App Logo" />
          </IonButtons>
        </IonToolbar>

      
      </IonHeader>
<IonContent>
<div>
    {executive && (
      <div>
        <div  className="profile-details-div">
          <div>

          <p style={{fontSize:"30px"}}> {executive.firstName}</p>
          <p style={{fontSize:"30px"}}> {executive.phoneNumber}</p>
          </div>
        </div>
      </div>
    )}
    <div>

      <div className="client-count-and-view">
        <div>

        <p>Number Clients: {clientCount}</p>
        </div>
        <div>

        <button onClick={viewClients} className="view-client-button">View Clients</button>
        </div>
      </div>


      <div className="button-group">
        <div>

        <button className="edit-button">Edit</button>
        </div>
        <div>

        <button className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  </div>
</IonContent>

  </IonPage>
  
  );
};

export default IndividualClients;
