import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import logo from "../../Assets/pandit_shivkumar_logo.png";

const ToolBar = () => {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="#" />
      </IonButtons>

      <IonButtons slot="end">
        <IonImg src={logo} alt="App Logo" />
      </IonButtons>
    </IonToolbar>
  );
};

export default ToolBar;
