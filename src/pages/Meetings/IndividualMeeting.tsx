import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonDatetime, IonTextarea, IonButton, IonButtons, IonImg, IonBackButton, IonFooter } from '@ionic/react';
import React, { useState } from 'react';
import logo from "../../Assets/pandit_shivkumar_logo.png"
import BottomTabs from '../../components/BottomTabs/BottomTabs';


const AddMeeting = () => {
    const [meetingAim, setMeetingAim] = useState('');
    const [executiveName, setExecutiveName] = useState('');
    const [executiveEmail, setExecutiveEmail] = useState('');
    const [date, setDate] = useState('');
    const [conductionMode, setConductionMode] = useState('');
    const [otherDetails, setOtherDetails] = useState('');

    const handleAddMeeting = () => {
        // Implement your logic to handle adding a meeting here
        console.log('Meeting details:', {
            meetingAim,
            executiveName,
            executiveEmail,
            date,
            conductionMode,
            otherDetails
        });
    };

    return (
        <IonPage>
             <IonHeader>
    <IonToolbar style={{ color: "#00004D" }}>
      <IonButtons slot="start">
        <IonBackButton defaultHref="#" />
      </IonButtons>

     

      <IonButtons slot="end">
        <IonImg src={logo} alt="App Logo" />
      </IonButtons>
    </IonToolbar>

    {/* <IonToolbar color="primary">
      <IonTitle>Add Meeting</IonTitle>
    </IonToolbar> */}
  </IonHeader>
  <IonContent className="ion-padding">
              <div style={{paddingBottom:"10px"}}>

              <IonLabel position="floating"  style={{padding:"10px"}}>Meeting Aim</IonLabel>

              </div>
                <IonItem style={{border:"1px solid black",marginBottom:"25px"}} >
                    {/* <IonLabel position="floating" >Meeting Aim</IonLabel> */}
                    <IonInput value={meetingAim} onIonChange={(e) => setMeetingAim(e.detail.value)} placeholder='Meeting Aim'></IonInput>
                </IonItem>
                <div style={{paddingBottom:"10px"}}>

                <IonLabel position="floating"  style={{padding:"10px"}}>Executive Name</IonLabel>
</div>
                <IonItem style={{border:"1px solid black",marginBottom:"25px"}}>
                    <IonInput value={executiveName} onIonChange={(e) => setExecutiveName(e.detail.value)} placeholder='Executive Name'></IonInput>
                </IonItem>

                <div style={{paddingBottom:"10px"}}>

                <IonLabel position="floating"  style={{padding:"10px"}}>Executive Email</IonLabel>
</div>

                <IonItem style={{border:"1px solid black",marginBottom:"25px"}}>
                    <IonInput type="email" value={executiveEmail} onIonChange={(e) => setExecutiveEmail(e.detail.value)} placeholder='Executive Email'></IonInput>
                </IonItem>

                <div style={{paddingBottom:"10px"}}>
  <label htmlFor="" >Date</label>
</div>
                <IonItem style={{border:"1px solid black",marginBottom:"25px"}}>
                   
                   <IonInput type="date"/>
                     </IonItem>
<div style={{paddingBottom:"10px"}}>

                    <IonLabel position="floating">Conduction Mode</IonLabel>
</div>
                <IonItem style={{border:"1px solid black",marginBottom:"25px"}}>
                <IonLabel position="floating"></IonLabel>

                    <IonSelect value={conductionMode} onIonChange={(e) => setConductionMode(e.detail.value)}
                      interface="popover" placeholder='Mode'>
                        <IonSelectOption value="Online">Online</IonSelectOption>
                        <IonSelectOption value="In-person">In-person</IonSelectOption>
                    </IonSelect>
                </IonItem>

<div style={{paddingBottom:"10px"}}>

                    <IonLabel position="floating">Other Details</IonLabel>
</div>
                <IonItem style={{border:"1px solid black",marginBottom:"25px"}}>
                    <IonTextarea value={otherDetails} onIonChange={(e) => setOtherDetails(e.detail.value)}></IonTextarea>
                </IonItem>

                <IonButton expand="full" onClick={handleAddMeeting}>Add Meeting</IonButton>
            </IonContent>
            <IonFooter>
        <IonToolbar>
        <BottomTabs/>
        </IonToolbar>
      </IonFooter>
        </IonPage>
    );
};

export default AddMeeting;
