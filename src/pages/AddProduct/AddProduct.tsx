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

const AddProduct = () => {
  const [selectedCase, setSelectedCase] = useState("");
  const [caseData, setCaseData] = useState([]);
  const [productName, setProductName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [priority, setPriority] = useState(false);

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
    const selectedCaseItem = caseData.find(
      (item) => item.caseLabel === selectedCase
    );
  
    if (selectedCaseItem) {
      const { _id: caseID, client_id, executiveID } = selectedCaseItem; // Destructure values from selected case
      console.log("Client ID:", client_id); 
      console.log("Case ID:", caseID);
      console.log("Executive ID:", executiveID);
      const data = {
        clientID: client_id,
        CaseID: caseID,
        exeID: executiveID,
        productName,
        productCategory: categoryName,
        priority,
      };
  
      // Send a POST request to save the product data
      fetch("http://localhost:8888/api/addproduct/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Product saved successfully:", data);
        })
        .catch((error) => {
          console.error("Error saving product:", error);
        });
    }
  };
  
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Product</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ paddingBottom: "10px" }}>
          <IonLabel position="stacked">Choose Case</IonLabel>
        </div>
        <IonItem>
          <IonLabel position="floating"></IonLabel>
          <IonSelect
            interface="popover"
            placeholder="Choose Case"
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

        <div style={{ paddingBottom: "10px" }}>
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

        <div style={{ paddingBottom: "10px" }}>
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
