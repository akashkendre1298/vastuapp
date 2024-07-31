import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
  IonToast,
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
        "https://backend.piyushshivkumarshhri.com/api/admin/forgot-password",
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
        "https://backend.piyushshivkumarshhri.com/api/admin/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: forgotPasswordEmail,
            otp,
            newPassword,
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
      <div className="form-container">
        <h2 className="forgetpass-heading">Forgot Password</h2>
        <IonItem>
          <IonLabel position="stacked">Registered Email</IonLabel>
          <IonInput
            type="email"
            value={forgotPasswordEmail}
            onIonChange={(e) => setForgotPasswordEmail(e.detail.value)}
          />
        </IonItem>
        <IonButton expand="full" onClick={handleSendOtp}>
          Send OTP
        </IonButton>

        {/* Additional fields after sending OTP */}
        {forgotPasswordEmail && (
          <div className="reset-password-fields">
            <IonItem>
              <IonLabel position="stacked">Enter OTP</IonLabel>
              <IonInput
                type="text"
                value={otp}
                onIonChange={(e) => setOtp(e.detail.value)}
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
                value={confirmNewPassword}
                onIonChange={(e) => setConfirmNewPassword(e.detail.value)}
              />
            </IonItem>
            <IonButton expand="full" onClick={handleResetPassword}>
              Reset Password
            </IonButton>
          </div>
        )}

        <IonButton expand="full" color="medium" onClick={handleCancel}>
          Cancel
        </IonButton>

        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setToastMessage("")}
        />
      </div>
    </IonPage>
  );
};

export default ForgotPasswordPage;
