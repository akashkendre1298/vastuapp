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
  IonButton,
  IonInput,
  IonToast,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import ToolBar from "../../components/ToolBar/ToolBar";
import "./AddMeeting.css";

const AddMeeting = () => {
  const [executives, setExecutives] = useState([]);
  const [formData, setFormData] = useState({
    meetingTitle: "",
    executiveName: "",
    executiveID: "",
    executivesEmail: "",
    meetingMode: "",
    date: "",
    details: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetchExecutives();
  }, []);

  const fetchExecutives = async () => {
    try {
      const response = await fetch("https://vastu-web-app.onrender.com/api/executives");
      if (!response.ok) {
        throw new Error("Failed to fetch executives");
      }
      const data = await response.json();
      setExecutives(data);
    } catch (error) {
      console.error("Error fetching executives:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleAddMeeting = async () => {
    try {
      if (!formData.details) {
        alert("Details are required");
        return;
      }
      const formattedDate = formatDate(formData.date);

      console.log("Entered Data:", { ...formData, date: formattedDate });

      const response = await fetch("https://vastu-web-app.onrender.com/api/meetings/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meetingTitle: formData.meetingTitle,
          executiveName: formData.executiveName,
          executiveID: formData.executiveID,
          executivesEmail: formData.executivesEmail,
          meetingMode: formData.meetingMode,
          date: formattedDate,
          details: formData.details,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add meeting: ${response.status} ${errorText}`);
      }

      // If the meeting was successfully added, reset the form fields
      setFormData({
        meetingTitle: "",
        executiveName: "",
        executiveID: "",
        executivesEmail: "",
        meetingMode: "",
        date: "",
        details: "",
      });

      // Show success toast
      setToastMessage("Meeting added successfully!");
      setShowToast(true);

      // Log success message or handle further actions
      console.log("Meeting added successfully!");
    } catch (error) {
      console.error("Error adding meeting:", error);
      // Show error toast
      setToastMessage("Failed to add meeting");
      setShowToast(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleExecutiveChange = (e) => {
    const selectedExecutiveID = e.detail.value;
    const selectedExecutiveData = executives.find(
      (executive) => executive._id === selectedExecutiveID
    );
    if (selectedExecutiveData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        executiveID: selectedExecutiveID,
        executiveName: `${selectedExecutiveData.firstName} ${selectedExecutiveData.lastName}`,
        executivesEmail: selectedExecutiveData.email,
      }));
    }
  };

  return (
    <IonPage style={{ backgroundColor: "rgba(192, 188, 188, 0.601)" }}>
      <IonHeader>
        <ToolBar />
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <div>
                <div style={{ paddingBottom: "10px" }}>
                  <IonLabel position="floating">Meeting Aim</IonLabel>
                </div>
                <IonItem className="add-executive-item" style={{ border: "1px solid black", marginBottom: "25px" }}>
                  <IonInput
                    name="meetingTitle"
                    value={formData.meetingTitle}
                    onIonChange={handleChange}
                    placeholder="Meeting Aim"
                  ></IonInput>
                </IonItem>
                <div style={{ paddingBottom: "10px" }}></div>
                <IonItem className="add-executive-item" style={{ border: "1px solid black", marginBottom: "25px" }}>
                  <IonLabel position="floating">Executive Name</IonLabel>
                  <IonSelect
                    name="executiveID"
                    value={formData.executiveID}
                    onIonChange={handleExecutiveChange}
                    interface="popover"
                  >
                    {executives.map((executive) => (
                      <IonSelectOption key={executive._id} value={executive._id}>
                        {`${executive.firstName} ${executive.lastName}`}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                <div style={{ paddingBottom: "10px" }}>
                  <IonLabel position="floating">Executive Email</IonLabel>
                </div>
                <IonItem className="add-executive-item" style={{ border: "1px solid black", marginBottom: "25px" }}>
                  <IonInput
                    type="email"
                    name="executivesEmail"
                    value={formData.executivesEmail}
                    disabled
                  ></IonInput>
                </IonItem>
                <div className="date-div-meeting">
                  <div>
                    <label htmlFor="Date">Date</label>
                  </div>
                  <div>
                    <input
                      type="date"
                      name="date"
                      onChange={handleChange}
                      value={formData.date}
                    />
                  </div>
                </div>
                <div style={{ paddingBottom: "10px" }}></div>
                <IonItem className="add-executive-item" style={{ border: "1px solid black", marginBottom: "25px" }}>
                  <IonLabel position="floating">Conduction Mode</IonLabel>
                  <IonSelect
                    name="meetingMode"
                    value={formData.meetingMode}
                    onIonChange={(e) => handleChange(e)}
                    interface="popover"
                  >
                    <IonSelectOption value="Online">Online</IonSelectOption>
                    <IonSelectOption value="In-person">In-person</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <div style={{ paddingBottom: "10px" }}>
                  <IonLabel position="floating">Other details</IonLabel>
                </div>
                <IonItem className="add-executive-item" style={{ border: "1px solid black", marginBottom: "25px" }}>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', height: '100px', border: 'none', resize: 'none' }}
                  ></textarea>
                </IonItem>
                <button
                  expand="full"
                  onClick={handleAddMeeting}
                  className="add-executive-btn"
                >
                  Add Meeting
                </button>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddMeeting;
