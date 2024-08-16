// import React, { useState, useEffect } from "react";
// import { RxCross2 } from "react-icons/rx";
// import {
//   IonPage,
//   IonContent,
//   IonIcon,
//   IonRow,
//   IonButton,
//   IonInput,
//   IonLabel,
//   IonItem,
//   IonModal,
//   IonToast,
//   IonImg,
//   IonGrid,
//   IonCol,
// } from "@ionic/react";
// import {
//   personCircleOutline,
//   pencilOutline,
//   lockClosedOutline,
//   logOutOutline,
// } from "ionicons/icons";
// import { useHistory } from "react-router-dom";
// import ToolBar from "../../components/ToolBar/ToolBar";
// import "./Profile.css";

// const ProfilePage = () => {
//   const history = useHistory();
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState("");

//   // State for modal and form data
//   const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
//   const [showEditProfileModal, setShowEditProfileModal] = useState(false);
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [toastMessage, setToastMessage] = useState("");
//   const [avatarImage, setAvatarImage] = useState(null);

//   // State for edit profile
//   const [formState, setFormState] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     phonenumber: "",
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userDataString = localStorage.getItem("userData");
//         if (!userDataString) {
//           throw new Error("User data not found in local storage");
//         }

//         const userData = JSON.parse(userDataString);
//         const userId = userData.userId; // Extract userId from the parsed JSON

//         if (!userId) {
//           throw new Error("User ID is missing");
//         }

//         const response = await fetch(
//           `https://backend.piyushshivkumarshhri.com/api/admin/${userId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch user data");
//         }

//         const userDataResponse = await response.json();
//         if (!userDataResponse) {
//           throw new Error("User data not found in API");
//         }

//         setUserData(userDataResponse);
//         setFormState({
//           firstname: userDataResponse.firstname,
//           lastname: userDataResponse.lastname,
//           email: userDataResponse.email,
//           phonenumber: userDataResponse.phonenumber,
//         });

//         if (userDataResponse.admin_url) {
//           setAvatarImage(userDataResponse.admin_url);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setError("Failed to fetch user data");
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     history.push("/login");
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleChangePassword = async () => {
//     if (newPassword !== confirmPassword) {
//       setToastMessage("New passwords do not match");
//       return;
//     }

//     try {
//       const userId = userData.userId;
//       const response = await fetch(
//         `https://backend.piyushshivkumarshhri.com/api/admin/change-password`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId,
//             currentPassword,
//             newPassword,
//           }),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to change password");
//       }
//       setShowChangePasswordModal(false);
//       setToastMessage("Password changed successfully");
//     } catch (error) {
//       console.error("Error changing password:", error);
//       setToastMessage("Failed to change password");
//     }
//   };

//   const handleEditProfile = async () => {
//     try {
//       // Fetch the userId from localStorage again to ensure it is available
//       const userDataString = localStorage.getItem("userData");
//       if (!userDataString) {
//         throw new Error("User data not found in local storage");
//       }

//       const userData = JSON.parse(userDataString);
//       const userId = userData.userId; // Extract userId from the parsed JSON

//       if (!userId) {
//         throw new Error("User ID is missing");
//       }

//       const response = await fetch(
//         `https://backend.piyushshivkumarshhri.com/api/admin/${userId}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formState),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update profile");
//       }

//       const updatedData = await response.json();
//       setUserData(updatedData);
//       setShowEditProfileModal(false);
//       setToastMessage("Profile updated successfully");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setToastMessage("Failed to update profile");
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Create a URL for the file and set it as the avatar image
//       const imageUrl = URL.createObjectURL(file);
//       setAvatarImage(imageUrl);

//       // Optionally, you can upload the file to your server here
//       // using FormData and fetch.
//     }
//   };

//   return (
//     <IonPage style={{ backgroundColor: "#e2dee9" }}>
//       <ToolBar />
//       <IonContent
//         className="ion-padding"
//         style={{ backgroundColor: "#e2dee9" }}
//       >
//         <IonGrid>
//           <IonRow className="profile-header">
//             <IonCol size="auto">
//               <div className="avatar-container">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   id="avatar-upload"
//                   onChange={handleFileChange}
//                   style={{ display: "none" }}
//                 />
//                 <label htmlFor="avatar-upload">
//                   <IonImg src={avatarImage || "path/to/default/avatar.png"} />
//                 </label>
//               </div>
//             </IonCol>
//             <IonCol>
//               <h2 className="user-greeting">
//                 Hello,{" "}
//                 {userData
//                   ? `${userData.firstname} ${userData.lastname}`
//                   : "User"}
//               </h2>
//             </IonCol>
//           </IonRow>
//         </IonGrid>

//         <div className="button-column">
//           <button
//             expand="full"
//             onClick={() => setShowEditProfileModal(true)}
//             className="button-with-icon"
//           >
//             <div className="profile-button-contents">
//               <p>Edit Profile</p>
//               <IonIcon
//                 className="profile-icon"
//                 slot="start"
//                 icon={pencilOutline}
//               />
//             </div>
//           </button>

//           <button
//             expand="full"
//             color="warning"
//             onClick={() => setShowChangePasswordModal(true)}
//             className="button-with-icon"
//           >
//             <div className="profile-button-contents">
//               <p>Change Password</p>
//               <IonIcon
//                 className="profile-icon"
//                 slot="start"
//                 icon={lockClosedOutline}
//               />
//             </div>
//           </button>

//           <button
//             expand="full"
//             color="danger"
//             onClick={handleLogout}
//             className="button-with-icon"
//           >
//             <div className="profile-button-contents">
//               <p>Logout</p>
//               <IonIcon className="profile-icon" icon={logOutOutline} />
//             </div>
//           </button>
//         </div>

//         {/* Edit Profile Modal */}
//         <IonModal
//           isOpen={showEditProfileModal}
//           onDidDismiss={() => setShowEditProfileModal(false)}
//         >
//           <div className="modal-content">
//             <div className="modal-content-heading">
//               <h3 className="model-title">Edit Profile</h3>
//               <RxCross2
//                 size={20}
//                 onClick={() => setShowEditProfileModal(false)}
//               />
//             </div>

//             <IonItem className="add-executive-item">
//               <IonLabel position="stacked">First Name</IonLabel>
//               <IonInput
//                 name="firstname"
//                 value={formState.firstname}
//                 onIonChange={handleInputChange}
//               />
//             </IonItem>
//             <IonItem className="add-executive-item">
//               <IonLabel position="stacked">Last Name</IonLabel>
//               <IonInput
//                 name="lastname"
//                 value={formState.lastname}
//                 onIonChange={handleInputChange}
//               />
//             </IonItem>
//             <IonItem className="add-executive-item">
//               <IonLabel position="stacked">Email</IonLabel>
//               <IonInput
//                 name="email"
//                 type="email"
//                 value={formState.email}
//                 onIonChange={handleInputChange}
//               />
//             </IonItem>
//             <IonItem className="add-executive-item">
//               <IonLabel position="stacked">Phone Number</IonLabel>
//               <IonInput
//                 name="phonenumber"
//                 value={formState.phonenumber}
//                 onIonChange={handleInputChange}
//               />
//             </IonItem>
//             <IonButton
//               expand="block"
//               onClick={handleEditProfile}
//               style={{ marginTop: "20px" }}
//             >
//               Save Changes
//             </IonButton>
//           </div>
//         </IonModal>

//         {/* Change Password Modal */}
//         <IonModal
//           isOpen={showChangePasswordModal}
//           onDidDismiss={() => setShowChangePasswordModal(false)}
//         >
//           <div className="modal-content">
//             <div className="modal-content-heading">
//               <h3 className="model-title">Change Password</h3>
//               <RxCross2
//                 size={20}
//                 onClick={() => setShowChangePasswordModal(false)}
//               />
//             </div>

//             <IonItem className="add-executive-item">
//               <IonInput
//                 type="password"
//                 placeholder="Enter your current password"
//                 value={currentPassword}
//                 onIonChange={(e) => setCurrentPassword(e.detail.value)}
//               />
//             </IonItem>
//             <IonItem className="add-executive-item">
//               <IonInput
//                 type="password"
//                 placeholder="Enter your new password"
//                 value={newPassword}
//                 onIonChange={(e) => setNewPassword(e.detail.value)}
//               />
//             </IonItem>
//             <IonItem className="add-executive-item">
//               <IonInput
//                 type="password"
//                 placeholder="Confirm password"
//                 value={confirmPassword}
//                 onIonChange={(e) => setConfirmPassword(e.detail.value)}
//               />
//             </IonItem>
//             <IonButton
//               expand="block"
//               onClick={handleChangePassword}
//               style={{ marginTop: "20px" }}
//             >
//               Change Password
//             </IonButton>
//           </div>
//         </IonModal>

//         {/* Toast for feedback */}
//         <IonToast
//           isOpen={!!toastMessage}
//           onDidDismiss={() => setToastMessage("")}
//           message={toastMessage}
//           duration={2000}
//           color={toastMessage.includes("success") ? "success" : "danger"}
//         />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default ProfilePage;

// ProfilePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonButton,
  IonIcon,
  IonLoading,
  IonText,
  IonToast,
  IonInput,
  IonAlert,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { pencil, lockClosed, logOut } from "ionicons/icons";
import "./Profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [showPasswordToast, setShowPasswordToast] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userData")).userId;
        const response = await axios.get(
          `https://backend.piyushshivkumarshhri.com/api/admin/${userId}`
        );
        setUser(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching user data");
        setLoading(false);

        setTimeout(() => {
          setError("");
        }, 3000);
      }
    };

    fetchUserData();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle password change form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  // Handle form submission for editing profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = JSON.parse(localStorage.getItem("userData")).userId;
      await axios.patch(
        `https://backend.piyushshivkumarshhri.com/api/admin/${userId}`,
        formData
      );
      setUser(formData);
      setIsEditing(false);
      setShowToast(true); // Show success message

      // Hide toast after 2 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      setError("Error updating user data");

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const adminId = JSON.parse(localStorage.getItem("userData")).userId; // Use adminId instead of userId
    const requestData = {
      adminId, // Sending adminId instead of userId
      oldPassword: passwordData.currentPassword, // Changed to match your backend code
      newPassword: passwordData.newPassword,
    };

    console.log("Password change request data:", requestData); // Log the data

    try {
      const response = await axios.patch(
        `https://backend.piyushshivkumarshhri.com/api/admin/change-pass`,
        requestData
      );
      if (response.data.message === "Password successfully changed") {
        setShowPasswordToast(true); // Show success message
        setIsChangingPassword(false);

        // Hide toast after 2 seconds
        setTimeout(() => {
          setShowPasswordToast(false);
        }, 2000);
      } else {
        setPasswordError(
          response.data.message ||
            "Failed to change password. Please try again."
        );

        setTimeout(() => {
          setPasswordError("");
        }, 3000);
      }
    } catch (err) {
      setPasswordError("Error changing password. Please try again.");

      setTimeout(() => {
        setPasswordError("");
      }, 3000);
    }
  };
  // Handle logout
  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    history.push("/login"); // Redirect to login page
  };

  if (loading) return <IonLoading isOpen={loading} message={"Loading..."} />;
  if (error) return <IonText color="danger">{error}</IonText>;

  return (
    <IonPage>
      <IonContent style={{ backgroundColor: "#e2dee9" }}>
        <div className="user-profile-container">
          <div>
            <IonAvatar className="user-avatar">
              <img src={user.admin_url} alt="Profile" />
            </IonAvatar>
          </div>
          <div className="user-details">
            <IonLabel className="user-greeting">
              Hello, {user.firstname} {user.lastname}!
            </IonLabel>
            <p className="user-email">{user.email}</p>
          </div>
        </div>

        <IonList className="profile-actions">
          <IonItem button onClick={() => setIsEditing(true)}>
            <IonLabel>Edit Profile</IonLabel>
            <IonIcon icon={pencil} slot="end" />
          </IonItem>
          <IonItem button onClick={() => setIsChangingPassword(true)}>
            <IonLabel>Change Password</IonLabel>
            <IonIcon icon={lockClosed} slot="end" />
          </IonItem>
          <IonItem button color="danger" onClick={handleLogout}>
            <IonLabel>Logout</IonLabel>
            <IonIcon icon={logOut} slot="end" />
          </IonItem>
        </IonList>

        {isEditing && (
          <form onSubmit={handleSubmit} className="profile-form">
            <IonItem>
              <IonLabel
                position="stacked"
                style={{ marginBottom: "15px", fontSize: "20px" }}
              >
                First Name
              </IonLabel>
              <input
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  color: "black",
                  height: "40px",
                  borderRadius: "5px",
                  paddingLeft: "10px",
                  fontSize: "16px",
                  marginBottom: "15px",
                  border: "none",
                  outline: "none",
                }}
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </IonItem>
            <IonItem>
              <IonLabel
                position="stacked"
                style={{ marginBottom: "15px", fontSize: "20px" }}
              >
                Last Name
              </IonLabel>
              <input
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  color: "black",
                  height: "40px",
                  borderRadius: "5px",
                  paddingLeft: "10px",
                  fontSize: "16px",
                  marginBottom: "15px",
                  border: "none",
                  outline: "none",
                }}
                type="text"
                className="ProfileInput"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </IonItem>
            <IonItem>
              <IonLabel
                position="stacked"
                style={{ marginBottom: "15px", fontSize: "20px" }}
              >
                Email
              </IonLabel>
              <input
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  color: "black",
                  height: "40px",
                  borderRadius: "5px",
                  paddingLeft: "10px",
                  fontSize: "16px",
                  marginBottom: "15px",
                  border: "none",
                  outline: "none",
                }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </IonItem>
            <IonItem>
              <IonLabel
                position="stacked"
                style={{ marginBottom: "15px", fontSize: "20px" }}
              >
                Phone Number
              </IonLabel>
              <input
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  color: "black",
                  height: "40px",
                  borderRadius: "5px",
                  paddingLeft: "10px",
                  fontSize: "16px",
                  marginBottom: "15px",
                  border: "none",
                  outline: "none",
                }}
                type="text"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
              />
            </IonItem>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px 0 20px 0",
              }}
            >
              <button className="save-btn-profile" type="submit">
                Save
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px 0 20px 0",
              }}
            >
              <button
                className="changepass-cancel-btn-edit"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {isChangingPassword && (
          <form onSubmit={handleChangePassword} className="password-form">
            <IonItem>
              <IonLabel
                position="stacked"
                style={{ marginBottom: "15px", fontSize: "20px" }}
              >
                Current Password
              </IonLabel>
              <input
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  color: "black",
                  height: "40px",
                  borderRadius: "5px",
                  paddingLeft: "10px",
                  fontSize: "16px",
                  marginBottom: "15px",
                  border: "none",
                  outline: "none",
                }}
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel
                position="stacked"
                style={{ marginBottom: "15px", fontSize: "20px" }}
              >
                New Password
              </IonLabel>
              <input
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  color: "black",
                  height: "40px",
                  borderRadius: "5px",
                  paddingLeft: "10px",
                  fontSize: "16px",
                  marginBottom: "15px",
                  border: "none",
                  outline: "none",
                }}
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </IonItem>
            {passwordError && (
              <IonText color="danger" className="password-error">
                {passwordError}
              </IonText>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px 0 20px 0",
              }}
            >
              <button type="submit" className="changepass-btn">
                Change Password
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => setIsChangingPassword(false)}
                className="changepass-cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Profile updated successfully!"
          duration={2000}
        />

        <IonToast
          isOpen={showPasswordToast}
          onDidDismiss={() => setShowPasswordToast(false)}
          message="Password changed successfully!"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
