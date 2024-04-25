import React from 'react';
import { IonPage, IonContent, IonButton, IonIcon, IonText, IonFooter, IonToolbar } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import './ExecutiveProfile.css'; // Import custom CSS file
import BottomTabs from '../../components/BottomTabs/BottomTabs';
import { useHistory } from 'react-router';

const ExecutiveProfile = () => {
    const history = useHistory();

    const handleclients = () => {
        history.push('/individualclients');
        console.log('button clicked');
    }
  return (
    <IonPage>
      <IonContent className="ion-padding">
        {/* Profile Picture Section */}
        <div className="profile-picture">
          <IonIcon icon={personCircleOutline}  className="profile-icon" /> {/* Add class for icon size */}
          <IonText className="profile-name">Abc</IonText> {/* Add class for font size */}
        </div>

        {/* Dummy Address Section */}
        <div className="profile-section padded-top"> {/* Add class for padding */}
          <IonText>1234 Example Street</IonText>
          <IonText>City, Country</IonText>
        </div>

        {/* Total Clients and View Clients Button */}
        <div className="profile-section">
          <IonText>Total Number of Clients: 10</IonText>
          <button className='view-client-button' onClick={handleclients}>View Clients</button>
        </div>

        {/* No of Cases Associated Section */}
        <div className="profile-section">
          <IonText>No of Cases Associated: 5</IonText>
        </div>

        {/* Ongoing Cases Section */}
        <div className="profile-section">
          <IonText>Ongoing Cases: 3</IonText>
          
         

        </div>
        <div>
          <p>Case Name 1</p>
          <p>Case Name 2</p>
          <p>Case Name 3</p>
          <p>Case Name 4</p>
          </div>

        {/* Edit and Delete Buttons */}
        <div className="profile-actions">
          <button className='signUp-button'>Edit </button>
          <button className='signUp-button'>Delete </button>
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar>
        <BottomTabs/>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ExecutiveProfile;
