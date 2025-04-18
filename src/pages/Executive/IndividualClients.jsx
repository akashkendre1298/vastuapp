import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./IndividualClients.css";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonLoading,
  IonAlert,
} from "@ionic/react";
import logo from "../../Assets/pandit_shivkumar_logo.png";
import ToolBar from "../../components/ToolBar/ToolBar";

const IndividualClients = () => {
  const { executiveId } = useParams();
  const history = useHistory();

  const [executive, setExecutive] = useState(null);
  const [clientCount, setClientCount] = useState(0);
  const [clients, setClients] = useState([]);
  const [showClients, setShowClients] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedExecutive, setEditedExecutive] = useState({
    firstName: "",
    phoneNumber: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch executive details using executiveId
    fetch(
      `https://backend.piyushshivkumarshhri.com/api/executives/${executiveId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setExecutive(data);
        setEditedExecutive({
          firstName: data.firstName,
          phoneNumber: data.phoneNumber,
        });
      })
      .catch((error) => {
        console.error("Error fetching executive details:", error);
      });

    // Fetch client details using executiveId
    fetch(
      `https://backend.piyushshivkumarshhri.com/api/cases/byExecutiveId/${executiveId}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("Client details:", data); // Log the client details
        // Find the count object in the data array
        const countObject = data.find((item) => item.count !== undefined);
        // Extract the count value
        const clientCount = countObject ? countObject.count : 0;
        // Filter out the count object from the data array
        const filteredData = data.filter((item) => item.count === undefined);
        if (filteredData && Array.isArray(filteredData)) {
          // Extract caseLabels from each object in the filteredData array
          const labels = filteredData.map((item) => {
            return item.caseLabel;
          });
          // setCaseLabels(labels);
          setClientCount(clientCount); // Set clientCount here
          setClients(filteredData);
        } else {
          console.error("Error: Data is not in the expected format");
        }
      })
      .catch((error) => {
        console.error("Error fetching client details:", error);
      });
  }, [executiveId]);

  const toggleClientList = () => {
    setShowClients(!showClients);
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const handleConfirmation = (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      setIsDeleting(true);
      // Make DELETE request to delete executive
      fetch(
        `https://backend.piyushshivkumarshhri.com/api/executives/${executiveId}`,
        {
          method: "DELETE",
        }
      )
        .then(() => {
          setIsDeleting(false);
          // console.log("Executive deleted successfully!");
          history.goBack();
        })
        .catch((error) => {
          setIsDeleting(false);
          console.error("Error deleting executive:", error);
        });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedExecutive((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Make PATCH request to update executive details
    fetch(
      `https://backend.piyushshivkumarshhri.com/api/executives/${executiveId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedExecutive),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setExecutive(data);
        setIsEditing(false);
        setSuccessMessage("Details updated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error updating executive details:", error);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <ToolBar />
      </IonHeader>
      <IonContent className="main-content-individualclient">
        <div>
          {executive && (
            <div>
              <div className="profile-details-div">
                {isEditing ? (
                  <form onSubmit={handleFormSubmit} className="ionic-form">
                    <div className="ionic-form-group">
                      <label className="ionic-label">Name:</label>
                      <input
                        type="text"
                        name="firstName"
                        value={editedExecutive.firstName}
                        onChange={handleInputChange}
                        required
                        pattern="[A-Za-z ]*"
                        className="ionic-input"
                      />
                    </div>
                    <div className="ionic-form-group">
                      <label className="ionic-label">Phone Number:</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={editedExecutive.phoneNumber}
                        onChange={handleInputChange}
                        required
                        pattern="[0-9]{10}"
                        title="Please enter a 10-digit phone number"
                        className="ionic-input"
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <button type="submit" className="ionic-save-button">
                          Save
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="ionic-cancel-button"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="executive-details">
                    <div>
                      <p>Name : {executive.firstName}</p>
                      <p> Contact: {executive.phoneNumber}</p>
                    </div>

                    <div>
                      <div>
                        <button
                          className="edit-button"
                          onClick={handleEditClick}
                        >
                          Edit
                        </button>
                      </div>
                      <div>
                        <button
                          className="delete-button"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}
            </div>
          )}
          <div>
            <div className="client-count-and-view">
              <p>Number of Clients: {clientCount}</p>
              <button onClick={toggleClientList} className="view-client-button">
                {showClients ? "Hide Clients" : "View Clients"}
              </button>
            </div>
            {showClients && (
              <IonList>
                {clients.map((client, index) => (
                  <IonItem key={index} className="client-details">
                    <IonLabel>
                      <p>Client Name: {client.client}</p>
                      <p>Case Label: {client.caseLabel}</p>
                      <p>Contact Number: {client.contactNumber}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            )}
          </div>
        </div>

        <IonLoading isOpen={isDeleting} message={"Updating Executives..."} />
        <IonAlert
          isOpen={showConfirmation}
          onDidDismiss={() => setShowConfirmation(false)}
          header={"Confirm Deletion"}
          message={"Are you sure you want to delete this executive?"}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                handleConfirmation(false);
              },
            },
            {
              text: "Delete",
              handler: () => {
                handleConfirmation(true);
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default IndividualClients;
