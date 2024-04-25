import React, { useState } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonSearchbar, IonList, IonItem, IonLabel, IonFooter } from '@ionic/react';
import "./IndividualClients.css"
import BottomTabs from '../../components/BottomTabs/BottomTabs';



const IndividualClients = () => {
  const [searchText, setSearchText] = useState('');
  // Assume client data is available as an array of objects
  const clients = [
    { id: 1, name: 'Client 1', executive: 'Abc client' },
    { id: 2, name: 'Client 2', executive: 'Abc client' },
    { id: 3, name: 'Client 3', executive: 'Abc client' },
    // Add more client objects as needed
  ];

  // Filter clients based on search text
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Group clients by executive
  const clientsByExecutive = {};
  filteredClients.forEach(client => {
    if (!clientsByExecutive[client.executive]) {
      clientsByExecutive[client.executive] = [];
    }
    clientsByExecutive[client.executive].push(client);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Individual Clients</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value)}></IonSearchbar>

        {/* List of clients grouped by executive */}
        {Object.keys(clientsByExecutive).map(executive => (
          <div key={executive}>
            <h3>{executive}</h3>
            <IonList>
              {clientsByExecutive[executive].map(client => (
                <IonItem key={client.id}  button detail={true}>
                  <IonLabel>{client.name}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </div>
        ))}
      </IonContent>
  
      <IonFooter>
        <IonToolbar>
        <BottomTabs/>
        </IonToolbar>
      </IonFooter>

    </IonPage>
  );
};

export default IndividualClients;
