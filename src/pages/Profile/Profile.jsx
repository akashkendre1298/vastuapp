import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonRow,
  IonButton,
  IonInput,
  IonLabel,
  IonItem,
  IonModal,
  IonToast,
  IonImg,
  IonGrid,
  IonCol,
} from "@ionic/react";
import {
  personCircleOutline,
  pencilOutline,
  lockClosedOutline,
  logOutOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import ToolBar from "../../components/ToolBar/ToolBar";
import "./Profile.css";

const ProfilePage = () => {
  const history = useHistory();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [formState, setFormState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
  });

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // State for avatar image
  const [avatarImage, setAvatarImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = localStorage.getItem("userData");
        if (!userDataString) {
          throw new Error("User data not found in local storage");
        }

        const userData = JSON.parse(userDataString);
        const userId = userData.userId;

        const response = await fetch(
          `https://backend.piyushshivkumarshhri.com/api/admin/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userDataResponse = await response.json();
        if (!userDataResponse) {
          throw new Error("User data not found in API");
        }

        setUserData(userDataResponse);
        setFormState({
          firstname: userDataResponse.firstname,
          lastname: userDataResponse.lastname,
          email: userDataResponse.email,
          phonenumber: userDataResponse.phonenumber,
        });

        // Set the avatar image if available
        if (userDataResponse.avatar) {
          setAvatarImage(userDataResponse.avatar);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const userId = userData.userId;
      const response = await fetch(
        `https://backend.piyushshivkumarshhri.com/api/admin/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      const updatedUserData = await response.json();
      setUserData(updatedUserData);
      setEditMode(false);
      // Update local storage with new user data
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("Failed to update user data");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setToastMessage("New passwords do not match");
      return;
    }

    try {
      const userId = userData.userId;
      const response = await fetch(
        `https://backend.piyushshivkumarshhri.com/api/admin/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            currentPassword,
            newPassword,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to change password");
      }
      setShowChangePasswordModal(false);
      setToastMessage("Password changed successfully");
    } catch (error) {
      console.error("Error changing password:", error);
      setToastMessage("Failed to change password");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the file and set it as the avatar image
      const imageUrl = URL.createObjectURL(file);
      setAvatarImage(imageUrl);

      // Optionally, you can upload the file to your server here
      // using FormData and fetch.
    }
  };

  return (
    <IonPage>
      <ToolBar />
      <IonContent
        className="ion-padding"
        style={{ backgroundColor: "#e2dee9" }}
      >
        <IonGrid>
          <IonRow className="profile-header">
            <IonCol size="auto">
              <div className="avatar-container">
                <input
                  type="file"
                  accept="image/*"
                  id="avatar-upload"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="avatar-upload">
                  <IonImg src={avatarImage} />
                </label>
              </div>
            </IonCol>
            <IonCol>
              <h2 className="user-greeting">
                Hello,{" "}
                {userData
                  ? `${userData.firstname} ${userData.lastname}`
                  : "User"}
              </h2>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className="button-column">
          <IonButton
            expand="full"
            onClick={handleEdit}
            className="button-with-icon"
          >
            <IonIcon slot="start" icon={pencilOutline} />
            Edit Profile
          </IonButton>
          <IonButton
            expand="full"
            color="warning"
            onClick={() => setShowChangePasswordModal(true)}
            className="button-with-icon"
          >
            <IonIcon slot="start" icon={lockClosedOutline} />
            Change Password
          </IonButton>
          <IonButton
            expand="full"
            color="danger"
            onClick={handleLogout}
            className="button-with-icon"
          >
            <IonIcon slot="start" icon={logOutOutline} />
            Logout
          </IonButton>
        </div>

        {/* Change Password Modal */}
        <div style={{display:"flex", justifyContent:"center",alignItems:"center "}}>
         
        <IonModal
          isOpen={showChangePasswordModal}
          onDidDismiss={() => setShowChangePasswordModal(false)}
          style={{display:"flex", justifyContent:"center", alignItems:"center"}}
        >
          <div className="modal-content">
            <div className="modal-content-heading">
            <h3 className="model-title">Change Password</h3>
            <RxCross2 size={20} onClick={()=>setShowChangePasswordModal(false)}/>
            </div>
            
            <IonItem>
              <IonLabel position="stacked">Current Password</IonLabel>
              <IonInput
                type="password"
                value={currentPassword}
                onIonChange={(e) => setCurrentPassword(e.detail.value)}
                
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">New Password</IonLabel>
              <IonInput
                type="password"
                value={newPassword}
                onIonChange={(e) => setNewPassword(e.detail.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Confirm New Password</IonLabel>
              <IonInput
                type="password"
                value={confirmPassword}
                onIonChange={(e) => setConfirmPassword(e.detail.value)}
              />
            </IonItem>
            <IonButton
              expand="block"
              onClick={handleChangePassword}
              style={{ marginTop: "20px" }}
            >
              Change Password
            </IonButton>
          </div>
        </IonModal>
        </div>

        {/* Toast for feedback */}
        <IonToast
          isOpen={!!toastMessage}
          onDidDismiss={() => setToastMessage("")}
          message={toastMessage}
          duration={2000}
          color={toastMessage.includes("success") ? "success" : "danger"}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
