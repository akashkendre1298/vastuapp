import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonList,
  IonButtons,
  IonBackButton,
  IonImg,
  IonButton,
  IonRouterLink,
  IonGrid,
} from "@ionic/react";
import logo from "../../Assets/pandit_shivkumar_logo.png";
import "./UpCommingMeeting.css";

import BottomTabs from "../../components/BottomTabs/BottomTabs";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import ToolBar from "../../components/ToolBar/ToolBar";

const UpComingMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMeetings(selectedDate);
  }, [selectedDate]); // Fetch meetings whenever selectedDate changes

  const fetchMeetings = async (date) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8888/api/meetings?date=${date}`);
      if (!response.ok) {
        throw new Error("Failed to fetch meetings");
      }
      const data = await response.json();
      setMeetings(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching meetings:", error);
      setLoading(false);
    }
  };

  return (
    <IonPage style={{ backgroundColor: "rgba(192, 188, 188, 0.601)" }}>
      <IonHeader>
      <ToolBar/>

      </IonHeader>
      <IonContent style={{ backgroundColor: "rgba(192, 188, 188, 0.601)" }}>
        <IonGrid style={{ backgroundColor: "rgba(192, 188, 188, 0.601)" }}>
          <div>
            <SearchBar />
          </div>

          <div style={{ textAlign: "right", marginRight: "10px" }}>
            <div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
          <IonList lines="full">
            {loading && <IonItem>Loading...</IonItem>}
            {!loading &&
              (meetings.length > 0 ? (
                meetings.map((meeting) => (
                  <IonRouterLink
                    key={meeting._id}
                    routerLink={`/individualmeeting/${meeting._id}`}
                  >
                    <IonItem button detail={true} style={{ paddingBottom: "25px" }}>
                      <IonLabel style={{ padding: "5px" }}>
                        <p>{meeting.meetingTitle}</p>
                        <p>{new Date(meeting.date).toLocaleString()}</p>
                      </IonLabel>
                    </IonItem>
                  </IonRouterLink>
                ))
              ) : (
                <IonItem>No meetings for selected date</IonItem>
              ))}
          </IonList>
          <Link to="/bottomtabs/addmeetings">
            <IonButton>Add Meeting</IonButton>
          </Link>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UpComingMeetings;
