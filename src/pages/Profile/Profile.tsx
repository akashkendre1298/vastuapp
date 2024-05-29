import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonRow,
  IonButton,
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import ToolBar from "../../components/ToolBar/ToolBar";
import "./Profile.css";

const ProfilePage = () => {
  const history = useHistory();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve user data from local storage
        const userDataString = localStorage.getItem("userData");
        if (!userDataString) {
          throw new Error("User data not found in local storage");
        }

        // Parse the user data string to extract the user ID
        const userData = JSON.parse(userDataString);
        const userId = userData.userId;

        // Fetch user data from the API using the user ID
        const response = await fetch(
          `http://localhost:8888/api/admin/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userDataResponse = await response.json();
        // Check if user data is empty (user ID not found in API)
        if (!userDataResponse) {
          throw new Error("User data not found in API");
        }

        setUserData(userDataResponse);
        console.log("User data:", userDataResponse);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    // Redirect to login page
    history.push("/login");
  };

  return (
    <IonPage>
      <ToolBar />
      <IonContent className="ion-padding">
        <IonRow className="avatar-row">
          <div className="avatar-container">
            <IonIcon icon={personCircleOutline} className="avatar-icon" />
          </div>
        </IonRow>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          {userData && (
            <>
              <h2
                style={{
                  fontSize: "30px",
                  display: "block",
                  textAlign: "center",
                }}
              >
                {userData.firstname} {userData.lastname}
              </h2>
              <p>{userData.email}</p>
              <p>{userData.phonenumber}</p>
            </>
          )}
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="logout-btn-div">
        <button
          className="logout-btn"
          expand="block"
          color="danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      </IonContent>

     
    </IonPage>
  );
};

export default ProfilePage;
