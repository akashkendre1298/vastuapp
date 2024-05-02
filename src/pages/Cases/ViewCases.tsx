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
  const [data, setData] = useState({}); // Initialize as an object

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8888/api/cases");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log("Fetched cases:", jsonData); // Log fetched cases
        setData(jsonData); // Update state with the fetched cases
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    };

    fetchData();
  }, []);

  // Convert object values to an array
  const dataArray = Object.values(data);

  return (
    <IonPage>
      <IonContent>
        {/* Search Bar */}
        <IonSearchbar placeholder="Search Cases"></IonSearchbar>

        {/* List of Cases */}
        <IonList>
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
        </IonList>

        {/* Add Case Button */}
        <Link to="/bottomtabs/addcases">
          <IonButton expand="block">Add Case</IonButton>
        </Link>
      </IonContent>
    </IonPage>
  );
};

export default ViewCasesPage;
