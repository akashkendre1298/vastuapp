import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAccordion,
  IonAccordionGroup,
} from "@ionic/react";
import ToolBar from "../../components/ToolBar/ToolBar";
import "./ViewClient.css";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

const ViewClientPage = () => {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(
          "https://backend.piyushshivkumarshhri.com/api/clients"
        );
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

    fetchClients();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredClients = clients.filter(
    (client) =>
      client.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <ToolBar />
      </IonHeader>
      <IonContent>
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        <IonList style={{ marginBottom: "50px", padding: "10px 10px 0 10px" }}>
          <IonAccordionGroup>
            {filteredClients.map((client) => (
              <IonAccordion key={client._id} value={client._id}>
                <IonItem
                  slot="header"
                  className="ion-item-header"
                  style={{
                    border: "1px solid black",
                    marginBottom: "25px",
                    borderRadius: "10px",
                    margin: "0 10px 20px 10px",
                  }}
                >
                  <IonLabel>
                    {client.firstName} {client.lastName}
                  </IonLabel>
                  <br />
                  <IonLabel>{client.phoneNumber}</IonLabel>
                </IonItem>
                <div className="ion-padding" slot="content">
                  <p>Email: {client.email}</p>
                  <p>Address: {client.address}</p>
                  <p>City: {client.city}</p>
                  <p>
                    Joining Date:{" "}
                    {new Date(client.joiningDate).toLocaleDateString()}
                  </p>
                </div>
              </IonAccordion>
            ))}
          </IonAccordionGroup>
        </IonList>

        <div
          style={{
            position: "fixed",
            bottom: 5,
            width: "90%",
            zIndex: 1,
            marginTop: "20px",
            marginLeft: "18px",
          }}
        >
          <Link to="/bottomtabs/addclient">
            <button className="add-client-btn">Add Client</button>
          </Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ViewClientPage;
