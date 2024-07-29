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
  const [expandedMeeting, setExpandedMeeting] = useState(null);

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
      const response = await fetch(
        `https://backend.piyushshivkumarshhri.com/api/meetings`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch meetings");
      }
      const data = await response.json();
      const sortedMeetings = data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
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
      const fullRoute = `https://backend.piyushshivkumarshhri.com/api/meetings/getbydate/${formattedDate}`;
      console.log("Full API Route:", fullRoute); // Log the full API route
      const response = await fetch(fullRoute);
      if (!response.ok) {
        throw new Error("Failed to fetch meetings for selected date");
      }
      const data = await response.json();
      console.log("Meetings for Selected Date:", data); // Check the data received for the selected date
      const sortedMeetings = data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
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

  const toggleExpand = (meetingId) => {
    setExpandedMeeting((prev) => (prev === meetingId ? null : meetingId));
  };

  return (
    <IonPage>
      <IonHeader>
        <ToolBar />
      </IonHeader>
      <IonContent>
        <IonGrid>
          <div style={{ textAlign: "right", marginRight: "10px" }}>
            <div style={{ paddingBottom: "10px", paddingLeft: "10px" }}>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  const formattedDate = formatDate(e.target.value);
                  const fullRoute = `https://backend.piyushshivkumarshhri.com/api/meetings/getbydate/${formattedDate}`;
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

          <div style={{ marginBottom: "20px" }}>
            <IonList>
              <p style={{ paddingLeft: "10px" }}>Meetings on {selectedDate}</p>

              {noMeetingsToday && <IonItem>No meetings for today</IonItem>}
              {loading && <IonItem>Loading...</IonItem>}
              {!loading &&
                selectedDateMeetings.length > 0 &&
                selectedDateMeetings.map((meeting) => (
                  <div key={meeting._id}>
                    <IonItem
                      button
                      detail={true}
                      onClick={() => toggleExpand(meeting._id)}
                      style={{
                        border: "1px solid black",
                        marginBottom: "25px",
                        borderRadius: "10px",
                      }}
                    >
                      <IonLabel style={{ padding: "5px" }}>
                        <p>
                          <b>Meeting Aim:</b> &nbsp;&nbsp;{meeting.meetingTitle}
                        </p>
                        <p>
                          <b>Meeting Mode:</b> &nbsp;&nbsp;{meeting.meetingMode}
                        </p>
                      </IonLabel>
                    </IonItem>
                    {expandedMeeting === meeting._id && (
                      <div className="meeting-details">
                        <IonLabel>
                          <p>
                            <b>Executive Name:</b> &nbsp;&nbsp;
                            {meeting.executiveName}
                          </p>
                          <p>
                            <b>Executive Email:</b> &nbsp;&nbsp;
                            {meeting.executivesEmail}
                          </p>
                          <p>
                            <b>Date:</b> &nbsp;&nbsp;{meeting.date}
                          </p>
                          <p>
                            <b>Details:</b> &nbsp;&nbsp;{meeting.details}
                          </p>
                        </IonLabel>
                      </div>
                    )}
                  </div>
                ))}
            </IonList>
          </div>

          <div>
            <IonList style={{ paddingBottom: "50px" }}>
              <p style={{ paddingLeft: "10px" }}>Upcoming Meetings</p>
              {loading && <IonItem>Loading...</IonItem>}
              {!loading &&
                meetings.length > 0 &&
                meetings.map((meeting) => (
                  <div key={meeting._id}>
                    <IonItem
                      button
                      detail={true}
                      onClick={() => toggleExpand(meeting._id)}
                      style={{
                        border: "1px solid black",
                        marginBottom: "25px",
                        borderRadius: "10px",
                      }}
                    >
                      <IonLabel style={{ padding: "5px" }}>
                        <p>
                          <b>Meeting Aim:</b> &nbsp;&nbsp;{meeting.meetingTitle}
                        </p>
                        <p>
                          <b>Meeting Mode:</b> &nbsp;&nbsp;{meeting.meetingMode}
                        </p>
                      </IonLabel>
                    </IonItem>
                    {expandedMeeting === meeting._id && (
                      <div className="meeting-details">
                        <IonLabel>
                          <p>
                            <b>Executive Name:</b> &nbsp;&nbsp;
                            {meeting.executiveName}
                          </p>
                          <p>
                            <b>Executive Email:</b> &nbsp;&nbsp;
                            {meeting.executivesEmail}
                          </p>
                          <p>
                            <b>Date:</b> &nbsp;&nbsp;{meeting.date}
                          </p>
                          <p>
                            <b>Details:</b> &nbsp;&nbsp;{meeting.details}
                          </p>
                        </IonLabel>
                      </div>
                    )}
                  </div>
                ))}
            </IonList>
          </div>

          <div
            style={{
              position: "fixed",
              bottom: 5,
              width: "90%",
              zIndex: 1,
              marginLeft: "12px",
            }}
          >
            <Link to="/bottomtabs/addmeetings">
              <button className="add-meeting-btn">Add Meeting</button>
            </Link>
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UpComingMeetings;
