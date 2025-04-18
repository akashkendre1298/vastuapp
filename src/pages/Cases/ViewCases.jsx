import React, { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonRouterLink,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { Link } from "react-router-dom";
import ToolBar from "../../components/ToolBar/ToolBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./ViewCases.css";

const ViewCasesPage = () => {
  const [caseLabels, setCaseLabels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCases = async () => {
    try {
      const response = await fetch(
        "https://backend.piyushshivkumarshhri.com/api/cases"
      );
      const data = await response.json();
      if (data.data && Array.isArray(data.data)) {
        const labels = data.data.map((item) => ({
          id: item._id,
          label: item.caseLabel,
        }));
        setCaseLabels(labels);
      } else {
        console.error("Error: Data is not in the expected format");
      }
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleRefresh = (event) => {
    fetchCases().then(() => {
      event.detail.complete(); // Complete the refresher after fetching
    });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCases = caseLabels.filter((caseItem) =>
    caseItem.label?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <IonPage>
      <ToolBar />
      <IonContent className="view-cases-content">
        <div>
          <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        </div>

        {/* Add IonRefresher for pull-to-refresh functionality */}
        <IonRefresher onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingIcon="arrow-down"
            refreshingSpinner="bubbles"
          />
        </IonRefresher>

        <IonList inset={true} style={{ marginBottom: "70px" }}>
          {filteredCases.length > 0 ? (
            filteredCases
              .slice() // Create a shallow copy to avoid mutating the original array
              .reverse() // Reverse the array order
              .map((caseItem) => (
                <IonRouterLink
                  key={caseItem.id}
                  routerLink={`/bottomtabs/particularCase/${caseItem.id}`}
                >
                  <IonItem button style={{ borderRadius: "10px" }}>
                    <IonLabel
                      style={{
                        padding: "14px",
                        backgroundColor: "#FFFFFF",
                        color: "black",
                        borderRadius: "14px",
                      }}
                    >
                      <div className="caseItemContent">
                        <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
                          {caseItem.label}
                        </h2>
                        <MdKeyboardArrowRight size={20} />
                      </div>
                    </IonLabel>
                  </IonItem>
                </IonRouterLink>
              ))
          ) : (
            <IonItem>
              <IonLabel>No cases found</IonLabel>
            </IonItem>
          )}
        </IonList>

        <div>
          <Link to="/bottomtabs/addcases">
            <button className="add-case-btn">Add Case</button>
          </Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ViewCasesPage;
