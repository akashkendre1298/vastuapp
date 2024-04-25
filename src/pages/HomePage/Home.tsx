import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonButton, IonImg, IonProgressBar, IonFooter } from '@ionic/react';
import { cash, folder, calendar, barChart, personAdd,  cashSharp, folderOpen, barChartSharp, fileTraySharp, fileTrayFullSharp, personCircle, personCircleOutline, navigate } from 'ionicons/icons';
import logo from "../../Assets/pandit_shivkumar_logo.png"
import {useHistory} from "react-router-dom"
import "./Home.css"
import BottomTabs from '../../components/BottomTabs/BottomTabs';

const Home = () => {
  const history = useHistory();



const handleButtonClick = (buttonName) => {
  

  switch (buttonName) {
    case 'executive':
      history.push('/viewexecutive');
      break;
    case 'cases':
      history.push('/cases');
      break;
      case 'meetings':
      history.push('/upcomingmeeting');
      break;
      case 'revenue':
      history.push('/revenue');
      break;
      case 'client':
      history.push('/client');
      break;   
      case 'reports':
      history.push('/reports');
      break;
    default:
     
      break;
  }
};

  return (
    <IonPage style={{ backgroundColor: '#f0f0f0' }}>
      <IonHeader>
      <IonToolbar style={{ display: 'flex', justifyContent: 'space-between', padding:"0 10px 0 10px" }}> {/* Added flex styles */}
      {/* <IonProgressBar type="indeterminate"></IonProgressBar> */}
    <IonIcon icon={personCircleOutline} style={{ fontSize: '35px' }} slot='start'></IonIcon>
  
  <IonImg src={logo} alt="App Logo" style={{ width: '60px', height: '60px' }} slot='end' /> {/* Replace with your logo path */}
</IonToolbar>

      </IonHeader>
      <IonContent style={{ paddingTop: '100px', backgroundColor: '#f0f0f0' }}> 
  <IonGrid style={{ paddingTop: '50px', background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)' }}>
    <IonRow>
      <IonCol>
        <IonCard  style={{height: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} button  onClick={() => handleButtonClick('executive')}> 
          <IonCardHeader>
            <IonCardTitle style={{display:'block',justifyContent:'center',alignItem:'center'}} >
              <IonIcon icon={cashSharp} style={{ fontSize: '35px', marginBottom: '10px',  paddingLeft:'30%',paddingTop:'20%'  }}  /> 
              Executives
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
      </IonCol>
      <IonCol>
        <IonCard style={{ color:"black",height: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} button onClick={() => handleButtonClick('cases')}> 
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={folderOpen} style={{ fontSize: '35px', marginBottom: '10px' ,  paddingLeft:'30%',paddingTop:'20%' }} /> 
              Cases
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
      </IonCol>
      <IonCol>
        <IonCard style={{color:"black", height: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}  button  onClick={() => handleButtonClick('meetings')}> 
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={calendar} style={{ fontSize: '35px', marginBottom: '10px' ,  paddingLeft:'30%',paddingTop:'20%' }} /> 
              Meetings
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
      </IonCol>
      <IonCol>
        <IonCard style={{color:"black", height: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}  button  onClick={() => handleButtonClick('revenue')}> 
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={barChartSharp} style={{ fontSize: '35px', marginBottom: '10px' ,  paddingLeft:'30%',paddingTop:'20%' }} /> {/* Added margin for spacing */}
              Revenue
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
    <IonRow className="add-card-row">
      <IonCol>
        <IonCard style={{color:"black", height: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}  button  onClick={() => handleButtonClick('client')}> 
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={personAdd} style={{ fontSize: '35px', marginBottom: '10px' ,  paddingLeft:'30%',paddingTop:'20%' }} /> 
               <br />Add Client
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
      </IonCol>
      <IonCol>
        <IonCard style={{color:"black", height: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}  button  onClick={() => handleButtonClick('reports')}> 
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={fileTrayFullSharp} style={{ fontSize: '35px', marginBottom: '10px' ,  paddingLeft:'30%',paddingTop:'20%' }} /> {/* Added margin for spacing */}
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
