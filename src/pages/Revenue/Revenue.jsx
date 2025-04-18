import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage } from "@ionic/react";
import "./Revenue.css";
import { useHistory } from "react-router-dom";
import ToolBar from "../../components/ToolBar/ToolBar";

const Revenue = () => {
  const [grandTotalAmount, setGrandTotalAmount] = useState(null);
  const [allExecutives, setAllExecutives] = useState([]);
  const [executives, setExecutives] = useState([]);

  // Function to format current date to YYYY-MM-DD
  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split("T")[0]; // Format to 'YYYY-MM-DD'
  };

  const [startDate, setStartDate] = useState(getCurrentDate()); // Set default start date
  const [endDate, setEndDate] = useState(getCurrentDate()); // Set default end date

  const history = useHistory();

  const fetchTotalAmount = async () => {
    try {
      const response = await fetch(
        `https://backend.piyushshivkumarshhri.com/api/revenue`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      if (
        data &&
        typeof data.grandTotalAmount !== "undefined" &&
        data.executiveDetails
      ) {
        setGrandTotalAmount(data.grandTotalAmount);
        setAllExecutives(data.executiveDetails);
        setExecutives(data.executiveDetails);
      } else {
        throw new Error("Required data not found in response");
      }
    } catch (error) {
      console.error("Error fetching total amount:", error);
    }
  };

  useEffect(() => {
    fetchTotalAmount();
  }, []);

  const handleFilter = async () => {
    if (!startDate || !endDate) {
      setExecutives(allExecutives);
    } else {
      try {
        const response = await fetch(
          `https://backend.piyushshivkumarshhri.com/api/revenue/getbydate?startDate=${startDate}&endDate=${endDate}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch filtered data");
        }

        const data = await response.json();

        if (
          data &&
          typeof data.grandTotalAmount !== "undefined" &&
          data.executiveDetails
        ) {
          setGrandTotalAmount(data.grandTotalAmount);
          setExecutives(data.executiveDetails);
        } else {
          throw new Error("Required filtered data not found in response");
        }
      } catch (error) {
        console.error("Error fetching filtered data:", error);
      }
    }
  };

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
        <div
          className="date-filter"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          {/* Start Date Input with Label */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <label
              htmlFor="startDate"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              From
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                backgroundColor: "white",
                color: "black",
                height: "35px",
                borderRadius: "5px",
                padding: "5px",
                border: "1px solid #ccc",
                width: "100%",
              }}
            />
          </div>

          {/* End Date Input with Label */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <label
              htmlFor="endDate"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              To
            </label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                backgroundColor: "white",
                color: "black",
                height: "35px",
                borderRadius: "5px",
                padding: "5px",
                border: "1px solid #ccc",
                width: "100%",
              }}
            />
          </div>

          {/* Apply Button */}
          <button
            onClick={handleFilter}
            style={{
              marginLeft: "10px",
              backgroundColor: "#00004d",
              color: "white",
              fontSize: "14px",
              height: "35px",
              width: "80px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              alignSelf: "end", // Align the button with the bottom of the input fields
            }}
          >
            Apply
          </button>
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
