import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonAvatar, IonLabel, IonButton, IonHeader, IonToolbar, IonButtons, IonBackButton, IonImg, IonTitle, IonFooter } from '@ionic/react';
import logo from "../../Assets/pandit_shivkumar_logo.png"
import BottomTabs from '../../components/BottomTabs/BottomTabs';

const ProfilePage = () => {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch('http://localhost:8888/api/admin/login', {
            headers: {
                "Content-Type": "application/json",
              },
            
        });
        if (!response.ok) {
          throw new Error('Failed to fetch admin data');
        }
        const data = await response.json();
        setAdminData(data);
        console.log('Admin data:', data); // Log the fetched admin data
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <IonPage>
       <IonHeader>
    <IonToolbar style={{ color: "#00004D" }}>
      <IonButtons slot="start">
        <IonBackButton defaultHref="#" />
      </IonButtons>

      {/* <IonTitle>Executives</IonTitle> */}

      <IonButtons slot="end">
        <IonImg src={logo} alt="App Logo" />
      </IonButtons>
    </IonToolbar>

    <IonToolbar style={{ color: "#00004D" }} >
      <IonTitle>Profile</IonTitle>
    </IonToolbar>
  </IonHeader>
      <IonContent className="ion-padding">
        {adminData && (
          <>
            <IonAvatar style={{ margin: '0 auto' }}>
              {/* <img src={adminData.profilePictureUrl} alt="Profile" /> */}
            </IonAvatar>
            <IonLabel style={{ textAlign: 'center', display: 'block' }}>
              {adminData.firstName} {adminData.lastName}
            </IonLabel>
            <IonLabel>Email: {adminData.email}</IonLabel>
            <IonLabel>Contact Number: {adminData.phoneNumber}</IonLabel>
            <IonLabel>Password: {adminData.password}</IonLabel>
          </>
        )}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IonButton color="primary" style={{ marginRight: '10px' }}>Edit</IonButton>
          <IonButton color="danger">Delete</IonButton>
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar>
        <BottomTabs/>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ProfilePage;
