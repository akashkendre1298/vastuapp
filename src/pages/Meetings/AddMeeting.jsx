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
    date: new Date().toISOString().split("T")[0], // Default to today's date in YYYY-MM-DD format
    details: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetchExecutives();
  }, []);

  const fetchExecutives = async () => {
    try {
      const response = await fetch(
        "https://backend.piyushshivkumarshhri.com/api/executives"
      );
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
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleAddMeeting = async () => {
    try {
      const selectedDate = new Date(formData.date);
      const today = new Date();

      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        setToastMessage("Please select a valid date (today or future).");
        setShowToast(true);
        return;
      }

      if (!formData.details) {
        alert("Details are required");
        return;
      }

      const formattedDate = formatDate(formData.date);

      const response = await fetch(
        "https://backend.piyushshivkumarshhri.com/api/meetings/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            date: formattedDate,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to add meeting: ${response.status} ${errorText}`
        );
      }

      setFormData({
        meetingTitle: "",
        executiveName: "",
        executiveID: "",
        executivesEmail: "",
        meetingMode: "",
        date: new Date().toISOString().split("T")[0], // Reset to today's date
        details: "",
      });

      setToastMessage("Meeting added successfully!");
      setShowToast(true);
    } catch (error) {
      console.error("Error adding meeting:", error);
      setToastMessage("Failed to add meeting");
      setShowToast(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    <IonPage>
      <IonHeader>
        <ToolBar />
      </IonHeader>
      <IonContent
        className="ion-padding"
        style={{ backgroundColor: "#e2dee9" }}
      >
        <IonGrid>
          <IonRow>
            <IonCol>
              <div>
                <IonItem
                  className="add-executive-item"
                  style={{ border: "1px solid black", marginBottom: "25px" }}
                >
                  <IonInput
                    name="meetingTitle"
                    value={formData.meetingTitle}
                    onIonChange={handleChange}
                    placeholder="Meeting Aim"
                  ></IonInput>
                </IonItem>

                <IonItem
                  className="add-executive-item"
                  style={{ border: "1px solid black", marginBottom: "25px" }}
                >
                  <IonLabel position="floating">Executive Name</IonLabel>
                  <IonSelect
                    name="executiveID"
                    value={formData.executiveID}
                    onIonChange={handleExecutiveChange}
                    interface="popover"
                  >
                    {executives
                      .slice() // Create a shallow copy to avoid mutating the original array
                      .reverse()
                      .map((executive) => (
                        <IonSelectOption
                          key={executive._id}
                          value={executive._id}
                        >
                          {`${executive.firstName} ${executive.lastName}`}
                        </IonSelectOption>
                      ))}
                  </IonSelect>
                </IonItem>

                <IonItem
                  className="add-executive-item"
                  style={{ border: "1px solid black", marginBottom: "25px" }}
                >
                  <IonInput
                    type="email"
                    name="executivesEmail"
                    placeholder="Executive Email"
                    value={formData.executivesEmail}
                    disabled
                  ></IonInput>
                </IonItem>

                <div className="date-div-meeting">
                  <div>
                    <label htmlFor="Date" style={{ fontSize: "18px" }}>
                      Date
                    </label>
                  </div>
                  <div>
                    <input
                      type="date"
                      name="date"
                      style={{
                        color: "white",
                        padding: "5px",
                        borderRadius: "5px",
                      }}
                      onChange={handleChange}
                      value={formData.date} // Prefill with today's date
                    />
                  </div>
                </div>

                <IonItem
                  className="add-executive-item"
                  style={{ border: "1px solid black", marginBottom: "25px" }}
                >
                  <IonLabel position="floating">Conduction Mode</IonLabel>
                  <IonSelect
                    name="meetingMode"
                    value={formData.meetingMode}
                    onIonChange={(e) => handleChange(e)}
                    interface="popover"
                  >
                    <IonSelectOption value="Online">Online</IonSelectOption>
                    <IonSelectOption value="In-person">
                      In-person
                    </IonSelectOption>
                     <IonSelectOption value="Office/Site">
                     Office/Site
                    </IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem
                  className="add-executive-item"
                  style={{ border: "1px solid black", marginBottom: "25px" }}
                >
                  <textarea
                    name="details"
                    placeholder="Write Meeting Details...."
                    value={formData.details}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      height: "100px",
                      border: "none",
                      resize: "none",
                      backgroundColor: "#fff",
                      verticalAlign: "middle",
                      lineHeight: "80px",
                      outline: "none",
                      scrollbar: "none",
                    }}
                  ></textarea>
                </IonItem>
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
      <button
        expand="full"
        onClick={handleAddMeeting}
        className="add-meeting-btn"
      >
        Add Meeting
      </button>
    </IonPage>
  );
};

export default AddMeeting;
