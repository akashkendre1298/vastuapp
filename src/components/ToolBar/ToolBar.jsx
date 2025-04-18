import {
  IonBackButton,
  IonButtons,
  IonImg,
  IonToolbar,
  IonSpinner,
} from "@ionic/react";
import React, { useState } from "react";
import logo from "../../Assets/pandit_shivkumar_logo.png";
import { useHistory } from "react-router-dom";

import "./ToolBar.css";

const ToolBar = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const goBack = () => {
    setLoading(true); // Start loading spinner

    history.goBack();

    setTimeout(() => {
      window.location.reload(); // Hard refresh the page after a short delay
    }, 500);
  };

  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            defaultHref="#"
            onClick={goBack}
            className="back-button"
          ></IonBackButton>
        </IonButtons>

        <IonButtons slot="end">
          {loading ? ( // Show spinner when loading
            <IonSpinner name="crescent" />
          ) : (
            <IonImg
              src={logo}
              alt="App Logo"
              style={{ paddingRight: "15px" }}
            />
          )}
        </IonButtons>
      </IonToolbar>

      {/* Transparent white overlay when loading */}
      {loading && (
        <div className="loading-overlay">
          <IonSpinner name="crescent" />
        </div>
      )}
    </>
  );
};

export default ToolBar;
