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
  const [selectedDateMeetings, setSelectedDateMeetings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);
  const [noMeetingsToday, setNoMeetingsToday] = useState(false);

  useEffect(() => {
    fetchMeetings();
    fetchMeetingsByDate(selectedDate);
  }, [selectedDate]);

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };
  

  const fetchMeetings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8888/api/meetings`);
      if (!response.ok) {
        throw new Error("Failed to fetch meetings");
      }
      const data = await response.json();
      const sortedMeetings = data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setMeetings(sortedMeetings);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching meetings:", error);
      setLoading(false);
    }
  };

  const fetchMeetingsByDate = async (date) => {
    setLoading(true);
    try {
      const formattedDate = formatDate(date);
      console.log("Formatted Date:", formattedDate); // Check the formatted date
      const fullRoute = `http://localhost:8888/api/meetings/getbydate/${formattedDate}`;
      console.log("Full API Route:", fullRoute); // Log the full API route
      const response = await fetch(fullRoute);
      if (!response.ok) {
        throw new Error("Failed to fetch meetings for selected date");
      }
      const data = await response.json();
      console.log("Meetings for Selected Date:", data); // Check the data received for the selected date
      const sortedMeetings = data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setSelectedDateMeetings(sortedMeetings);
      setLoading(false);
      if (sortedMeetings.length === 0) {
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
                paddingLeft: "10px",
              }}
            >
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  const formattedDate = formatDate(e.target.value);
                  const fullRoute = `http://localhost:8888/api/meetings/getbydate/${formattedDate}`;
                  console.log("Full API Route:", fullRoute);
                }}
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

          <div style={{ borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
            <IonList>
            <p>Meetings on  {selectedDate}</p>

              {noMeetingsToday && <IonItem>No meetings for today</IonItem>}
              {loading && <IonItem>Loading...</IonItem>}
              {!loading &&
                selectedDateMeetings.length > 0 &&
                selectedDateMeetings.map((meeting) => (
                  <IonRouterLink
                    key={meeting._id}
                    routerLink={`/bottomtabs/individualmeeting/${meeting._id}`}
                  >
                    <IonItem button detail={true}>
                      <IonLabel style={{ padding: "5px" }}>
                        <p>{meeting.meetingTitle}</p>
                        <p>{new Date(meeting.date).toLocaleString()}</p>
                      </IonLabel>
                    </IonItem>
                  </IonRouterLink>
                ))}
            </IonList>
          </div>

          <div>
            <IonList style={{paddingBottom:"50px"}}>
              <p>Upcoming Meetings</p>
              {loading && <IonItem>Loading...</IonItem>}
              {!loading &&
                meetings.length > 0 &&
                meetings.map((meeting) => (
                  <IonRouterLink
                    key={meeting._id}
                    routerLink={`/bottomtabs/individualmeeting/${meeting._id}`}
                    >
                    <IonItem button detail={true}>
                      <IonLabel style={{ padding: "5px" }}>
                        <p>{meeting.meetingTitle}</p>
                        <p>{new Date(meeting.date).toLocaleString()}</p>
                      </IonLabel>
                    </IonItem>
                  </IonRouterLink>
                ))}
            </IonList>
          </div>

          <div
            style={{
              position: "fixed",
              bottom: 5,
              width: "90%",
              zIndex: 1,
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
