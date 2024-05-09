import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonAvatar,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonImg,
  IonTitle,
} from "@ionic/react";
import logo from "../../Assets/pandit_shivkumar_logo.png";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve user email from local storage
        const userEmail = localStorage.getItem("userEmail");
        console.log(userEmail);
        if (!userEmail) {
          throw new Error("User email not found in local storage");
        }

        // Fetch user data from signup API using the email
        const response = await fetch(`http://localhost:8888/api/admin?email=${userEmail}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        // Check if user data is empty (email not found in signup API)
        if (!userData) {
          throw new Error("User data not found in signup API");
        }

        setUserData(userData);
        console.log("User data:", userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        {/* Your header JSX */}
      </IonHeader>
      <IonContent className="ion-padding">
        {userData && (
          <>
            <IonAvatar style={{ margin: "0 auto" }}>
              {/* <img src={userData.profilePictureUrl} alt="Profile" /> */}
            </IonAvatar>
            <IonLabel style={{ textAlign: "center", display: "block" }}>
              {userData.firstName} {userData.lastName}
            </IonLabel>
            <IonLabel>Email: {userData.email}</IonLabel>
            <IonLabel>Contact Number: {userData.phoneNumber}</IonLabel>
            <IonLabel>Password: {userData.password}</IonLabel>
          </>
        )}
        {error && <p className="error-message">{error}</p>}
        {/* Edit and Delete buttons */}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
