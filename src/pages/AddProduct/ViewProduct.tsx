import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonItem,
  IonButton,
  IonImg,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import logo from "../../Assets/pandit_shivkumar_logo.png";
import "./ViewProduct.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";

const ViewProduct = () => {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(""); // Declare and initialize selectedCase

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/cases");
      if (!response.ok) {
        throw new Error("Failed to fetch cases");
      }
      const data = await response.json();
      console.log("Fetched cases:", data); // Log the fetched data
      setCases(data);
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ color: "#00004D" }}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="#" />
          </IonButtons>
          <IonButtons slot="end">
            <IonImg src={logo} alt="App Logo" />
          </IonButtons>
        </IonToolbar>
        <IonToolbar style={{ color: "#00004D" }}>
          <IonTitle>Products</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ backgroundColor: "gray" }}>
        <div style={{ backgroundColor: "gray" }}>
          <SearchBar />
        </div>

        <div style={{ paddingBottom: "10px", backgroundColor: "gray" }}>
          <IonLabel position="floating">Choose Case</IonLabel>
        </div>


        <IonItem style={{ border: "1px solid black", marginBottom: "25px" }}>
  <IonLabel position="floating">Choose Case</IonLabel>
  <IonSelect
    interface="popover"
    placeholder="Choose Case"
    value={selectedCase} // Bind value to selectedCase
    onIonChange={(e) => {
      setSelectedCase(e.detail.value);
      const selectedCaseLabel = cases.find(
        (caseItem) => caseItem._id === e.detail.value
      ).caseLabel;
      console.log("Selected case label:", selectedCaseLabel);
    }} // Update selectedCase on change
  >
    {cases.map((caseItem) => (
      <IonSelectOption key={caseItem._id} value={caseItem._id}>
        {caseItem.caseLabel}
      </IonSelectOption>
    ))}
  </IonSelect>
</IonItem>


      


        <div
          style={{
            width: "100%",
            overflowX: "auto",
            marginTop: "40px",
            backgroundColor: "gray",
          }}
        >
          <table className="custom-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Purchased</th>
                <th>Payment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{/* Display products here */}</tbody>
          </table>
        </div>

        <div className="btn-div">
          <Link to="/bottomtabs/addproduct">
            <IonButton>Add Product</IonButton>
          </Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ViewProduct;
