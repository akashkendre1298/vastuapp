import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { Link } from "react-router-dom";
import ToolBar from "../../components/ToolBar/ToolBar";
import SearchBar from "../../components/SearchBar/SearchBar";

const ViewCasesPage = () => {
  const [caseLabels, setCaseLabels] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    // Fetch case labels from API
    fetch("https://vastu-web-app.onrender.com/api/cases")
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          // Extract caseLabels from each object in the data array
          const labels = data.data.map((item) => {
            return { id: item._id, label: item.caseLabel };
          });
          setCaseLabels(labels);
        } else {
          console.error("Error: Data is not in the expected format");
        }
      })
      .catch((error) => {
        console.error("Error fetching cases:", error);
      });
  }, []);

  // Function to handle search input
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter cases based on search query
  const filteredCases = caseLabels.filter((caseItem) =>
    caseItem.label?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <IonPage>
      <ToolBar />
      <IonContent>
        {/* Search Bar */}
        <div>
          <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        </div>

        {/* List of Cases */}
        {filteredCases.length > 0 ? (
          <IonList inset={true} style={{ marginBottom: "40px" }}>
            {filteredCases.map((caseItem) => (
              <Link key={caseItem.id} to={`/bottomtabs/particularCase/${caseItem.id}`}>
                <IonItem
                  button
                  detail={true}
                  style={{
                    border: "1px solid black",
                    marginBottom: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <IonLabel>{caseItem.label}</IonLabel>
                </IonItem>
              </Link>
            ))}
          </IonList>
        ) : (
          <IonList inset={true} style={{ marginBottom: "40px" }}>
            <IonItem>
              <IonLabel>No cases found</IonLabel>
            </IonItem>
          </IonList>
        )}

        <Link to="/bottomtabs/addcases">
          <button
            className="add-executive-button"
            style={{
              position: "fixed",
              bottom: 5,
              width: "92%",
              zIndex: 1,
              marginTop: "20px",
              marginLeft: "16px",
            }}
          >
            Add Case
          </button>
        </Link>
      </IonContent>
    </IonPage>
  );
};

export default ViewCasesPage;
