import React, { useState, useEffect } from "react";
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
        const response = await fetch("https://vastu-web-app.onrender.com/api/executives");
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

  // Function to log executive data when clicked
  const logExecutiveData = (executive) => {
    console.log("Clicked Executive ID:", executive.id);
  };

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
        <div style={{ marginBottom: "60px" }}>
          {filteredExecutives.length > 0 && ( // Check if executives are available
            <IonList inset={true}>
              {filteredExecutives.map((executive, index) => (
                <IonItem
                  key={index}
                  button
                  detail={true}
                  style={{ border: "1px solid black", marginBottom: "25px", borderRadius: "10px" }}
                  onClick={() => logExecutiveData(executive)}
                >
                  <IonRouterLink
                    routerLink={`/bottomtabs/individualclients/${executive._id}`}
                  >
                    <IonLabel style={{ padding: "10px" }}>
                      <h2>{executive.firstName}</h2>
                      <p>{executive.phoneNumber}</p>
                    </IonLabel>
                  </IonRouterLink>
                </IonItem>
              ))}
            </IonList>
          )}
        </div>
        {/* Add Executive button */}
        <div
          style={{
            position: "fixed",
            bottom: 5,
            width: "90%",
            zIndex: 1,
            marginTop: "20px",
            marginLeft: "18px",
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
