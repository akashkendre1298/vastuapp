import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
  IonToast,
  IonContent,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./ForgotPasswordPage.css";

const ForgotPasswordPage = () => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    // Clear input fields on component mount
    setForgotPasswordEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmNewPassword("");
  }, []);

  const handleSendOtp = async () => {
    if (!forgotPasswordEmail) {
      setToastMessage("Please enter your registered email.");
      return;
    }

    try {
      const response = await fetch(
        "https://backend.piyushshivkumarshhri.com/api/admin/forgot-pass",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: forgotPasswordEmail }),
        }
      );

      if (response.ok) {
        setToastMessage("OTP sent successfully. Please check your email.");
      } else {
        throw new Error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setToastMessage("Failed to send OTP. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setToastMessage("New passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://backend.piyushshivkumarshhri.com/api/admin/forgot-pass/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: forgotPasswordEmail,
            otp,
            password: newPassword,
          }),
        }
      );

      if (response.ok) {
        setToastMessage("Password reset successfully. Redirecting to login...");
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      } else {
        throw new Error("Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setToastMessage("Failed to reset password. Please try again.");
    }
  };

  const handleCancel = () => {
    history.push("/login");
  };

  return (
    <IonPage className="forgot-password-page">
      <IonContent
        style={{
          backgroundColor: "#e2dee9",
        }}
      >
        {/* <div className="form-container">
          <h2 className="heading">Forgot Password</h2>

          <input
            type="email"
            style={{
              width: "100%",
              backgroundColor: "white",
              color: "black",
              height: "40px",
              borderRadius: "5px",
              paddingLeft: "10px",
              fontSize: "16px",
              marginBottom: "15px",
              outline: "none",
            }}
            placeholder="Enter Your Registered Email Address"
          />
          <IonButton
            className="action-button"
            expand="full"
            onClick={handleSendOtp}
          >
            Send OTP
          </IonButton>

          {forgotPasswordEmail && (
            <div className="reset-password-fields">
              <IonItem className="form-item">
                <IonLabel position="stacked">Enter OTP</IonLabel>
                <IonInput
                  type="text"
                  value={otp}
                  onIonChange={(e) => setOtp(e.detail.value)}
                />
              </IonItem>
              <IonItem className="form-item">
                <IonLabel position="stacked">New Password</IonLabel>
                <IonInput
                  type="password"
                  value={newPassword}
                  onIonChange={(e) => setNewPassword(e.detail.value)}
                />
              </IonItem>
              <IonItem className="form-item">
                <IonLabel position="stacked">Confirm New Password</IonLabel>
                <IonInput
                  type="password"
                  value={confirmNewPassword}
                  onIonChange={(e) => setConfirmNewPassword(e.detail.value)}
                />
              </IonItem>
              <IonButton
                className="action-button"
                expand="full"
                onClick={handleResetPassword}
              >
                Reset Password
              </IonButton>
            </div>
          )}

          <IonButton
            className="cancel-button"
            expand="full"
            color="medium"
            onClick={handleCancel}
          >
            Cancel
          </IonButton>

          <IonToast
            isOpen={!!toastMessage}
            message={toastMessage}
            duration={2000}
            onDidDismiss={() => setToastMessage("")}
          />
        </div> */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              width: "90%",
              // padding: "20px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="form-container">
              <h2 className="heading">Forgot Password</h2>

              <input
                type="email"
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  color: "black",
                  height: "50px",
                  borderRadius: "5px",
                  paddingLeft: "10px",
                  fontSize: "16px",
                  marginBottom: "15px",
                  // border: "none",
                  outline: "none",
                }}
                placeholder="Enter Your Registered Email Address"
              />
              <button className="action-button" onClick={handleSendOtp}>
                Send OTP
              </button>

              {/* Additional fields after sending OTP */}
              {forgotPasswordEmail && (
                <div className="reset-password-fields">
                  <IonItem className="form-item">
                    <IonLabel position="stacked">Enter OTP</IonLabel>
                    <IonInput
                      type="text"
                      value={otp}
                      onIonChange={(e) => setOtp(e.detail.value)}
                    />
                  </IonItem>
                  <IonItem className="form-item">
                    <IonLabel position="stacked">New Password</IonLabel>
                    <IonInput
                      type="password"
                      value={newPassword}
                      onIonChange={(e) => setNewPassword(e.detail.value)}
                    />
                  </IonItem>
                  <IonItem className="form-item">
                    <IonLabel position="stacked">Confirm New Password</IonLabel>
                    <IonInput
                      type="password"
                      value={confirmNewPassword}
                      onIonChange={(e) => setConfirmNewPassword(e.detail.value)}
                    />
                  </IonItem>
                  <IonButton
                    className="action-button"
                    expand="full"
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </IonButton>
                </div>
              )}

              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>

              <IonToast
                isOpen={!!toastMessage}
                message={toastMessage}
                duration={2000}
                onDidDismiss={() => setToastMessage("")}
              />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPasswordPage;
