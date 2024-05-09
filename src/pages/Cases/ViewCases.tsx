import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";
import { Link } from "react-router-dom";

const ViewCasesPage = () => {
  const [selectedCase, setSelectedCase] = useState("");
  const [caseLabels, setCaseLabels] = useState([]);

  useEffect(() => {
    // Fetch case labels from API
    fetch("http://localhost:8888/api/cases")
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          // Extract caseLabels from each object in the data array
          const labels = data.data.map((item) => {
            // console.log('Case Label:', item.caseLabel);
            // console.log('Client ID:', item.client_id);
            // console.log('ID:', item._id);
            return item.caseLabel;
          });
          setCaseLabels(labels);
        } else {
          console.error("Error: Data is not in the expected format");
        }
      })
      .catch((error) => {
        console.error("Error fetching cases:", error);
      });
  }, []);

  // Convert object values to an array
  // const dataArray = Object.values(data);

  return (
    <IonPage>
      <IonContent>
        {/* Search Bar */}
        <div>
          <IonSearchbar
            placeholder="Search Cases"
            className="custom"
          ></IonSearchbar>
        </div>

        {/* List of Cases */}
        {/* <IonList>
          {dataArray.length > 0 ? (
            dataArray.map((item, index) => (
              <IonItem key={index}>
                <IonLabel>
                  <h2>Case Label: {item.caseLabel}</h2>
                  <p>Executive: {item.executive}</p>
                </IonLabel>
              </IonItem>
            ))
          ) : (
            <IonItem>
              <IonLabel>No cases found</IonLabel>
            </IonItem>
          )}
        </IonList> */}

        <IonList inset={true} style={{marginBottom:"40px"}}>
          {caseLabels.map((label, index) => (
            <IonItem
              key={index}
              button
              detail={true}
              style={{ border: "1px solid black", marginBottom: "20px", borderRadius: "10px"}}
            >
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        {/* Add Case Button */}
        <Link to="/bottomtabs/addcases">
          <button
            className="add-executive-button"
            style={{
              position: "fixed",
              bottom: 5,
              width: "92%",
              zIndex: 1,
              marginTop: "20px",
              marginLeft: "16px",
            }}
          >
            Add Case
          </button>
        </Link>
      </IonContent>
    </IonPage>
  );
};

export default ViewCasesPage;
