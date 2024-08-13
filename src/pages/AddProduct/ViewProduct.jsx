import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from "@ionic/react";
import { Link } from "react-router-dom";
import ToolBar from "../../components/ToolBar/ToolBar";
import "./ViewProduct.css";

const ViewProduct = () => {
  const [selectedCase, setSelectedCase] = useState("");
  const [caseData, setCaseData] = useState([]);
  const [selectedCaseData, setSelectedCaseData] = useState(null); // Initial state is null

  useEffect(() => {
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
  }, []);

  const fetchProductData = (clientId, caseId) => {
    fetch(
      `https://backend.piyushshivkumarshhri.com/api/addproduct/${clientId}/${caseId}`
    )
      .then((response) => response.json())
      .then((data) => {
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
      fetchProductData(client_id, _id);
    } else {
      setSelectedCaseData([]); // Set an empty array if no case is found
    }
  };

  const confirmDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const productId = selectedCaseData[index]._id;
      fetch(
        `https://backend.piyushshivkumarshhri.com/api/addproduct/${productId}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const updatedProductData = [...selectedCaseData];
          updatedProductData.splice(index, 1);
          setSelectedCaseData(updatedProductData);
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <ToolBar />
      </IonHeader>
      <IonContent style={{ backgroundColor: "#e2dee9" }}>
        <IonItem
          style={{
            margin: "14px",

            backgroundColor: "white",
            borderRadius: "14px",
          }}
        >
          <IonLabel position="floating" style={{ fontSize: "18px" }}>
            Choose Case
          </IonLabel>
          <IonSelect
            interface="popover"
            style={{ fontSize: "18px" }}
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
              {selectedCaseData && selectedCaseData.length > 0 ? (
                selectedCaseData.map((product, index) => (
                  <tr key={index}>
                    <td>{product.productName}</td>
                    <td>{product.productCategory}</td>
                    <td>{product.priority ? "true" : "false"}</td>
                    <td>{product.purchased ? "true" : "false"}</td>
                    <td>{product.paymentStatus}</td>
                    <td>
                      <IonIcon
                        name="trash-bin"
                        onClick={() => confirmDelete(index)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No products available for the selected case
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div>
          <Link to="/bottomtabs/addproduct">
            <button className="product-buton">Add Product</button>
          </Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ViewProduct;
