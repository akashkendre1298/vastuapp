import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IonPage, IonHeader, IonContent, IonItem, IonLabel, IonButton, IonInput, IonTextarea } from '@ionic/react';
import ToolBar from '../../components/ToolBar/ToolBar';

const MeetingDetails = () => {
  const { meetingId } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updatedMeeting, setUpdatedMeeting] = useState({});

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const response = await fetch(`http://localhost:8888/api/meetings/${meetingId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch meeting details');
        }

        const data = await response.json();

        setMeeting(data);
        setUpdatedMeeting(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching meeting details:', error);
        setLoading(false);
      }
    };

    fetchMeeting();
  }, [meetingId]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`http://localhost:8888/api/meetings/${meetingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedMeeting)
      });

      if (!response.ok) {
        throw new Error('Failed to update meeting details');
      }

      const data = await response.json();
      setMeeting(data);
      setEditing(false);
    } catch (error) {
      console.error('Error updating meeting details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMeeting({
      ...updatedMeeting,
      [name]: value
    });
  };

  if (loading) {
    return <IonItem>Loading...</IonItem>;
  }

  if (!meeting) {
    return <IonItem>Meeting not found</IonItem>;
  }

  return (
    <IonPage>
      <IonHeader>
        <ToolBar />
      </IonHeader>
      <IonContent>

        <div style={{height:"100vh"}}>

        <IonItem >
          <IonLabel>
            {editing ? (
              <>
                <IonInput name="meetingTitle" value={updatedMeeting.meetingTitle} onIonChange={handleChange} />
                <IonInput name="executiveName" value={updatedMeeting.executiveName} onIonChange={handleChange} />
                <IonInput name="executivesEmail" value={updatedMeeting.executivesEmail} onIonChange={handleChange} />
                <IonInput name="clintName" value={updatedMeeting.clintName} onIonChange={handleChange} />
                <IonInput name="meetingMode" value={updatedMeeting.meetingMode} onIonChange={handleChange} />
                <IonInput name="date" type="datetime-local" value={new Date(updatedMeeting.date).toISOString().slice(0, -1)} onIonChange={handleChange} />
                <IonTextarea name="details" value={updatedMeeting.details} onIonChange={handleChange} />
                <IonButton expand="block" onClick={handleSaveClick}>Save</IonButton>
              </>
            ) : (
              <>
                <h2>{meeting.meetingTitle}</h2>
                <p><strong>Executive Name:</strong> {meeting.executiveName}</p>
                <p><strong>Executive Email:</strong> {meeting.executivesEmail}</p>
                <p><strong>Client Name:</strong> {meeting.clintName}</p>
                <p><strong>Meeting Mode:</strong> {meeting.meetingMode}</p>
                <p><strong>Date:</strong> {new Date(meeting.date).toLocaleString()}</p>
                <p><strong>Details:</strong> {meeting.details}</p>
                <IonButton expand="block" onClick={handleEditClick}>Edit</IonButton>
              </>
            )}
          </IonLabel>
        </IonItem>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MeetingDetails;
