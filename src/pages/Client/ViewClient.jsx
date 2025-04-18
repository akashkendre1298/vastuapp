import React, { useState, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonToast,
} from "@ionic/react";
import ToolBar from "../../components/ToolBar/ToolBar";
import "./ViewClient.css";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

const ViewClientPage = () => {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedClientId, setExpandedClientId] = useState(null);
  const [clientStatuses, setClientStatuses] = useState({});
  const [showToast, setShowToast] = useState(false);

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
        const initialStatuses = data.data.reduce((acc, client) => {
          acc[client._id] = client.status || "on hold";
          return acc;
        }, {});
        setClientStatuses(initialStatuses);
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

  const handleClientClick = (clientId) => {
    setExpandedClientId((prevId) => (prevId === clientId ? null : clientId));
  };

  const handleStatusChange = (clientId, newStatus) => {
    setClientStatuses((prevStatuses) => ({
      ...prevStatuses,
      [clientId]: newStatus,
    }));
    setShowToast(true);
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
      <IonContent style={{ backgroundColor: "#e2dee9" }}>
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        <IonList style={{ marginBottom: "70px", padding: "10px 10px 0 10px" }}>
          {filteredClients
            .slice() // Create a shallow copy to avoid mutating the original array
            .reverse()
            .map((client) => (
              <IonItem
                key={client._id}
                onClick={() => handleClientClick(client._id)}
                style={{
                  padding: "0",
                  margin: "14px",
                  cursor: "pointer",
                  marginBottom: "10px",
                  borderRadius: "14px",
                  backgroundColor:
                    expandedClientId === client._id ? "#f5f5f5" : "#ffffff",
                }}
              >
                <IonLabel
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "14px",
                  }}
                >
                  <div className="viewClientContent">
                    <div>
                      <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
                        {client.firstName} {client.lastName}
                      </h2>
                      <p>{client.phoneNumber}</p>
                    </div>
                    <div>
                      <RiArrowDownSLine size={20} />
                    </div>
                  </div>
                  {expandedClientId === client._id && (
                    <div
                      style={{
                        paddingTop: "20px",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p style={{ fontSize: "16px" }}>
                        Address: {client.address}
                      </p>
                      {/* <p style={{ fontSize: "16px", display: "flex",alignItems: "center" }}>
                        Status: 
                        <IonSelect
                          value={clientStatuses[client._id]}
                          placeholder="Select Status"
                          interface="popover"
                          onIonChange={(e) =>
                            handleStatusChange(client._id, e.detail.value)
                          }
                          onClick={(e) => e.stopPropagation()}
                        >
                          <IonSelectOption value="on hold">On Hold</IonSelectOption>
                          <IonSelectOption value="ongoing">Ongoing</IonSelectOption>
                          <IonSelectOption value="completed">Completed</IonSelectOption>
                        </IonSelect>
                      </p> */}
                    </div>
                  )}
                </IonLabel>
              </IonItem>
            ))}
        </IonList>

        <div>
          <Link to="/bottomtabs/addclient">
            <button className="add-client-btn">Add Client</button>
          </Link>
        </div>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Status updated successfully"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};
export default ViewClientPage;
