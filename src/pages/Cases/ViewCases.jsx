import React, { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonRouterLink,
  IonIcon,
} from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";
import "./ViewCases.css";
import { Link } from "react-router-dom";
import ToolBar from "../../components/ToolBar/ToolBar";
import SearchBar from "../../components/SearchBar/SearchBar";

const ViewCasesPage = () => {
  const [caseLabels, setCaseLabels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://backend.piyushshivkumarshhri.com/api/cases")
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
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

        <IonList inset={true} style={{ marginBottom: "70px" }}>
          {filteredCases.length > 0 ? (
            filteredCases.map((caseItem) => (
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

                  {/* <IonIcon
                    icon={chevronForwardOutline}
                    slot="end"
                    style={{
                      marginLeft: "auto",
                      fontSize: "24px",
                      color: "black",
                    }}
                  /> */}
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
