import React, { useState, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonLabel,
  IonItem,
  IonList,
} from "@ionic/react";
import ToolBar from "../../components/ToolBar/ToolBar";
import "./UpCommingMeeting.css";
import { Link } from "react-router-dom";

const UpComingMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [todaysMeetings, setTodaysMeetings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [expandedTodayMeetingId, setExpandedTodayMeetingId] = useState(null);
  const [expandedUpcomingMeetingId, setExpandedUpcomingMeetingId] = useState(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch(
          "https://backend.piyushshivkumarshhri.com/api/meetings"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log("Fetched data:", data); // Debugging: Check fetched data
        setMeetings(data);
        filterMeetings(data, selectedDate);
        filterTodaysMeetings(data);
      } catch (error) {
        // console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, [selectedDate]);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const filterMeetings = (meetings, date) => {
    const today = new Date(date);
    today.setHours(0, 0, 0, 0); // Normalize time part for accurate comparison

    const filtered = meetings.filter(
      (meeting) => parseDate(meeting.date) >= today
    );
    setFilteredMeetings(filtered);
  };

  const filterTodaysMeetings = (meetings) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize time part for accurate comparison

    const todays = meetings.filter(
      (meeting) => parseDate(meeting.date).getTime() === today.getTime()
    );
    setTodaysMeetings(todays);
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    filterMeetings(meetings, newDate);
  };

  const handleTodayMeetingClick = (meetingId) => {
    setExpandedTodayMeetingId((prevId) => (prevId === meetingId ? null : meetingId));
  };

  const handleUpcomingMeetingClick = (meetingId) => {
    setExpandedUpcomingMeetingId((prevId) => (prevId === meetingId ? null : meetingId));
  };

  return (
    <IonPage>
      <IonHeader>
        <ToolBar />
      </IonHeader>
      <IonContent style={{ backgroundColor: "#e2dee9" }}>
        <div style={{ margin: "14px 14px 0 14px" }}>
          <div>
            <h2>Today's Meetings</h2>
          </div>
          <div style={{ maxHeight: '150px', overflowY: 'auto',  background: '#e2dee9', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <IonList>
              {todaysMeetings.length > 0 ? (
                todaysMeetings.map((meeting) => (
                  <IonItem
                    key={meeting._id}
                    onClick={() => handleTodayMeetingClick(meeting._id)}
                  >
                    <IonLabel>
                      <div
                        style={{
                          backgroundColor: "white",
                          border: "1px solid black",
                          padding: "10px",
                          borderRadius: "10px",
                          marginBottom: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <h3>{meeting.meetingTitle}</h3>
                        <p>{parseDate(meeting.date).toDateString()}</p>
                      </div>
                      {expandedTodayMeetingId === meeting._id && (
                        <div className="meeting-details">
                          <p>
                            <strong>Client Name:</strong>{" "}
                            {meeting.clientName}
                          </p>
                          <p>
                            <strong>Meeting Mode:</strong> {meeting.meetingMode}
                          </p>
                          <p>
                            <strong>Details:</strong> {meeting.details}
                          </p>
                        </div>
                      )}
                    </IonLabel>
                  </IonItem>
                ))
              ) : (
                <IonItem>No meetings today</IonItem>
              )}
            </IonList>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0 14px 0 14px",
          }}
        >
          <div>
            <h2>Upcoming Meetings</h2>
          </div>
          <div>
            <input
              style={{ color: "white", padding: "5px", borderRadius: "5px" }}
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div style={{ maxHeight: '150px', overflowY: 'auto', margin: '14px 0 0 0', background: '#e2dee9', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <IonList style={{ background: 'transparent' }}>
            {filteredMeetings.length > 0 ? (
              filteredMeetings.map((meeting) => (
                <IonItem
                  key={meeting._id}
                  onClick={() => handleUpcomingMeetingClick(meeting._id)}
                >
                  <IonLabel>
                    <div
                      style={{
                        backgroundColor: "white",
                        border: "1px solid black",
                        padding: "10px",
                        borderRadius: "10px",
                        marginBottom: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <div className="upComingMeetingContent">
                        <div>
                          <p>{parseDate(meeting.date).toDateString()}</p>
                        </div>
                        <div>
                          <RiArrowDownSLine size={20}/>
                        </div>
                      </div>
                    </div>
                    {expandedUpcomingMeetingId === meeting._id && (
                      <div className="meeting-details">
                        <p>
                          <strong>Client Name:</strong> {meeting.clientName}
                        </p>
                        <p>
                          <strong>Meeting Mode:</strong> {meeting.meetingMode}
                        </p>
                        <p>
                          <strong>Details:</strong> {meeting.details}
                        </p>
                      </div>
                    )}
                  </IonLabel>
                </IonItem>
              ))
            ) : (
              <IonItem>No upcoming meetings</IonItem>
            )}
          </IonList>
        </div>

        <div style={{
            zIndex: 1,
            margin :"0 25px",
            justifyContent: "center" }}>
          <Link to="/bottomtabs/addmeetings">
            <button className="add-executive-btn">Add Meeting</button>
          </Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UpComingMeetings;
