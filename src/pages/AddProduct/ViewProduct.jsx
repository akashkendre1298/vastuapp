//@ts-nocheck

import React, { useState, useEffect } from "react";
import trashBin from '../../../src/Assets/icon-delete.svg';
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
import useDebounce from '../../utils/useDebounce';
import Dropdown from '../../components/Dropdown/Dropdown';
import SearchBar from '../../components/SearchBar/SearchBar';

const ViewProduct = () => {
  const [selectedCase, setSelectedCase] = useState("");
  const [caseData, setCaseData] = useState([]);
  const [selectedCaseData, setSelectedCaseData] = useState([]); // Initial state is an empty array
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 400);
  const [showCaseDropdown, setShowCaseDropdown] = useState(false);
  const [caseSearch, setCaseSearch] = useState("");
  const debouncedCaseSearch = useDebounce(caseSearch, 300);

  useEffect(() => {
    // Always clear selected case and data on mount
    setSelectedCase("");
    setSelectedCaseData([]);
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
  console.log("Case Data:", caseData);

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

  // Filtered product list based on search
  const filteredProducts = selectedCaseData && Array.isArray(selectedCaseData)
    ? selectedCaseData.filter(product => {
        const prodNames = Array.isArray(product.productName) ? product.productName.join(", ") : product.productName;
        const yantraNames = Array.isArray(product.yantraName) ? product.yantraName.join(", ") : product.yantraName;
        return (
          (prodNames && prodNames.toLowerCase().includes(debouncedSearch.toLowerCase())) ||
          (yantraNames && yantraNames.toLowerCase().includes(debouncedSearch.toLowerCase()))
        );
      })
    : [];

  return (
    <IonPage>
      <IonHeader>
        <ToolBar />
      </IonHeader>
      <IonContent style={{ backgroundColor: "#e2dee9" }}>
        {/* Accordion for Case Selection */}
        <div style={{ margin: '14px', background: 'white', borderRadius: '14px', padding: '10px' }}>
          <div
            style={{ cursor: 'pointer', fontWeight: 600, fontSize: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            onClick={() => setShowCaseDropdown(v => !v)}
          >
            <span>{selectedCase ? selectedCase : 'Choose Case'}</span>
            <span>{showCaseDropdown ? '▲' : '▼'}</span>
          </div>
          {showCaseDropdown && (
            <div style={{ maxHeight: 250, overflowY: 'auto', marginTop: 8, border: '1px solid #eee', borderRadius: 8, background: '#fafaff' }}>
              {/* Search bar for cases inside accordion */}
              <div style={{ padding: '8px 8px 0px 8px' }}>
                <input
                  type="text"
                  value={caseSearch}
                  onChange={e => setCaseSearch(e.target.value)}
                  placeholder="Search cases..."
                  style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ccc', background: '#fff' }}
                />
              </div>
              {/* Filtered case list */}
              {caseData.length === 0 && (
                <div style={{ padding: 12, color: '#888' }}>No cases found</div>
              )}
              {caseData.filter(item =>
                !debouncedCaseSearch || item.caseLabel.toLowerCase().includes(debouncedCaseSearch.toLowerCase())
              ).map((item, idx, arr) => (
                <div
                  key={item._id || idx}
                  style={{
                    padding: '12px 16px',
                    borderBottom: idx !== arr.length - 1 ? '1px solid #eee' : 'none',
                    background: selectedCase === item.caseLabel ? '#e2dee9' : 'transparent',
                    cursor: 'pointer',
                    fontWeight: selectedCase === item.caseLabel ? 700 : 400
                  }}
                  onClick={() => {
                    setShowCaseDropdown(false);
                    handleCaseSelection(item.caseLabel);
                    setCaseSearch("");
                  }}
                >
                  {item.caseLabel}
                </div>
              ))}
            </div>
          )}
        </div>


        {/* Product Table */}
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Yantra</th>
                <th>Priority</th>
                <th>Purchased</th>
                <th>Payment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{Array.isArray(product.productName) && Array.isArray(product.product_quantity) ? product.productName.map((name, i) => `${name} (${product.product_quantity && product.product_quantity[i] !== undefined ? product.product_quantity[i] : 1})`).join(", ") : product.productName}</td>
                    <td>{Array.isArray(product.yantraName) && Array.isArray(product.yantra_quantity) ? product.yantraName.map((name, i) => `${name} (${product.yantra_quantity && product.yantra_quantity[i] !== undefined ? product.yantra_quantity[i] : 1})`).join(", ") : product.yantraName}</td>
                    <td>{product.priority ? "Yes" : "No"}</td>
                    <td>{product.purchased ? "Yes" : "No"}</td>
                    <td>{product.paymentStatus}</td>
                    <td>
                      <img
                        src={trashBin}
                        alt="Delete"
                        style={{ width: "20px", cursor: "pointer" }}
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
        <div style={{  borderRadius: '14px', margin: '18px 14px 14px 14px',  padding: '18px 0', display: 'flex', justifyContent: 'center' }}>
          <Link
            to={{
              pathname: "/bottomtabs/addproduct",
              state: { selectedCase, caseData }
            }}
            style={{ width: '100%' }}
          >
            <button className="product-buton" style={{ background: '#00004d', color: '#fff', border: 'none', borderRadius: '10px', width: '100%', maxWidth: 400, margin: '0 auto', fontWeight: 600 }}>
              Add Product
            </button>
          </Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ViewProduct;
