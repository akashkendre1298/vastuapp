import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonList,
  IonSearchbar,
  IonButtons,
  IonBackButton,
  IonImg,
  IonFooter,
  IonButton,
  IonRouterLink,
} from "@ionic/react";
import React from "react";
import logo from "../../Assets/pandit_shivkumar_logo.png";
import "./UpCommingMeeting.css";

import BottomTabs from "../../components/BottomTabs/BottomTabs";
import SearchBar from "../../components/SearchBar/SearchBar";

const UpComingMeetings = () => {
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

        <IonToolbar color="primary">
          <IonTitle>Upcoming Meetings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div>

       <SearchBar/>
        </div>

        <IonList lines="full">
          <IonRouterLink routerLink={`/individualmeeting`}>
            <IonItem
              button
              detail={true}
              style={{
                border: "1px solid black",
                marginBottom: "25px",
                
              }}
            >
              <IonLabel style={{ padding: "10px" }}>
                <p>Meeting Aim</p>
                <p>Date</p>
              </IonLabel>
            </IonItem>
          </IonRouterLink>

          <IonRouterLink routerLink={`/individualmeeting`}>
            <IonItem
              button
              detail={true}
              style={{
                border: "1px solid black",
                marginBottom: "25px",
                
              }}
            >
              <IonLabel style={{ padding: "10px" }}>
                <p>Meeting Aim</p>
                <p>Date</p>
              </IonLabel>
            </IonItem>
          </IonRouterLink>

          <IonRouterLink routerLink={`/individualmeeting`}>
            <IonItem
              button
              detail={true}
              style={{
                border: "1px solid black",
                marginBottom: "25px",
                
              }}
            >
              <IonLabel style={{ padding: "10px" }}>
                <p>Meeting Aim</p>
                <p>Date</p>
              </IonLabel>
            </IonItem>
          </IonRouterLink>

          <IonRouterLink routerLink={`/individualmeeting`}>
            <IonItem
              button
              detail={true}
              style={{
                border: "1px solid black",
                marginBottom: "25px",
                
              }}
            >
              <IonLabel style={{ padding: "10px" }}>
                <p>Meeting Aim</p>
                <p>Date</p>
              </IonLabel>
            </IonItem>
          </IonRouterLink>
        </IonList>
        {/* <button className="signUp-button" style={{marginTop:"20px"}} href="/meeting" >
              Add Meeting

            </button> */}

        <IonButton routerLink="/meeting">Add Meeting</IonButton>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <BottomTabs />
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default UpComingMeetings;
