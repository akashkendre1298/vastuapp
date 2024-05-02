import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonTextarea,
  IonButton,
  IonButtons,
  IonImg,
  IonBackButton,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
} from "@ionic/react";
import logo from "../../Assets/pandit_shivkumar_logo.png";
import BottomTabs from "../../components/BottomTabs/BottomTabs";

const AddMeeting = () => {
  const [executives, setExecutives] = useState([]);
  const [selectedExecutive, setSelectedExecutive] = useState("");
  const [executiveEmail, setExecutiveEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [meetingAim, setMeetingAim] = useState("");
  const [conductionMode, setConductionMode] = useState("");
  const [date, setDate] = useState("");
  const [otherDetails, setOtherDetails] = useState("");

  useEffect(() => {
    fetchExecutives();
  }, []);

  const fetchExecutives = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/executives");
      if (!response.ok) {
        throw new Error("Failed to fetch executives");
      }
      const data = await response.json();
      setExecutives(data);
    } catch (error) {
      console.error("Error fetching executives:", error);
    }
  };

  const handleAddMeeting = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meetingTitle: meetingAim,
          executives: [
            {
              name: `${firstName} ${lastName}`, // Concatenate first and last names
              email: executiveEmail,
            },
          ],
          meetingMode: conductionMode,
          date: new Date(date).toISOString(), // Convert date to ISO string format
          details: otherDetails,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add meeting");
      }

      // If the meeting was successfully added, reset the form fields
      setMeetingAim("");
      setSelectedExecutive("");
      setExecutiveEmail("");
      setConductionMode("");
      setDate("");
      setOtherDetails("");

      // Log success message or handle further actions
      console.log("Meeting added successfully!");
    } catch (error) {
      console.error("Error adding meeting:", error);
    }
  };
  const handleDateChange = (e) => {
    setDate(e.target.value); // Update the date state with the selected date value
  };

  const handleExecutiveChange = (e) => {
    setSelectedExecutive(e.detail.value);
    const selectedExecutiveData = executives.find(
      (executive) => executive._id === e.detail.value
    );
    if (selectedExecutiveData) {
      setExecutiveEmail(selectedExecutiveData.email);
      setFirstName(selectedExecutiveData.firstName);
      setLastName(selectedExecutiveData.lastName);
    }
  };

  return (
    <IonPage style={{ backgroundColor: "rgba(192, 188, 188, 0.601)" }}>
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
          <IonTitle>Add Meeting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid style={{ backgroundColor: "rgba(192, 188, 188, 0.601)" }}>
          <IonRow>
            <IonCol>
              <div>
                <div style={{ paddingBottom: "10px" }}>
                  <IonLabel position="floating">Meeting Aim</IonLabel>
                </div>
                <IonItem
                  style={{ border: "1px solid black", marginBottom: "25px" }}
                >
                  <IonInput
                    value={meetingAim}
                    onIonChange={(e) => setMeetingAim(e.detail.value)}
                    placeholder="Meeting Aim"
                  ></IonInput>
                </IonItem>
                <div style={{ paddingBottom: "10px" }}>
                  <IonLabel position="floating">Executive Name</IonLabel>
                </div>
                <IonItem
                  style={{ border: "1px solid black", marginBottom: "25px" }}
                >
                  <IonSelect
                    value={selectedExecutive}
                    onIonChange={handleExecutiveChange}
                    placeholder="Select Executive"
                    interface="popover"
                  >
                    {executives.map((executive) => (
                      <IonSelectOption
                        key={executive._id}
                        value={executive._id}
                      >
                        {`${executive.firstName} ${executive.lastName}`}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                <div style={{ paddingBottom: "10px" }}>
                  <IonLabel position="floating">Executive Email</IonLabel>
                </div>
                <IonItem
                  style={{ border: "1px solid black", marginBottom: "25px" }}
                >
                  <IonInput
                    type="email"
                    value={executiveEmail}
                    disabled
                  ></IonInput>
                </IonItem>
                <div>
                  <label htmlFor="Date">Date</label>
                  <div>
                    <input
                      type="date"
                      onChange={handleDateChange}
                      value={date}
                    />
                  </div>
                </div>
                <div style={{ paddingBottom: "10px" }}>
                  <IonLabel position="floating">Conduction Mode</IonLabel>
                </div>
                <IonItem
                  style={{ border: "1px solid black", marginBottom: "25px" }}
                >
                  <IonSelect
                    value={conductionMode}
                    onIonChange={(e) => setConductionMode(e.detail.value)}
                    interface="popover"
                    placeholder="Select Mode"
                  >
                    <IonSelectOption value="Online">Online</IonSelectOption>
                    <IonSelectOption value="In-person">
                      In-person
                    </IonSelectOption>
                  </IonSelect>
                </IonItem>
                <div style={{ paddingBottom: "10px" }}>
                  <IonLabel position="floating">Other Details</IonLabel>
                </div>
                <IonItem
                  style={{ border: "1px solid black", marginBottom: "25px" }}
                >
                  <IonTextarea
                    value={otherDetails}
                    onIonChange={(e) => setOtherDetails(e.detail.value)}
                  ></IonTextarea>
                </IonItem>
                <IonButton expand="full" onClick={handleAddMeeting}>
                  Add Meeting
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AddMeeting;
