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
  IonButtons,
  IonBackButton,
  IonImg,
} from "@ionic/react";
import logo from "../../Assets/pandit_shivkumar_logo.png";
import "./AddProduct.css"

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
    fetch("https://vastu-web-app.onrender.com/api/cases")
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
    if (!selectedCase || !productName || !categoryName) {
      setError("Please fill in all required fields.");
      return;
    }

    setError(""); // Clear any previous error messages

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
        priority,
      };

      // Send a POST request to save the product data
      fetch("https://vastu-web-app.onrender.com/api/addproduct/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Product saved successfully:", data);
          // Clear the form fields after successful save
          setProductName("");
          setCategoryName("");
          setPriority(false);
          setSuccessMessage("Product added successfully!");
        })
        .catch((error) => {
          console.error("Error saving product:", error);
        });
    }
  };

  return (
    <IonPage>
      <IonHeader>
    <IonToolbar >
      <IonButtons slot="start">
        <IonBackButton defaultHref="#" className="back-button"></IonBackButton>
      </IonButtons>
      {/* <IonTitle>Case</IonTitle> */}
      <IonButtons slot="end">
        <IonImg src={logo} alt="App Logo" />
      </IonButtons>
    </IonToolbar>
  </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ paddingBottom: "10px" }}>
        </div>
        <IonItem className="add-executive-item">
          <IonLabel position="floating">Choose Case</IonLabel>
          <IonSelect
            interface="popover"
            // placeholder="Choose Case"
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

        <div style={{ paddingBottom: "10px" ,marginTop:"10px",paddingLeft:"10px"}}>
          <IonLabel position="stacked" >Product Name</IonLabel>
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

        <div style={{ paddingBottom: "10px" ,marginTop:"10px" ,paddingLeft:"10px"}}>
          <IonLabel position="stacked" >Category Name</IonLabel>
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
