import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  IonInput,
  IonCheckbox,
} from "@ionic/react";
import axios from 'axios';
import logo from "../../Assets/pandit_shivkumar_logo.png";
import "./AddProduct.css";
import ToolBar from "../../components/ToolBar/ToolBar";

const AddProduct = () => {
  const [selectedCase, setSelectedCase] = useState("");
  const [caseData, setCaseData] = useState([]);
  const [productName, setProductName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [priority, setPriority] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch case data from API
    fetch("http://localhost:8888/api/cases")
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          // Set case data
          setCaseData(data.data);
        } else {
          console.error("Error: Data is not in the expected format");
        }
      })
      .catch((error) => {
        console.error("Error fetching cases:", error);
      });
  }, []);

  const handleCaseSelection = (selectedCaseLabel) => {
    setSelectedCase(selectedCaseLabel);
  };

  const handleSaveProduct = () => {
    setError("");
  
    const selectedCaseItem = caseData.find(
      (item) => item.caseLabel === selectedCase
    );
  
    if (selectedCaseItem) {
      const { _id: caseID, client_id, executiveID } = selectedCaseItem;
      const data = {
        clientID: client_id,
        CaseID: caseID,
        exeID: executiveID,
        productName,
        productCategory: categoryName,
        priority: priority ? "high" : "low",
      };
  
      console.log("Sending data to server:", data);
  
      axios.post("http://localhost:8888/api/addproduct", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Product saved successfully:", response.data);
        setProductName("");
        setCategoryName("");
        setPriority(false);
        setSuccessMessage("Product added successfully!");
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Error response:", error.response.data);
          setError("Error saving product: " + error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Error request:", error.request);
          setError("Error saving product. Please try again.");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error:", error.message);
          setError("Error saving product. Please try again.");
        }
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
       <ToolBar/>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ paddingBottom: "10px" }}></div>
        <IonItem className="add-executive-item">
          <IonLabel position="floating">Choose Case</IonLabel>
          <IonSelect
            interface="popover"
            value={selectedCase}
            onIonChange={(e) => handleCaseSelection(e.detail.value)}
          >
            {caseData.map((item, index) => (
              <IonSelectOption key={index} value={item.caseLabel}>
                {item.caseLabel}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <div
          style={{
            paddingBottom: "10px",
            marginTop: "10px",
            paddingLeft: "10px",
          }}
        >
          <IonLabel position="stacked">Product Name</IonLabel>
        </div>

        <IonItem className="add-executive-item">
          <IonInput
            placeholder="Product Name"
            className="add-executive-input"
            name="ProductName"
            value={productName}
            onIonChange={(e) => setProductName(e.detail.value)}
          />
        </IonItem>

        <div
          style={{
            paddingBottom: "10px",
            marginTop: "10px",
            paddingLeft: "10px",
          }}
        >
          <IonLabel position="stacked">Category Name</IonLabel>
        </div>

        <IonItem className="add-executive-item">
          <IonInput
            placeholder="Category Name"
            className="add-executive-input"
            name="Category Name"
            value={categoryName}
            onIonChange={(e) => setCategoryName(e.detail.value)}
          />
        </IonItem>

        <IonItem>
          <IonLabel>Priority</IonLabel>
          <IonCheckbox
            slot="start"
            checked={priority}
            onIonChange={(e) => setPriority(e.detail.checked)}
          />
        </IonItem>

        {error && (
          <div style={{ color: "red", paddingBottom: "10px" }}>{error}</div>
        )}
        {successMessage && (
          <div style={{ color: "green", paddingBottom: "10px" }}>
            {successMessage}
          </div>
        )}

        <div className="btn-div">
          <button className="signUp-button" onClick={handleSaveProduct}>
            Save Product
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddProduct;
