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
import { useHistory } from 'react-router-dom';

const ToolBar = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };
  return (
    <IonToolbar>
      <IonButtons slot="start">
      <IonBackButton
              defaultHref="#"
              onClick={goBack}
              className="back-button"
            ></IonBackButton>
      </IonButtons>

      <IonButtons slot="end">
        <IonImg src={logo} alt="App Logo" />
      </IonButtons>
    </IonToolbar>
  );
};

export default ToolBar;
