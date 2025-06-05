import React, { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonRouterLink,
} from "@ionic/react";
import "./ViewExecutive.css";
import { Link } from "react-router-dom";
import ToolBar from "../../components/ToolBar/ToolBar";
import SearchBar from "../../components/SearchBar/SearchBar";

const ViewExecutive = () => {
  const [executives, setExecutives] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        const response = await fetch(
          "https://backend.piyushshivkumarshhri.com/api/executives"
        );
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response
        setExecutives(data);
      } catch (error) {
        console.error("Error fetching executives:", error);
        // Handle errors appropriately (e.g., display an error message to the user)
      }
    };

    fetchExecutives();
  }, []);

  // Function to handle search input
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter executives based on search query
  const filteredExecutives = executives.filter((executive) =>
    executive.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <ToolBar />
      </IonHeader>

      <IonContent className="view-executive-page">
        <div>
          <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        </div>
        <div
          style={{
            maxHeight: "350px",
            overflowY: "auto",
            // marginBottom: "30px",
            background: "#e2dee9",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          {filteredExecutives.length > 0 && (
            <IonList style={{ background: "transparent" }}>
              {filteredExecutives
                .slice() // Create a shallow copy of the array
                .reverse() // Reverse the array order
                .map((executive) => (
                  <IonRouterLink
                    key={executive._id}
                    routerLink={`/bottomtabs/individualclients/${executive._id}`}
                  >
                    <IonItem
                      button
                      style={{
                        borderRadius: "10px",
                        paddingLeft: "14px",
                        paddingRight: "14px",
                      }}
                    >
                      <IonLabel
                        style={{
                          padding: "10px",

                          backgroundColor: "#FFFFFF",
                          color: "black",
                          borderRadius: "14px",
                        }}
                      >
                        <div className="viewExecutiveContent">
                          <div>
                            <h2
                              style={{ fontSize: "20px", fontWeight: "bold" }}
                            >
                              {executive.firstName}
                            </h2>
                            <p>{executive.phoneNumber}</p>
                          </div>
                          <div>
                            <MdKeyboardArrowRight size={20} />
                          </div>
                        </div>
                      </IonLabel>
                    </IonItem>
                  </IonRouterLink>
                ))}
            </IonList>
          )}
        </div>

        <div
          style={{

            zIndex: 1,
            margin :"0 25px",
            justifyContent: "center",
          }}
        >
          <Link to="/bottomtabs/addexecutive">
            <button className="add-executive-btn">Add Executive</button>
          </Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ViewExecutive;
