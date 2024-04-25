import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonSearchbar, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';

const ViewCasesPage = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8888/api/cases');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched cases:', data); // Log fetched cases
        setCases(data); // Update state with the fetched cases
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <IonPage>
      <IonContent>
        {/* Search Bar */}
        <IonSearchbar placeholder="Search Cases"></IonSearchbar>

        {/* List of Cases */}
        <IonList>
          {cases.map((caseItem) => (
            console.log('Case item:', caseItem), // Log each case item
            <IonItem key={caseItem.id}>
              <IonLabel>
                <h2>{caseItem.name}</h2>
                <p>Client: {caseItem.client}</p>
                <p>Executive: {caseItem.executive}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        {/* Add Case Button */}
        <IonButton expand="block" routerLink="/add-case">Add Case</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ViewCasesPage;
