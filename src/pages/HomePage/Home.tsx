import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonButton, IonImg, IonProgressBar } from '@ionic/react';
import { cash, folder, calendar, barChart, personAdd,  cashSharp, folderOpen, barChartSharp, fileTraySharp, fileTrayFullSharp, personCircle, personCircleOutline } from 'ionicons/icons';
import logo from "../../Assets/pandit_shivkumar_logo.png"
const Home = () => {
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar style={{ display: 'flex', justifyContent: 'space-between', padding:"0 10px 0 10px" }}> {/* Added flex styles */}
      {/* <IonProgressBar type="indeterminate"></IonProgressBar> */}
    <IonIcon icon={personCircleOutline} style={{ fontSize: '35px' }} slot='start'></IonIcon>
  
  <IonImg src={logo} alt="App Logo" style={{ width: '60px', height: '60px' }} slot='end' /> {/* Replace with your logo path */}
</IonToolbar>

      </IonHeader>
      <IonContent style={{ paddingTop: '30px' }}> {/* Add padding for spacing */}
  <IonGrid>
    <IonRow>
      <IonCol>
        <IonCard style={{ height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Added flex styles for centering */}
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={cashSharp} style={{ fontSize: '35px', marginBottom: '10px' }} slot='' /> {/* Added margin for spacing */}
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
