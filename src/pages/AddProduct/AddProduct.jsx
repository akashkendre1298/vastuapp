//@ts-nocheck
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
import { useLocation } from "react-router-dom";
import logo from "../../Assets/pandit_shivkumar_logo.png";
import "./AddProduct.css";

const AddProduct = () => {
  const location = useLocation();
  const [selectedCase, setSelectedCase] = useState("");
  const [caseData, setCaseData] = useState([]);
  const [productName, setProductName] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [priority, setPriority] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [yantraName, setYantraName] = useState([]);

  const [selectedProductNames, setselectedProductNames] = useState([]);
  const [selectedYantraNames, setSelectedYantraNames] = useState([]);

  const handleProductSelection = (selectedValues) => {
    setselectedProductNames(selectedValues);
    console.log("Selected cases:", selectedValues);
  };

  const handleYantraSelection = (selectedValues) => {
    setSelectedYantraNames(selectedValues);
    console.log("Selected cases:", selectedValues);
  };

  useEffect(() => {
    // If navigated from ViewProduct, set selected case and caseData
    if (location.state && location.state.selectedCase) {
      setSelectedCase(location.state.selectedCase);
    }
    if (location.state && location.state.caseData) {
      setCaseData(location.state.caseData);
    }

    // Fetch case data from API
    fetch("https://backend.piyushshivkumarshhri.com/api/cases")
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

    fetch("https://backend.piyushshivkumarshhri.com/api/master/products")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          // Set case data
          setProductName(data);
        } else {
          console.error("Error: Data is not in the expected format");
        }
      })
      .catch((error) => {
        console.error("Error fetching cases:", error);
      });

    fetch("https://backend.piyushshivkumarshhri.com/api/master/yantra")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          // Set case data
          setYantraName(data);
        } else {
          console.error("Error: Data is not in the expected format");
        }
      })
      .catch((error) => {
        console.error("Error fetching cases:", error);
      });
  }, [location.state]);

  const handleCaseSelection = (selectedCaseLabel) => {
    setSelectedCase(selectedCaseLabel);
  };

  const handleSaveProduct = () => {
    if (!selectedCase || !selectedProductNames) {
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
        // productName,
        productName: selectedProductNames,
        yantraName: selectedYantraNames,
        // productCategory: categoryName,
        priority,
        purchased: false,
      };

      // Send a POST request to save the product data
      fetch("https://backend.piyushshivkumarshhri.com/api/addproduct/", {
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
          setselectedProductNames([]);
          setSelectedYantraNames([]);
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
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="#"
              className="back-button"
            ></IonBackButton>
          </IonButtons>
          {/* <IonTitle>Case</IonTitle> */}
          <IonButtons slot="end">
            <IonImg src={logo} alt="App Logo" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent
        className="ion-padding"
        style={{ backgroundColor: "#e2dee9" }}
      >
        <div style={{ paddingBottom: "10px" }}></div>
        <IonItem className="add-executive-item">
          <IonLabel position="floating">Choose Case</IonLabel>
          <IonSelect
            interface="popover"
            value={selectedCase}
            onIonChange={(e) => handleCaseSelection(e.detail.value)}
            searchbar // Enable searchbar for IonSelect
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
          {/* <IonLabel position="stacked">Product Name</IonLabel> */}
        </div>

        {/* <IonItem className="add-executive-item">
          <IonInput
            placeholder="Product Name"
            className="add-executive-input"
            name="ProductName"
            value={productName}
            onIonChange={(e) => setProductName(e.detail.value)}
          />
        </IonItem> */}
        <IonItem className="add-executive-item">
          <IonLabel position="floating">Product name</IonLabel>
          <IonSelect
            multiple={true}
            interface="popover"
            value={selectedProductNames}
            onIonChange={(e) => handleProductSelection(e.detail.value)}
            searchbar // Enable searchbar for IonSelect
          >
            {productName.map((item, index) => (
              <IonSelectOption key={index} value={item.name}>
                {item.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem className="add-executive-item">
          <IonLabel position="floating">Yantra name</IonLabel>
          <IonSelect
            multiple={true}
            interface="popover"
            value={selectedYantraNames}
            onIonChange={(e) => handleYantraSelection(e.detail.value)}
          >
            {yantraName.map((item, index) => (
              <IonSelectOption key={index} value={item.name}>
                {item.name}
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
          {/* <IonLabel position="stacked">Category Name</IonLabel> */}
        </div>

        {/* <IonItem className="add-executive-item">
          <IonInput
            placeholder="Category Name"
            className="add-executive-input"
            name="Category Name"
            value={categoryName}
            onIonChange={(e) => setCategoryName(e.detail.value)}
          />
        </IonItem> */}

        <IonItem className="add-executive-item">
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
          <button className="save-product-button" onClick={handleSaveProduct}>
            Save Product
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddProduct;
