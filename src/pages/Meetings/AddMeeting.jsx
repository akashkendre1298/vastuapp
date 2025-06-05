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
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import ToolBar from "../../components/ToolBar/ToolBar";
import useDebounce from '../../utils/useDebounce';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AddMeeting.css";

const AddMeeting = () => {
  const [clients, setClients] = useState([]);
  const [clientSearch, setClientSearch] = useState("");
  const debouncedClientSearch = useDebounce(clientSearch, 300);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [formData, setFormData] = useState({
    meetingTitle: "",
    clientID: "",
    clientName: "",
    meetingMode: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date in YYYY-MM-DD format
    details: "",
  });

  useEffect(() => {
    // Fetch clients for dropdown
    fetch("https://backend.piyushshivkumarshhri.com/api/clients")
      .then(res => res.json())
      .then(data => setClients(data.data || []))
      .catch(() => setClients([]));
  }, []);

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
        toast.error("Please select a valid date (today or future).");
        return;
      }

      if (!formData.details) {
        toast.error("Details are required");
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
        toast.error(`Failed to add meeting: ${response.status} ${errorText}`);
        return;
      }

      setFormData({
        meetingTitle: "",
        clientID: "",
        clientName: "",
        meetingMode: "",
        date: new Date().toISOString().split("T")[0], // Reset to today's date
        details: "",
      });

      toast.success("Meeting added successfully!");
    } catch (error) {
      toast.error("Failed to add meeting");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleClientSelection = (client) => {
    setFormData(prev => ({
      ...prev,
      clientID: client._id,
      clientName: `${client.firstName} ${client.lastName}`
    }));
    setShowClientDropdown(false);
  };

  return (
    <IonPage>

        <ToolBar />

      <IonContent
        className="ion-padding"
        style={{ backgroundColor: "#e2dee9" }}
      >
        <IonGrid>
          <IonRow>
            <IonCol>
              <div>
                {/* <IonItem
                  className="add-executive-item"
                  style={{ border: "1px solid black", marginBottom: "25px" }}
                >
                  <IonInput
                    name="meetingTitle"
                    value={formData.meetingTitle}
                    onIonChange={handleChange}
                    placeholder="Meeting Aim"
                  ></IonInput>
                </IonItem> */}

                <IonItem
                  className="add-executive-item"
                  style={{ border: "1px solid black", marginBottom: "25px" }}
                >
                  {/* Accordion for Client Selection */}
                  <div style={{ width: '100%' }}>
                    <div
                      style={{ cursor: 'pointer', fontWeight: 600, fontSize: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}
                      onClick={() => setShowClientDropdown(v => !v)}
                    >
                      <span>{formData.clientName ? formData.clientName : 'Choose Client'}</span>
                      <span>{showClientDropdown ? '▲' : '▼'}</span>
                    </div>
                    {showClientDropdown && (
                      <div style={{ maxHeight: 250, overflowY: 'auto', marginTop: 8, border: '1px solid #eee', borderRadius: 8, background: '#fafaff' }}>
                        <div style={{ padding: '8px 8px 0px 8px' }}>
                          <input
                            type="text"
                            value={clientSearch}
                            onChange={e => setClientSearch(e.target.value)}
                            placeholder="Search clients..."
                            style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ccc', background: '#fff' }}
                          />
                        </div>
                        {clients.length === 0 && (
                          <div style={{ padding: 12, color: '#888' }}>No clients found</div>
                        )}
                        {clients.filter(client =>
                          !debouncedClientSearch || `${client.firstName} ${client.lastName}`.toLowerCase().includes(debouncedClientSearch.toLowerCase())
                        ).map((client, idx, arr) => (
                          <div
                            key={client._id || idx}
                            style={{
                              padding: '12px 16px',
                              borderBottom: idx !== arr.length - 1 ? '1px solid #eee' : 'none',
                              background: formData.clientID === client._id ? '#e2dee9' : 'transparent',
                              cursor: 'pointer',
                              fontWeight: formData.clientID === client._id ? 700 : 400
                            }}
                            onClick={() => handleClientSelection(client)}
                          >
                            {client.firstName} {client.lastName}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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

<div
  style={{
    zIndex: 1,
    margin: '0 10px',
    justifyContent: 'center'
  }}
>
  <button
    // expand="full"
    onClick={handleAddMeeting}
    className='add-executive-btn
'
    // style={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}
  >
    Add Meeting
  </button>
</div>

<ToastContainer
  position="top-center"
  autoClose={2000}
  top={100}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  style={{ zIndex: 9999 }}
/>

      </IonContent>




    </IonPage>
  );
};

export default AddMeeting;
