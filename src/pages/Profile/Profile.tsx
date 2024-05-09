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
  IonIcon,
} from "@ionic/react";
import logo from "../../Assets/pandit_shivkumar_logo.png";
import { personCircleOutline } from "ionicons/icons";
import "./Profile.css"
import { useHistory } from "react-router-dom";
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
      <IonHeader>{/* Your header JSX */}</IonHeader>
      <IonContent className="ion-padding">
        {userData && (
          <>
            <div style={{display:"flex",justifyContent:"center"}}>

              <IonIcon
                icon={personCircleOutline}
                style={{ fontSize: "100px", color: "#ffffff" }}
              />
            </div>
         
            <div style={{ textAlign: "center" , marginTop:"30px"}}>
              <h2
                style={{
                  fontSize: "30px",
                  display: "block",
                  textAlign: "center",
                }}
              >
                {userData.firstname} {userData.lastname}
              </h2>
              <p> {userData.email}</p>

              <p> {userData.phonenumber}</p>
            </div>

            {/* <IonLabel>Password: {userData.password}</IonLabel> */}
          </>
        )}
        {error && <p className="error-message">{error}</p>}
       

       
      </IonContent>
      <div className="logout-btn-div">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </IonPage>
  );
};

export default ProfilePage;
