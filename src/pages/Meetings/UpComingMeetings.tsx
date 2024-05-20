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
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);
  const [noMeetingsToday, setNoMeetingsToday] = useState(false);

  useEffect(() => {
    fetchMeetings(selectedDate);
  }, [selectedDate]); // Fetch meetings whenever selectedDate changes

  const fetchMeetings = async (date) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8888/api/meetings?date=${date}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch meetings");
      }
      const data = await response.json();
      setMeetings(data);
      setLoading(false);
      if (data.length === 0) {
        setNoMeetingsToday(true);
      } else {
        setNoMeetingsToday(false);
      }
    } catch (error) {
      console.error("Error fetching meetings:", error);
      setLoading(false);
    }
  };

  return (
    <IonPage style={{ backgroundColor: "rgba(192, 188, 188, 0.601)" }}>
      <IonHeader>
        <ToolBar />
      </IonHeader>
      <IonContent>
        <IonGrid style={{ backgroundColor: "rgba(192, 188, 188, 0.601)" }}>
          <div style={{ marginTop: "-10px" }}>
            <SearchBar />
          </div>
          <div style={{ textAlign: "right", marginRight: "10px" }}>
            <div
              style={{
                paddingBottom: "10px",
                // marginTop: "10px",
                paddingLeft: "10px",
              }}
            >
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  width: "50%",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div style={{ height: "63vh" }}>
            {noMeetingsToday && <IonItem>No meetings for today</IonItem>}
            <IonList>
              {loading && <IonItem>Loading...</IonItem>}
              {!loading &&
                (meetings.length > 0
                  ? meetings.map((meeting) => (
                      <IonRouterLink
                        key={meeting._id}
                        routerLink={`/individualmeeting/${meeting._id}`}
                      >
                        <IonItem button detail={true}>
                          <IonLabel style={{ padding: "5px" }}>
                            <p>{meeting.meetingTitle}</p>
                            <p>{new Date(meeting.date).toLocaleString()}</p>
                          </IonLabel>
                        </IonItem>
                      </IonRouterLink>
                    ))
                  : !noMeetingsToday && (
                      <IonItem>No meetings for selected date</IonItem>
                    ))}
            </IonList>
          </div>

          <div
            style={{
              position: "fixed",
              bottom: 5,
              width: "90%",
              zIndex: 1,
              // marginTop: "20px",
              marginLeft: "18px",
            }}
          >
            <Link to="/bottomtabs/addmeetings">
              <button className="add-executive-btn">Add Meeting</button>
            </Link>
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UpComingMeetings;
