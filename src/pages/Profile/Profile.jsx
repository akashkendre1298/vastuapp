import React, { useState, useEffect } from "react";
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
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
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

  // State for change password modal
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");

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
          {editMode ? (
            <div>
              <IonItem>
                <IonLabel position="stacked">First Name</IonLabel>
                <IonInput
                  name="firstname"
                  value={formState.firstname}
                  onIonChange={handleInputChange}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Last Name</IonLabel>
                <IonInput
                  name="lastname"
                  value={formState.lastname}
                  onIonChange={handleInputChange}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  name="email"
                  value={formState.email}
                  onIonChange={handleInputChange}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Phone Number</IonLabel>
                <IonInput
                  name="phonenumber"
                  value={formState.phonenumber}
                  onIonChange={handleInputChange}
                />
              </IonItem>
              <IonButton expand="block" onClick={handleSave}>
                Save
              </IonButton>
            </div>
          ) : (
            <>
              {userData && (
                <>
                  <h2
                    style={{
                      fontSize: "30px",
                      display: "block",
                      textAlign: "center",
                    }}
                    className="text"
                  >
                    {userData.firstname} {userData.lastname}
                  </h2>
                  <p className="text">{userData.email}</p>
                  <p className="text">{userData.phonenumber}</p>
                </>
              )}
              {error && <p className="error-message">{error}</p>}
              <IonButton expand="block" onClick={handleEdit}>
                Edit
              </IonButton>
              <IonButton
                expand="block"
                color="warning"
                onClick={() => setShowChangePasswordModal(true)}
              >
                Change Password
              </IonButton>
            </>
          )}
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

        {/* Change Password Modal */}
        <IonModal
          isOpen={showChangePasswordModal}
          onDidDismiss={() => setShowChangePasswordModal(false)}
          cssClass="change-password-modal"
        >
          <div className="modal-content">
            <h3 className="modal-title">Change Password</h3>
            <IonItem>
              <IonLabel position="stacked">Current Password</IonLabel>
              <IonInput
                type="password"
                value={currentPassword}
                onIonChange={(e) => setCurrentPassword(e.detail.value)}
                placeholder="Enter current password"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">New Password</IonLabel>
              <IonInput
                type="password"
                value={newPassword}
                onIonChange={(e) => setNewPassword(e.detail.value)}
                placeholder="Enter new password"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Confirm New Password</IonLabel>
              <IonInput
                type="password"
                value={confirmPassword}
                onIonChange={(e) => setConfirmPassword(e.detail.value)}
                placeholder="Confirm new password"
              />
            </IonItem>
            <IonButton
              expand="full"
              onClick={handleChangePassword}
              color="primary"
            >
              Change Password
            </IonButton>
            <IonButton
              expand="full"
              color="light"
              onClick={() => setShowChangePasswordModal(false)}
            >
              Cancel
            </IonButton>
          </div>
        </IonModal>

        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setToastMessage("")}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
