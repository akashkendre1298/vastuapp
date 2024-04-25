import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonLabel, IonItem, IonButton, IonButtons, IonBackButton, IonImg } from '@ionic/react';
import React from 'react';
import"./Revenue.css"
import logo from "../../Assets/pandit_shivkumar_logo.png"
import BottomTabs from '../../components/BottomTabs/BottomTabs';

const Revenue = () => {

    return (
        <IonPage>
            <IonHeader>
    <IonToolbar style={{ color: "#00004D" }}>
      <IonButtons slot="start">
        <IonBackButton defaultHref="#" />
      </IonButtons>

      {/* <IonTitle>Executives</IonTitle> */}

      <IonButtons slot="end">
        <IonImg src={logo} alt="App Logo" />
      </IonButtons>
    </IonToolbar>

    <IonToolbar color="primary">
      <IonTitle>Revenue</IonTitle>
    </IonToolbar>
  </IonHeader>
            <IonContent className="ion-padding">
             <div className='div-revenue-first-section'>
                <div>

                <p style={{fontSize:"18px", fontWeight:"bold"}}>Total Revenue</p>
                <p style={{fontSize:"18px", fontWeight:"bold"}}>₹ 42000</p>
                </div>
                <div>

                <p>
                    <IonSelect interface='popover'>
                        <IonSelectOption value="1">This Month</IonSelectOption>
                        <IonSelectOption value="2">Last Weak</IonSelectOption>
                        <IonSelectOption value="3">last year</IonSelectOption>
                    </IonSelect>
                </p>
                </div>
             </div>

             <div className='div-revenue-first-section'>
                <div>
                <p>Overview</p>

                </div>
                <div>
                <IonSelect interface='popover'>
                        <IonSelectOption value="1">This Month</IonSelectOption>
                        <IonSelectOption value="2">Last Weak</IonSelectOption>
                        <IonSelectOption value="3">last year</IonSelectOption>
                    </IonSelect>
                </div>
             </div>


             <div className='div-revenue-first-section'>
                <div>
                    <p>
                        Nishant 
                    </p>
                </div>
                <div>
                    <p>

                    ₹25000
                    </p>
                </div>
             </div>
             
             <div className='div-revenue-first-section'>
                <div>
                    <p>
                        Sagar 
                    </p>
                </div>
                <div>
                    <p>

                    ₹15000
                    </p>
                </div>
             </div>
            </IonContent>
            <BottomTabs/>
        </IonPage>
    );
};

export default Revenue;