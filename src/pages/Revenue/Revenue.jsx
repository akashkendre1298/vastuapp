import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage } from "@ionic/react";
import "./Revenue.css";
import { useHistory } from "react-router-dom";
import ToolBar from "../../components/ToolBar/ToolBar";

const Revenue = () => {
  const [grandTotalAmount, setGrandTotalAmount] = useState(null);
  const [executives, setExecutives] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await fetch(
          "https://backend.piyushshivkumarshhri.com/api/revenue"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("API Response:", data);

        if (
          data &&
          typeof data.grandTotalAmount !== "undefined" &&
          data.executiveDetails
        ) {
          setGrandTotalAmount(data.grandTotalAmount);
          setExecutives(data.executiveDetails);
        } else {
          throw new Error("Required data not found in response");
        }
      } catch (error) {
        console.error("Error fetching total amount:", error);
      }
    };

    fetchTotalAmount();
  }, []);

  const goBack = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <ToolBar />
      </IonHeader>
      <IonContent
        className="ion-padding"
        style={{ backgroundColor: "#e2dee9" }}
      >
        <div className="total-revenue-div">
          <div>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              Total Revenue
            </p>
          </div>
          <div>
            {grandTotalAmount !== null && (
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                ₹ {grandTotalAmount}
              </p>
            )}
          </div>
        </div>
        <div className="div-revenue-first-section">
          {executives.map((executive) => (
            <div key={executive.executiveId} className="executive-revenue-div">
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {executive.executive}
                <span>₹ {executive.statusCounts.amount}</span>
              </p>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Revenue;
