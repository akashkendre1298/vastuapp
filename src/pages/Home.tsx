import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonButton } from '@ionic/react';
import { cash, folder, calendar, barChart, personAdd,  cashSharp, folderOpen, barChartSharp, fileTraySharp, fileTrayFullSharp, personCircle, personCircleOutline } from 'ionicons/icons';

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar style={{ display: 'flex', justifyContent: 'space-between' }}> {/* Added flex styles */}
<div className='home'>
  <div>
    <IonIcon icon={personCircleOutline} size="large" color="primary" />
  </div>
  <div>

  <img src="your_logo.png" alt="App Logo" style={{ width: '50px', height: '50px' }} /> {/* Replace with your logo path */}
  </div>
</div>
</IonToolbar>

      </IonHeader>
      <IonContent style={{ paddingTop: '20px' }}> {/* Add padding for spacing */}
  <IonGrid>
    <IonRow>
      <IonCol>
        <IonCard style={{ height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Added flex styles for centering */}
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={cashSharp} style={{ fontSize: '35px', marginBottom: '10px' }} /> {/* Added margin for spacing */}
              Executives
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
      </IonCol>
      <IonCol>
        <IonCard style={{ height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Added flex styles for centering */}
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={folderOpen} style={{ fontSize: '35px', marginBottom: '10px' }} /> {/* Added margin for spacing */}
              Cases
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
      </IonCol>
      <IonCol>
        <IonCard style={{ height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Added flex styles for centering */}
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={calendar} style={{ fontSize: '35px', marginBottom: '10px' }} /> {/* Added margin for spacing */}
              Meetings
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
      </IonCol>
      <IonCol>
        <IonCard style={{ height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Added flex styles for centering */}
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={barChartSharp} style={{ fontSize: '35px', marginBottom: '10px' }} /> {/* Added margin for spacing */}
              Revenue
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
    <IonRow className="add-card-row">
      <IonCol>
        <IonCard style={{ height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Added flex styles for centering */}
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={personAdd} style={{ fontSize: '35px', marginBottom: '10px' }} /> {/* Added margin for spacing */}
              Add Client
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
      </IonCol>
      <IonCol>
        <IonCard style={{ height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Added flex styles for centering */}
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={fileTrayFullSharp} style={{ fontSize: '35px', marginBottom: '10px' }} /> {/* Added margin for spacing */}
              Reports
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  </IonGrid>
</IonContent>


    </IonPage>
  );
};

export default Home;
