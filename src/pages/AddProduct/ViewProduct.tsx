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
  IonButtons,
  IonBackButton,
  IonImg,
} from "@ionic/react";

import "./ViewProduct.css";
import { Link } from "react-router-dom";
import logo from "../../Assets/pandit_shivkumar_logo.png";
import ToolBar from "../../components/ToolBar/ToolBar";


const ViewProduct = () => {
  const [selectedCase, setSelectedCase] = useState("");
  const [caseData, setCaseData] = useState([]);
  const [selectedCaseData, setSelectedCaseData] = useState(null);

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

  const fetchProductData = (clientId, caseId) => {
    fetch(`http://localhost:8888/api/addproduct/${clientId}/${caseId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched product data:", data);
        // Check if data is an array
        if (Array.isArray(data)) {
          setSelectedCaseData(data);
        } else {
          console.error("Invalid product data format:", data);
          setSelectedCaseData([]); // Set an empty array if data is not in the expected format
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setSelectedCaseData([]); // Set an empty array in case of an error
      });
  };
  

  const handleCaseSelection = (selectedCaseLabel) => {
    setSelectedCase(selectedCaseLabel);
    const selectedCaseItem = caseData.find(
      (item) => item.caseLabel === selectedCaseLabel
    );
    if (selectedCaseItem) {
      const { client_id, _id } = selectedCaseItem;
      console.log("Selected Case Label:", selectedCaseLabel);
      console.log("Selected Client ID:", client_id);
      console.log("Selected ID:", _id);
      fetchProductData(client_id, _id);
    }
  };

  // After the selectedCaseData is fetched, you can access productName and productCategory
  console.log("Product Name:", selectedCaseData?.productName);
  console.log("Product Category:", selectedCaseData?.productCategory);
  console.log("Product purchesed:", selectedCaseData?.purchased);
  console.log("Product priority:", selectedCaseData?.priority);

  return (
    <IonPage>
      <IonHeader>
   <ToolBar/>
  </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">Choose Case</IonLabel>
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

        <div className="table-container">
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
            <tbody>
  {selectedCaseData && selectedCaseData.map((product, index) => (
    <tr key={index}>
      <td>{product.productName}</td>
      <td>{product.productCategory}</td>
      <td>{product.priority ? "true" : "false"}</td>
      <td>{product.purchased ? "true" : "false"}</td>
      <td>{product.paymentStatus}</td>
      <td>{product.action}</td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
        <div>
         
            <Link to="/bottomtabs/addproduct">
              <IonButton>Add Product</IonButton>
            </Link>
         
        </div>
      </IonContent>

    </IonPage>
  );
};

export default ViewProduct;
